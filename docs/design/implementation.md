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

- Use Chakra semantic tokens and color mode utilities instead of hard-coding light and dark values in components.
- Wrap isolated light or dark sections with Chakra color mode helpers only when the design requires a forced appearance.

## Composition

- Use Chakra built-in components for dialogs, drawers, forms, menus, buttons, and disclosure patterns.
- Use `asChild` to compose Chakra behavior onto a custom child component.
- Ensure custom children used with `asChild` forward refs and spread props.

## Typegen

- Run Chakra typegen after theme, token, recipe, or slot recipe changes.
- Keep generated type workflow documented in the project setup when Chakra theme customization is added.
