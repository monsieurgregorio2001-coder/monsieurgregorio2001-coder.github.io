Applied AI engineer · Cebu, Philippines · Open to remote

# I build AI tools you can check.

 Four projects. Each one lets you check its claim.

 [LivePaperLabBreak the attention math.66 tests](https://monsieurgregorio2001-coder.github.io/paperlab/)

- [Living MindmapRecorded demoAgents edit through MCP. You review.12 tools](https://monsieurgregorio2001-coder.github.io/mindmap-mcp/)

- [Slop EditorialLiveGeneration is cheap. Spend is capped.243 of 243 passed](https://monsieurgregorio2001-coder.github.io/slop-editorial/)

- [Online PaluwaganLiveTry to cheat the ledger.12,000 operations](https://monsieurgregorio2001-coder.github.io/paluwagan/)

 [Open PaperLab](https://monsieurgregorio2001-coder.github.io/paperlab/)[Email me](mailto:lim.ggreg@outlook.com)Copy address

 [LinkedIn](https://www.linkedin.com/in/garfield-lim-8239242a9)[GitHub](https://github.com/monsieurgregorio2001-coder)

 Every number here comes from a test run or from your own browser. [See the receipts](#work).

 Selected work

## Four projects I built and tested.

### PaperLab

 Live

- **Proves**: AI theory and teaching

- **Problem**: Papers explain attention in equations few people can picture.

- **What I built**: Real attention math on toy weights, running in the browser.

- **Result**: 66 unit tests on the attention math

- **Try this**: Type a sentence, then break the math with a switch.

- **How it is checked**: Show the checks

- 19 of 19 Unit tests on the attention kernel`npx vitest run src/lib/transformer.test.ts`
- 47 of 47 Designed heads equal the kernel for their stated weights, head 1 puts at least 0.5 on the previous word in every preset, and NumPy agrees at 1e-6`npx vitest run src/lib/designed.test.ts`
- 99 of 99 Kernels for later labs, not shown in this room`npx vitest run src/labs`
- 2 of 2 Tests on the evidence tooling`npx vitest run scripts`

No evals. Nothing here is model output to score.

 [Open the room](https://monsieurgregorio2001-coder.github.io/paperlab/)[Read the case](https://monsieurgregorio2001-coder.github.io/work/paperlab/)[Code](https://github.com/monsieurgregorio2001-coder/paperlab)

### Living Mindmap

 Recorded demo

- **Proves**: Agents and MCP

- **Problem**: Ideas from long AI conversations vanish into chat.

- **What I built**: One SQLite store behind a web app, a REST API, and an MCP server.

- **Result**: 12 MCP tools registered by the stdio server

- **Try this**: Replay the agent, then ask the guard about a near-duplicate.

- **How it is checked**: Show the checks

- 42 of 42 Unit tests`npm test`
- 7 of 7 Demo guard scores equal the server findSimilar on every fixture and labelled pair`npx vitest run tests/demo-parity.test.ts`
- 12 of 12 MCP server lists all 12 tools`npm run verify:mcp`
- 46 of 60 Labels drafted by Claude Code. Garfield has not reviewed them yet.`npm run eval:guard`

 [Open the room](https://monsieurgregorio2001-coder.github.io/mindmap-mcp/)[Read the case](https://monsieurgregorio2001-coder.github.io/work/mindmap/)[Code](https://github.com/monsieurgregorio2001-coder/mindmap-mcp)

### Slop Editorial

 Live

- **Proves**: A paid pipeline that asks before it spends

- **Problem**: AI makes images nearly free, so sites fill with content nobody chose.

- **What I built**: A Python pipeline that estimates, caps, approves and logs paid generation.

- **Result**: 243 of 243 Real-browser checks (Chromium)

- **Try this**: Set a run and a cap, then read what the cost check says.

- **How it is checked**: Show the checks

- 40 of 40 Site unit tests`npm test`
- 56 of 56 Pipeline Python tests`python -m unittest discover -s tests -t .`
- 144 of 144 Build gates`npm run check`
- 243 of 243 Real-browser checks (Chromium)`npm run verify`
- 1536 of 1536 Spend cap parity fixtures, Python and TypeScript`npm test`

No evals. Nothing here is model output to score.

 [Open the room](https://monsieurgregorio2001-coder.github.io/slop-editorial/)[Read the case](https://monsieurgregorio2001-coder.github.io/work/slop-editorial/)[Code](https://github.com/monsieurgregorio2001-coder/slop-editorial)

### Online Paluwagan

 Live

- **Proves**: Money logic you can check

- **Problem**: Paluwagan groups run on chat and memory, so disputes are common.

- **What I built**: An append-only ledger in integer centavos and a seeded payout draw.

- **Result**: 12,000 random ledger operations, 0 mismatches

- **Try this**: Check the books, then forge a line and check again.

- **How it is checked**: Show the checks

- 71 of 71 Unit and property tests`npx vitest run`
- 5856 of 5856 Reminder drafts scored on four rules`npm run eval:reminders`

 [Open the room](https://monsieurgregorio2001-coder.github.io/paluwagan/)[Read the case](https://monsieurgregorio2001-coder.github.io/work/paluwagan/)[Code](https://github.com/monsieurgregorio2001-coder/paluwagan)

## How I work

- **Spec first.** I write down what done looks like before I build.

- **Measure everything.** Tests and numbers settle the arguments.

- **Humans approve what matters.** Agents draft and people decide.

 [Read the colophon](https://monsieurgregorio2001-coder.github.io/colophon/) for how this site is built.

 About

## Agents that earn their place in real work.

 I am an Applied AI Engineer in Cebu, Philippines, open to remote work, building LLM agents, RAG systems, MCP servers, and full-stack products.

 I am a Technical Director. I lead a team of developers across several products. Before that I built LLM agents for healthcare: patient intake, scheduling and insurance checks.

 I was the founding engineer of an AI recruitment CRM.

 I earned a BS in Computer Science, magna cum laude, and won the gSIC i-CREATe Gold Prize in 2024.

 Contact

## Work with me

 I am open to remote roles and conversations about applied AI, so write to me or find me online.

 [Email me](mailto:lim.ggreg@outlook.com)Copy address[LinkedIn](https://www.linkedin.com/in/garfield-lim-8239242a9)[GitHub](https://github.com/monsieurgregorio2001-coder)
