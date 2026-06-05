# Audio Guidance Prompt – Implement Spoken Session Cues

Use this prompt when asking Codex to implement or repair the Breathwork PWA audio guidance system.

## Role

```text
docs/roles.md
```

## Objective

Implement the audio guidance behavior described in:

```text
docs/features/audio-guidance.md
```

Use that file as the source of truth for spoken breathing cues.

Also inspect the related documentation before changing code:

```text
docs/context.md
docs/decisions.md
docs/design.md
docs/features/breathing-coach.md
docs/features/voice-library.md
```

If documentation conflicts with existing code, prefer the documentation and mention the conflict.

## App constraints

The deployed app lives in:

```text
app/
```

Keep the app compatible with GitHub Pages.

Do not move the deployable app outside `app/`.

## Very important preservation rule

Do not delete, rename, overwrite, or regenerate any files under:

```text
app/audio/
```

The audio files are already generated and must be reused by the app.

## Audio files

Use the existing MP3 files from the selected voice folder:

```text
app/audio/heart/
app/audio/velvet/
app/audio/light/
```

The audio guidance implementation must use:

```text
inhale.mp3
exhale.mp3
hold.mp3
one.mp3
two.mp3
three.mp3
...
thirty.mp3
```

Do not generate new audio files.

## Feature requirements

Implement spoken guidance during an active breathwork session.

At the start of each breathing phase:

- play `inhale.mp3` for an inhale phase
- play `exhale.mp3` for an exhale phase
- play `hold.mp3` for either hold phase

The phase word replaces the number for that same second.

Example for a 4-second inhale:

```text
second 4: play inhale.mp3
second 3: play three.mp3
second 2: play two.mp3
second 1: play one.mp3
```

Example for a 7-second hold:

```text
second 7: play hold.mp3
second 6: play six.mp3
second 5: play five.mp3
second 4: play four.mp3
second 3: play three.mp3
second 2: play two.mp3
second 1: play one.mp3
```

For skipped phases with value `0`:

- skip the phase
- do not play the phase cue
- do not play any number cue for that phase

## Timing requirements

The visual countdown remains the source of truth.

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

The default voice remains `velvet`.

## Mute and haptic requirements

When mute is enabled:

- do not play phase cues
- do not play countdown number cues
- keep the visual timer running
- keep haptic feedback behavior unchanged if haptics are enabled

When mute is disabled again, spoken cues should resume on the next eligible countdown second or phase transition.

## Caching requirements

- Force the app to be downloaded upon each refresh.
- Do not cache app/code files.
- Do not cache audio files in the service worker.
- Keep the service worker fetch-only/no-store behavior.

## Files you must not modify

Do not modify:

```text
app/audio/
```

Do not modify:

```text
docs/
```

unless explicitly required by the user.

## Implementation guidance

Prefer a small, focused change to the existing app code.

Avoid adding new dependencies.

Keep the implementation mobile-first and accessible.

Use a clear audio scheduling model so the same countdown second cannot trigger duplicate cues.

Be careful with React effects and intervals:

- avoid stale state bugs
- avoid duplicate intervals
- avoid playing multiple audio clips for one displayed second
- reset audio state when stopping or restarting a session

## Manual testing checklist

- [ ] Start plays the first phase cue, such as `inhale.mp3`.
- [ ] A 4-second inhale plays `inhale`, `three`, `two`, `one`.
- [ ] A hold phase plays `hold` on the first second of the hold.
- [ ] An exhale phase plays `exhale` on the first second of the exhale.
- [ ] The number for the first second of a phase is not played.
- [ ] Skipped `0` phases do not play audio.
- [ ] Countdown loops correctly across full breath cycles.
- [ ] Breath counter increments after a completed breath.
- [ ] Mute disables all spoken cues.
- [ ] Unmuting resumes spoken cues without restarting the session.
- [ ] Selected voice folder is used for all requested MP3 files.
- [ ] Changing voice preloads the new voice folder.
- [ ] Service worker does not cache app/code files.
- [ ] Service worker does not cache audio files.
