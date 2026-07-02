# Visual Language

## Typography

- Use text size to emphasize information.
- Keep session-critical text, such as the current breathing pattern and countdown, visually dominant.
- Prefer Chakra text styles for repeated typography decisions.

## Color

- The full app experience uses dark mode as the default visual theme, including the installed PWA shell.
- Chakra UI's built-in `blue` palette is the primary app palette.
- Use blue for primary actions, active states, selected states, focus emphasis, breathing coach highlights, and PWA theme color.
- Use neutral dark surfaces for page backgrounds, panels, menus, dialogs, and cards.
- Use semantic tokens for app surfaces, text, borders, accents, focus, selection, and status colors.
- Prefer `bg`, `bg.panel`, `bg.muted`, `fg`, `fg.muted`, `border`, `accent`, `focus`, and related semantic tokens over raw color values in components.
- Use `colorPalette="blue"` for reusable Chakra component variants when the component represents a primary or selected action.
- Avoid light-mode fallback styling unless explicitly needed for accessibility or browser compatibility.
- Keep contrast WCAG-compliant against dark backgrounds.
- Any required literal color value outside Chakra, such as PWA metadata or pre-Chakra CSS fallback, must match the exact hex value of a Chakra built-in token.

## Spacing

- Use Chakra spacing tokens for layout rhythm.
- Preserve explicit safe spacing around bottom controls during active sessions.

## Surfaces

- Keep surfaces simple and readable.
- Use consistent background, border, and shadow decisions for repeated controls.

## Icons

- Use icons for common actions such as menu, close, mute, haptics, and stop when the meaning is clear.
- Provide accessible names for icon-only controls.

## Density

- The idle state may expose secondary actions.
- The active session state should remove nonessential controls and visual clutter.
