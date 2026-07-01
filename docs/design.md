# App design ( UI/UX )

## User Interface

### General guidelines

- The user interface must respect the WCAG accessibility standard
- UI should be as minimal as possible, exposing the features needed according to the users context
- Play with text size to emphasize information

### Header

- The top of the screen is called the header.
- On the left of the header is for the location of the burger menu.
- The right of the header contains the mute button to toggle the voice on or off
- The right of the header also contains the haptic button to toggle vibration on or off

### Breathing Coach

- Below the header is the breathing coach (or BC for short)
- The currently selected breathing pattren should have a slightly beigger font the the number of seconds.
- The middle zone block must never overlap with the stop button.
- Required safe spacing: reserve at least 96px bottom space for the bottom zone (including mobile safe-area inset).
- On mobile, the stop button must stay within viewport and the countdown digits must remain fully visible above it.

### Breathing pattern library button

- When no breathwork is running, display a button below the BC so the user can access the breathing pattern library.
- This button should be labeled "Breathing pattern library"

### Custom breathing pattern

- When no breathwork is running, display a button labeled "Custom breathing pattern". Tapping on this button would expand the CBP widget.

### The burger menu

- When tapped, the burger menu should take all the screen space
- The BM should have a background color
- The title of the burger menu is "Menu" and is aligned center.
- The title of the BM should be displayed with a contrasting color and be easy to read
- The BM contains a link to the breathing pattern library.
- The BM should also contain a link to the voice library.
- At the top right of the menu there is a X button, visible at all time, allowing the user to close the burger menu
- The buttons in the BM have a title in bold caracter followed by a line break and a description
- The visual design of all buttons in the BM should be identical to keep a visual consistency

## User Experience

- When a breathwork session is starts, the BC should take all the screen real-estate while keeping the header visible.
- The breathing pattern library is hidden when a breathwork session starts
- The Custom breathing pattern is hidden when a breathwork session starts
