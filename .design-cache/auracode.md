# AuraCode — Design System (design-drift lock)

Custom brand lock for the auracode.hu landing page. The drift scanner reads every
hex value, font family and border radius in this file as the allowed set.

Concept: "Kód + aura". Structure is drawn with 1px hairlines and engineered,
expanded type (the code). Light appears only where something happens or is
promised: CTAs, active states, outcomes (the aura). 60–30–10 split.

## Colors

### Dominant 60%
| Token | HEX | Usage |
|-------|-----|-------|
| `ink` | #0A0F1D | Page background (Deep Midnight Slate) |
| `ink-raised` | #0E1527 | Alternate bands, input wells |
| `surface` | #141C30 | Cards, panels, section surfaces |
| `surface-hi` | #1A2440 | Hovered / elevated surfaces |
| `line` | #1E293B | Hairline borders, used at 70% alpha |
| `line-strong` | #2A3650 | Hover borders, dividers on surfaces |

### Neutral typography 30%
| Token | HEX | Usage |
|-------|-----|-------|
| `text-hi` | #F8FAFC | Headlines, primary text |
| `text-mid` | #CBD5E1 | Emphasised body copy |
| `text-lo` | #94A3B8 | Body and muted text |
| `text-faint` | #64748B | Decorative numerals only, never body text |

### Secondary & accent 10%
| Token | HEX | Usage |
|-------|-----|-------|
| `volt` | #00FF85 | Brand + primary CTA, guarantees, active states |
| `ion` | #00E5FF | Badges, secondary glow, taglines, focus ring |
| `danger` | #FF5C7A | Form validation errors |

Gradient accent: linear-gradient(100deg, #00FF85, #00E5FF) for glowing borders,
ambient blurs and at most one headline accent per heading.

- MUST use #00FF85 for primary CTAs with #0A0F1D label text
- MUST keep text contrast at or above 4.5:1 (body #94A3B8 on #0A0F1D is 7.4:1)
- NEVER use pure black #000000; the darkest tone is #0A0F1D
- NEVER fill large areas with neon; volt and ion stay within the 10% budget
- NEVER set body text in #64748B

## Typography

- MUST use `Mona Sans` as primary font family
- font-family: 'Mona Sans' — display at font-stretch 112–118%, body at 100%
- font-family: 'Martian Mono' — only for chapter markers ("01 // Szemléletünk") and code fragments
- MUST write chapter markers in the code-comment format "NN // Név", sentence case
- NEVER use all-caps eyebrow labels above headings
- NEVER accent more than one phrase per headline
- SHOULD use tabular-nums for counters and metrics
- SHOULD use text-wrap: balance on headings, pretty on paragraphs

Type scale (px): 13, 14, 16, 18, 21, 24, 36, 48, 64, 88.

## Shape

border-radius scale: 6px, 10px, 14px, 20px, 28px (pills use var(--r-pill))

Radius follows hierarchy: controls 10px, small cards 14px, cards 20px, panels 28px.

## Spacing

MUST use 4px grid for spacing.

## Motion

- MUST use cubic-bezier(0.23, 1, 0.32, 1) for entrances and UI transitions
- MUST respect prefers-reduced-motion with a gentler variant
- MUST gate hover motion behind (hover: hover) and (pointer: fine)
- NEVER use transition: all
- NEVER use ease-in on UI elements
- NEVER animate width, height, top or left (accordion height excepted)
- NEVER use emoji as icons

## Focus

- MUST show a visible focus ring: 2px #00E5FF outline, 2px offset
