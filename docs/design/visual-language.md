# Visual Language

## Typography

- Use text size to emphasize information.
- Keep session-critical text, such as the current breathing pattern and countdown, visually dominant.
- Prefer Chakra text styles for repeated typography decisions.

## Color

- Use semantic tokens for app surfaces, text, borders, and status colors.
- Prefer `bg`, `fg`, `border`, and related semantic tokens over raw color values in components.
- Use `colorPalette` for reusable component variants when the same component needs palette variation.

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
