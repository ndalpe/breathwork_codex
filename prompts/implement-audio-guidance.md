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
docs/*.md
docs/features/*.md
```

## Feature to implement

  If documentation conflicts with existing code, prefer the documentation and mention the conflict.
  Do not reinterpret or duplicate the feature behavior in this prompt.
  If the documentation is ambiguous, stop and report the ambiguity before changing code.

## Very important preservation rule

Do not delete, rename, overwrite, or regenerate any files under:

```text
app/audio/
docs/
prompts/
thirdparty/
```

The audio files are already generated and must be reused by the app.

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
