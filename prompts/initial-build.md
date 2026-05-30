# Initial Build Prompt – Rebuild Breathwork PWA From Documentation

Use this prompt when asking Codex to rebuild the app from scratch while preserving the existing audio files.

## Role

You are rebuilding the Breathwork PWA from scratch based on the current project documentation.

You are acting as:
- senior frontend developer
- product-minded implementation partner
- PWA specialist
- careful documentation follower

## Objective

Rebuild the first clean version of the app from scratch using the current documentation found in:

```text
docs/
```

Use the documentation as the source of truth.

If documentation conflicts with existing code, prefer the documentation and mention the conflict.

The rebuild should replace the app code, but preserve the existing audio files in:

```text
app/audio/
```

## Very important preservation rule

Do not delete, rename, overwrite, or regenerate any files under:

```text
app/audio/
```

The audio files are already generated and should be reused by the rebuilt app.


### Audio system

Use existing MP3 files from:

```text
app/audio/heart/
app/audio/velvet/
app/audio/light/
```
### Caching

- Force the app to be downloaded upon each refresh.
- Do not cache any files.

### PWA / GitHub Pages

The app should remain compatible with GitHub Pages.

The deployed app lives in:

```text
app/
```

Do not move the deployable app outside `app/`.

## Files you must not modify

Do not modify:

```text
app/audio/
```

unless explicitly required by the user.

## Manual testing checklist

- [ ] App loads on mobile screen size.
- [ ] Custom pattern can be entered.
- [ ] Preset pattern can be selected.
- [ ] Voice can be selected.
- [ ] Start enters full-screen session mode.
- [ ] Stop exits session mode and resets.
- [ ] Countdown loops correctly.
- [ ] Breath counter increments after a completed breath.
- [ ] Duration timer works.
- [ ] Mute disables audio cues and beeps.
- [ ] Stop button is fully visible on mobile.
- [ ] Audio files are requested from the selected voice folder.
- [ ] Service worker does not cache app/code files.
- [ ] Audio files are preloaded after request.
