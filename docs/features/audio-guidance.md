# Audio Guidance

  ## Goal

  Provide spoken breathwork guidance during an active session.

  ## Audio files

  Audio files are stored by selected voice.
  Use the existing MP3 files from the selected voice folder:

  - `app/audio/velvet/`
  - `app/audio/heart/`
  - `app/audio/light/`

  Each folder contains:

  - `inhale.mp3`
  - `exhale.mp3`
  - `hold.mp3`
  - `one.mp3` through `thirty.mp3`

Do not generate new audio files.

## Playback sequence

  At the start of each breathing phase:

  1. Play the phase cue:
     - inhale phase: `inhale.mp3`
     - hold phase: `hold.mp3`
     - exhale phase: `exhale.mp3`

  2. The phase word replaces the number for that same second.

  3. Do not play the number for that same second.

  4. On each following second in the same phase, play the remaining countdown number.

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

## Timing requirements

Audio playback must not advance the timer; the visual timer remains the source of truth.

Each cue occupies one timing second.

The app should trigger exactly one spoken cue per displayed countdown second when audio is enabled:

- phase word on the first displayed second of a phase
- countdown number on each following displayed second in that phase

Do not play the phase word and number at the same time.

Do not let short audio files compress the timer.

If an audio file is shorter than one second, wait until the next countdown second before playing the next cue.

## Voice selection requirements

Use the currently selected voice folder for all spoken cues.

When the voice changes:

- preload all MP3 files from the newly selected voice folder
- future cues must use the new folder

## Skipped phases

  A breathing phase with value `0` is skipped.

  No audio cue is played for skipped phases.

## Mute and haptic requirements

When mute is enabled:

- do not play phase cues
- do not play countdown number cues
- keep the visual timer running
- keep haptic feedback behavior unchanged if haptics are enabled

When mute is disabled again, spoken cues should resume on the next eligible countdown second or phase transition.

## Preloading and playback

- When the app starts, preload all MP3 files for the selected voice once.
- When the selected voice changes, preload all MP3 files for the new voice once.
- The app must create one reusable in-memory audio player per cue.
- Each cue should be loaded into a persistent `Audio` element or equivalent reusable audio buffer.
- During a session, spoken cues must be played from the already-preloaded audio player.
- Do not create a new `Audio` object every time a cue is played.
- During a session, spoken cues must be played from the already-preloaded audio objects.
- Do not create a new network request each time a cue is played.
- When replaying a cue, reset and reuse the existing preloaded player:
  - pause the existing player if needed
  - set playback position back to the beginning
  - play the same preloaded player again
- If a cue is already playing when it is requested again, restart that same preloaded cue rather than creating another audio object.
- The implementation should remain stable during long sessions and must not accumulate new audio objects over time.
- If the same cue is needed multiple times, reuse or clone the preloaded audio element/buffer in memory.

## Caching requirements

- Do not cache app/code files in the service worker.
- Do not store audio files in the service worker Cache Storage.
- The no-cache service worker rule means audio files should not be persistently cached by the service worker; it does not mean audio should be re-downloaded on every playback.
