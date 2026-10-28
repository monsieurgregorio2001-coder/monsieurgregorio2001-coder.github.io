Case study

# PaperLab

Type a sentence and watch it travel through one layer of the Transformer from Attention Is All You Need.

**Proves **AI theory and teaching

[Open the room](https://monsieurgregorio2001-coder.github.io/paperlab/)[Read the case](https://monsieurgregorio2001-coder.github.io/work/paperlab/)[Code](https://github.com/monsieurgregorio2001-coder/paperlab)

- React
- TypeScript
- Attention

## Receipt

### PaperLab

 Live

- **Proves**: AI theory and teaching

- **Problem**: Papers explain attention in equations few people can picture.

- **What I built**: Real attention math on toy weights, running in the browser.

- **Result**: 66 unit tests on the attention math

- **Try this**: Type a sentence, then break the math with a switch.

- **How it is checked**:
- 19 of 19 Unit tests on the attention kernel`npx vitest run src/lib/transformer.test.ts`
- 47 of 47 Designed heads equal the kernel for their stated weights, head 1 puts at least 0.5 on the previous word in every preset, and NumPy agrees at 1e-6`npx vitest run src/lib/designed.test.ts`
- 99 of 99 Kernels for later labs, not shown in this room`npx vitest run src/labs`
- 2 of 2 Tests on the evidence tooling`npx vitest run scripts`

No evals. Nothing here is model output to score.

## What this does not do

- Does not train anything.
- One layer.
- Hand-set heads, not learned ones.

## Problem

 Attention Is All You Need is the paper most AI work now rests on. It explains attention in a few lines of matrix notation. Most people who read it cannot picture what those lines do to a sentence.

 The usual fixes are static diagrams or videos. They show one example someone else picked. You cannot type your own sentence and watch the numbers move.

 I wanted a page where a student, or an interviewer, could do exactly that in a browser tab with nothing to install.

## Approach

 PaperLab runs one real Transformer layer on small seeded weights. It is not a trained model, and the page says so on screen. The math is the paper's math. The weights are toys.

 You type a sentence with a short token cap that the page shows beside the input. Then you step through the stages: tokens, embeddings with positional encoding, attention, and the feed-forward block. Each stage shows the formula, a short plain explanation, a link to the paper section, and the actual matrices.

 The model is sized to fit on screen, with a small model width, a few heads and a small feed-forward layer. Attention gets a heatmap per head, head toggles, a causal mask switch, and click-a-token to see what it attends to.

## Architecture

 All math lives in one module with no DOM or React dependency, so the tests cover it directly. Redrawn from the diagram in the project README.

## Decisions

- **Chose a pure math module over math inside components**because a function with no DOM can be tested against the paper's formulas, and the UI cannot drift from the numbers it shows.

- **Chose seeded toy weights over a trained model**because the page needs no download, no backend and no API key. The same sentence gives the same output every time, so a test can pin it.

- **Chose HTML and Unicode formulas over KaTeX**because a maths renderer would have been the largest thing in the bundle, for a handful of short formulas.

- **Chose a word-level tokenizer over subword BPE**because whole words read clearly in a heatmap row. The page states the simplification next to the tokens.

- **Chose computed text colour over a fixed palette for heatmap cells**because cell values sit on every shade of the ramp, and a fixed colour fails contrast somewhere. `ramp.ts` picks it per cell for both themes.

## Results

- 19 unit tests on the attention math`npm test` runs Vitest tests on the math: softmax rows sum to one, attention shapes, causal masking, positional encoding against the paper formula, layer norm, tokenizer edges and determinism.

- 52.2 KB gzipped JavaScript in the production buildInitial JavaScript from the production build. Self-hosted fonts and the stylesheet come on top.

 Measured by the repository's own CI run, not on the live site.

## Screens

_Image: PaperLab input panel with a typed sentence, preset sentences, the token counter and the four-step stepper._

The input. A sentence goes in, the token counter shows the cap, and the stepper walks the stages.

_Image: Two heatmaps: token embeddings and the sinusoidal positional encoding, one row per token._

Step 2. Embeddings plus the sinusoidal position wave from the paper.

_Image: The feed-forward step with its formulas and the first matrix after attention and layer norm._

Step 4. The feed-forward block, the residual and layer norm, with the formula above the numbers.

## What I'd do next

- Measure Lighthouse and axe in CI against the live Pages URL, not only `vite preview`.

- Add a second layer, so the residual stream can be followed from one block into the next.

- Offer a small subword vocabulary beside the word tokenizer, to show why real models split words.
