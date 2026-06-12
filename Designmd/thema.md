---
name: Vitality Prism
colors:
  surface: '#f8f9ff'
  surface-dim: '#cbdbf5'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d3e4fe'
  on-surface: '#0b1c30'
  on-surface-variant: '#3d4a3d'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
  outline: '#6d7b6c'
  outline-variant: '#bccbb9'
  surface-tint: '#006e2f'
  primary: '#006e2f'
  on-primary: '#ffffff'
  primary-container: '#22c55e'
  on-primary-container: '#004b1e'
  inverse-primary: '#4ae176'
  secondary: '#0058be'
  on-secondary: '#ffffff'
  secondary-container: '#2170e4'
  on-secondary-container: '#fefcff'
  tertiary: '#9e4036'
  on-tertiary: '#ffffff'
  tertiary-container: '#ff8b7c'
  on-tertiary-container: '#76231b'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#6bff8f'
  primary-fixed-dim: '#4ae176'
  on-primary-fixed: '#002109'
  on-primary-fixed-variant: '#005321'
  secondary-fixed: '#d8e2ff'
  secondary-fixed-dim: '#adc6ff'
  on-secondary-fixed: '#001a42'
  on-secondary-fixed-variant: '#004395'
  tertiary-fixed: '#ffdad5'
  tertiary-fixed-dim: '#ffb4a9'
  on-tertiary-fixed: '#410001'
  on-tertiary-fixed-variant: '#7f2a21'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
  mint-surface: '#f0fdf4'
  energy-orange: '#f97316'
  achievement-purple: '#a855f7'
  warning-yellow: '#eab308'
  error-red: '#ef4444'
  bg-light: '#f8fafc'
  bg-dark: '#0f172a'
  card-light: '#ffffff'
  card-dark: '#1e293b'
typography:
  headline-xl:
    fontFamily: Poppins
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Poppins
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.25'
  headline-lg-mobile:
    fontFamily: Poppins
    fontSize: 28px
    fontWeight: '600'
    lineHeight: '1.25'
  headline-md:
    fontFamily: Poppins
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Nunito
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Nunito
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '500'
    lineHeight: '1.4'
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1.4'
    letterSpacing: 0.05em
  metrics-mono:
    fontFamily: JetBrains Mono
    fontSize: 16px
    fontWeight: '500'
    lineHeight: '1'
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 4px
  gutter-mobile: 16px
  gutter-desktop: 24px
  margin-page: 24px
  card-padding: 20px
  section-gap: 32px
---

## Brand & Style

The design system is built for a premium health and nutrition experience that feels vibrant, energetic, and encouraging. It targets health-conscious individuals who value precision and motivation. The brand personality is "The Professional Companion"—reliable and data-driven, yet warm and celebratory of personal milestones.

The design style is a hybrid of **Modern Corporate** and **Glassmorphism**, enhanced by **Tactile 3D elements**. It utilizes heavy whitespace to provide mental "breathing room," paired with high-fidelity components that feature soft ambient shadows and layered transparencies. The aesthetic is "PWA-Plus"—leveraging web technologies to create an immersive, native-feeling environment through depth and motion.

Key visual principles:
- **Luminosity:** Use light-transmitting surfaces (glass) to maintain a fresh feel.
- **Vibrancy:** High-saturation accents against clean backgrounds to signal energy.
- **Softness:** Rounded geometries and organic transitions to reduce the friction of data entry.

## Colors

The color palette is functionally driven to provide immediate cognitive feedback. **Emerald Green** (Primary) is the anchor, symbolizing health and "safe" nutritional status. **Energetic Blue** (Secondary) is reserved for hydration and activity-related actions. 

**Color Logic:**
- **Success/Safe:** Primary Green (#22c55e). Used for "within target" calorie states.
- **Energy/Metabolism:** Orange (#f97316). Used for active calorie burning.
- **Progression:** Purple (#a855f7). Dedicated to achievements and milestones.
- **Caution:** Yellow (#eab308). Used for snacks or approaching limits.
- **Alert:** Red (#ef4444). Used for exceeding daily targets or critical BMI zones.

The system supports a dual-mode strategy. In light mode, surfaces use pure white or high-lightness mint tints to feel "clean." In dark mode, depth is communicated through varying shades of navy and slate rather than pure black, maintaining a premium, high-fidelity appearance.

## Typography

This design system employs a three-tiered font strategy to balance personality with readability:
1. **Poppins (Headings):** Geometric and bold, used to establish brand authority and clear visual hierarchy.
2. **Nunito (Body):** Soft and rounded, used for long-form content to maintain the "friendly" persona.
3. **Inter (Interface Labels):** Highly legible and neutral, used for navigation, buttons, and form labels where clarity is paramount.
4. **JetBrains Mono (Data):** Used exclusively for numerical metrics (calories, weights, macros) to ensure tabular alignment and a "scientific" feel to the data.

**Scaling:** On mobile devices, headline sizes should reduce by approximately 15% while maintaining line-height ratios to ensure readability on narrow viewports.

## Layout & Spacing

The system follows an **8px grid rhythm** (with 4px sub-units for tight component layouts). The layout philosophy is **Fluid-Fixed**: content is contained within a max-width of 1200px on desktop but stretches fluidly on mobile and tablet devices.

- **Mobile:** Single column layout with 16px horizontal margins.
- **Tablet:** 8-column grid with 20px gutters.
- **Desktop:** 12-column grid with 24px gutters.

Whitespace is used generously to separate logical sections. Content "cards" should have consistent internal padding (20px) to ensure touch targets are comfortable for a PWA environment. For 3D elements, provide a "safe zone" of at least 32px of surrounding whitespace to allow the 3D geometry to breathe without interfering with text readability.

## Elevation & Depth

Depth is a critical component of the "3D-friendly" aesthetic. The system uses three distinct methods to convey hierarchy:

1. **Layered Transparencies:** Cards and modals often use a background-blur (12px - 20px) and 80% opacity to feel like frosted glass resting above the colorful background gradients.
2. **Ambient Shadows:** Shadows are highly diffused, using a 10% opacity tint of the surface color rather than pure black. This creates a soft "lift" (e.g., `box-shadow: 0 10px 25px -5px rgba(22, 163, 74, 0.1)` for primary-tinted cards).
3. **3D Interactive Depth:** Functional elements like the Calorie Ring or Water Bottle utilize real-time light calculations (Three.js). These elements should have a "metallic" finish (metalness: 0.8) to differentiate them from the "soft" 2D UI.

**Hierarchy of Elevation:**
- **Level 0 (Background):** Solid surface colors.
- **Level 1 (Cards):** Soft shadows, 0.5rem roundedness.
- **Level 2 (Active/Hover):** Scale up to 1.02x with increased shadow spread.
- **Level 3 (Overlays/3D):** Glassmorphic blurs and physical 3D geometry.

## Shapes

The shape language is consistently **Rounded**. This softens the "clinical" nature of health tracking, making the app feel more like a lifestyle tool. 

- **Standard Components:** 0.5rem (8px) radius for buttons and inputs.
- **Cards & Containers:** 1rem (16px) radius for primary content blocks.
- **Full Pill:** Used for tags, chips, and specific floating action buttons.

3D geometries (Torus, Gauges) should maintain smooth, subdivided surfaces to avoid visible facets, echoing the rounded nature of the 2D interface.

## Components

### Buttons & Interaction
- **Primary Button:** Solid Emerald Green with white text. On hover, scale to 1.02x and increase shadow. On tap/click, scale to 0.98x.
- **Secondary/Action Button:** Solid Energy Blue or achievement-themed gradients for "special" actions like finishing a workout.
- **Glass Button:** Transparent background with 1px border and backdrop-blur for secondary navigation.

### Cards
Cards are the primary content container. They should feature a subtle 1px border (`#e2e8f0` in light mode) and a soft ambient shadow. For 3D-integrated cards, the background should remain neutral to let the model's colors pop.

### Input Fields
Inputs use a "floating label" style with **Inter** at 14px. Focus states are indicated by a 2px primary green border and a soft green glow (ring).

### Achievements & Gamification
Achievement components (medals, progress rings) should use the **Purple** and **Orange** accent colors. Use "staggered entry" animations (0.1s delay between items) to make the list feel dynamic.

### 3D UI Elements
3D models (e.g., Water Bottle, Calorie Ring) must be centered in their containers with a transparent background. Use a slow constant rotation (`0.3` speed) to indicate interactivity and depth.