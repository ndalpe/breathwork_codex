# Audio Guidance

  ## Goal

  Provide spoken breathwork guidance during an active session.

  ## Audio files

  Audio files are stored by selected voice:

  - `app/audio/velvet/`
  - `app/audio/heart/`
  - `app/audio/light/`

  Each folder contains:

  - `inhale.mp3`
  - `exhale.mp3`
  - `hold.mp3`
  - `one.mp3` through `thirty.mp3`

## Playback sequence

  At the start of each breathing phase:

  1. Play the phase cue:
     - inhale phase: `inhale.mp3`
     - hold phase: `hold.mp3`
     - exhale phase: `exhale.mp3`

  2. Do not play the number for that same second.

  3. On each following second in the same phase, play the remaining countdown number.

Example for a 4-second inhale:

  - second 4: play `inhale.mp3`
  - second 3: play `three.mp3`
  - second 2: play `two.mp3`
  - second 1: play `one.mp3`

Example for a 7-second hold:

  - second 7: play `hold.mp3`
  - second 6: play `six.mp3`
  - second 5: play `five.mp3`
  - second 4: play `four.mp3`
  - second 3: play `three.mp3`
  - second 2: play `two.mp3`
  - second 1: play `one.mp3`

## Timing rule

  Each cue occupies one timing second.

  If an audio file is shorter than one second, the app waits until the next second before playing the next cue.
  Audio playback must not advance the timer; the visual timer remains the source of truth.

## Skipped phases

  A breathing phase with value `0` is skipped.

  No audio cue is played for skipped phases.

## Mute behavior

  When mute is enabled:

  - No phase cue is played.
  - No countdown number is played.
  - The visual timer continues normally.
  - Haptic feedback may still run if enabled.

## Preloading

  When the app starts, preload all MP3 files for the selected voice.

  When the selected voice changes, preload all MP3 files for the new voice.

  Audio files should not be cached by the service worker.

Key Clarification
  The important sentence is this:

  - “At phase start, play the phase word instead of the number for that same second.”