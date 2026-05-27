# Prompt History

Use this folder to keep a history of important prompts used with Codex, ChatGPT, or other coding agents.

The goal is not to save every tiny prompt.

The goal is to preserve prompts that:
- changed the direction of the project
- generated major features
- fixed difficult bugs
- clarified architecture
- created reusable workflows
- produced a result you may want to reproduce later

## Recommended naming convention

Use:

```text
YYYY-MM-DD_short-description.md
```

Examples:

```text
2026-05-23_initial-build.md
2026-05-24_audio-cache-strategy.md
2026-05-25_voice-menu-refactor.md
```

## Recommended workflow

1. Start from `prompts/prompt-template.md`.
2. Copy the final prompt into a new file under `prompts/history/`.
3. Run the prompt in Codex.
4. Add the result summary.
5. Add the commit hash after committing the change.

## Why keep prompt history?

Prompt history acts like a lab notebook.

It helps you remember:
- what you asked
- why you asked it
- what changed
- what worked
- what did not work

It also helps future Codex sessions understand the evolution of the project.
