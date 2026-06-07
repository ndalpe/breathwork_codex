# Breathing coach Prompt

Use this prompt when asking Codex to implement or repair the Breathwork PWA breathing coach.

## Role

```text
docs/roles.md
```

## Objective

Implement the breathing coach behavior described in:

```text
docs/features/breathing-coach.md
```

Use that file as the source of truth for spoken breathing cues.

Also inspect the related documentation before changing code:

```text
docs/*.md
docs/features/*.md
```

## Feature to implement

- If documentation conflicts with existing code, prefer the documentation and mention the conflict.
- Do not reinterpret or duplicate the feature behavior in this prompt.
- If the documentation is ambiguous, stop and report the ambiguity before changing code.

## Very important preservation rule

Do not delete, rename, overwrite, or regenerate any files under:

```text
app/audio/
docs/
prompts/
thirdparty/
```

The audio files are already generated and must be reused by the app.
