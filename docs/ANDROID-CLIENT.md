# Ekza Studio for Android

The Android client is Ekza Studio's existing web app, packaged to run on a phone with no network at all: the same
document, operators, undo history, exporters and Halo touch layout, served from the APK's own assets instead of a
server. There is no second implementation to keep in step.

Status: **working client, phone layout tuning in progress.** The APK is built in CI
(`.github/workflows/android-client.yml`); nothing in `apps/web` changes for it except the save seam and the back
gesture below.

## What runs

```
apps/web (Next 16)  ──STUDIO_STATIC_EXPORT=1──▶  apps/web/out  ──sync.mjs──▶  mobile/www  ──cap sync──▶  APK
     source build                                 static export                package             WebView
```

- **`STUDIO_STATIC_EXPORT=1 pnpm --filter web build`** is the project's own server-less build (it was added for
  GitHub Pages, IPFS and intranets). No route handler is compiled, and the generation gateway is off: a static export
  has `NEXT_PUBLIC_EKZA_GEN_GATEWAY=''`, so the AI generation surface is hidden.
- **`mobile/`** is a Capacitor 8 shell. `mobile/scripts/sync.mjs` copies the export into `mobile/www`, writes the
  app viewport (`viewport-fit=cover`, no double-tap zoom) and **fails the build if any `src`/`href` in the export
  points outside the package** — that check is what keeps "offline" true as the app grows.
- Capacitor serves the package from `https://localhost` (not `file://`), so IndexedDB, Web Workers, WASM and the File
  API keep the secure-origin behaviour the app was written against. Autosave, projects and the model decoders all
  work as on the desktop.

## Offline guarantees

| Concern | How it holds |
| --- | --- |
| Network requests | The export is copied into the APK; `sync.mjs` refuses a build with an external URL. The static build's CSP (`apps/web/csp.ts`) allows `connect-src 'self'` only, so a stray `fetch` to the internet is blocked by the WebView too. |
| Sample models, clip library, Draco/KTX2/meshopt decoders | Copied into `public/` at build time (`apps/web/scripts/copy-assets.mjs`), so they are part of the APK (≈16 MB of samples, ≈1.4 MB of decoders). |
| Documents and undo | In the WebView's IndexedDB/localStorage, scoped to the app. |
| Exports | Written to the app's cache and handed to the Android share sheet (`androidSavePlatform` in `apps/web/app/(studio)/nativeShell.ts`): save to Files/Downloads, send, or open in another app. A WebView ignores `<a download>`, which is why this seam exists. |
| Import | The file picker (`<input type=file>`) is the system document picker; `.vrm`, `.glb`, `.ekzanim` open from Downloads or any provider. |

The app keeps the `INTERNET` permission (the WebView's engine expects it, and the desktop build's agent bridge uses
loopback); it is not needed for any feature and the CSP would block its use.

## Native pieces

- **Back gesture** — `App`'s `backButton` becomes a cancelable `ekza:native-back` DOM event. Halo's frame closes the
  topmost layer in order (confirm card, form, target, search, project menu, sheet, Halo, loupe, hidden UI, Home) and
  calls `preventDefault()`; anything unhandled minimises the app (`nativeShell.ts`, `packages/halo/src/shell/Frame.tsx`).
- **Edge-to-edge insets** — Android 15+ draws every app under the system bars. `MainActivity` applies the status,
  navigation and keyboard insets as padding on the WebView, so the page never sits under a bar or the keyboard and
  nothing is double-inset (Halo's own `env(safe-area-inset-*)` stays 0 there).
- **Chrome colours** — transparent bars with light glyphs, the app's `#1b1c1f` background, no overscroll glow, no
  zoom controls.
- **Memory profile** — `packages/editor/src/host/memoryProfile.ts` caps the device pixel ratio at 1.5 and the texture
  size at 2048 on Android screens, the way it already does for iPad Safari; undo budgets drop the same way.

## Build it

CI (recommended — a phone cannot reasonably run Gradle):

```bash
gh workflow run android-client.yml            # debug APK, signed with the debug key
gh run watch && gh run download               # artifact: ekza-studio-android-<sha>.apk
```

A release APK needs the four `EKZA_ANDROID_*` repository secrets (keystore base64, store password, key alias, key
password) and `release: true`; `mobile/android/app/build.gradle` picks them up from the environment.

Locally, with a JDK 21 and an Android SDK installed:

```bash
STUDIO_STATIC_EXPORT=1 pnpm --filter web build
pnpm --dir mobile install
pnpm --dir mobile run sync                    # sync.mjs + cap sync android
cd mobile/android && ./gradlew :app:assembleDebug
```

`adb install -r mobile/android/app/build/outputs/apk/debug/app-debug.apk`

## Phone layout

The Halo shell (`packages/halo`, route `/app`) is the touch layout and is already the app's front door. It switches on
**container width** — Compact below 700 px, Regular 700–1023, Wide from 1024 — never on the user agent, and places
sheets at the bottom edge in portrait. A phone is Compact, so the client gets:

- one row of chrome (project · search · Share · undo) with the Path folded into a bottom tab bar;
- the tray and the Animate dock stacked above the Path, with the Thumb key in the off-hand corner;
- bottom sheets at half or full height, and the Thread's Keys and Curves layers unfolding over the canvas.

What the client adds on top (the "phone pass"): safe-area and keyboard handling above, launch straight into `/app`,
and the compact fixes listed in `docs/STUDIO-TOUCH-SPEC.md` §4.6 that were written for tablets but only bite on a
390 px-wide screen.

Two orientation rules complete the pass:

- **Phones are locked to portrait.** A phone held sideways measures about 844×390, which leaves roughly 144 px of
  canvas between the Path and the tray — too little to model in. `MainActivity` locks the activity to portrait when
  the device's smallest width is below `SCREENLAYOUT_SIZE_LARGE`, so tablets and foldables keep free rotation.
- **Short frames stay usable.** If the shell is shorter than 560 px regardless (a small tablet in landscape, a split
  screen), the Animate dock drops the Animations row and the Path's Next chip, and an unfolded Keys or Curves layer is
  clamped so at least ~300 px of canvas remains above it.

Exports leave through the Android share sheet (cache dir → `Share.share`), and the system back gesture closes the
topmost Halo layer before it leaves the app; both are wired in `apps/web/app/(studio)/nativeShell.ts`.

## Known limits

- **Search, not publishing.** The APK is for installing on your own phone; "Ekza" is not licensed for use by forks
  (TRADEMARKS.md), so a store listing would need the project owner's blessing.
- **One WebView, no Chromium pinning.** A device with an old Android System WebView has an old WebGL 2; the app's own
  "WebGL is unavailable" card is the only diagnosis. Chrome 100+ / WebView 100+ is the real floor.
- **No Android-specific extras yet**: no files-provider "Open with Ekza Studio" intent, no picture-in-picture, no
  keep-screen-on during playback, no stylus pressure. Each is a small addition to `mobile/` when wanted.
- **The Pro layout (`/editor`) still works**, and is still a mouse-and-keyboard layout: on a phone it is cramped by
  design. The client opens Halo.
