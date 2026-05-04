# Breathwork Timer PWA v4

## New features

- Burger menu with two levels:
  - Breathing pattern
  - Choose voice
- Voice choices:
  - Heart
  - Velvet
  - Light
- Voice clips are loaded from:
  - `audio/heart`
  - `audio/velvet`
  - `audio/light`
- Selected voice is saved in the browser with `localStorage`.
- Timer area displays only the chosen breathing pattern name and timing.

## Add your generated ElevenLabs MP3 files

Copy your generated MP3 files into:

```text
audio/heart/
audio/velvet/
audio/light/
```

Each voice folder should contain:

```text
inhale.mp3
hold.mp3
exhale.mp3
one.mp3
two.mp3
three.mp3
four.mp3
five.mp3
six.mp3
seven.mp3
eight.mp3
nine.mp3
ten.mp3
eleven.mp3
twelve.mp3
thirteen.mp3
fourteen.mp3
fifteen.mp3
sixteen.mp3
seventeen.mp3
eighteen.mp3
nineteen.mp3
twenty.mp3
twenty-one.mp3
twenty-two.mp3
twenty-three.mp3
twenty-four.mp3
twenty-five.mp3
twenty-six.mp3
twenty-seven.mp3
twenty-eight.mp3
twenty-nine.mp3
thirty.mp3
```

If a clip cannot play, the app falls back to browser text-to-speech.

## GitHub Pages

Upload the project contents to the root of your GitHub Pages repository.


## Cache behavior in v4.2

- All MP3 files in `audio/heart`, `audio/velvet`, and `audio/light` are precached for offline use.
- Code files such as `index.html`, `service-worker.js`, `manifest.json`, CSS, and JavaScript are not cached by the service worker.
- App code updates should be picked up fresh, while voice clips remain available offline.

After deploying this version, close/reopen the PWA or refresh twice if your browser still has an older service worker installed.


## Cache behavior in v4.3

- Any file requested from the `/audio/` folder is cached automatically.
- This includes future MP3 files you add later, without modifying the service worker.
- Code files such as `index.html`, `service-worker.js`, `manifest.json`, CSS, and JavaScript are not cached by the service worker.
- Important: browsers cannot automatically discover every file in a folder. A new audio file is cached after the app requests it at least once.
