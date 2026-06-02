# Flutter Android WebView Wrapper

This folder now contains an implementation that generates a lightweight Android app (WebView-only) from values in `config.md`.

## Files

- `config.md`: configurable app/build settings
- `build_webview.sh`: one-command generator + builder
- `jsb.png`: default app icon source

## What the script does

1. Reads `config.md`
2. Creates (or reuses) a Flutter project in `PROJECT_DIR`
3. Generates app code for a WebView that loads `WEBVIEW`
4. Applies app name and launcher icon
5. Builds `apk`, `aab`, or `both`
6. Copies artifacts into `RELEASE_DIR`

## Required tools

- Flutter SDK in PATH
- Android SDK/build tools configured for Flutter builds

## Run command (bash)

```bash
cd flutter
bash build_webview.sh
```

## Common configuration keys

- `APPNAME`
- `APPID`
- `LOGO`
- `WEBVIEW`
- `OUTPUT` (`apk`, `aab`, `both`)
- `APK_SPLIT_PER_ABI` (`true`, `false`)
- `APK_TARGET_ABI` (`arm64-v8a`, `armeabi-v7a`, `x86_64`, `all`)
- `ENABLE_OBFUSCATION` (`true`, `false`)
- `RELEASE_DIR`
- `PROJECT_DIR`
- `ORIENTATION`
- `ENABLE_ZOOM`
- `ENABLE_DEBUG_LOGS`
- `SHOW_LOADING_BAR`
- `ALLOW_BACK_NAVIGATION`
- `USER_AGENT`

## Example flow

1. Edit `config.md`
2. Run `bash build_webview.sh`
3. Collect output from `RELEASE_DIR`

## Notes

- The generated app is intentionally minimal and focused on loading one web URL.
- Re-running the script rebuilds with updated config values.
- For size reduction, keep `APK_SPLIT_PER_ABI=true`. This outputs ABI-specific APKs that are much smaller than a universal APK.
- For latest Android compatibility, use `APK_TARGET_ABI=arm64-v8a`.
- For additional reduction, keep `ENABLE_OBFUSCATION=true` (symbols are written into `release/symbols`).
- If distributing via Play Store, use `OUTPUT=aab` for best delivery size.
- If WebView shows `net::ERR_CACHE_MISS` at launch, rebuild with this script so `android.permission.INTERNET` is present in Android manifest.
