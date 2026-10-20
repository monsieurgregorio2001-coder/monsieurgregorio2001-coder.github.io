#!/usr/bin/env python3
"""Check portfolio documentation without dependencies or network access.

The default scope is the repository's entry documents and docs/**/*.md.
Registered sibling Markdown links are optional in a standalone checkout.
--workspace additionally follows local Markdown links across the registered
projects, checks their entry documents, and verifies the incoming image ledger.
URL schemes, remote links, and anchor fragments are intentionally not checked.
"""

import argparse
from collections import deque
from dataclasses import dataclass, field
import hashlib
import json
import os
from pathlib import Path, PurePosixPath
import re
import sys
from urllib.parse import unquote, urlsplit


REGISTRY = Path("docs/portfolio/projects/registry.json")
INVENTORY = Path("docs/portfolio/assets/IMAGE-INVENTORY.md")
ENTRY_DOCUMENTS = ("README.md", "CONTRIBUTING.md", "AGENTS.md")
SAFE_NAME = re.compile(r"[A-Za-z0-9][A-Za-z0-9._-]*\Z")
FENCE = re.compile(r"^ {0,3}(`{3,}|~{3,})")
INLINE_LINK = re.compile(r"!?\[[^\]\n]*\]\(")
REFERENCE = re.compile(r"^ {0,3}\[[^\]\n]+\]:[ \t]*(.*)$", re.MULTILINE)


@dataclass
class Result:
    issues: list = field(default_factory=list)
    markdown_files: int = 0
    local_links: int = 0
    skipped_workspace_links: int = 0
    verified_images: int = 0


def within(path, root):
    """Use path components, rather than unsafe string-prefix comparisons."""
    try:
        path.relative_to(root)
        return True
    except ValueError:
        return False


def safe_directory(value):
    if not isinstance(value, str) or not value or "\\" in value:
        return False
    parts = value.split("/")
    return value == "." or all(SAFE_NAME.fullmatch(part) for part in parts)


def read_registry(repo, result):
    path = repo / REGISTRY
    try:
        data = json.loads(path.read_text(encoding="utf-8"))
    except (OSError, ValueError) as exc:
        result.issues.append(f"{REGISTRY}: cannot read registry: {exc}")
        return None, []
    if (
        not isinstance(data, dict)
        or type(data.get("schema_version")) is not int
        or data["schema_version"] != 1
    ):
        result.issues.append(f"{REGISTRY}: expected schema_version 1")
        return None, []
    home_project_id = data.get("home_project_id")
    if not isinstance(home_project_id, str) or not SAFE_NAME.fullmatch(home_project_id):
        result.issues.append(f"{REGISTRY}: home_project_id must be a safe project ID")
        home_project_id = None
    projects = data.get("projects")
    if not isinstance(projects, list) or not projects:
        result.issues.append(f"{REGISTRY}: projects must be a nonempty list")
        return home_project_id, []
    seen_ids, seen_paths, valid = set(), set(), []
    for number, project in enumerate(projects, start=1):
        prefix = f"{REGISTRY}: project {number}"
        if not isinstance(project, dict):
            result.issues.append(f"{prefix}: expected an object")
            continue
        project_id, project_path = project.get("id"), project.get("path")
        errors = []
        for key, value, seen in (("id", project_id, seen_ids), ("path", project_path, seen_paths)):
            if not isinstance(value, str) or not SAFE_NAME.fullmatch(value):
                errors.append(f"{key} must be a safe single directory name")
            elif value.casefold() in seen:
                errors.append(f"duplicate {key}: {value}")
            else:
                seen.add(value.casefold())
        if not isinstance(project.get("name"), str) or not project["name"].strip():
            errors.append("name must be a nonempty string")
        if project.get("kind") not in ("site", "app", "prototype"):
            errors.append("kind must be site, app, or prototype")
        checks = project.get("checks")
        if not isinstance(checks, list):
            errors.append("checks must be a list")
        else:
            for check in checks:
                if not isinstance(check, dict) or not safe_directory(check.get("directory")):
                    errors.append("each check needs a safe repository-relative directory")
                elif not isinstance(check.get("command"), str) or not check["command"].strip():
                    errors.append("each check needs a nonempty command")
        if errors:
            result.issues.extend(f"{prefix}: {error}" for error in errors)
        else:
            valid.append(project)
    if home_project_id is not None and not any(
        project["id"] == home_project_id for project in valid
    ):
        result.issues.append(f"{REGISTRY}: home_project_id must identify a registered project")
    return home_project_id, valid


def prose_only(markdown):
    """Hide fenced/inline code so examples do not create false broken links."""
    lines, fence = [], None
    for line in markdown.splitlines(keepends=True):
        marker = FENCE.match(line)
        if marker:
            run = marker.group(1)
            if fence is None:
                fence = (run[0], len(run))
            elif run[0] == fence[0] and len(run) >= fence[1] and not line[marker.end():].strip():
                fence = None
            lines.append("\n" if line.endswith("\n") else "")
        elif fence is not None:
            lines.append("\n" if line.endswith("\n") else "")
        else:
            lines.append(line)
    return re.sub(
        r"(`+)(.*?)\1",
        lambda match: "\n" * match.group().count("\n"),
        "".join(lines),
        flags=re.DOTALL,
    )


def destination(text, start):
    """Read an inline/reference destination, including balanced parentheses."""
    index = start
    while index < len(text) and text[index].isspace():
        index += 1
    if index == len(text):
        return ""
    if text[index] == "<":
        end = text.find(">", index + 1)
        return text[index + 1:end] if end != -1 else ""
    parts, depth = [], 0
    while index < len(text):
        char = text[index]
        if char == "\\" and index + 1 < len(text):
            parts.append(text[index + 1])
            index += 2
            continue
        if char.isspace() or (char == ")" and depth == 0):
            break
        if char == "(":
            depth += 1
        elif char == ")":
            depth -= 1
        parts.append(char)
        index += 1
    return "".join(parts)


def markdown_links(markdown):
    text = prose_only(markdown)
    for match in INLINE_LINK.finditer(text):
        yield text.count("\n", 0, match.start()) + 1, destination(text, match.end())
    for match in REFERENCE.finditer(text):
        yield text.count("\n", 0, match.start()) + 1, destination(match.group(1), 0)


def check_inventory(repo, roots_by_id, result):
    inventory = repo / INVENTORY
    try:
        lines = inventory.read_text(encoding="utf-8").splitlines()
    except OSError as exc:
        result.issues.append(f"{INVENTORY}: cannot read image inventory: {exc}")
        return
    project_root = roots_by_id.get("slop-editorial")
    if project_root is None:
        result.issues.append(
            f"{INVENTORY}: slop-editorial must be registered for image verification"
        )
        return
    incoming = project_root / "incoming"
    if incoming.resolve() != incoming:
        result.issues.append(
            f"{INVENTORY}: incoming folder must not escape its registered project through symlinks"
        )
        return
    in_table, rows, seen = False, 0, set()
    for number, line in enumerate(lines, start=1):
        cells = [cell.strip().strip("`") for cell in line.strip().strip("|").split("|")]
        if cells[:3] == ["Filename", "Bytes", "SHA-256"]:
            in_table = True
            continue
        if not in_table:
            continue
        if not line.lstrip().startswith("|"):
            break
        if cells and re.fullmatch(r":?-+:?", cells[0].replace(" ", "")):
            continue
        rows += 1
        prefix = f"{INVENTORY}:{number}"
        if len(cells) < 3:
            result.issues.append(f"{prefix}: incomplete inventory row")
            continue
        filename, size, expected_hash = cells[:3]
        if (
            not filename
            or filename in {".", ".."}
            or Path(filename).name != filename
            or "\\" in filename
            or "\0" in filename
        ):
            result.issues.append(f"{prefix}: filename must be a single safe filename")
            continue
        if filename.casefold() in seen:
            result.issues.append(f"{prefix}: duplicate filename: {filename}")
            continue
        seen.add(filename.casefold())
        if not re.fullmatch(r"[0-9]+", size) or not re.fullmatch(r"[0-9a-fA-F]{64}", expected_hash):
            result.issues.append(f"{prefix}: expected a byte count and a SHA-256 hash")
            continue
        image = incoming / filename
        if image.resolve() != image:
            result.issues.append(
                f"{prefix}: image must not escape incoming through symlinks: {filename}"
            )
            continue
        try:
            actual_size = image.stat().st_size
            digest = hashlib.sha256()
            with image.open("rb") as stream:
                for chunk in iter(lambda: stream.read(1024 * 1024), b""):
                    digest.update(chunk)
        except OSError as exc:
            result.issues.append(f"{prefix}: cannot read {filename}: {exc}")
            continue
        if actual_size != int(size):
            result.issues.append(
                f"{prefix}: byte count mismatch for {filename}: "
                f"expected {size}, found {actual_size}"
            )
        if digest.hexdigest() != expected_hash.lower():
            result.issues.append(f"{prefix}: SHA-256 mismatch for {filename}")
        if actual_size == int(size) and digest.hexdigest() == expected_hash.lower():
            result.verified_images += 1
    if not in_table or rows == 0:
        result.issues.append(
            f"{INVENTORY}: expected a nonempty Filename | Bytes | SHA-256 inventory table"
        )


def check_repository(repo, workspace=False):
    repo = Path(repo).resolve()
    result = Result()
    home_project_id, projects = read_registry(repo, result)
    roots_by_id = {
        item["id"]: repo if item["id"] == home_project_id else repo.parent / item["path"]
        for item in projects
    }
    roots = [repo] + [root for root in roots_by_id.values() if root != repo]
    queue = deque()
    for name in ENTRY_DOCUMENTS:
        path = repo / name
        if not path.is_file():
            result.issues.append(f"{name}: required entry document is missing")
        else:
            queue.append(path)
    queue.extend(sorted((repo / "docs").rglob("*.md")))
    if workspace:
        for project in projects:
            root = roots_by_id[project["id"]]
            if root.resolve() != root:
                result.issues.append(
                    f"{REGISTRY}: registered project is a symlink: {project['path']}"
                )
                continue
            for name in ("AGENTS.md", "docs/CONTEXT.md"):
                path = root / name
                if not path.is_file():
                    result.issues.append(
                        f"{project['path']}/{name}: required workspace context is missing"
                    )
                else:
                    queue.append(path)
    visited = set()
    while queue:
        source = queue.popleft()
        if source in visited:
            continue
        visited.add(source)
        label = source.relative_to(repo if within(source, repo) else repo.parent)
        source_root = next((root for root in roots if within(source, root)), None)
        if source_root is None or not within(source.resolve(), source_root):
            result.issues.append(
                f"{label}: Markdown source escapes its registered project through symlinks"
            )
            continue
        try:
            markdown = source.read_text(encoding="utf-8")
        except (OSError, UnicodeError) as exc:
            result.issues.append(f"{label}: cannot read Markdown: {exc}")
            continue
        result.markdown_files += 1
        for number, target in markdown_links(markdown):
            prefix = f"{label}:{number}"
            try:
                parsed = urlsplit(target)
            except ValueError:
                result.issues.append(f"{prefix}: malformed link: {target}")
                continue
            if parsed.scheme or parsed.netloc or not parsed.path:
                continue
            result.local_links += 1
            decoded = unquote(parsed.path)
            if PurePosixPath(decoded).is_absolute() or "\\" in decoded or "\0" in decoded:
                result.issues.append(
                    f"{prefix}: local link must use a portable relative path: {target}"
                )
                continue
            linked = Path(os.path.abspath(source.parent / decoded))
            linked_root = next((root for root in roots if within(linked, root)), None)
            if linked_root is None:
                result.issues.append(f"{prefix}: link leaves registered project roots: {target}")
                continue
            if not within(linked.resolve(), linked_root):
                result.issues.append(
                    f"{prefix}: link escapes its registered project through symlinks: {target}"
                )
                continue
            if linked_root != repo and not workspace:
                if linked.suffix.lower() == ".md":
                    result.skipped_workspace_links += 1
                else:
                    result.issues.append(
                        f"{prefix}: only registered sibling Markdown links are optional: {target}"
                    )
                continue
            if not linked.exists():
                result.issues.append(f"{prefix}: missing local target: {target}")
            elif linked.is_file() and linked.suffix.lower() == ".md":
                queue.append(linked)
    if workspace:
        check_inventory(repo, roots_by_id, result)
    return result


def main(argv=None):
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "--workspace",
        action="store_true",
        help="require sibling context, follow workspace links, and verify image hashes",
    )
    args = parser.parse_args(argv)
    result = check_repository(Path(__file__).resolve().parents[1], args.workspace)
    for issue in result.issues:
        print(f"ERROR: {issue}", file=sys.stderr)
    print(f"Checked {result.markdown_files} Markdown files and {result.local_links} local links.")
    print(
        f"Skipped {result.skipped_workspace_links} optional workspace links; "
        f"verified {result.verified_images} inventory images."
    )
    status = "failed" if result.issues else "passed"
    print(f"Documentation check {status} ({len(result.issues)} issues).")
    return 1 if result.issues else 0


if __name__ == "__main__":
    sys.exit(main())
