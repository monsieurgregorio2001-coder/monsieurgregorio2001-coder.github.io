Case study

# Living Mindmap

A mind map I edit by hand and AI agents extend through MCP tools. It refuses near-duplicates and marks every node an agent adds.

**Proves **Agents and MCP

[Run it locally](https://github.com/monsieurgregorio2001-coder/mindmap-mcp#quick-start)[Read the case](https://monsieurgregorio2001-coder.github.io/work/mindmap/)[Code](https://github.com/monsieurgregorio2001-coder/mindmap-mcp)

- MCP
- TypeScript
- SQLite

## Receipt

### Living Mindmap

 Runs locally

- **Proves**: Agents and MCP

- **Problem**: Ideas from long AI conversations vanish into chat history.

- **What I built**: One SQLite store shared by a web app, a REST API, and a stdio MCP server that refuses near-duplicates.

- **Result**: 12 MCP tools registered by the stdio server

- **Try this**: Clone it, run it locally, and point an agent at the MCP server.

- **How it is checked**:
- 42 of 42 Unit tests`npm test`
- 7 of 7 Demo guard scores equal the server findSimilar on every fixture and labelled pair`npx vitest run tests/demo-parity.test.ts`
- 12 of 12 MCP server lists all 12 tools`npm run verify:mcp`
- 46 of 60 Labels drafted by Claude Code. Garfield has not reviewed them yet.`npm run eval:guard`

## What this does not do

- The guard compares words, not meaning.
- No model runs in the browser.
- The agent session is a recording, and the agent's moves were scripted.
- The guard eval labels were drafted by Claude Code and have not been reviewed by Garfield.

## Problem

 A long conversation with an AI model produces good ideas. Then the chat scrolls away and the ideas go with it. Copying them into notes by hand is slow, so most people do not.

 Letting an agent write straight into a notes tool has its own problems. It adds the same concept twice under slightly different names. Later nobody can tell which notes a person wrote and which an agent wrote.

 I wanted one map that I can edit by hand and an agent can extend, without either one making a mess of the other.

## Approach

 Living Mindmap is a local app. A React Flow canvas shows the graph. An Express API serves it on loopback only. A separate stdio MCP server gives agents a set of MCP tools over the same data: list and read maps, search, create and update nodes, connect them, attach sources, and export a branch as context.

 Both processes open the same SQLite file. The UI polls, so a node an agent adds shows up in an open browser tab a few seconds later.

 Two rules keep agent writes honest. `create_node` rejects near-duplicate titles and returns the candidates, unless the agent passes `allow_duplicate: true`. Every node written through MCP carries `provenance: ai`, and the canvas marks it.

## Architecture

 Two processes, one store, one file. Redrawn from the diagram in the project README.

## Decisions

- **Chose one shared SQLite store over separate data for the UI and the agent**because two copies drift. With one Store class, the duplicate check and provenance apply to every write, whichever door it came through.

- **Chose rejecting near-duplicates over merging them silently**because the agent gets the candidates back and can decide. An explicit `allow_duplicate` flag covers the cases where two nodes really should share a name.

- **Chose provenance on every MCP write over trusting the agent to label itself**because the server sets `provenance: ai`, not the client. A person can see what they did not write.

- **Chose structured errors over exceptions**because an agent can read `{ error, code, details }` and retry sensibly. A crashed stdio server just ends the session.

- **Chose local-first with no accounts over a hosted demo**because the data is personal notes. The cost is that reviewers have to run it, so the README starts with a short quick start.

## Results

- 12 MCP tools registered by the stdio server`npm run verify:mcp` starts the server with a real MCP client and lists the tools.

- 42 of 42 Unit tests`npm test` covers the store, graph layout, context export, REST API, seed data, and the MCP tool handlers through an in-memory MCP client.

- 1.3 ms median round trip over 160 stdio tool calls`scripts/bench.ts` starts the real stdio server and runs a scripted task: list, create nodes, read the map back.

 Benchmark numbers vary by machine. `npm run bench` reproduces them.

## Screens

_Image: The sample map on the canvas: Transformers at the root with branches for attention, position, architecture and training._

The bundled sample map laid out as a tree. Every node is a row in one SQLite file.

_Image: The inspector open on the Self-Attention node with status, summary and notes fields._

The inspector. People edit here and agents edit the same record through MCP.

_Image: The search box with results for attention, each showing a title and a summary snippet._

Search across maps. The MCP tool search_nodes runs the same query.

## What I'd do next

- Push changes to the UI instead of polling, so agent edits appear at once.

- Add an undo for a whole agent session, built on the provenance marks that already exist.

- Record a short screen capture of an agent extending a map, since there is no hosted demo.
