# Documentation — Breathwork

This folder contains design, feature, and roadmap documentation for the breathwork app.

Purpose
- Centralize product decisions, UX specs, and implementation notes for designers and developers.
- Make the current project state discoverable: implemented features, in-progress work, and planned work.

Mental model
- /docs = knowledge
- /prompts = execution
- /tasks = planning

How to read these docs
- Start with `context.md` for high-level goals and constraints.
- Read `vision.md` to understand design principles and product intent.
- Use `design.md` for UI/UX component behavior, screen states, and accessibility notes.
- Open `features/` for concrete feature designs and expected data formats.
- Check `roadmap.md` for phased milestones and priorities.
- Consult `decisions.md` for recorded architecture and product tradeoffs.

Files in this folder
- `context.md` — project context, target users, and technical constraints.
- `vision.md` — product vision, principles, and high-level goals.
- `design.md` — UI and UX specifications (Header, Breathing Coach, menus, session states).
- `features/` — feature-level documents (breathing engine, voice system, etc.).
- `roadmap.md` — phased plan from Core → Immersion → Intelligence.
- `decisions.md` — architecture and product decisions (intended as the single source of truth).

Suggested next steps
1. Populate `decisions.md` with concrete entries (service worker caching strategy, audio format choice, voice caching approach).
2. Add `architecture.md` describing component layout, service worker behavior, and audio/haptic flow.
3. Add examples/data models (breathing pattern JSON schema, voice file naming conventions).
4. Add a `Maintainers` section with owners and contact info.

Notes
- This file is an index — link to deeper docs for implementation specifics.
- Keep this README minimal and update links as docs evolve.