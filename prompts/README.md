# Prompts

This folder stores reusable prompts and prompt history for the Breathwork PWA project.

## Files

```text
prompt-template.md
```

Reusable template for implementing a new feature.

```text
initial-build.md
```

Concrete prompt for rebuilding the first clean version of the app from the current `docs/` documentation while preserving `app/audio/`.

```text
history/
```

Prompt history and session records.

## Recommended usage

For a new feature:

1. Copy `prompt-template.md`.
2. Fill in the feature details.
3. Save the final prompt in `history/YYYY-MM-DD_feature-name.md`.
4. Run it in Codex.
5. Add result notes and commit hash to the history entry.

For rebuilding the app:

1. Use `initial-build.md`.
2. Confirm Codex reads `docs/`.
3. Confirm `app/audio/` is preserved.
4. Test locally.
5. Commit the rebuild.
