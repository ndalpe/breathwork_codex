# Breathing Coach

## Goal

Provide a simple, reliable breathing timer that lets the user experiment with selected breathwork.

The engine should feel calm.

## Current Implementation
### When no breathwork is running
When no breathwork is running, the BC only contains the currently selected breathing pattern name, followed by the breathing pattern text below it. For example: Box breathing 4-4-4-4.

The BC also contains a button to start the breathwork. The currently selected breathing pattren should have a slightly beigger font the the number of seconds.

### When a breathwork is running
When we start a breathwork the BC becomes full screen. The breathing coach uses a 3-zone full-screen layout:

1. Top zone (fixed height): session stats (duration + completed breaths) and header controls. The mute button from the header should also be displayed.

2. Middle zone (flex: 1): vertically and horizontally centered content block containing phase label, countdown, and breathing pattern text. This middle block must remain visually centered in the available space at all screen sizes. The countdown should be displayed in bigger digits. The breathing pattern in seconds. For example: 4-7-8-0

3. Bottom zone (fixed height): stop button pinned to the viewport bottom and always fully visible without any scrolling.


Hard constraint: The middle countdown block must never overlap with the stop button.
Required safe spacing: reserve at least 96px bottom space for the stop zone (including mobile safe-area inset).
On mobile, the stop button must stay within viewport and the countdown digits must remain fully visible above it.
