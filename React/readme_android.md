
Human Notes:

flutter create -t app flutter_apk_game
mkdir flutter_apk_game/assets/
mkdir flutter_apk_game/assets/webapp/
cp -r dist/ flutter_apk_game/assets/webapp/



Run `flutter pub get`.

Edit `lib/main.dart` to start an internal HTTP server and open a WebView

add dependency for flutter webview
dependencies:
  # WebView for embedding web content
  webview_flutter: ^4.0.7

flutter_apk_game\android\app\src\main\AndroidManifest.xml
<manifest xmlns:android="http://schemas.android.com/apk/res/android">
    <!-- Allow web access from the app (required for WebView) -->
    <uses-permission android:name="android.permission.INTERNET" />

application
  android:usesCleartextTraffic="true"  <-- important


```bash
flutter pub get
# debug build
flutter build apk --debug
# release build
flutter build apk --release
```

Install APK on device (adb):

```bash
adb install -r build/app/outputs/flutter-apk/app-release.apk
```