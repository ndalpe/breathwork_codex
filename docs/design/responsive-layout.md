# Responsive Layout

## General

- Design mobile-first.
- Use Chakra UI responsive object syntax for breakpoint-specific layout.
- Prefer clear breakpoint boundaries such as `smDown` and `md` when variants differ.
- Account for mobile safe-area insets where bottom controls are present.

## Header

- The top of the screen is called the header.
- The left side of the header contains the burger menu button.
- The right side of the header contains the mute button to toggle voice on or off.
- The right side of the header also contains the haptic button to toggle vibration on or off.

## Breathing Coach

- The breathing coach, or BC, sits below the header.
- The currently selected breathing pattern should have a slightly larger font than the number of seconds.
- The middle zone block must never overlap with the stop button.
- Reserve at least `96px` bottom space for the bottom zone, including the mobile safe-area inset.
- On mobile, the stop button must stay within the viewport.
- On mobile, the countdown digits must remain fully visible above the stop button.

## Active Session

- When a breathwork session starts, the breathing coach should take the available screen real estate while keeping the header visible.
- The breathing pattern library entry point is hidden during an active session.
- The custom breathing pattern entry point is hidden during an active session.
