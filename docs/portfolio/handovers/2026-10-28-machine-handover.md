# 2026-10-28: Moving the workspace to another computer

Everything versioned is pushed. This note rebuilds the `portfolio/` workspace on a new machine.

## 1. Clone the repositories

The workspace folder is not a Git repository. Make it, then clone each project into it:

```bash
mkdir -p ~/Development/portfolio && cd ~/Development/portfolio
gh repo clone monsieurgregorio2001-coder/monsieurgregorio2001-coder.github.io
gh repo clone monsieurgregorio2001-coder/paperlab
gh repo clone monsieurgregorio2001-coder/paluwagan
gh repo clone monsieurgregorio2001-coder/mindmap-mcp
gh repo clone monsieurgregorio2001-coder/slop-editorial
gh repo clone monsieurgregorio2001-coder/monsieurgregorio2001-coder profile-readme
gh repo clone monsieurgregorio2001-coder/five-rooms-poc
gh repo clone monsieurgregorio2001-coder/show-your-work-poc
mkdir -p _src && gh repo clone monsieurgregorio2001-coder/vulgar _src/vulgar
```

`profile-readme` is the GitHub profile repository, which is cloned under a different folder name.

## 2. What changed on 2026-10-28

- `slop-editorial/incoming/`: 7 source PNGs (about 22 MB) are now committed.
- `five-rooms-poc` and `show-your-work-poc` are versioned for the first time, as **private** repositories. Five Rooms was previously "local prototype only, not versioned".

## 3. Not in Git: copy by hand

These live only on the old machine. Copy them (AirDrop, drive or a private store) if you need them:

| Path | What it is |
| --- | --- |
| `AGENTS.md`, `DESIGN.md`, `README.md` | Workspace entry points that link into the hub docs |
| `_career/` | Private job-search workspace. Keep it out of any public repository |
| `_resume-src/` | Resume build script and data |
| `_review/` | Review screenshots |
| `_src/SLOP_EDITORIAL_ASSESSMENT.md`, `_src/mindmapmcp/` | Reference material |

Without the three root files, start from this repository's [CURRENT-STATE](../CURRENT-STATE.md).

## 4. Pick up the work

The state is unchanged since the [2026-10-20 portfolio initiative handover](2026-10-20-portfolio-initiative.md). Read [CURRENT-STATE](../CURRENT-STATE.md) and the [Show Your Work direction](../design/DIRECTION.md). Living Mindmap tests need Node 20 or newer.
