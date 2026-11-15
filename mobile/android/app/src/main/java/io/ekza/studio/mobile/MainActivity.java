package io.ekza.studio.mobile;

import android.content.pm.ActivityInfo;
import android.content.res.Configuration;
import android.graphics.Color;
import android.os.Bundle;
import android.view.View;
import android.webkit.WebSettings;
import android.webkit.WebView;

import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowCompat;
import androidx.core.view.WindowInsetsCompat;
import androidx.core.view.WindowInsetsControllerCompat;

import com.getcapacitor.BridgeActivity;

/**
 * The Android client's activity (docs/ANDROID-CLIENT.md).
 *
 * <p>Android 15+ draws every app edge to edge, so the WebView reaches under the status bar and the gesture bar. The
 * page's chrome (Halo's top bar, tray and sheets) already keeps clear of `env(safe-area-inset-*)`, but WebView does not
 * report the system bars there reliably; this activity applies the bar insets as padding on the activity's content
 * view instead, and lets the keyboard's inset move the layout with it. One place decides, so nothing is double-inset.
 * The padding goes on the content view and not on the WebView itself: Chromium draws the page through a renderer
 * surface that ignores the WebView's own padding, so `web.setPadding(...)` left the page under the status bar.
 *
 * <p>Everything else is the offline client's hygiene: no overscroll glow, no zoom controls, the app's own dark bars,
 * and the WebView's own dark theme so a flash of white never shows while a page loads.
 */
public class MainActivity extends BridgeActivity {

    @Override
    public void onCreate(Bundle savedInstanceState) {
        // Local plugins register before the bridge is created (Capacitor's BridgeActivity.onCreate).
        registerPlugin(FullscreenPlugin.class);
        super.onCreate(savedInstanceState);
        lockPhoneToPortrait();
        // Android 15 enforces edge-to-edge; asking for it explicitly keeps API 30–34 identical.
        WindowCompat.setDecorFitsSystemWindows(getWindow(), false);
        getWindow().setStatusBarColor(Color.TRANSPARENT);
        getWindow().setNavigationBarColor(Color.TRANSPARENT);
        WindowInsetsControllerCompat bars =
                WindowCompat.getInsetsController(getWindow(), getWindow().getDecorView());
        // Dark chrome, light glyphs: the app's background is #1b1c1f on every screen.
        bars.setAppearanceLightStatusBars(false);
        bars.setAppearanceLightNavigationBars(false);
        setContentViewBackground();

        WebView web = getBridge().getWebView();
        if (web != null) {
            web.setBackgroundColor(Color.parseColor("#1b1c1f"));
            web.setOverScrollMode(View.OVER_SCROLL_NEVER);
            WebSettings settings = web.getSettings();
            settings.setBuiltInZoomControls(false);
            settings.setDisplayZoomControls(false);
            settings.setSupportZoom(false);
            settings.setMediaPlaybackRequiresUserGesture(false);
        }
        applySystemBarInsets();
    }

    /**
     * Pads the activity's content view with the system bars (and the keyboard), so the page never sits under the
     * status bar or the gesture bar. Padding the content view — not the WebView — is what actually insets the page:
     * Chromium renders the page through a surface that ignores the WebView's own padding.
     */
    private void applySystemBarInsets() {
        View content = findViewById(android.R.id.content);
        if (content == null) return;
        ViewCompat.setOnApplyWindowInsetsListener(content, (view, windowInsets) -> {
            Insets systemBars = windowInsets.getInsets(
                    WindowInsetsCompat.Type.systemBars() | WindowInsetsCompat.Type.displayCutout());
            Insets keyboard = windowInsets.getInsets(WindowInsetsCompat.Type.ime());
            view.setPadding(systemBars.left, systemBars.top, systemBars.right,
                    Math.max(systemBars.bottom, keyboard.bottom));
            return WindowInsetsCompat.CONSUMED;
        });
        ViewCompat.requestApplyInsets(content);
    }

    /** The activity's own view is the app colour, so a rotation or a splash frame never flashes white. */
    private void setContentViewBackground() {
        View content = findViewById(android.R.id.content);
        if (content != null) content.setBackgroundColor(Color.parseColor("#1b1c1f"));
    }

    /**
     * Phones stay upright; large screens (tablets, foldables opened flat) rotate freely.
     *
     * <p>The touch layout is designed for a tall screen: in a 390 px-tall landscape window its top bar, Path, tray and
     * Thread would leave a strip of canvas a modelling tool cannot use. The window's own size class decides (the
     * shortest width in dp), not the device's marketing name.
     */
    private void lockPhoneToPortrait() {
        int size = getResources().getConfiguration().screenLayout & Configuration.SCREENLAYOUT_SIZE_MASK;
        if (size < Configuration.SCREENLAYOUT_SIZE_LARGE) {
            setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_PORTRAIT);
        }
    }
}
