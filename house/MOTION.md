# House motion

Every animation in the house layer, with its purpose, token and Calm behaviour (DIRECTION 3.5). An animation without a line here is cut. Rooms add their own animations to this file, one line each, until `house/MOTION.md` lists every animation in every repo. The room sections below were taken from each room's `docs/MOTION.md` draft.

All values come from `tokens.css`. `house.css` never writes a curve or a colour. Animated properties are transform (`translate`, `scale`, `rotate`), opacity and clip-path, plus background colour on three small parts.

**Calm** is `data-motion="calm"` on the root. `boot.js` sets it before first paint from `localStorage["house.motion"]`, else from `prefers-reduced-motion`. In Calm every duration token is 160 ms, every spring and ease token is `--h-ease-out`, and every movement amount (`--h-press-scale`, `--h-lift`, `--h-enter-y`, `--h-enter-scale`) is neutral. So each line below becomes a 160 ms opacity or colour change with no movement. Nothing in the house runs longer than 600 ms, and nothing loops.

| Animation | Purpose | Tokens | Calm |
| --- | --- | --- | --- |
| Capsule press | Confirms a press. Scales to 0.97 and back. | `--h-dur-press`, `--h-press-scale`, `--h-ease-out` in, `--h-spring-snappy` out | No scale. Colour change only, 160 ms. |
| Capsule hover | Shows the target is live. Background or opacity. | `--h-dur-quick`, `--h-ease-standard` | 160 ms, same property. |
| Switch thumb and track | Shows the Calm motion state changed. | `--h-dur-quick`, `--h-spring-snappy`, `--h-ease-standard` | The thumb still moves to show state, in 160 ms with no spring. |
| Switch press | Thumb scales to 0.97. | `--h-press-scale` | No scale. |
| Drawer chevron | Shows open or closed. Rotates 180 degrees. | `--h-dur-ui`, `--h-spring-snappy` | 160 ms, no spring. |
| Drawer content | Content fades in on open. No height animation, so layout never shifts mid-animation. | `--h-dur-ui`, `--h-ease-out` | 160 ms fade. |
| Menu popover | Enter and exit of the Menu. Fades and settles 8 px, scale 0.96. | `--h-dur-quick`, `--h-ease-out`, `--h-enter-y`, `--h-enter-scale` | 160 ms fade, no movement. |
| Toast in | One toast at a time. Fades in from 8 px below. | `--h-dur-ui`, `--h-spring-smooth`, `--h-enter-y` | 160 ms fade. |
| Toast out | Fades out after 4 s. | `--h-dur-quick`, `--h-ease-in` | 160 ms fade. |
| Crumb glass | Opaque to glass after 8 px of scroll. Fill colour only. | `--h-dur-quick`, `--h-ease-standard` | 160 ms. |
| Doorway enter | The new page is revealed from the clicked door's rectangle, clip-path only, no text scaled. | `--h-dur-page`, `--h-spring-smooth` | No names, no clip. Root crossfade, 160 ms. |
| Doorway leave | The room clips down into the live door rectangle. | `--h-dur-page`, `--h-spring-smooth` | Root crossfade, 160 ms. |
| Doorway leave, door off screen | The door is less than half visible, so a short fade replaces the clip. | `--h-dur-calm`, `--h-ease-out` | Same. |
| Door poster morph | The door poster and the room's static hero poster are one named element. The old image fades out by 45 percent. | `--h-dur-page`, `--h-spring-smooth`, `--h-ease-in` | Not named. |
| Room to room | Menu navigation between rooms. Root crossfade. | `--h-dur-swap`, `--h-ease-out` | 160 ms. |
| Any other navigation | Default root crossfade. | `--h-dur-quick`, `--h-ease-out` | 160 ms. |
| Crumb crossfade | The crumb stays put while the page changes. | `--h-dur-quick` | Not named. |
| Wordmark | The wordmark never animates. | zero duration | Not named. |

`--h-spring-bouncy` is defined and not used by the house. It is reserved for the two room moments DIRECTION allows: the Paluwagan RECONCILED stamp and the Mindmap agent node landing.

Browsers without cross-document view transitions (Firefox) navigate normally. Browsers without `linear()` get the `cubic-bezier` fallback declared before it in `tokens.css`.

## Room animations

Same rules as above. Each line uses house tokens, and each has a Calm behaviour. A room that adds an animation adds its line here in the same pull request.

### Online Paluwagan (`/paluwagan/`, source `paluwagan/docs/MOTION.md`)

| Animation | Purpose | Tokens | Calm |
| --- | --- | --- | --- |
| RECONCILED stamp | The room's one expressive moment. The stamp lands when the books balance. | `--h-spring-bouncy`, 560 ms | 160 ms opacity fade, no scale or turn. |
| Cycle strike | A line draws through each cycle as it matches. Transform only. | `--h-dur-ui`, `--h-ease-out` | 160 ms fade. |
| Cycle row in | Each checked cycle fades in. | `--h-dur-quick`, `--h-ease-out` | 160 ms fade. |
| Count to zero | The "Left to check" figure counts down between cycles. | requestAnimationFrame, under 260 ms per step | Jumps to the value. |
| Cycle stepping | The check reveals one cycle every 260 ms. | timer | All cycles show at once. |
| Shell crossfade | The static `#room-hero` fades out as React takes over. | `--h-dur-quick`, `--h-ease-out` | 160 ms. |
| Page fade in | A route's content fades in. | `--h-dur-quick`, `--h-ease-out` | 160 ms. |

### Living Mindmap (`/mindmap-mcp/`, source `mindmap-mcp/docs/MOTION.md`)

| Animation | Purpose | Tokens | Calm |
| --- | --- | --- | --- |
| Agent node landing (graph and outline) | The one bouncy moment: an agent node arrives beside its parent. | `--h-dur-page`, `--h-spring-bouncy`, 14 px drop, scale 0.92 | 160 ms opacity fade, no movement. |
| Agent edge | Connection fades in. | `--h-dur-ui`, `--h-ease-out` | 160 ms. |
| Refused node drift | The near-duplicate moves toward its twin and shows its score. | `--h-dur-page`, `--h-spring-smooth` | No drift. The node and the score label fade in. |
| Replay sheet | Bottom sheet on narrow screens. | `--h-dur-page`, `--h-spring-smooth` | 160 ms fade. |

### PaperLab and Slop Editorial

Neither repo has a `docs/MOTION.md` yet. Both have animations in code (PaperLab: `src/attention/room.css`, `src/attention/main.tsx`, `src/legacy/styles.css`. Slop Editorial: `site/src/styles/`, `site/src/scripts/feed.ts`, `authenticity.ts`, `system.ts`, `layouts/Base.astro`). Each room adds its lines here, or this section stays incomplete and DIRECTION 3.5 is not met.
