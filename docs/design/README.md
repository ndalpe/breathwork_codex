# Design Overview

The design documentation is organized in layers:

1. Product principles explain why the interface should feel and behave a certain way.
2. Design system rules define reusable visual and interaction decisions.
3. Screen and component docs apply those rules to concrete app surfaces.
4. Implementation guidance maps those decisions to Chakra UI.

## Files

- [Principles](principles.md) - durable design goals.
- [Accessibility](accessibility.md) - inclusive interaction and visual requirements.
- [Responsive layout](responsive-layout.md) - mobile-first layout and viewport constraints.
- [Visual language](visual-language.md) - reusable visual rules.
- [Interaction patterns](interaction-patterns.md) - behavior for common UI patterns.
- [Motion](motion.md) - animation and feedback rules.
- [Components](components.md) - project components and Chakra mappings.
- [Screens](screens.md) - screen-level UI states.
- [Implementation](implementation.md) - Chakra UI implementation rules.

## Maintenance Rules

- Keep framework-authored documentation in `docs/frameworks/`.
- Keep app-specific design decisions in `docs/design/`.
- Keep feature-specific requirements in `docs/features/`.
- Prefer links over duplicating large framework reference content.
