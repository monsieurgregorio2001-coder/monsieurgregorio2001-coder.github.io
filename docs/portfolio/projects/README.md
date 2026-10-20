# Project index

[registry.json](registry.json) is the machine-readable source for project IDs, sibling paths, roles, and check entry commands. The home_project_id identifies this hub independently of the folder name used for a standalone clone. Other paths identify sibling folders. Names and paths remain stable during this cleanup. This table is its human overview.

| Project | Workspace folder | Responsibility | Source |
| --- | --- | --- | --- |
| Portfolio hub | `monsieurgregorio2001-coder.github.io/` | Public portfolio and shared project documentation | [Repository](https://github.com/monsieurgregorio2001-coder/monsieurgregorio2001-coder.github.io) |
| Five Rooms prototype | `five-rooms-poc/` | Experimental room designs, not production project code | Local only; not versioned |
| PaperLab | `paperlab/` | Transformer and attention visualizer | [Repository](https://github.com/monsieurgregorio2001-coder/paperlab) |
| Online Paluwagan | `paluwagan/` | Savings group portfolio demo | [Repository](https://github.com/monsieurgregorio2001-coder/paluwagan) |
| Kuru / Living Mindmap | `mindmap-mcp/` | Local graph UI, API, and MCP server | [Repository](https://github.com/monsieurgregorio2001-coder/mindmap-mcp) |
| Slop Editorial | `slop-editorial/` | Editorial site and image generation pipeline | [Repository](https://github.com/monsieurgregorio2001-coder/slop-editorial) |

Every enrolled project has AGENTS.md and docs/CONTEXT.md locally. The [hub context](../../CONTEXT.md) is available in this checkout. For another project, use its workspace folder or source repository. Newly created documentation is local until committed; remote links identify source repositories and do not assert that pending files are already published.

The repository registry is inventory, not a shell runner. Commands are chosen deliberately for the current change and executed within the stated directory. Some checks need app dependencies or a browser; see the project's README. Five Rooms currently has no Git repository. A source path does not prove a deployment exists.

The separate profile-readme repository, _src/, _resume-src/, and _review/ are mapped in the workspace README but are outside this enrolled set. Their existing contents were retained.
