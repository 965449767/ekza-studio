// The Android client's seam between the web app and the native shell (docs/ANDROID-CLIENT.md).
//
// The client is the same static export the browser runs; the only things it needs from the shell are the two that a
// browser tab cannot give it: files leave through the Android share sheet (a WebView ignores `<a download>`), and the
// system back gesture closes the thing it should close instead of the app.
//
// Capacitor injects `window.Capacitor` into every page before the app's own scripts run, so this module imports no
// Capacitor package: the browser build stays byte-for-byte the desktop one apart from this file and one prop.
import type { SavePlatform } from '@ekza-studio/editor';

/** The slice of `window.Capacitor` and its plugins this shell uses (typed by hand: no dependency on the packages). */
interface NativeBridge {
  readonly isNativePlatform?: () => boolean;
  readonly Plugins?: {
    readonly Filesystem?: {
      writeFile(options: {
        readonly path: string;
        readonly data: string;
        readonly directory: 'CACHE';
        readonly recursive: boolean;
      }): Promise<{ readonly uri: string }>;
    };
    readonly Share?: {
      share(options: {
        readonly title?: string;
        readonly dialogTitle?: string;
        readonly files?: readonly string[];
        readonly url?: string;
      }): Promise<unknown>;
    };
    readonly App?: {
      addListener(
        event: 'backButton',
        listener: () => void,
      ): Promise<{ readonly remove: () => Promise<void> }> | { readonly remove: () => Promise<void> };
      exitApp(): Promise<void>;
      minimizeApp(): Promise<void>;
    };
    /** `FullscreenPlugin.java`: the Android system bars follow the page's Full screen state. */
    readonly HaloFullscreen?: {
      setImmersive(options: { readonly enabled: boolean }): Promise<void>;
    };
  };
}

const bridge = (): NativeBridge | undefined => (globalThis as { readonly Capacitor?: NativeBridge }).Capacitor;

/** True inside the Android app, false in every browser (the shell and the website share one build). */
export function isNativeShell(): boolean {
  return bridge()?.isNativePlatform?.() === true;
}

/** The 4-byte-aligned base64 the Filesystem plugin takes (chunked: a 30 MB VRM must not blow the call stack). */
export function toBase64(bytes: Uint8Array): string {
  let binary = '';
  const chunk = 0x8000;
  for (let offset = 0; offset < bytes.length; offset += chunk) {
    binary += String.fromCharCode(...bytes.subarray(offset, offset + chunk));
  }
  return btoa(binary);
}

/** A file name the Filesystem plugin accepts (`/` is its directory separator). */
function safeName(name: string): string {
  return name.replace(/[\\/:*?"<>|]/g, '-');
}

/**
 * Writes `bytes` into the app's cache and opens the Android share sheet on it, so the person can save it to Files,
 * Downloads, Drive, a chat app or anywhere else the system offers. Returns the shared file's name, or null when the
 * shell refused it (a cancelled share sheet is not an error).
 */
export async function shareBytes(name: string, bytes: Uint8Array, mime: string): Promise<string | null> {
  const plugins = bridge()?.Plugins;
  const filesystem = plugins?.Filesystem;
  const share = plugins?.Share;
  if (filesystem === undefined || share === undefined) return null;
  const fileName = safeName(name);
  const { uri } = await filesystem.writeFile({
    path: `exports/${fileName}`,
    data: toBase64(bytes),
    directory: 'CACHE',
    recursive: true,
  });
  try {
    await share.share({ title: fileName, dialogTitle: fileName, files: [uri], url: uri });
  } catch (error) {
    // Capacitor rejects when the sheet is dismissed; the file stays in the cache for the next share.
    console.warn(`Ekza Studio: the share sheet did not open for ${fileName} (${mime})`, error);
    return null;
  }
  return fileName;
}

/**
 * The Android save platform (the `SavePlatform` seam the editor's FileService and its SaveTickets already take):
 * nothing waits for user activation inside a native app, so a save writes the file and opens the share sheet at once.
 */
export function androidSavePlatform(): SavePlatform {
  return {
    prefersShare: () => false,
    canShare: () => true,
    share: async (file) => {
      await shareBytes(file.name, new Uint8Array(await file.arrayBuffer()), file.type);
    },
    download: (name, bytes, mime) => {
      void shareBytes(name, bytes, mime).catch((error: unknown) => {
        console.error(`Ekza Studio: ${name} could not be shared`, error);
      });
    },
    setTimeout: (fn, ms) => globalThis.setTimeout(fn, ms),
    clearTimeout: (handle) => globalThis.clearTimeout(handle as ReturnType<typeof globalThis.setTimeout>),
  };
}

/**
 * Gives the system back gesture to the page: a `cancelable` `ekza:native-back` event travels through the DOM first
 * (Halo's frame calls `preventDefault()` when it closed something), and only an unhandled press leaves the app.
 * Returns the disposer (`App`'s listener is async, so the disposer awaits it).
 */
export function installBackButton(): () => void {
  const app = bridge()?.Plugins?.App;
  if (app === undefined) return () => {};
  let disposed = false;
  let registered: { readonly remove: () => Promise<void> } | null = null;
  const registration = app.addListener('backButton', () => {
    const event = new CustomEvent('ekza:native-back', { cancelable: true });
    const handled = !window.dispatchEvent(event);
    if (handled) return;
    void app.minimizeApp().catch(() => app.exitApp());
  });
  void Promise.resolve(registration).then((listener) => {
    if (disposed) void listener.remove();
    else registered = listener;
  });
  return () => {
    disposed = true;
    void registered?.remove();
  };
}

/**
 * Hands the page's Full screen state to the shell (docs/ANDROID-CLIENT.md): the browser Fullscreen API inside a
 * WebView cannot hide the Android status and navigation bars, so entering full screen asks the native plugin to hide
 * them (transient by swipe) and leaving it brings them back. Without this the "Full screen" operator would only widen
 * the page inside the same bars.
 */
export function installFullscreenBars(): () => void {
  const plugin = bridge()?.Plugins?.HaloFullscreen;
  if (plugin === undefined) return () => {};
  const sync = (): void => {
    void plugin.setImmersive({ enabled: document.fullscreenElement !== null }).catch(() => undefined);
  };
  document.addEventListener('fullscreenchange', sync);
  sync();
  return () => document.removeEventListener('fullscreenchange', sync);
}
