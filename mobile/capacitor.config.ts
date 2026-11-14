import type { CapacitorConfig } from '@capacitor/cli';

/**
 * The Android client (docs/ANDROID-CLIENT.md): the static export of `apps/web` served from the APK's own assets.
 * `webDir` is filled by `scripts/sync.mjs` from `apps/web/out`; nothing is fetched at runtime, so the client works
 * with the radio off. `https` + `localhost` keeps IndexedDB, Web Workers and the File API on a secure origin, which
 * `file://` would not.
 */
const config: CapacitorConfig = {
  appId: 'io.ekza.studio.mobile',
  appName: 'Ekza Studio',
  webDir: 'www',
  backgroundColor: '#1b1c1f',
  server: {
    androidScheme: 'https',
    hostname: 'localhost',
    // No `url`: the app always loads the bundled build, never a dev server.
    cleartext: false,
    /**
     * Start on Halo's page as a real file. Capacitor's HTML5 mode answers every extension-less path with the root
     * `index.html`, and the landing page then redirects to `/app` — which would be answered by `index.html` again
     * (a reload loop). `/app.html` is the export's own file: the shell boots, and Next's client router takes over
     * from there. `pnpm --dir mobile run sync` checks that the file exists.
     */
    appStartPath: '/app.html',
  },
  android: {
    allowMixedContent: false,
    captureInput: true,
    // Debug builds turn WebView debugging on (chrome://inspect); release builds keep it off.
    webContentsDebuggingEnabled: false,
  },
};

export default config;
