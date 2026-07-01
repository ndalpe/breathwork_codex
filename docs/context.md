# Project Context

- PWA breathwork app
- Offline-first
- Built with React JS
- React JS should use development build for easier debugging
- Built with Chakra UI
- App is deployed to GitHub Pages from the `app/` folder using GitHub Actions.
- Only final production-ready files should be copied into app/.
- Avoid unnecessary dependencies.
- Do not cache app/code files unless explicitly requested.
- Preserve GitHub Pages compatibility.
- Preserve mobile-first usability.
- Preserve accessibility where possible.

## Implementation guidance

Refer to docs/frameworks/chakraui-llms-full.txt for Chakra UI implementation

Be careful with React effects and intervals:

- avoid stale state bugs
- avoid duplicate intervals
- avoid playing multiple audio clips for one displayed second
- reset audio state when stopping or restarting a session
