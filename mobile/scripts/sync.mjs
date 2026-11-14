#!/usr/bin/env node
// Copies the web app's static export into the Android shell's `www/` and applies the few HTML changes an app shell
// needs. Run after `STUDIO_STATIC_EXPORT=1 pnpm --filter web build` (`pnpm --dir mobile sync` runs it for you).
//
// The export is the whole client: no request leaves the WebView, so the only things this script may do to it are
// presentational (the viewport tag). It fails rather than ships a build that points anywhere else.
import { cpSync, existsSync, readFileSync, readdirSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const mobileDir = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const repoDir = resolve(mobileDir, '..');
const exportDir = join(repoDir, 'apps/web/out');
const wwwDir = join(mobileDir, 'www');

const die = (message) => {
  console.error(`sync: ${message}`);
  process.exit(1);
};

if (!existsSync(join(exportDir, 'index.html'))) {
  die(
    'apps/web/out is missing. Build the static export first:\n' +
      '  STUDIO_STATIC_EXPORT=1 pnpm --filter web build',
  );
}

// A fresh copy every time: a stale chunk from an older build must never be packaged (Capacitor serves www/ verbatim).
rmSync(wwwDir, { recursive: true, force: true });
cpSync(exportDir, wwwDir, { recursive: true });

/** The viewport an installed app needs: safe-area insets on, no double-tap zoom, no text autosizing surprises. */
const APP_VIEWPORT = 'width=device-width, initial-scale=1, viewport-fit=cover, maximum-scale=1, user-scalable=no';

/** Every URL the export names in an `src`/`href`; anything not served by the package itself is a build error. */
const LINKED_URL = /(?:src|href)="([a-z]+:\/\/[^"]+)"/g;
const LOCAL = /^(?:https?:\/\/(?:localhost|127\.0\.0\.1)(?::\d+)?\/|data:|blob:)/;

const external = new Set();
let patched = 0;

function walk(dir) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) {
      walk(path);
    } else if (path.endsWith('.html')) {
      patchHtml(path);
    }
  }
}

function patchHtml(path) {
  const before = readFileSync(path, 'utf8');
  let after = before.replace(/<meta name="viewport"[^>]*>/, `<meta name="viewport" content="${APP_VIEWPORT}"/>`);
  if (after === before) after = before.replace('<head>', `<head><meta name="viewport" content="${APP_VIEWPORT}"/>`);
  if (after === before) die(`${path}: no <head> to patch`);
  for (const match of after.matchAll(LINKED_URL)) {
    if (!LOCAL.test(match[1])) external.add(match[1]);
  }
  if (after !== before) {
    writeFileSync(path, after);
    patched += 1;
  }
}

function bytes(dir) {
  let total = 0;
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    total += statSync(path).isDirectory() ? bytes(path) : statSync(path).size;
  }
  return total;
}

walk(wwwDir);

if (external.size > 0) {
  die(`the export points outside the package: ${[...external].join(', ')}`);
}

// `capacitor.config.ts` starts the app on this file (HTML5 mode would answer `/app` with the root index.html, whose
// landing page redirects to `/app` again: a loop). A route rename must fail here, not in the WebView.
const START = 'app.html';
if (!existsSync(join(wwwDir, START))) {
  die(`${START} is missing: capacitor.config.ts starts the app on it`);
}

console.log(`sync: ${patched} pages patched, www/ is ${(bytes(wwwDir) / 1024 / 1024).toFixed(1)} MB, no external URLs`);
