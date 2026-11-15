# Android client build 7

- commit: `62d66fd8fc6fc35bdadac8b650b42601aab98481`
- ref: `refs/heads/ci/android-client-build`
- job status: success

| step | outcome |
| --- | --- |
| checkout | success |
| pnpm | success |
| node | success |
| install | success |
| export | success |
| java | success |
| android-sdk | success |
| shell-install | success |
| copy-export | success |
| cap-sync | success |
| signing | skipped |
| apk | success |
| artifact | success |
| release | success |

```
Scope: all 25 workspace projects
Lockfile is up to date, resolution step is skipped
Progress: resolved 1, reused 0, downloaded 0, added 0
Packages: +266
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
Progress: resolved 266, reused 266, downloaded 0, added 266, done
 WARN  Failed to create bin at /home/runner/work/ekza-studio/ekza-studio/packages/agent-evals/node_modules/.bin/ekza-studio-mcp. ENOENT: no such file or directory, open '/home/runner/work/ekza-studio/ekza-studio/packages/mcp-server/dist/cli.mjs'
 WARN  Failed to create bin at /home/runner/work/ekza-studio/ekza-studio/apps/web/node_modules/.bin/ekza-studio-mcp. ENOENT: no such file or directory, open '/home/runner/work/ekza-studio/ekza-studio/packages/mcp-server/dist/cli.mjs'

devDependencies:
+ @biomejs/biome 2.5.15
+ @gltf-transform/core 4.5.1
+ @gltf-transform/extensions 4.5.1
+ @gltf-transform/functions 4.5.1
+ @playwright/test 1.63.0
+ @types/node 24.19.1
+ meshoptimizer 1.3.0
+ oxlint 1.86.0
+ oxlint-tsgolint 7.0.2003
+ playwright 1.63.0
+ turbo 2.11.7
+ typescript 6.0.3

 WARN  Failed to create bin at /home/runner/work/ekza-studio/ekza-studio/packages/agent-evals/node_modules/.bin/ekza-studio-mcp. ENOENT: no such file or directory, open '/home/runner/work/ekza-studio/ekza-studio/packages/agent-evals/node_modules/ekza-studio-mcp/dist/cli.mjs'
 WARN  Failed to create bin at /home/runner/work/ekza-studio/ekza-studio/apps/web/node_modules/.bin/ekza-studio-mcp. ENOENT: no such file or directory, open '/home/runner/work/ekza-studio/ekza-studio/apps/web/node_modules/ekza-studio-mcp/dist/cli.mjs'
Done in 1.2s using pnpm v10.32.1

> web@0.0.0 build /home/runner/work/ekza-studio/ekza-studio/apps/web
> node scripts/copy-assets.mjs && node scripts/third-party-notices.mjs && next build

copy-assets: 6 samples and 3 decoder entries in public/
third-party-notices: 169 packages → public/THIRD_PARTY_NOTICES.txt
▲ Next.js 16.3.8 (Turbopack)
✓ Running next.config.ts took 21ms
⚠ No build cache found. Please configure build caching for faster rebuilds. Read more: https://nextjs.org/docs/messages/no-cache
- Experiments (use with caution):
  · turbopackChunking

  Creating an optimized production build ...
✓ Compiled successfully in 15.6s
  Skipping validation of types
  Finished TypeScript config validation in 5ms ...
  Collecting page data using 3 workers ...
  Generating static pages using 3 workers (0/7) ...
  Generating static pages using 3 workers (1/7) 
  Generating static pages using 3 workers (3/7) 
  Generating static pages using 3 workers (5/7) 
✓ Generating static pages using 3 workers (7/7) in 237ms
  Finalizing page optimization ...

Route (app)
┌ ○ /
├ ○ /_not-found
├ ○ /app
├ ○ /autorig
├ ○ /editor
└ ○ /icon.svg


○  (Static)  prerendered as static content

ANDROID_HOME=/usr/local/lib/android/sdk
/usr/local/lib/android/sdk/build-tools:
34.0.0
35.0.0
35.0.1
36.0.0
36.1.0
37.0.0

/usr/local/lib/android/sdk/platforms:
android-34
android-34-ext10
android-34-ext11
android-34-ext12
android-34-ext8
android-35
android-35-ext14
android-35-ext15
android-36
android-36-ext18
android-36-ext19
android-36.1
android-37.0
android-37.1
android-37.2
android-37.2-beta1
android-37.2-beta2
android-37.2-beta3

added 103 packages, and audited 104 packages in 958ms

11 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
sync: 6 pages patched, www/ is 40.5 MB, no external URLs
✔ Copying web assets from www to android/app/src/main/assets/public in 238.51ms
✔ Creating capacitor.config.json in android/app/src/main/assets in 392.81μs
✔ copy android in 245.31ms
✔ Updating Android plugins in 498.21μs
[info] Found 4 Capacitor plugins for android:
       @capacitor/app@8.1.2
       @capacitor/filesystem@8.1.5
       @capacitor/share@8.0.3
       @capacitor/status-bar@8.0.4
✔ update android in 15.23ms
[info] Sync finished in 0.266s
Downloading https://services.gradle.org/distributions/gradle-8.14.3-all.zip
.....................10%.....................20%......................30%.....................40%......................50%.....................60%.....................70%......................80%.....................90%......................100%

Welcome to Gradle 8.14.3!

Here are the highlights of this release:
 - Java 24 support
 - GraalVM Native Image toolchain selection
 - Enhancements to test reporting
 - Build Authoring improvements

For more details see https://docs.gradle.org/8.14.3/release-notes.html

To honour the JVM settings for this build a single-use Daemon process will be forked. For more on this, please refer to https://docs.gradle.org/8.14.3/userguide/gradle_daemon.html#sec:disabling_the_daemon in the Gradle documentation.
Daemon will be stopped at the end of the build 

> Configure project :app
WARNING: Using flatDir should be avoided because it doesn't support any meta-data formats.

> Configure project :capacitor-cordova-android-plugins
WARNING: Using flatDir should be avoided because it doesn't support any meta-data formats.

> Task :app:preBuild UP-TO-DATE
> Task :app:preDebugBuild UP-TO-DATE
> Task :app:mergeDebugNativeDebugMetadata NO-SOURCE
> Task :capacitor-android:preBuild UP-TO-DATE
> Task :capacitor-android:preDebugBuild UP-TO-DATE
> Task :capacitor-app:preBuild UP-TO-DATE
> Task :capacitor-app:preDebugBuild UP-TO-DATE
> Task :capacitor-cordova-android-plugins:preBuild UP-TO-DATE
> Task :capacitor-cordova-android-plugins:preDebugBuild UP-TO-DATE
> Task :capacitor-app:writeDebugAarMetadata
> Task :capacitor-android:writeDebugAarMetadata
> Task :app:javaPreCompileDebug
> Task :capacitor-filesystem:preBuild UP-TO-DATE
> Task :capacitor-filesystem:preDebugBuild UP-TO-DATE
> Task :capacitor-cordova-android-plugins:writeDebugAarMetadata
> Task :capacitor-share:preBuild UP-TO-DATE
> Task :capacitor-share:preDebugBuild UP-TO-DATE
> Task :capacitor-filesystem:writeDebugAarMetadata
> Task :capacitor-status-bar:preBuild UP-TO-DATE
> Task :capacitor-status-bar:preDebugBuild UP-TO-DATE
> Task :capacitor-share:writeDebugAarMetadata
> Task :capacitor-status-bar:writeDebugAarMetadata
> Task :capacitor-android:processDebugNavigationResources
> Task :capacitor-app:processDebugNavigationResources
> Task :capacitor-cordova-android-plugins:processDebugNavigationResources
> Task :app:checkDebugAarMetadata
> Task :capacitor-filesystem:processDebugNavigationResources
> Task :capacitor-share:processDebugNavigationResources
> Task :capacitor-status-bar:processDebugNavigationResources
> Task :app:processDebugNavigationResources
> Task :app:generateDebugResValues
> Task :capacitor-android:generateDebugResValues
> Task :app:compileDebugNavigationResources
> Task :capacitor-android:generateDebugResources
> Task :capacitor-android:packageDebugResources
> Task :capacitor-app:generateDebugResValues
> Task :capacitor-app:generateDebugResources
> Task :capacitor-app:packageDebugResources
> Task :capacitor-cordova-android-plugins:generateDebugResValues
> Task :capacitor-cordova-android-plugins:generateDebugResources
> Task :capacitor-cordova-android-plugins:packageDebugResources
> Task :capacitor-filesystem:generateDebugResValues
> Task :capacitor-filesystem:generateDebugResources
> Task :capacitor-filesystem:packageDebugResources
> Task :capacitor-share:generateDebugResValues
> Task :capacitor-share:generateDebugResources
> Task :capacitor-share:packageDebugResources
> Task :capacitor-status-bar:generateDebugResValues
> Task :capacitor-status-bar:generateDebugResources
> Task :capacitor-status-bar:packageDebugResources
> Task :app:mapDebugSourceSetPaths
> Task :app:generateDebugResources
> Task :app:packageDebugResources
> Task :app:mergeDebugResources
> Task :app:createDebugCompatibleScreenManifests
> Task :app:extractDeepLinksDebug
> Task :capacitor-android:extractDeepLinksDebug
> Task :capacitor-app:extractDeepLinksDebug
> Task :capacitor-cordova-android-plugins:extractDeepLinksDebug
> Task :capacitor-android:processDebugManifest
> Task :app:parseDebugLocalResources
> Task :capacitor-app:processDebugManifest
> Task :capacitor-cordova-android-plugins:processDebugManifest
> Task :capacitor-filesystem:extractDeepLinksDebug
> Task :capacitor-share:extractDeepLinksDebug
> Task :capacitor-filesystem:processDebugManifest
> Task :capacitor-status-bar:extractDeepLinksDebug
> Task :capacitor-share:processDebugManifest
> Task :capacitor-status-bar:processDebugManifest
> Task :capacitor-android:compileDebugLibraryResources
> Task :app:processDebugMainManifest
> Task :app:processDebugManifest
> Task :capacitor-app:compileDebugLibraryResources
> Task :app:processDebugManifestForPackage
> Task :capacitor-cordova-android-plugins:compileDebugLibraryResources
> Task :capacitor-app:parseDebugLocalResources
> Task :capacitor-android:parseDebugLocalResources
> Task :capacitor-cordova-android-plugins:parseDebugLocalResources
> Task :capacitor-filesystem:compileDebugLibraryResources
> Task :capacitor-filesystem:parseDebugLocalResources
> Task :capacitor-app:generateDebugRFile
> Task :capacitor-cordova-android-plugins:generateDebugRFile
> Task :capacitor-android:generateDebugRFile
> Task :capacitor-filesystem:generateDebugRFile
> Task :capacitor-share:compileDebugLibraryResources
> Task :capacitor-status-bar:compileDebugLibraryResources
> Task :capacitor-android:javaPreCompileDebug
> Task :capacitor-app:javaPreCompileDebug
> Task :capacitor-share:parseDebugLocalResources
> Task :capacitor-status-bar:parseDebugLocalResources

> Task :capacitor-android:compileDebugJavaWithJavac
Note: Some input files use unchecked or unsafe operations.
Note: Recompile with -Xlint:unchecked for details.

> Task :capacitor-share:generateDebugRFile
> Task :capacitor-status-bar:generateDebugRFile
> Task :capacitor-android:bundleLibCompileToJarDebug
> Task :capacitor-app:compileDebugJavaWithJavac
> Task :capacitor-app:bundleLibCompileToJarDebug
> Task :capacitor-filesystem:checkKotlinGradlePluginConfigurationErrors SKIPPED
> Task :capacitor-cordova-android-plugins:javaPreCompileDebug
> Task :app:processDebugResources
> Task :capacitor-cordova-android-plugins:compileDebugJavaWithJavac NO-SOURCE
> Task :capacitor-share:javaPreCompileDebug
> Task :capacitor-filesystem:javaPreCompileDebug
> Task :capacitor-cordova-android-plugins:bundleLibCompileToJarDebug
> Task :capacitor-share:compileDebugJavaWithJavac
> Task :capacitor-share:bundleLibCompileToJarDebug
> Task :capacitor-status-bar:javaPreCompileDebug
> Task :app:mergeDebugShaders
> Task :capacitor-status-bar:compileDebugJavaWithJavac
> Task :app:compileDebugShaders NO-SOURCE
> Task :app:generateDebugAssets UP-TO-DATE
> Task :capacitor-status-bar:bundleLibCompileToJarDebug
> Task :capacitor-android:mergeDebugShaders
> Task :capacitor-android:compileDebugShaders NO-SOURCE
> Task :capacitor-android:generateDebugAssets UP-TO-DATE
> Task :capacitor-android:mergeDebugAssets
> Task :capacitor-app:mergeDebugShaders
> Task :capacitor-app:compileDebugShaders NO-SOURCE
> Task :capacitor-app:generateDebugAssets UP-TO-DATE
> Task :capacitor-app:mergeDebugAssets
> Task :capacitor-cordova-android-plugins:mergeDebugShaders
> Task :capacitor-cordova-android-plugins:compileDebugShaders NO-SOURCE
> Task :capacitor-cordova-android-plugins:generateDebugAssets UP-TO-DATE
> Task :capacitor-cordova-android-plugins:mergeDebugAssets
> Task :capacitor-filesystem:mergeDebugShaders
> Task :capacitor-filesystem:compileDebugShaders NO-SOURCE
> Task :capacitor-filesystem:generateDebugAssets UP-TO-DATE
> Task :capacitor-filesystem:mergeDebugAssets
> Task :capacitor-share:mergeDebugShaders
> Task :capacitor-share:compileDebugShaders NO-SOURCE
> Task :capacitor-share:generateDebugAssets UP-TO-DATE
> Task :capacitor-share:mergeDebugAssets
> Task :capacitor-status-bar:mergeDebugShaders
> Task :capacitor-status-bar:compileDebugShaders NO-SOURCE
> Task :capacitor-status-bar:generateDebugAssets UP-TO-DATE
> Task :capacitor-status-bar:mergeDebugAssets
> Task :app:mergeDebugAssets
> Task :capacitor-app:bundleLibRuntimeToJarDebug
> Task :capacitor-share:bundleLibRuntimeToJarDebug
> Task :app:compressDebugAssets
> Task :capacitor-status-bar:bundleLibRuntimeToJarDebug
> Task :app:desugarDebugFileDependencies
> Task :capacitor-cordova-android-plugins:bundleLibRuntimeToJarDebug
> Task :app:processDebugJavaRes NO-SOURCE
> Task :capacitor-android:bundleLibRuntimeToJarDebug
> Task :capacitor-android:processDebugJavaRes NO-SOURCE
> Task :capacitor-app:processDebugJavaRes NO-SOURCE
> Task :capacitor-cordova-android-plugins:processDebugJavaRes NO-SOURCE
> Task :capacitor-share:processDebugJavaRes NO-SOURCE
> Task :capacitor-status-bar:processDebugJavaRes NO-SOURCE
> Task :capacitor-app:bundleLibRuntimeToDirDebug
> Task :app:checkDebugDuplicateClasses
> Task :capacitor-filesystem:compileDebugKotlin
> Task :capacitor-filesystem:compileDebugJavaWithJavac NO-SOURCE
> Task :capacitor-filesystem:bundleLibCompileToJarDebug
> Task :capacitor-filesystem:bundleLibRuntimeToJarDebug

> Task :app:compileDebugJavaWithJavac
Note: /home/runner/work/ekza-studio/ekza-studio/mobile/android/app/src/main/java/io/ekza/studio/mobile/MainActivity.java uses or overrides a deprecated API.
Note: Recompile with -Xlint:deprecation for details.

> Task :app:dexBuilderDebug
> Task :app:mergeDebugGlobalSynthetics
> Task :capacitor-filesystem:processDebugJavaRes
> Task :capacitor-share:bundleLibRuntimeToDirDebug
> Task :capacitor-filesystem:bundleLibRuntimeToDirDebug
> Task :capacitor-status-bar:bundleLibRuntimeToDirDebug
> Task :app:mergeExtDexDebug
> Task :capacitor-android:bundleLibRuntimeToDirDebug
> Task :capacitor-cordova-android-plugins:bundleLibRuntimeToDirDebug
> Task :app:mergeDebugJniLibFolders
> Task :capacitor-android:mergeDebugJniLibFolders
> Task :app:mergeProjectDexDebug
> Task :capacitor-android:mergeDebugNativeLibs NO-SOURCE
> Task :capacitor-android:copyDebugJniLibsProjectOnly
> Task :capacitor-app:mergeDebugJniLibFolders
> Task :capacitor-app:mergeDebugNativeLibs NO-SOURCE
> Task :capacitor-app:copyDebugJniLibsProjectOnly
> Task :capacitor-cordova-android-plugins:mergeDebugJniLibFolders
> Task :capacitor-cordova-android-plugins:mergeDebugNativeLibs NO-SOURCE
> Task :capacitor-cordova-android-plugins:copyDebugJniLibsProjectOnly
> Task :capacitor-filesystem:mergeDebugJniLibFolders
> Task :capacitor-filesystem:mergeDebugNativeLibs NO-SOURCE
> Task :capacitor-filesystem:copyDebugJniLibsProjectOnly
> Task :capacitor-share:mergeDebugJniLibFolders
> Task :capacitor-share:mergeDebugNativeLibs NO-SOURCE
> Task :app:mergeDebugJavaResource
> Task :capacitor-share:copyDebugJniLibsProjectOnly
> Task :capacitor-status-bar:mergeDebugJniLibFolders
> Task :capacitor-status-bar:mergeDebugNativeLibs NO-SOURCE
> Task :capacitor-status-bar:copyDebugJniLibsProjectOnly
> Task :app:mergeDebugNativeLibs NO-SOURCE
> Task :app:stripDebugDebugSymbols NO-SOURCE
> Task :app:validateSigningDebug
> Task :app:writeDebugAppMetadata
> Task :app:writeDebugSigningConfigVersions
> Task :app:mergeLibDexDebug
> Task :app:packageDebug
> Task :app:createDebugApkListingFileRedirect
> Task :app:assembleDebug

[Incubating] Problems report is available at: file:///home/runner/work/ekza-studio/ekza-studio/mobile/android/build/reports/problems/problems-report.html

BUILD SUCCESSFUL in 1m 8s
148 actionable tasks: 148 executed
-rw-r--r-- 1 runner runner 24072019 Nov 15 06:22 ekza-studio-android-debug.apk
sha256=3d99ed6018e56ac0e1eac8ed9636b7a318614050c370c0f4ffa848b18ef7c569
https://github.com/965449767/ekza-studio/releases/tag/android-client-7
```
