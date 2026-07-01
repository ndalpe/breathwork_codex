# Chakra UI Implementation

Use this file to translate app design decisions into Chakra UI implementation choices.

## Source Reference

- Raw framework reference: [Chakra UI v3 full guide](../frameworks/chakraui-llms-full.txt)
- Project framework guide: [Chakra UI project guide](../frameworks/chakraui.md)

## Styling Rules

- Prefer Chakra style props for local layout and styling.
- Prefer semantic tokens for app surfaces, text, borders, and status colors.
- Avoid raw hex values in components. Define tokens or semantic tokens instead.
- Use text styles for repeated typography choices.
- Use layer styles for repeated surface treatments.
- Use recipes for repeated component variants.
- Use slot recipes for repeated multi-part custom components.

## Responsive Rules

- Use Chakra's mobile-first responsive object syntax.
- Prefer explicit responsive boundaries for variants, such as `smDown` and `md`, so styles do not leak between breakpoints.
- Use `hideFrom` and `hideBelow` for breakpoint-specific visibility when appropriate.

## Color Mode

- The app must default to dark mode across the frontend and PWA shell.
- Set Chakra's default color mode or forced appearance to `dark`.
- Use Chakra color mode support rather than manually hard-coding dark styles in components.
- Use Chakra UI's built-in `blue` color palette as the primary `colorPalette`.
- Prefer `colorPalette="blue"` for primary Chakra components.
- Use Chakra semantic tokens for backgrounds, text, borders, focus, selection, accent states, and status colors.
- Avoid relying on light-mode-only token values.
- Do not implement the dark theme with scattered hard-coded component colors.

## Composition

- Use Chakra built-in components for dialogs, drawers, forms, menus, buttons, and disclosure patterns.
- Use `asChild` to compose Chakra behavior onto a custom child component.
- Ensure custom children used with `asChild` forward refs and spread props.

## Typegen

- Run Chakra typegen after theme, token, recipe, or slot recipe changes.
- Keep generated type workflow documented in the project setup when Chakra theme customization is added.

## Theme Tokens

- Blue is the primary app color.
- Define app-specific semantic tokens instead of using raw blue values in components.
- App-level semantic tokens should include:
  - `bg`
  - `bg.panel`
  - `bg.muted`
  - `fg`
  - `fg.muted`
  - `border`
  - `accent`
  - `accent.strong`
  - `accent.subtle`
  - `focus`
  - `selection`
- The `accent`, `focus`, and `selection` tokens should derive from Chakra UI's built-in `blue` palette.
- Components should consume semantic tokens or `colorPalette="blue"`, not raw color values.

## PWA Theme

- The PWA shell must match the app's dark mode theme.
- Set `app/manifest.json` `theme_color` to a dark blue or neutral dark color aligned with the Chakra dark theme.
- Set `app/manifest.json` `background_color` to the app's dark background color.
- Set the HTML `<meta name="theme-color">` value in `app/index.html` to the same dark theme color used by the manifest.
- Keep the service worker no-cache behavior unchanged.
