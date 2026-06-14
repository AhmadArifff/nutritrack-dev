# Design System Inspired by SwiftMove

## 1. Visual Theme & Atmosphere

SwiftMove's design system embodies a bold, service-driven aesthetic that communicates efficiency, trustworthiness, and accessibility. The visual language combines vibrant accent colors with a grounded dark and neutral palette, creating high contrast that prioritizes clarity and action. The design conveys professionalism through clean typography and structured spacing, while energetic orange and blue accents inject confidence and approachability. This is a system built for conversion—every color and component choice encourages users toward primary actions like requesting a quote or calling for service. The overall atmosphere feels contemporary, reliable, and action-oriented, perfect for a service-based moving company targeting both residential and commercial customers.

**Key Characteristics**

- Bold, high-contrast visual hierarchy with dark neutrals and vibrant accent colors
- Orange (`#FF9800`) and blue (`#1E88E5`) drive primary user actions and emotional engagement
- Dark navigation and footer backgrounds (`#333333`, `#3A3A3A`) anchor content and establish authority
- Green success indicators (`#5FA33A`, `#7AC64D`) reinforce trust and completion
- Generous spacing and clean typography create breathing room without sacrificing density
- Accent color gradients (blue to purple) add visual richness to secondary content
- Inclusive color strategy with success, warning, and error states clearly distinguished
- Responsive, mobile-first layout strategy supporting quick interaction on all devices

## 2. Color Palette & Roles

### Primary
- **Action Orange** (`#FF9800`): Primary call-to-action buttons, key engagement points, and prominent UI elements that drive conversions
- **Accent Blue** (`#1E88E5`): Secondary CTAs, accent headings, links, and trusted authority indicators

### Accent Colors
- **Deep Purple** (`#8E24AA`): Tertiary accent for emphasis and visual variation
- **Teal** (`#00ACC1`): Supporting accent for secondary information and highlights
- **Rose Pink** (`#EC407A`): Emotional warmth accent for testimonials or special messaging
- **Earth Brown** (`#795548`): Grounding accent for secondary visual elements
- **Light Green** (`#8ED45E`): Supporting accent for positive messaging and secondary success states

### Interactive
- **Bright Green** (`#7AC64D`): Interactive hover states and active element indicators; cart and action confirmations
- **Link Blue** (`#1E88E5`): Primary link color with inherited hover enhancement

### Neutral Scale
- **Black** (`#000000`): Primary text, dominant typography, form labels, and critical UI elements
- **Dark Charcoal** (`#222222`): Secondary text, reduced-emphasis content
- **Dark Gray** (`#333333`): Navigation backgrounds, dark surfaces, form backgrounds
- **Medium Dark Gray** (`#3A3A3A`): Subtle surface backgrounds, section dividers
- **Medium Gray** (`#444444`): Borders, subtle dividers, low-emphasis UI
- **Light Gray** (`#727272`): Tertiary text, placeholder text, disabled states
- **Gray** (`#9B9B9B`): Supporting text, captions, secondary information, footer content
- **White** (`#FFFFFF`): Light backgrounds, card surfaces, text on dark backgrounds

### Surface & Borders
- **Primary Surface** (`#FFFFFF`): Main content containers, cards, form backgrounds
- **Dark Surface** (`#333333`): Navigation, footer, dark theme backgrounds
- **Border Gray** (`#444444`): Form field borders, subtle dividers
- **Border Accent** (`#9B9B9B`): Secondary borders, less emphatic visual separation

### Semantic / Status
- **Success Green** (`#5FA33A`): Success messages, confirmations, positive states, checkmarks, verified indicators
- **Error Red** (`#E53935`): Error messages, validation failures, critical alerts
- **Warning Yellow** (`#FDD835`): Warning states, caution alerts, attention-needed indicators
- **Warning Amber** (`#FF9800`): Secondary warning and informational states

## 3. Typography Rules

### Font Family
- **Primary**: `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif` — Modern system stack for primary UI and body text
- **Secondary**: `Arial, sans-serif` — Fallback for form inputs and supporting content
- **Monospace**: `"Monaco", "Courier New", monospace` — Code and technical content (inferred)

### Hierarchy

| Role | Font | Size | Weight | Line Height | Letter Spacing | Notes |
|------|------|------|--------|------------|-----------------|-------|
| Display / H1 | -apple-system | 48px | 700 | 1.2 | 0px | Hero headlines, page titles |
| Heading / H2 | -apple-system | 36px | 600 | 1.3 | 0px | Section headings, major content blocks |
| Heading / H3 | -apple-system | 28px | 600 | 1.3 | 0px | Subsection headings, card titles |
| Subheading / H4 | -apple-system | 20px | 500 | 1.4 | 0px | Small headings, category titles |
| Body Large | -apple-system | 18px | 400 | 1.6 | 0px | Lead paragraphs, featured body text |
| Body Regular | -apple-system | 16px | 400 | 1.6 | 0px | Primary body text, link text, navigation |
| Body Small | -apple-system | 14px | 400 | 1.5 | 0px | Secondary body, fine print, supporting text |
| Label / Caption | -apple-system | 12px | 500 | 1.4 | 0.5px | Form labels, badge text, captions |
| Meta / Micro | -apple-system | 10px | 300 | 1.3 | 0.8px | Timestamps, micro-copy, secondary metadata |
| Button | -apple-system | 16px | 600 | 1.4 | 0px | All button text, high-emphasis actions |
| Input | Arial | 16px | 400 | 1.5 | 0px | Form input fields, textarea content |
| Code | Monaco | 13px | 400 | 1.5 | 0px | Code blocks, inline code |

### Principles
- **Hierarchy through weight and scale**: Use size and weight (not color alone) to establish information hierarchy
- **Generous line height**: Minimum `1.4` line-height for readability and visual breathing room
- **System fonts preferred**: Leverage platform defaults for performance and native feel
- **Contrast for accessibility**: Dark text on light backgrounds and vice versa; minimum `4.5:1` contrast ratio
- **Consistent text sizing**: Stick to the defined scale; avoid arbitrary sizes
- **Font smoothing**: Apply `-webkit-font-smoothing: antialiased` for optimal rendering on macOS

## 4. Component Stylings

### Buttons

#### Primary Button (Action Orange)
- **Background**: `#FF9800`
- **Text Color**: `#FFFFFF`
- **Font**: -apple-system, `16px`, weight `600`
- **Padding**: `14px 28px`
- **Border Radius**: `4px`
- **Border**: `0px`
- **Box Shadow**: `0px 2px 8px rgba(255, 152, 0, 0.3)`
- **Height**: `48px` (minimum touch target)
- **Hover State**: Background `#F57C00`, shadow `0px 4px 12px rgba(255, 152, 0, 0.4)`
- **Active State**: Background `#E65100`, shadow `0px 1px 4px rgba(255, 152, 0, 0.2)`
- **Disabled State**: Background `#CCCCCC`, text `#999999`, no shadow

#### Secondary Button (Blue Outline)
- **Background**: `#FFFFFF`
- **Text Color**: `#1E88E5`
- **Font**: -apple-system, `16px`, weight `600`
- **Padding**: `14px 28px`
- **Border Radius**: `4px`
- **Border**: `2px solid #1E88E5`
- **Box Shadow**: `none`
- **Height**: `48px`
- **Hover State**: Background `#E3F2FD`, text `#1565C0`
- **Active State**: Background `#BBDEFB`, text `#1565C0`
- **Disabled State**: Border `2px solid #CCCCCC`, text `#999999`

#### Ghost Button (Transparent)
- **Background**: `transparent`
- **Text Color**: `#9B9B9B`
- **Font**: -apple-system, `16px`, weight `400`
- **Padding**: `12px 16px`
- **Border Radius**: `0px`
- **Border**: `0px`
- **Box Shadow**: `none`
- **Height**: `44px`
- **Hover State**: Text `#000000`, background `rgba(0, 0, 0, 0.04)`
- **Active State**: Text `#1E88E5`, background `transparent`
- **Disabled State**: Text `#CCCCCC`, opacity `0.5`

### Cards & Containers

#### Default Card
- **Background**: `#FFFFFF`
- **Border**: `1px solid #EEEEEE`
- **Border Radius**: `8px`
- **Padding**: `24px`
- **Box Shadow**: `0px 2px 4px rgba(0, 0, 0, 0.08)`
- **Hover State**: Box shadow `0px 4px 12px rgba(0, 0, 0, 0.12)`

#### Dark Card (Form / Inputs)
- **Background**: `#333333`
- **Border**: `1px solid #444444`
- **Border Radius**: `5px`
- **Padding**: `20px`
- **Box Shadow**: `0px 1px 3px rgba(0, 0, 0, 0.2)`
- **Text Color**: `#FFFFFF`

#### Feature Card
- **Background**: `#FFFFFF`
- **Border Left**: `4px solid #7AC64D`
- **Border Radius**: `8px`
- **Padding**: `20px`
- **Box Shadow**: `0px 2px 8px rgba(0, 0, 0, 0.06)`
- **Heading Color**: `#000000`
- **Body Color**: `#666666`

### Inputs & Forms

#### Text Input
- **Background**: `#333333`
- **Text Color**: `#FFFFFF`
- **Border**: `1px solid #444444`
- **Border Radius**: `5px`
- **Padding**: `12px 15px`
- **Font**: Arial, `16px`, weight `400`
- **Height**: `48px`
- **Focus State**: Border `2px solid #1E88E5`, box shadow `0px 0px 0px 3px rgba(30, 136, 229, 0.1)`
- **Placeholder**: `#727272`, opacity `0.7`
- **Disabled State**: Background `#2A2A2A`, border `1px solid #3A3A3A`, text `#666666`

#### Textarea
- **Background**: `#333333`
- **Text Color**: `#FFFFFF`
- **Border**: `1px solid #444444`
- **Border Radius**: `5px`
- **Padding**: `12px 15px`
- **Font**: Arial, `16px`, weight `400`
- **Min Height**: `120px`
- **Focus State**: Border `2px solid #1E88E5`, box shadow `0px 0px 0px 3px rgba(30, 136, 229, 0.1)`

#### Form Label
- **Font**: -apple-system, `12px`, weight `500`
- **Text Color**: `#000000`
- **Margin Bottom**: `8px`
- **Display**: `block`

#### Error State
- **Border Color**: `#E53935`
- **Error Text**: `#E53935`, font size `12px`, margin top `4px`

#### Success State
- **Border Color**: `#5FA33A`
- **Success Text**: `#5FA33A`, font size `12px`, margin top `4px`

### Navigation

#### Header Navigation
- **Background**: `#FFFFFF`
- **Height**: `72px`
- **Padding**: `0px 40px`
- **Border Bottom**: `1px solid #EEEEEE`
- **Display**: `flex`, align items `center`, justify content `space-between`

#### Navigation Link
- **Text Color**: `#000000`
- **Font**: -apple-system, `16px`, weight `400`
- **Padding**: `8px 16px`
- **Border Radius**: `0px`
- **Hover State**: Text `#1E88E5`, background `transparent`
- **Active State**: Text `#1E88E5`, border bottom `2px solid #1E88E5`, padding bottom `6px`

#### Footer Navigation
- **Background**: `#222222`
- **Text Color**: `#9B9B9B`
- **Font**: -apple-system, `14px`, weight `400`
- **Padding**: `40px 40px`
- **Link Hover**: Text `#FFFFFF`

### Badges

#### Success Badge
- **Background**: `#E8F5E9`
- **Text Color**: `#5FA33A`
- **Border**: `1px solid #5FA33A`
- **Border Radius**: `20px`
- **Padding**: `6px 12px`
- **Font**: -apple-system, `12px`, weight `600`
- **Icon Color**: `#5FA33A`

#### Warning Badge
- **Background**: `#FFF3E0`
- **Text Color**: `#FF9800`
- **Border**: `1px solid #FF9800`
- **Border Radius**: `20px`
- **Padding**: `6px 12px`
- **Font**: -apple-system, `12px`, weight `600`

#### Error Badge
- **Background**: `#FFEBEE`
- **Text Color**: `#E53935`
- **Border**: `1px solid #E53935`
- **Border Radius**: `20px`
- **Padding**: `6px 12px`
- **Font**: -apple-system, `12px`, weight `600`

## 5. Layout Principles

### Spacing System

Base unit: `4px`

Scale in use:
- `4px` — Micro spacing (tight gaps, internal padding)
- `8px` — Extra small spacing (small gaps, icon margins)
- `12px` — Small spacing (form label margins, badge padding)
- `16px` — Base spacing (default gap, component padding)
- `20px` — Medium spacing (section padding, card padding)
- `24px` — Large spacing (card padding, section margins)
- `32px` — Extra large spacing (section spacing, hero padding)
- `40px` — XXL spacing (major section separation, page margin)
- `48px` — XXXL spacing (hero sections, major layout breaks)

**Usage Context**:
- Inputs and buttons: `12px` vertical, `15px` horizontal internal padding
- Cards and containers: `20px` to `24px` padding
- Section spacing: `32px` to `48px` between major content blocks
- Gutters: `16px` to `20px` between grid columns
- List items: `8px` to `12px` between items

### Grid & Container

- **Max width**: `1400px` (primary content container)
- **Gutter width**: `20px` (space between columns)
- **Column count**: 12-column grid for responsive layouts
- **Container padding**: `40px` horizontal on desktop, `20px` on tablet, `16px` on mobile
- **Section spacing**: `48px` vertical between major sections, `32px` for subsections

### Whitespace Philosophy

SwiftMove embraces strategic whitespace to create visual hierarchy and breathing room. Each content block is generously padded, with clear separation between sections enabling users to quickly scan and understand the page structure. Negative space is used as an active design tool: the space around call-to-action buttons increases their visual prominence, while padded cards stand apart from the background. This approach reduces cognitive load and makes the interface feel premium and user-centric.

### Border Radius Scale

- `0px` — Sharp corners for navigation, hero sections, minimal UI elements
- `2px` — Micro radius for badges, tags, subtle rounding
- `4px` — Small radius for buttons, inputs, card corners (standard component rounding)
- `5px` — Input-specific radius (form field standard)
- `8px` — Medium radius for cards, containers, secondary components
- `12px` — Large radius for modals, overlays, prominent containers
- `20px` — Pill-shaped radius for badges, fully rounded small elements
- `50%` — Circular radius for avatars, icon buttons

## 6. Depth & Elevation

| Level | Treatment | Use |
|-------|-----------|-----|
| Flat | `box-shadow: none` | Navigation, backgrounds, flat text elements |
| Subtle | `box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.08)` | Default cards, inactive components |
| Raised | `box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.08)` | Hovered cards, active components |
| Elevated | `box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.12)` | Modals, floating components, emphasis |
| Floating | `box-shadow: 0px 8px 24px rgba(0, 0, 0, 0.16)` | Dropdowns, tooltips, top-layer elements |

**Shadow Philosophy**: SwiftMove uses restrained, natural shadows to create subtle depth rather than dramatic layering. Shadows employ a single light source at top-center with soft, diffused edges. This approach reinforces hierarchy and focuses attention on interactive elements without overwhelming the interface. All shadows use black with reduced opacity rather than colored shadows, maintaining visual consistency and accessibility. Elevation levels correspond to user interaction intensity—more prominent interactions receive more noticeable shadows.

## 7. Do's and Don'ts

### Do
- **Use orange (`#FF9800`) for primary CTAs** — Buttons labeled "Get Free Quote" and major conversion actions must use the primary orange
- **Maintain text contrast ratios of 4.5:1 minimum** — Verify all text color + background combinations meet WCAG AA standards
- **Group related form fields in dark cards** — Keep input clusters visually united with `#333333` backgrounds and consistent `20px` padding
- **Apply hover states consistently** — Every interactive element should have a distinct hover appearance (color shift, shadow increase, or state indicator)
- **Use blue (`#1E88E5`) for secondary actions and trusted indicators** — Links, secondary buttons, and "Licensed & Insured" badges
- **Space sections with `40px` to `48px` of vertical margin** — Create visual rhythm and prevent content from feeling cramped
- **Implement `16px` touch targets minimum** — All interactive elements (buttons, links, inputs) must reach `48px` height on mobile
- **Use success green (`#5FA33A`) only for confirmations and positive states** — Checkmarks, success messages, verified indicators
- **Stack typography hierarchy with weight and size** — Avoid using color alone to differentiate text roles
- **Preserve alignment and grid consistency** — Maintain 12-column grid alignment across all breakpoints

### Don't
- **Don't use orange for non-actionable elements** — Reserve orange for primary CTAs only; secondary elements use other colors
- **Don't nest more than two levels of cards** — Avoid visual clutter by limiting container nesting depth
- **Don't apply shadows to navigation** — Headers and footers use flat styling with subtle borders only
- **Don't create text smaller than `12px`** — Respect minimum readability standards even for captions and micro-copy
- **Don't use multiple accent colors in a single section** — Limit visual noise by restricting accent usage per content block
- **Don't apply bold (weight `700`) to body text** — Reserve bold for headings; use weight `600` for strong emphasis within paragraphs
- **Don't ignore focus states on interactive elements** — Every button, link, and input must have a clear focus indicator (`outline` or shadow)
- **Don't mix dark and light backgrounds without sufficient padding** — Provide `16px` minimum spacing around background color transitions
- **Don't use error red (`#E53935`) for warnings** — Reserve red for critical errors; use amber (`#FF9800`) for cautions
- **Don't override default link styling without clear reason** — Links should remain visually distinct (color `#1E88E5` by default, with underline on hover)

## 8. Responsive Behavior

### Breakpoints

| Breakpoint Name | Width | Key Changes |
|-----------------|-------|------------|
| Mobile Small | 320px | Single column, `16px` horizontal padding, `24px` vertical spacing, full-width buttons |
| Mobile | 375px | Single column, `16px` padding, navigation collapse to mobile menu |
| Mobile Large | 480px | Single column, `20px` padding, slightly larger typography |
| Tablet | 768px | 2-column grid, `20px` padding, adjusted hero section, navigation tablet-optimized |
| Tablet Large | 1024px | 2–3 column grid, `32px` padding, full navigation bar visible |
| Desktop | 1440px | 3–4 column grid, `40px` padding, max-width container `1400px` |
| Desktop XL | 1920px | Full 4-column grid, `60px` padding, enhanced spacing for premium feel |

### Touch Targets

- **Minimum interactive size**: `48px × 48px` (buttons, links, input fields)
- **Comfortable spacing between targets**: `8px` minimum (prevents accidental taps)
- **Icon-only buttons**: `48px × 48px` minimum with centered icon
- **Links in body text**: Minimum `16px` line-height with `8px` vertical padding around hit area
- **Form inputs**: `48px` height, `15px` horizontal padding minimum
- **Navigation items**: `44px` minimum height on mobile, `48px` on desktop

### Collapsing Strategy

- **Hero section**: Full-width on mobile with centered text; two-column split (text left, image right) on tablet and above
- **Navigation**: Horizontal list on desktop, collapsed hamburger menu below `768px`
- **Grid layouts**: 1 column mobile, 2 columns tablet, 3+ columns desktop
- **Buttons**: Full-width on mobile (`100%`), inline (`auto`) above `768px`
- **Padding**: Reduce `40px` to `20px` below `768px`, `16px` below `480px`
- **Typography**: Reduce display heading by 20% on mobile (e.g., `48px` → `36px`), body text remains `16px`
- **Images**: Responsive (`max-width: 100%`), stack vertically on mobile
- **Modals**: Full-screen on mobile (`100vw × 100vh`), centered with padding on desktop (`90vw` max, `80vh` max)

## 9. Agent Prompt Guide

### Quick Color Reference
- **Primary CTA**: Action Orange (`#FF9800`) — "Get Free Quote", major action buttons
- **Secondary CTA**: Accent Blue (`#1E88E5`) — Secondary buttons, links, trusted indicators
- **Background**: White (`#FFFFFF`) for light surfaces, Dark Charcoal (`#333333`) for dark forms
- **Heading text**: Black (`#000000`) on light backgrounds, White (`#FFFFFF`) on dark backgrounds
- **Body text**: Black (`#000000`) primary, Gray (`#9B9B9B`) secondary
- **Borders**: Medium Gray (`#444444`) dark surfaces, Light Gray (`#EEEEEE`) light surfaces
- **Success**: Success Green (`#5FA33A`) for confirmations, checkmarks, positive feedback
- **Error**: Error Red (`#E53935`) for critical validation failures
- **Warning**: Warning Amber (`#FF9800`) for cautions and alerts
- **Accents**: Green (`#7AC64D`), Blue (`#1E88E5`), Purple (`#8E24AA`), Teal (`#00ACC1`)

### Iteration Guide

1. **Start with the orange button** — All SwiftMove CTAs use `#FF9800` with white text, `16px` font, `600` weight, `48px` height, `14px 28px` padding, and `4px` border radius. Test hover state: `#F57C00`.

2. **Build dark forms with `#333333` backgrounds** — All input fields and form containers use this dark surface color with `#444444` borders, white text, `5px` border radius, and `12px 15px` padding.

3. **Apply blue (`#1E88E5`) to all links and secondary actions** — Links default to blue, turn teal on hover. Secondary buttons use blue outline (border `2px solid #1E88E5`) on white background.

4. **Establish hierarchy with typography weight, not color** — Use font weights `400` (body), `500` (labels), `600` (emphasis), and `700` (headings) rather than creating fake hierarchies with color alone.

5. **Maintain 48px minimum touch targets on mobile** — All buttons, form inputs, and interactive links must be at least `48px` tall and have `8px` spacing around them to prevent accidental taps.

6. **Use success green (`#5FA33A`) only for confirmations** — Checkmarks, "Fully Insured" badges, and success messages. Avoid using green for anything except positive outcomes.

7. **Space sections with 40px vertical gaps** — Major content blocks should have `40px` to `48px` between them. Use `32px` for subsection spacing.

8. **Apply subtle shadows for depth, not drama** — Use `0px 2px 4px rgba(0, 0, 0, 0.08)` for cards, `0px 4px 12px rgba(0, 0, 0, 0.12)` for elevated elements. Avoid harsh shadows.

9. **Keep inputs and dark surfaces dark** — Form backgrounds should remain `#333333` with `#444444` borders. This maintains visual distinction from light content areas.

10. **Test all color combinations for WCAG AA contrast** — Text on background must achieve `4.5:1` contrast ratio minimum. Use a contrast checker before finalizing.