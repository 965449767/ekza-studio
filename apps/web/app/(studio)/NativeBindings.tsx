'use client';

import { useEffect } from 'react';
import { installBackButton, installFullscreenBars, isNativeShell } from './nativeShell';

/**
 * The installed app's page-level bindings (docs/ANDROID-CLIENT.md): the system back gesture, handed to the page and
 * only leaving the app when nothing closed, and the system bars following the page's Full screen state. Renders
 * nothing and adds nothing in a browser.
 */
export function NativeBindings(): null {
  useEffect(() => {
    if (!isNativeShell()) return undefined;
    const disposeBack = installBackButton();
    const disposeFullscreen = installFullscreenBars();
    return () => {
      disposeBack();
      disposeFullscreen();
    };
  }, []);
  return null;
}
