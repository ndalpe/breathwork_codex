# Prompt Template – Implement a New Feature

Use this prompt when asking Codex to implement a new feature in the Breathwork PWA.

## Role

You are helping me continue the Breathwork PWA project.

You are acting as:

- senior frontend developer
- product-minded implementation partner
- careful refactoring assistant
- documentation-aware coding agent

## Project context

Repository: `ndalpe/breathwork_codex`

Current project structure:

```text
app/                     # deployable PWA
app/audio/               # final production voice clips
docs/                    # product and technical documentation
tasks/                   # backlog/current/done tracking
thirdparty/              # generation workflows and provider-specific tools
thirdparty/elevenlab/    # ElevenLabs voice generation workflow
.github/workflows/       # GitHub Pages deployment
prompts/                 # reusable Codex prompts and prompt history
```

The app is published on GitHub Pages from the `app/` folder through GitHub Actions.

## Relevant documentation to read first

Before changing code, inspect:

```text
docs/vision.md
docs/context.md
docs/roadmap.md
docs/decisions.md
docs/features/
tasks/current.md
```

## Relevant rules to read first

Before changing code, inspect:

```text
prompts/rules/before-coding.md
prompts/rules/implementation.md
prompts/rules/after-coding.md
```

If a file does not exist, mention it and proceed with the closest available context.

## Feature to implement

Replace this section with the concrete feature request.

```text
FEATURE TITLE:
[Write the feature title here]

USER STORY:
As a [type of user],
I want [capability],
so that [benefit].

DETAILED DESCRIPTION:
[Describe exactly what should be added or changed.]

ACCEPTANCE CRITERIA:
- [ ] Criterion 1
- [ ] Criterion 2
- [ ] Criterion 3

OUT OF SCOPE:
- [List anything Codex should not change.]
```
