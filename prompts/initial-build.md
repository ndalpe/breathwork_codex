# Initial Build Prompt – Rebuild Breathwork PWA From Documentation

Use this prompt when asking Codex to rebuild the app from scratch while preserving the existing audio files.

## Role

You are rebuilding the Breathwork PWA from scratch based on the current project documentation.

```text
docs/roles.md
```

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

Do not modify:

```text
docs/
thirdparty/
prompts/
```

unless explicitly required by the user.
