# Breathing Coach

## Goal

Provide a simple, reliable breathing timer that lets the user experiment with selected breathwork.

The engine should feel calm.

## Current Implementation

### When no breathwork is running

When no breathwork is running, the BC only contains:

- The currently selected breathing pattern name
- The selected breathing pattern text below the breathing pattern name.
For example:
Box breathing
4-4-4-4

- The BC also contains a button to start the breathwork.

### When a breathwork is running

When we start a breathwork the BC becomes full screen. The breathing coach uses a 3-zone full-screen layout:

1. Top zone (fixed height): session stats (duration + completed breaths) and header controls. The mute button from the header should also be displayed.

2. Middle zone (flex: 1): vertically and horizontally centered content block containing phase label, countdown, and breathing pattern text. This middle block must remain visually centered in the available space at all screen sizes. The countdown should be displayed in bigger digits. The breathing pattern in seconds. For example: 4-7-8-0

3. Bottom zone (fixed height): stop button pinned to the viewport bottom and always fully visible without any scrolling.

## Countdown display rules

During an active breathwork session, the countdown displays only positive seconds.

The countdown must never display `0`.

When the current phase reaches the end:

- immediately advance to the next non-skipped phase
- display the next phase duration
- skip any phase with value `0`
- increment the completed breath counter only after the final non-skipped phase of a full breath cycle completes

Example for a 4-second inhale:

- display `4`
- display `3`
- display `2`
- display `1`
- then advance directly to the next phase

Do not display `0` between phases.
