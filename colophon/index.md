Colophon

# How this site is made

 Every colour, curve and size below is read from the house tokens when the site is built, so this page cannot disagree with the code.

## Colour

 Contrast is measured against the page background in each theme.

 Token | Light | Dark |

`--h-bg` | `#FAF8F4` 1.0:1 | `#0F0F12` 1.0:1 |

`--h-surface` | `#FFFFFF` 1.1:1 | `#17171C` 1.1:1 |

`--h-surface-2` | `#F2EFE9` 1.1:1 | `#1F1F25` 1.2:1 |

`--h-ink` | `#17171B` 16.9:1 | `#ECEAE5` 15.9:1 |

`--h-ink-2` | `#5F5F6B` 5.9:1 | `#A3A1AA` 7.5:1 |

`--h-ink-3` | `#8C8B94` 3.2:1 | `#6C6B74` 3.6:1 |

`--h-rule` | `#E6E2DA` 1.2:1 | `#2A2A31` 1.3:1 |

`--h-accent` | `#2340B8` 7.9:1 | `#9DB0FF` 9.2:1 |

`--h-positive` | `#1E7A4F` 5.0:1 | `#6FD3A0` 10.5:1 |

`--h-warning` | `#9A6200` 4.8:1 | `#F2C46B` 11.7:1 |

`--h-negative` | `#B42318` 6.2:1 | `#FF8A80` 8.4:1 |

## Type

 `--h-t-display` | `560 clamp(40px, 24px + 4.4vw, 88px) / 1.02 display` |

`--h-t-title` | `560 clamp(30px, 22px + 2vw, 52px) / 1.06 display` |

`--h-t-heading` | `600 17px / 22px sans` |

`--h-t-lede` | `400 clamp(17px, 15.5px + 0.5vw, 22px) / 1.4 sans` |

`--h-t-body` | `400 16px / 25px sans` |

`--h-t-callout` | `500 15px / 21px sans` |

`--h-t-label` | `600 14px / 20px sans` |

`--h-t-caption` | `400 13px / 18px sans` |

`--h-t-figure` | `500 15px / 21px mono` |

`--h-t-wordmark` | `600 19px / 1 display` |

## Space, shape and time

 `--h-sp-1` | `4px` |

`--h-sp-2` | `8px` |

`--h-sp-3` | `12px` |

`--h-sp-4` | `16px` |

`--h-sp-5` | `24px` |

`--h-sp-6` | `32px` |

`--h-sp-7` | `48px` |

`--h-sp-8` | `64px` |

`--h-sp-9` | `96px` |

`--h-sp-10` | `128px` |

`--h-r-xs` | `8px` |

`--h-r-sm` | `12px` |

`--h-r-md` | `18px` |

`--h-r-lg` | `28px` |

`--h-r-pill` | `999px` |

`--h-dur-press` | `120ms` |

`--h-dur-quick` | `200ms` |

`--h-dur-swap` | `240ms` |

`--h-dur-ui` | `320ms` |

`--h-dur-page` | `600ms` |

`--h-dur-calm` | `160ms` |

## Springs

 Each easing is sampled from a damped spring. The dashed line is the end value.

 `--h-spring-smooth`, 590 ms, 17 points

`--h-spring-snappy`, 430 ms, 17 points

`--h-spring-bouncy`, 560 ms, 17 points

## Fonts

 All fonts are self-hosted and served from the same origin.

 Family | Use | Size | Licence |

Fraunces | wordmark, H1, section titles | 65.7 KB | [SIL Open Font License 1.1](https://monsieurgregorio2001-coder.github.io/house/2.0.1/fonts/LICENSE-Fraunces.txt) |

Inter | UI, body, money | 47.1 KB | [SIL Open Font License 1.1](https://monsieurgregorio2001-coder.github.io/house/2.0.1/fonts/LICENSE-Inter.txt) |

JetBrains Mono 400 | the glyph field, after the first paint | 20.7 KB | [SIL Open Font License 1.1](https://monsieurgregorio2001-coder.github.io/house/2.0.1/fonts/LICENSE-JetBrainsMono.txt) |

JetBrains Mono 500 | figures and code | 21.3 KB | [SIL Open Font License 1.1](https://monsieurgregorio2001-coder.github.io/house/2.0.1/fonts/LICENSE-JetBrainsMono.txt) |

## Stack

 Hub | Static HTML, CSS and vanilla JavaScript. Node only for the build and checks. |

PaperLab | React, TypeScript, Vite. |

Online Paluwagan | React, TypeScript, Vite. |

Living Mindmap | TypeScript, SQLite, a stdio MCP server, Vite for the browser demo. |

Slop Editorial | Astro, with a Python pipeline behind it. |

## Browsers

 Feature | Chrome and Edge | Safari | Firefox | Fallback |

Cross-document view transitions | yes | yes | no | Normal navigation |

Same-document view transitions | yes | yes | yes | Instant swap |

linear() easing, popover, anchor positioning | yes | yes | yes | Cubic curves, fixed position |

Scroll-driven animations | yes | yes | behind a setting | End state |

Speculation rules | yes | off by default | no | Normal fetch |

## Budgets

 Budget | Limit | Last run |

JavaScript before interaction | 20.0 KB | 9.9 KB |

CSS | 14.0 KB | 10.4 KB |

Fonts | 160.0 KB | 154.8 KB |

First load at 390 px | 300.0 KB | 221.7 KB |

Measured on 2026-10-28 at commit 8938fa6, at 390 px, gzipped.

## How AI is used

 Built with AI-assisted development in Claude Code and Cursor. Garfield sets the brief and accepts or rejects each decision. Decisions still waiting for review are marked.

 No analytics. No requests to any other server.
