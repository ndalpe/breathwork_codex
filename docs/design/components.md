# Components

This file maps project components to Chakra UI primitives and design rules.

## App Header

- Purpose: persistent top-level controls.
- Chakra candidates: `Flex`, `IconButton`, `HStack`.
- Contains the burger menu button on the left.
- Contains voice mute and haptic toggle controls on the right.

## Breathing Coach

- Purpose: primary breathwork experience.
- Chakra candidates: `Box`, `Stack`, `Text`, custom layout.
- Must preserve safe spacing above the stop button.
- Must keep countdown digits fully visible on mobile.

## Breathing Pattern Library Button

- Purpose: entry point to pattern selection when idle.
- Chakra candidates: `Button`.
- Label: `Breathing pattern library`.

## Custom Breathing Pattern Entry

- Purpose: reveal custom breathing pattern controls when idle.
- Chakra candidates: `Button`, `Collapsible`, `Field`, `NumberInput`.
- Label: `Custom breathing pattern`.

## Burger Menu

- Purpose: full-screen navigation.
- Chakra candidates: `Drawer` or `Dialog`, `Portal`, `CloseButton`, `Button`, `Stack`.
- Must cover the screen when open.
- Must keep the close button visible at the top right.
- Menu item buttons must share one visual treatment.

## Chakra Component Strategy

- Use Chakra built-ins for accessible primitives before creating custom controls.
- Use recipes for repeated single-part component variants.
- Use slot recipes for repeated multi-part components.
- Use `asChild` when composing Chakra behavior onto custom child elements.
