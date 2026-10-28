# House motion

Every animation in the house layer, with its purpose, token and Calm behaviour (DIRECTION 3.5). An animation without a line here is cut. Rooms add their own animations to this file in their pull requests, one line each, until `house/MOTION.md` lists every animation in every repo.

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
