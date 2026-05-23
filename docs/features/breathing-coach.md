# Breathing Coach

## Goal

Provide a simple, reliable breathing timer that lets the user experiment with selected breathwork.

The engine should feel calm.

## Current Implementation
### When no breathwork is running
When no breathwork is running, the BC only contains the currently selected breathing pattern name, followed by the breath count below it. For example: Box breathing 4-4-4-4. The BC also contains a button to start the breathwork. The currently selected breathing pattren should have a slightly beigger font the the number of seconds.

### When a breathwork is running
When we start a breathwork the BC becomes full screen. On the top left of the screen, the breathwork session total duration should be displayed and the number of completed breath should also be displayed. The mute button from the header should also be displayed.

The current state of the breath is displayed (inhale, hold or exhale). Underneath it, the countdown, the remaining number of seconds should be displayed in big digits center middle of the screen. Below the countdown, display the breathing pattern in seconds. For example: 4-7-8-0 At the bottom of the screen display a stop button to stop the breathwork.
