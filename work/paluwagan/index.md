Case study

# Online Paluwagan

A demo rotating-savings group with a reconciling ledger, a seeded payout draw, and pre-written reminder templates a person approves before anything is sent.

**Proves **Money logic you can check

[Open the room](https://monsieurgregorio2001-coder.github.io/paluwagan/)[Read the case](https://monsieurgregorio2001-coder.github.io/work/paluwagan/)[Code](https://github.com/monsieurgregorio2001-coder/paluwagan)

- React
- TypeScript
- Ledger

## Receipt

### Online Paluwagan

 Live

- **Proves**: Money logic you can check

- **Problem**: Paluwagan groups run on chat and memory, so disputes are common.

- **What I built**: An append-only ledger in integer centavos and a seeded payout draw.

- **Result**: 12,000 random ledger operations, 0 mismatches

- **Try this**: Check the books, then forge a line and check again.

- **How it is checked**:
- 71 of 71 Unit and property tests`npx vitest run`
- 5856 of 5856 Reminder drafts scored on four rules`npm run eval:reminders`

## What this does not do

- No real money moves. Sends are simulated.
- No real group has used this yet.

## Problem

 A paluwagan is a Filipino savings circle. Members pay a fixed amount each cycle, and one member takes the whole pot, until everyone has been paid once.

 Most groups run on a chat thread and the organiser's memory. When someone pays late or misses a cycle, nobody is sure who is owed what. Disputes follow, and they are about friends and money at once.

 Software for this has to be right about money first. A friendly reminder tool on top of wrong numbers makes the dispute worse.

## Approach

 I built the money rules as pure functions first and the screens second. The UI never does money math. It calls domain functions that the tests cover, and the store saves the result.

 The ledger is append-only. A mistake is fixed with a reversing entry and a reason. When a member misses or underpays, the shortfall is recorded on the entry, the recipient's payout is short by the same amount, and the member owes it as arrears.

 On top of that sit rule-based risk flags with their reasons shown, and pre-written reminder templates in English and Filipino. A person edits and approves each one before it can be sent, and sending is simulated. Everything stays in the browser. It is a portfolio demo, not a financial service.

## Architecture

 No backend and no network call. Redrawn from the diagram in the project README.

## Decisions

- **Chose integer centavos over decimal pesos**because floats round. Text like `1,000.50` is parsed with string and integer math, and no float enters the domain.

- **Chose an append-only ledger with reversals over editable entries**because an edit erases what happened. A reversal keeps it, needs a reason, and cannot itself be reversed or applied twice.

- **Chose short payouts and arrears over covering the gap**because the pot can only pay what it holds. The shortfall lands on the member who caused it, and arrears can never go negative.

- **Chose one invariant checked everywhere over many special cases**because net contributions must equal net payouts plus the pot, and the pot never goes negative. The property test checks that after every step.

- **Chose human approval over automatic reminders**because a reminder about money between friends needs judgment. A draft cannot be sent until a person approves it, and cannot be edited after.

## Results

- 12,000 random ledger operations, 0 mismatchesThe ledger property test runs random operations across contributions, payouts, arrears payments and reversals. After every step it checks reconciliation, a non-negative pot, non-negative arrears and append-only behaviour.

- 56 of 56 Unit and property testsVitest over the ledger, the seeded payout draw, risk levels, reminder templates, seed data and currency formatting.

 Measured by the repository's own CI run.

## Screens

_Image: Contributions by cycle for one cycle: members paid on time, paid late, or not recorded, with Record buttons._

Contributions for one cycle. Late and missing payments are visible at a glance.

_Image: The append-only ledger table with entry numbers, types, members, signed amounts and Reverse buttons._

The ledger. Entries are never edited. A mistake gets a reversing entry instead.

_Image: Risk cards for two members marked High risk, with reasons and an arrears-owed panel._

Risk flags with their reasons, and the arrears a short payout created.

## What I'd do next

- Export a group's ledger as a CSV the organiser can share, so the record outlives the browser.

- Try model-written reminder drafts beside the pre-written templates, behind the same approval step, and compare them.

- Test the money rules with a few real organisers before adding any feature that touches real money.
