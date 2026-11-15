package io.ekza.studio.mobile;

import android.app.Activity;

import androidx.core.view.WindowCompat;
import androidx.core.view.WindowInsetsCompat;
import androidx.core.view.WindowInsetsControllerCompat;

import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

/**
 * The shell side of the page's Full screen (docs/ANDROID-CLIENT.md, `nativeShell.ts`): a WebView cannot hide the
 * Android system bars, so the page's `fullscreenchange` decides whether this plugin hides or shows them. Hidden bars
 * stay transient by swipe, so a gesture always brings them back and no screen is left without a way out.
 */
@CapacitorPlugin(name = "HaloFullscreen")
public class FullscreenPlugin extends Plugin {

    @PluginMethod
    public void setImmersive(PluginCall call) {
        final boolean enabled = Boolean.TRUE.equals(call.getBoolean("enabled", false));
        final Activity activity = getActivity();
        if (activity == null) {
            call.reject("the activity is gone; the full screen state cannot be applied");
            return;
        }
        activity.runOnUiThread(() -> {
            WindowInsetsControllerCompat controller =
                    WindowCompat.getInsetsController(activity.getWindow(), activity.getWindow().getDecorView());
            if (enabled) {
                controller.setSystemBarsBehavior(WindowInsetsControllerCompat.BEHAVIOR_SHOW_TRANSIENT_BARS_BY_SWIPE);
                controller.hide(WindowInsetsCompat.Type.systemBars());
            } else {
                controller.show(WindowInsetsCompat.Type.systemBars());
            }
            call.resolve();
        });
    }
}
