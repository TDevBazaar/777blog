---
name: Sacred Minimalist
colors:
  surface: '#fcf9f8'
  surface-dim: '#dcd9d9'
  surface-bright: '#fcf9f8'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f6f3f2'
  surface-container: '#f0eded'
  surface-container-high: '#eae7e7'
  surface-container-highest: '#e4e2e1'
  on-surface: '#1b1c1c'
  on-surface-variant: '#44474e'
  inverse-surface: '#303030'
  inverse-on-surface: '#f3f0f0'
  outline: '#74777f'
  outline-variant: '#c4c6cf'
  surface-tint: '#485f84'
  primary: '#001c3c'
  on-primary: '#ffffff'
  primary-container: '#183153'
  on-primary-container: '#8299c1'
  inverse-primary: '#b0c8f1'
  secondary: '#735c00'
  on-secondary: '#ffffff'
  secondary-container: '#fed65b'
  on-secondary-container: '#745c00'
  tertiary: '#001b41'
  on-tertiary: '#ffffff'
  tertiary-container: '#002f68'
  on-tertiary-container: '#5b97ff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d5e3ff'
  primary-fixed-dim: '#b0c8f1'
  on-primary-fixed: '#001b3c'
  on-primary-fixed-variant: '#30476b'
  secondary-fixed: '#ffe088'
  secondary-fixed-dim: '#e9c349'
  on-secondary-fixed: '#241a00'
  on-secondary-fixed-variant: '#574500'
  tertiary-fixed: '#d7e2ff'
  tertiary-fixed-dim: '#acc7ff'
  on-tertiary-fixed: '#001a40'
  on-tertiary-fixed-variant: '#004492'
  background: '#fcf9f8'
  on-background: '#1b1c1c'
  surface-variant: '#e4e2e1'
typography:
  display-lg:
    fontFamily: Playfair Display
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Playfair Display
    fontSize: 36px
    fontWeight: '700'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Playfair Display
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.3'
  verse-text:
    fontFamily: Playfair Display
    fontSize: 24px
    fontWeight: '400'
    lineHeight: '1.6'
  body-lg:
    fontFamily: Geist
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.7'
  body-md:
    fontFamily: Geist
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-md:
    fontFamily: Geist
    fontSize: 14px
    fontWeight: '500'
    lineHeight: '1.4'
    letterSpacing: 0.05em
  caption:
    fontFamily: Geist
    fontSize: 12px
    fontWeight: '400'
    lineHeight: '1.4'
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 1120px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 40px
  stack-sm: 8px
  stack-md: 24px
  stack-lg: 48px
---

## Brand & Style

The design system is built on the principles of reverence, clarity, and focus. It targets a modern audience seeking a distraction-free environment for spiritual reflection. The aesthetic is "Elevated Minimalist," drawing inspiration from the structural precision of Apple, the functional purity of Notion, and the editorial elegance of Medium.

The UI should evoke a sense of calm and inspiration. High-contrast typography paired with generous whitespace creates a rhythmic reading experience. The style avoids visual noise, using subtle depth and a refined palette to guide the user’s journey through scripture and devotionals.

## Colors

The palette is rooted in tradition but executed with modern sensibilities. 
- **Primary (Deep Navy):** Used for core branding, primary actions, and high-level navigation to provide a sense of authority and depth.
- **Secondary (Soft Gold):** Used sparingly for highlights, devotional markers, and premium accents to evoke a sense of the sacred.
- **Accent (Sky Blue):** Employed for interactive states, links, and secondary call-to-actions.
- **Background & Surface:** The Warm White background reduces eye strain during long reading sessions, while Pure White surfaces create a clear distinction for cards and interactive containers.

## Typography

The typographic system utilizes a "High-Low" pairing. 
- **Playfair Display** (Serif) is reserved for headers and scripture verses, grounding the experience in a literary, timeless feel. 
- **Geist** (Sans-Serif) handles all UI elements, body copy, and metadata, providing a technical, clean contrast that ensures legibility and a modern feel. 

Body text should maintain a generous line height (1.6x - 1.7x) to emulate the comfortable reading experience of premium editorial platforms.

## Layout & Spacing

The layout follows a centered, fixed-grid philosophy for reading content to maximize focus, while administrative and dashboard views utilize a wider fluid grid. 

- **Reading View:** A narrow column (approx. 720px) centered within the 1120px container to ensure optimal line length for scripture and devotionals.
- **Margins:** Desktop views should maintain 40px outer margins to feel expansive. Mobile views shift to 16px to maximize screen real estate.
- **Rhythm:** Use an 8px base unit. Vertical stack spacing should be aggressive (48px+) between major sections to emphasize the minimalist aesthetic.

## Elevation & Depth

This design system utilizes **Ambient Shadows** and **Tonal Layers** to create a sophisticated sense of depth without clutter.

1.  **Level 0 (Background):** Warm White (#FAFAF8), flat.
2.  **Level 1 (Cards/Surfaces):** Pure White (#FFFFFF) with a very soft, diffused shadow: `0 4px 20px rgba(24, 49, 83, 0.04)`.
3.  **Level 2 (Hover/Active):** Slightly more pronounced shadow: `0 12px 30px rgba(24, 49, 83, 0.08)`.

Borders should be used sparingly; prefer subtle background color shifts or soft shadows to define boundaries. Navigation bars should utilize a backdrop blur (Glassmorphism) when sticky to maintain a sense of context.

## Shapes

The shape language is "Rounded-Sophisticated." A base radius of 16px (`1rem`) is applied to all primary cards and input containers to soften the interface and make it feel approachable. 

- **Buttons:** Fully rounded (pill) or 12px radius depending on context.
- **Cards:** Strictly 16px (`rounded-lg` per this system's scale).
- **Selection States:** Use 8px radius for smaller items like list highlights or tags.

## Components

### Buttons
- **Primary:** Deep Navy background, White text. No border. Subtle scale-down (0.98) on click.
- **Secondary:** Soft Gold text, transparent background, subtle 1px Gold border.
- **Tertiary:** Sky Blue text, no background or border. Used for "Read More" or "Share."

### Cards
- **Devotional Cards:** Pure White surface, 16px rounded corners, soft ambient shadow. Headline in Serif, metadata in Sans-Serif.
- **Scripture Cards:** Subtle Soft Gold left-border (4px) to denote sacred text.

### Navigation
- **Sticky Header:** Pure White with 80% opacity and 12px blur. Minimalist icons and Geist-based navigation links.

### Inputs
- **Text Fields:** Warm White background, 12px rounded corners, 1px border that shifts to Sky Blue on focus. Labels sit outside the field in uppercase Sans-Serif.

### Lists
- **Daily Reading:** Clean rows with 16px vertical padding, separated by a light 1px divider (#E5E7EB). Active items use a Soft Gold marker.