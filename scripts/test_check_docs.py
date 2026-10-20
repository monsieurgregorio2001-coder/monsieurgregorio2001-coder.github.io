"""Regression tests for documentation boundaries and inventory integrity."""

import hashlib
import importlib.util
import json
from pathlib import Path
import tempfile
import unittest


MODULE_SPEC = importlib.util.spec_from_file_location(
    "check_docs", Path(__file__).with_name("check-docs.py")
)
CHECK_DOCS = importlib.util.module_from_spec(MODULE_SPEC)
MODULE_SPEC.loader.exec_module(CHECK_DOCS)


class DocumentationChecks(unittest.TestCase):
    def setUp(self):
        self.temporary = tempfile.TemporaryDirectory()
        self.addCleanup(self.temporary.cleanup)
        self.workspace = Path(self.temporary.name).resolve()
        self.repo = self.workspace / "portfolio"
        self.repo.mkdir()
        self.projects = [
            {
                "id": "portfolio",
                "name": "Portfolio",
                "path": "portfolio",
                "kind": "site",
                "checks": [{"directory": ".", "command": "python3 scripts/check-docs.py"}],
            },
            {
                "id": "slop-editorial",
                "name": "Slop Editorial",
                "path": "slop-editorial",
                "kind": "site",
                "checks": [],
            },
        ]
        self.write_registry()
        for name in CHECK_DOCS.ENTRY_DOCUMENTS:
            self.write(name, "# Entry\n")
        self.write("docs/CONTEXT.md", "# Context\n")

    def write(self, name, content):
        path = self.repo / name
        path.parent.mkdir(parents=True, exist_ok=True)
        path.write_text(content, encoding="utf-8")
        return path

    def write_registry(self):
        self.write(
            str(CHECK_DOCS.REGISTRY),
            json.dumps({
                "schema_version": 1,
                "home_project_id": "portfolio",
                "projects": self.projects,
            }),
        )

    def assert_issue(self, result, text):
        self.assertTrue(
            any(text in issue for issue in result.issues),
            f"Expected {text!r} in issues: {result.issues}",
        )

    def add_workspace(self, image=b"original image"):
        sibling = self.workspace / "slop-editorial"
        (sibling / "docs").mkdir(parents=True)
        (sibling / "AGENTS.md").write_text("[Context](docs/CONTEXT.md)\n", encoding="utf-8")
        (sibling / "docs/CONTEXT.md").write_text(
            "[Hub](../../portfolio/README.md)\n", encoding="utf-8"
        )
        (sibling / "incoming").mkdir()
        path = sibling / "incoming/hero.png"
        path.write_bytes(image)
        digest = hashlib.sha256(image).hexdigest()
        self.write(
            str(CHECK_DOCS.INVENTORY),
            "| Filename | Bytes | SHA-256 | V3 slot | QA state |\n"
            "| --- | --- | --- | --- | --- |\n"
            f"| hero.png | {len(image)} | `{digest}` | unknown | unreviewed |\n",
        )
        return sibling, path

    def test_missing_internal_link_fails(self):
        self.write("README.md", "[Broken](docs/missing.md)\n")
        result = CHECK_DOCS.check_repository(self.repo)
        self.assert_issue(result, "missing local target: docs/missing.md")

    def test_registered_absent_sibling_is_optional_only_in_standalone_mode(self):
        self.write("README.md", "[Sibling](../slop-editorial/docs/CONTEXT.md)\n")
        standalone = CHECK_DOCS.check_repository(self.repo)
        self.assertEqual(standalone.issues, [])
        self.assertEqual(standalone.skipped_workspace_links, 1)
        workspace = CHECK_DOCS.check_repository(self.repo, workspace=True)
        self.assert_issue(workspace, "required workspace context is missing")
        self.assert_issue(workspace, "missing local target")

    def test_unregistered_outside_target_fails_even_when_it_exists(self):
        outside = self.workspace / "unregistered.md"
        outside.write_text("# Existing\n", encoding="utf-8")
        self.write("README.md", "[Outside](../unregistered.md)\n")
        result = CHECK_DOCS.check_repository(self.repo)
        self.assert_issue(result, "leaves registered project roots")

    def test_workspace_follows_sibling_markdown_and_verifies_images(self):
        sibling, _ = self.add_workspace()
        self.write("README.md", "[Sibling](../slop-editorial/docs/CONTEXT.md)\n")
        (sibling / "docs/CONTEXT.md").write_text("[More](more.md)\n", encoding="utf-8")
        (sibling / "docs/more.md").write_text("[Missing](no-such-file.md)\n", encoding="utf-8")
        result = CHECK_DOCS.check_repository(self.repo, workspace=True)
        self.assertEqual(result.verified_images, 1)
        self.assert_issue(result, "more.md:1: missing local target")

    def test_altered_image_checksum_fails_even_when_size_matches(self):
        _, image = self.add_workspace(image=b"original")
        image.write_bytes(b"modified")
        result = CHECK_DOCS.check_repository(self.repo, workspace=True)
        self.assert_issue(result, "SHA-256 mismatch for hero.png")
        self.assertFalse(any("byte count mismatch" in issue for issue in result.issues))
        self.assertEqual(result.verified_images, 0)

    def test_altered_image_size_fails(self):
        _, image = self.add_workspace()
        image.write_bytes(b"short")
        result = CHECK_DOCS.check_repository(self.repo, workspace=True)
        self.assert_issue(result, "byte count mismatch for hero.png")

    def test_registry_rejects_duplicate_ids_unsafe_paths_and_checks(self):
        self.projects[1].update(
            id="portfolio",
            path="../outside",
            checks=[{"directory": "../outside", "command": "test"}],
        )
        self.write_registry()
        result = CHECK_DOCS.check_repository(self.repo)
        self.assert_issue(result, "duplicate id")
        self.assert_issue(result, "path must be a safe single directory name")
        self.assert_issue(result, "safe repository-relative directory")

    def test_registry_requires_registered_home_project_and_schema_version(self):
        self.projects = self.projects[1:]
        self.write_registry()
        result = CHECK_DOCS.check_repository(self.repo)
        self.assert_issue(result, "home_project_id must identify a registered project")
        self.write(str(CHECK_DOCS.REGISTRY), '{"schema_version": true, "projects": []}')
        result = CHECK_DOCS.check_repository(self.repo)
        self.assert_issue(result, "expected schema_version 1")

    def test_renamed_standalone_checkout_uses_home_project_id(self):
        renamed = self.workspace / "my-renamed-clone"
        self.repo.rename(renamed)
        self.repo = renamed
        result = CHECK_DOCS.check_repository(self.repo)
        self.assertEqual(result.issues, [])

    def test_renamed_workspace_checkout_checks_home_context_at_actual_root(self):
        self.add_workspace()
        renamed = self.workspace / "my-renamed-clone"
        self.repo.rename(renamed)
        self.repo = renamed
        (self.workspace / "slop-editorial/docs/CONTEXT.md").write_text(
            "# Local context\n", encoding="utf-8"
        )
        result = CHECK_DOCS.check_repository(self.repo, workspace=True)
        self.assertEqual(result.issues, [])
        self.assertEqual(result.verified_images, 1)

    def test_registry_rejects_wrong_value_types_without_crashing(self):
        self.projects[1].update(id=[], path=None, name=0, kind=[], checks=None)
        self.write_registry()
        result = CHECK_DOCS.check_repository(self.repo)
        self.assert_issue(result, "id must be a safe single directory name")
        self.assert_issue(result, "kind must be site, app, or prototype")
        self.assert_issue(result, "checks must be a list")

    def test_link_parser_handles_reference_spaces_parentheses_and_code_examples(self):
        self.write("docs/file (draft).md", "# Draft\n")
        self.write("docs/balanced(name).md", "# Balanced\n")
        self.write(
            "README.md",
            "[Space](<docs/file (draft).md>)\n"
            "[Balanced](docs/balanced(name).md)\n"
            "[Reference][draft]\n"
            '[draft]: docs/file%20%28draft%29.md "Title"\n'
            "[Anchor](#anything)\n"
            "[Remote](https://example.invalid/missing)\n"
            "`[Example](does-not-exist.md)`\n"
            "```markdown\n[Example](also-missing.md)\n```\n",
        )
        result = CHECK_DOCS.check_repository(self.repo)
        self.assertEqual(result.issues, [])
        self.assertEqual(result.local_links, 3)

    def test_symlink_cannot_bypass_project_boundary(self):
        outside = self.workspace / "outside"
        outside.mkdir()
        (outside / "private.md").write_text("# Outside\n", encoding="utf-8")
        (self.repo / "linked").symlink_to(outside, target_is_directory=True)
        self.write("README.md", "[Escaped](linked/private.md)\n")
        result = CHECK_DOCS.check_repository(self.repo)
        self.assert_issue(result, "escapes its registered project through symlinks")

    def test_registered_sibling_symlink_cannot_hide_outside_targets(self):
        outside = self.workspace / "outside"
        outside.mkdir()
        (outside / "private.md").write_text("# Outside\n", encoding="utf-8")
        (self.workspace / "slop-editorial").symlink_to(outside, target_is_directory=True)
        self.write("README.md", "[Escaped](../slop-editorial/private.md)\n")
        result = CHECK_DOCS.check_repository(self.repo)
        self.assert_issue(result, "escapes its registered project through symlinks")
        self.assertEqual(result.skipped_workspace_links, 0)

    def test_sibling_non_markdown_asset_is_not_a_standalone_exception(self):
        self.write("README.md", "![Asset](../slop-editorial/incoming/hero.png)\n")
        result = CHECK_DOCS.check_repository(self.repo)
        self.assertEqual(result.skipped_workspace_links, 0)
        self.assert_issue(result, "only registered sibling Markdown links are optional")

    def test_inventory_rejects_path_traversal(self):
        self.add_workspace()
        inventory = (self.repo / CHECK_DOCS.INVENTORY).read_text(encoding="utf-8")
        self.write(str(CHECK_DOCS.INVENTORY), inventory.replace("hero.png", "../hero.png"))
        result = CHECK_DOCS.check_repository(self.repo, workspace=True)
        self.assert_issue(result, "filename must be a single safe filename")


if __name__ == "__main__":
    unittest.main()
