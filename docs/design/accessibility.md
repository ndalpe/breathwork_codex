# Accessibility

## Standards

- The user interface must respect WCAG accessibility standards.
- Text and controls must maintain sufficient contrast against their backgrounds.
- Interactive controls must expose accessible names.
- Keyboard focus must be visible and predictable.
- Touch targets must be large enough for comfortable mobile use.

## Focus

- Use Chakra UI focus ring patterns instead of removing outlines.
- Dialogs, drawers, menus, and expanded panels must manage focus correctly.
- Close controls must remain reachable by keyboard and touch.

## Motion

- Respect reduced-motion preferences.
- Breathing guidance may use motion, but the experience must remain understandable without animation.

## Chakra UI Notes

- Prefer Chakra components for dialogs, drawers, buttons, forms, and disclosure patterns because they provide accessible primitives.
- Use semantic tokens such as `bg`, `fg`, and `border` so color mode and contrast remain easier to manage.
