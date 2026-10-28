Case study

# Slop Editorial

A satire of AI content sites, with fake metrics and fake upsells. Behind it is a real image pipeline that will not spend money without approval.

**Proves **A paid pipeline that asks before it spends

[Open the room](https://monsieurgregorio2001-coder.github.io/slop-editorial/)[Read the case](https://monsieurgregorio2001-coder.github.io/work/slop-editorial/)[Code](https://github.com/monsieurgregorio2001-coder/slop-editorial)

- Astro
- Python
- Human-in-the-loop

## Receipt

### Slop Editorial

 Live

- **Proves**: A paid pipeline that asks before it spends

- **Problem**: AI makes images nearly free, so publications drift into content nobody decided to make.

- **What I built**: A Python pipeline that estimates, caps, approves and logs every paid generation, plus the Astro satire site.

- **Result**: 143 of 143 Real-browser checks (Chromium)

- **Try this**: Walk the gallery, then read how the pipeline asks before it spends.

- **How it is checked**:
- 21 of 21 Site unit tests`npm test`
- 49 of 49 Pipeline Python tests`python -m unittest discover -s tests -t .`
- 146 of 146 Build gates`npm run check`
- 143 of 143 Real-browser checks (Chromium)`npm run verify`

No evals. Nothing here is model output to score.

## What this does not do

- Paid providers were tested against fakes only.
- The current nine plates have no generation record.

## Problem

 Image models made pictures nearly free. Feeds fill with work nobody decided to make. Hands get six fingers, signs say Sunseet, and every comment says Amazing.

 The hard part is not generating images. It is deciding which ones deserve to exist, and keeping a paid pipeline from spending money nobody approved.

 I wanted to make that point with a publication that is funny on the surface and strict underneath. The thesis fits in one line: generation is cheap, taste is not.

## Approach

 The project has two halves. The site is an Astro build that hangs the generated works like a gallery and labels them like the platforms it mocks: a cookie sheet with two Accept buttons, ratings that never move, a taste update that installs with no visible difference, a gift shop in front of a Three.js certificate.

 The pipeline is a Python tool called `slopgen`. It plans jobs from Markdown prompts and a YAML plan, prints a cost estimate, refuses paid runs without an approval, and logs every request. It runs offline by default against a free mock provider.

 The same rule runs through both halves. Automation proposes, a named person decides, and the decision is written down. The site's approval queue makes the joke out loud: its Approve button refuses, because approval happens with a human, not a button.

## Architecture

 The two gates are the point: one stops unapproved spend, one stops a build that breaks the house voice or budget. The dashed line is a changed selection marking downstream jobs stale. Redrawn from the diagram in the project README.

## Decisions

- **Chose content-addressed fingerprints over job names**because a hash of provider, model, final prompt, seed, size and reference-image bytes means an unchanged job is never paid for twice.

- **Chose three required flags over a confirm prompt**because a paid run needs `--yes`, an `--approval-ref` and an estimate under `--max-usd`. The ledger keeps the reference, so anyone can later answer who allowed the spend.

- **Chose never retrying a POST over retrying on timeout**because a retry can pay twice. The request id is saved the moment it exists, and an unclear outcome stays `uncertain` until a person confirms.

- **Chose build gates over a style guide**because a guide gets ignored. The build fails on external requests, em dashes, contractions, long sentences, broken links, leaks and blown budgets.

- **Chose tiered 3D over one renderer**because phones and data saver should not load a WebGL scene. WebGPU falls back to WebGL, then to a still poster.

## Results

- 21 of 21 Site unit testsNode tests for the gate logic, helpers and service worker.

- 49 of 49 Pipeline Python testsPython tests for the pipeline. One asserts that no key or personal path reaches a run directory.

- 146 of 146 Build gates`npm run check` over the built site: brand, voice, links, leaks and budgets.

- 143 of 143 Real-browser checks (Chromium)`npm run verify` drives headless Chrome through Playwright, with axe in light and dark.

- 80.2 KB shared JavaScript, gzippedShared JavaScript. A larger 3D chunk loads only on the certificate page.

 A snapshot from one run. The fal and Replicate adapters are tested against scripted fakes only, not the live services.

## Screens

_Image: The release tracker headed with a percentage approved, with sample releases and their states._

The release tracker. Each sample release carries an estimate, a cap and an approval reference.

_Image: A printed gift-shop receipt itemizing appreciation, a prompt pack and an extra finger._

The gift shop receipt on the certificate page. The joke works because the arithmetic does.

_Image: The Works exhibition page with the first framed generated pictures and their plate numbers._

The exhibition. The works hung in order, each labelled like the platforms it mocks.

## What I'd do next

- Run one small, approved job against a live provider, so the adapters are tested beyond fakes.

- Measure mobile performance on the 3D page in CI, starting with the lazy chunk.

- Run the WebGPU tier on real hardware. Today only WebGL, the poster tier and the fallbacks are verified.
