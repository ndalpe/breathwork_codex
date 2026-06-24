# Project Context

- PWA breathwork app
- Offline-first
- Built with React JS
- Uses Vite's development server for local debugging
- Built with Chakra UI
- Source code lives in `src/`; static PWA assets and audio live in `app/`.
- GitHub Actions builds the app and deploys the generated `dist/` directory to GitHub Pages.
- Avoid unnecessary dependencies.
- Do not cache app/code files unless explicitly requested.
- Preserve GitHub Pages compatibility.
- Preserve mobile-first usability.
- Preserve accessibility where possible.
- Use Chakra style props and theme tokens for CSS; do not add Tailwind CSS.

## Implementation guidance

Be careful with React effects and intervals:

- avoid stale state bugs
- avoid duplicate intervals
- avoid playing multiple audio clips for one displayed second
- reset audio state when stopping or restarting a session
