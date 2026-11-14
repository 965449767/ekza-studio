'use client';

import { useEffect } from 'react';
import { installBackButton, isNativeShell } from './nativeShell';

/**
 * The installed app's page-level bindings (docs/ANDROID-CLIENT.md): the system back gesture, handed to the page and
 * only leaving the app when nothing closed. Renders nothing and adds nothing in a browser.
 */
export function NativeBindings(): null {
  useEffect(() => (isNativeShell() ? installBackButton() : undefined), []);
  return null;
}
