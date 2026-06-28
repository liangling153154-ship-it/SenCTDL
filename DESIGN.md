# Design

## Color

### Strategy

Full palette — 3-4 named color roles, each used deliberately. The brand carries warmth through its primary amber/honey and teal accent, NOT through the background surface.

### Mood

Bạn đồng hành số — vừa thông minh vừa ấm áp, như mở app lên là mọi thứ đã sẵn sàng cho chuyến đi.

### Palette

```css
:root {
  /* ── Primary: deep amber/honey — warmth, trust, highland earth ── */
  --primary:        oklch(0.540 0.130 55.0);
  --primary-hover:  oklch(0.480 0.140 55.0);
  --primary-soft:   oklch(0.920 0.040 55.0);   /* light tint for badges/bg */
  --on-primary:     oklch(1.000 0.000 0);       /* white text on primary fills */

  /* ── Accent: highland teal — freshness, travel, adventure ── */
  --accent:         oklch(0.520 0.110 185.0);
  --accent-hover:   oklch(0.460 0.120 185.0);
  --accent-soft:    oklch(0.930 0.035 185.0);   /* light tint */
  --on-accent:      oklch(1.000 0.000 0);

  /* ── Background: pure white — clean, modern, lets brand colors work ── */
  --bg:             oklch(1.000 0.000 0);
  --surface:        oklch(0.975 0.003 55.0);    /* cards, panels — barely warm */
  --surface-raised: oklch(0.960 0.005 55.0);    /* elevated cards */

  /* ── Ink: warm near-black — readable, not harsh ── */
  --ink:            oklch(0.200 0.015 55.0);    /* body text — ≥7:1 on white */
  --muted:          oklch(0.480 0.010 55.0);    /* secondary text — ≥3.5:1 on white */
  --faint:          oklch(0.700 0.008 55.0);    /* placeholder, disabled */

  /* ── Semantic ── */
  --success:        oklch(0.550 0.140 145.0);   /* green */
  --warning:        oklch(0.700 0.160 80.0);    /* gold */
  --error:          oklch(0.530 0.180 25.0);    /* red-orange */

  /* ── Borders & shadows ── */
  --line:           oklch(0.880 0.005 55.0);
  --line-strong:    oklch(0.780 0.008 55.0);
  --shadow-sm:      0 2px 8px oklch(0.200 0.015 55.0 / 0.06);
  --shadow:         0 4px 16px oklch(0.200 0.015 55.0 / 0.08),
                    0 12px 32px oklch(0.200 0.015 55.0 / 0.06);
  --shadow-lg:      0 8px 24px oklch(0.200 0.015 55.0 / 0.10),
                    0 24px 48px oklch(0.200 0.015 55.0 / 0.08);
}
```

### Dark sections

For dark anchor sections (hero overlay, footer, immersive timeline):
- Background: `oklch(0.160 0.020 55.0)` — warm near-black
- Text: `oklch(0.940 0.005 55.0)` — warm off-white
- Muted text: `oklch(0.650 0.010 55.0)`

## Typography

### Font pairing

- **Display & Headings**: [Satoshi](https://api.fontsource.org/v1/fonts/satoshi) — humanist sans-serif, geometric warmth without being cold. Confident but approachable.
- **Body**: Satoshi — same family, lighter weights (400/500) for body. Consistency without needing a second family.
- **Accent / Captions**: [Source Serif 4](https://fonts.google.com/specimen/Source+Serif+4) — for pull quotes, timeline annotations, editorial moments. Provides contrast axis (sans + serif) when the design needs texture.

### Scale

Modular scale, ratio 1.333 (perfect fourth), fluid clamp:

```css
:root {
  --text-xs:    clamp(0.72rem, 0.68rem + 0.2vw, 0.80rem);
  --text-sm:    clamp(0.84rem, 0.80rem + 0.2vw, 0.90rem);
  --text-base:  clamp(0.95rem, 0.90rem + 0.25vw, 1.05rem);
  --text-lg:    clamp(1.12rem, 1.04rem + 0.4vw, 1.30rem);
  --text-xl:    clamp(1.40rem, 1.25rem + 0.75vw, 1.80rem);
  --text-2xl:   clamp(1.75rem, 1.50rem + 1.25vw, 2.50rem);
  --text-3xl:   clamp(2.20rem, 1.80rem + 2.0vw, 3.40rem);
  --text-hero:  clamp(2.80rem, 2.20rem + 3.0vw, 5.20rem);
}
```

### Rules

- Headings: weight 700-800, `letter-spacing: -0.02em`, `text-wrap: balance`
- Body: weight 400, `line-height: 1.65`, `max-width: 68ch`, `text-wrap: pretty`
- Body on dark: `line-height: 1.75` (slightly more air)
- Display letter-spacing floor: `-0.03em` (never tighter)

## Layout

### Spacing scale

```css
:root {
  --space-xs:   clamp(0.25rem, 0.2rem + 0.25vw, 0.50rem);
  --space-sm:   clamp(0.50rem, 0.4rem + 0.5vw, 0.75rem);
  --space-md:   clamp(1.00rem, 0.8rem + 1.0vw, 1.50rem);
  --space-lg:   clamp(1.50rem, 1.2rem + 1.5vw, 2.50rem);
  --space-xl:   clamp(2.50rem, 2.0rem + 2.5vw, 4.00rem);
  --space-2xl:  clamp(4.00rem, 3.0rem + 5.0vw, 7.00rem);
  --space-hero: clamp(6.00rem, 4.0rem + 10.0vw, 12.00rem);
}
```

### Grid

- Max content width: `1200px`
- Responsive grid: `repeat(auto-fit, minmax(300px, 1fr))`
- Section padding: `--space-2xl` vertical
- Cards: `border-radius: 12px`, max `16px`

### Z-index scale

```css
:root {
  --z-base:     1;
  --z-raised:   10;
  --z-dropdown: 50;
  --z-sticky:   100;
  --z-overlay:  200;
  --z-modal:    300;
  --z-toast:    400;
  --z-tooltip:  500;
}
```

## Motion

### Energy level: High

Rich motion — parallax, timeline choreography, page-load animation. This is a brand surface selling a travel experience; motion IS part of the product.

### Easing

```css
:root {
  --ease-out:    cubic-bezier(0.16, 1, 0.3, 1);     /* expo out */
  --ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);    /* smooth in-out */
  --ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1); /* slight overshoot — use sparingly */
}
```

### Patterns

- **Page load**: Orchestrated reveal — hero image scales in, headline slides up with blur-to-clear, trust bar fades in.
- **Scroll reveals**: Staggered per section, each fitted to what it reveals. Timeline items use a different entrance than cards.
- **Timeline**: Progressive reveal as user scrolls. Each time-slot animates in sequence.
- **Parallax**: Subtle, max 10-15% movement. Images shift slower than text.
- **Hover**: Cards lift (`translateY(-4px)`) with shadow growth. Buttons scale subtly.
- **Reduced motion**: All entrance animations become instant opacity crossfade. Parallax disabled. Hover effects preserved but without transform.

### Rules

- Every animation has a `@media (prefers-reduced-motion: reduce)` fallback
- No bounce, no elastic easing
- Content must be visible by default — animation enhances, never gates visibility
- Blur, clip-path, mask as premium motion materials where they add value

## Components

### Buttons

- **Primary**: `--primary` bg, white text, pill radius (`999px`), `min-height: 48px`
- **Secondary**: transparent bg, `--primary` border + text
- **Ghost**: transparent bg, `--ink` text, no border
- All buttons: `min-width: 44px`, `min-height: 44px` (tap target), `font-weight: 600`

### Cards

- `border-radius: 12px`
- `border: 1px solid var(--line)`
- `box-shadow: var(--shadow-sm)`
- Hover: `translateY(-4px)`, `box-shadow: var(--shadow)`
- No nested cards. Ever.
- Image-first when showing places/activities

### Timeline (core component)

The timeline IS the product. This is the most important visual element.

- Vertical on mobile, can expand to horizontal on desktop for hero moments
- Time markers: `--primary` color, `font-weight: 700`
- Activity blocks: image + title + description + duration
- Connecting line: subtle `--line` color, animated on scroll
- Each slot reveals on scroll with stagger

### Trust signals

- Inline with content, not a separate "badges" section
- Real numbers ("200+ chuyến đi", "4.8/5 trên Google")
- Warm tone, not corporate

## Imagery

### Direction

- Local Cao Bang photography: waterfalls, limestone mountains, highland roads, local food, homestays
- Authentic, not stock — even placeholders should feel real
- Full-bleed hero images with text overlay
- Activity images at 3:2 or 16:9 ratio
- Alt text in Vietnamese, descriptive ("Thác Bản Giốc nhìn từ chân thác, buổi sáng sớm")

### Treatment

- Slight warm color grade to unify different photos
- Subtle rounded corners on inline images (8px)
- Hero images: full-bleed, gradient overlay for text readability

## Accessibility

- WCAG AA minimum
- Body text contrast: ≥ 7:1 (target)
- Large text contrast: ≥ 3:1
- Interactive targets: ≥ 44×44px
- Visible keyboard focus: `3px solid var(--accent)`, `offset: 3px`
- `prefers-reduced-motion` honored everywhere
- Vietnamese is primary language — font must render Vietnamese diacritics beautifully
- Mobile-first: most users browse on phone

## Anti-patterns (project-specific)

- No glassmorphism
- No gradient text
- No hero-metric template (big number + small label)
- No identical card grids
- No eyebrow labels on every section
- No cream/sand/beige body background — pure white
- No cold OTA grid layouts
- No brochure-heavy tour company aesthetic
