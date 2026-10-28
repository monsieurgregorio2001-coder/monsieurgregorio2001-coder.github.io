Applied AI engineer · Cebu, Philippines · Open to remote

# I turn messy operations into working AI systems.

 Four projects. Each one lets you check its claim.

 [LivePaperLabBreak the attention math.66 tests](https://monsieurgregorio2001-coder.github.io/paperlab/)

- [Living MindmapRuns locallyAgents edit through MCP. You review.12 tools](https://monsieurgregorio2001-coder.github.io/work/mindmap/)

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

- **Problem**: Papers explain attention in equations that few people can picture.

- **What I built**: A React and TypeScript app that runs real attention math on toy weights in the browser.

- **Result**: 66 unit tests on the attention math

- **Try this**: Type your own sentence and step through the stages.

- **How it is checked**:
- 19 of 19 Unit tests on the attention kernel`npx vitest run src/lib/transformer.test.ts`
- 47 of 47 Designed heads equal the kernel for their stated weights, head 1 puts at least 0.5 on the previous word in every preset, and NumPy agrees at 1e-6`npx vitest run src/lib/designed.test.ts`
- 99 of 99 Kernels for later labs, not shown in this room`npx vitest run src/labs`
- 2 of 2 Tests on the evidence tooling`npx vitest run scripts`

No evals. Nothing here is model output to score.

 [Open the room](https://monsieurgregorio2001-coder.github.io/paperlab/)[Read the case](https://monsieurgregorio2001-coder.github.io/work/paperlab/)[Code](https://github.com/monsieurgregorio2001-coder/paperlab)

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

 [Run it locally](https://github.com/monsieurgregorio2001-coder/mindmap-mcp#quick-start)[Read the case](https://monsieurgregorio2001-coder.github.io/work/mindmap/)[Code](https://github.com/monsieurgregorio2001-coder/mindmap-mcp)

### Slop Editorial

 Live

- **Proves**: A paid pipeline that asks before it spends

- **Problem**: AI makes images nearly free, so publications drift into content nobody decided to make.

- **What I built**: A Python pipeline that estimates, caps, approves and logs every paid generation, plus the Astro satire site.

- **Result**: 243 of 243 Real-browser checks (Chromium)

- **Try this**: Walk the gallery, then read how the pipeline asks before it spends.

- **How it is checked**:
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

- **Problem**: Paluwagan groups run on chat threads and memory, so late payments and disputes are common.

- **What I built**: An append-only ledger in integer centavos, a seeded payout draw, and reminder templates a person approves.

- **Result**: 12,000 random ledger operations, 0 mismatches

- **Try this**: Record a payment, then reverse it and watch the ledger keep both lines.

- **How it is checked**:
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

## Have a messy problem worth solving?

 I am open to remote roles and conversations about applied AI, so write to me or find me online.

 [Email me](mailto:lim.ggreg@outlook.com)Copy address[LinkedIn](https://www.linkedin.com/in/garfield-lim-8239242a9)[GitHub](https://github.com/monsieurgregorio2001-coder)
