# Chakra UI Project Guide

This app uses Chakra UI as the implementation layer for design tokens, responsive layout, accessible primitives, component variants, and color mode behavior.

## Primary Chakra Concepts

- Tokens: define reusable atomic values such as colors, spacing, fonts, sizes, and shadows.
- Semantic tokens: define contextual values such as `bg`, `fg`, and `border` that can adapt to color mode.
- Text styles: define repeated typography decisions.
- Layer styles: define repeated surface treatments.
- Recipes: define reusable variants for single-part components.
- Slot recipes: define reusable variants for multi-part components.
- Responsive styles: implement mobile-first layout using Chakra breakpoint syntax.
- Composition: use `as` and `asChild` to compose Chakra behavior with app components.
- Color mode: support light and dark appearance through Chakra's color mode pattern.

## App Usage

- Use Chakra built-in components for buttons, dialogs, drawers, forms, menus, toggles, and disclosure patterns.
- Use semantic tokens instead of hard-coded colors in app components.
- Use responsive props for header, breathing coach, and mobile safe-area layout.
- Use recipes for repeated button treatments, especially burger menu buttons and primary session controls.
- Use slot recipes only when a custom multi-part component has repeated visual variants.

## Reference Sections In The Full Guide

- Styling concepts: `# Styling`
- Responsive design: `# Responsive Design`
- Theme and tokens: `# Theme`, `# Tokens`, `# Semantic Tokens`
- Recipes and slot recipes: `# Recipes`, `# Slot Recipes`
- Color mode: `# Color Mode`
- Composition: `# Composition`
- Component APIs: individual component sections such as `# Button`, `# Dialog`, `# Drawer`, and `# IconButton`

## Project Design Links

- [Design implementation rules](../design/implementation.md)
- [Visual language](../design/visual-language.md)
- [Responsive layout](../design/responsive-layout.md)
- [Components](../design/components.md)
