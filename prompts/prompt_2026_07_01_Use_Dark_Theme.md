# Chakra UI Dark Mode Prompt

Default the UI to dark mode and use Chakra’s built-in blue colorPalette for primary actions, selected states, active states, focus emphasis, and breathing coach highlights.

## Role

You are rebuilding the Breathwork PWA from scratch based on the current project documentation.

```text
docs/roles.md
```

## Objective

Rebuild the app frontend to use the Chakra UI dark mode theme using the current documentation found in:

```text
docs/
```

The visual and implementation guidelines are added in

```text
docs/design/visual-language.md
docs/design/implementation.md
```

The dark mode and blue color palette apply to the full frontend and PWA shell, including:

```text
app/index.html
app/manifest.json
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
