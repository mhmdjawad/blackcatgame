import 'dart:io';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'dart:developer' as developer;
import 'dart:math' as math;
import 'package:webview_flutter/webview_flutter.dart';

void main() {
  runApp(const GameApp());
}
class GameApp extends StatelessWidget {
  const GameApp({super.key});
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: const GameScreen()
    );
  }
}
class GameScreen extends StatefulWidget {
  const GameScreen({super.key});
  @override
  State<GameScreen> createState() => _GameScreenState();
}
class _GameScreenState extends State<GameScreen> with WidgetsBindingObserver {
  // _GameScreenState responsibilities:
  // - Start a local HTTP server that serves packaged web assets from
  //   `assets/web/` so the WebView can load the game from http://127.0.0.1:port
  // - Create and manage the `WebViewController` and react to navigation
  //   events (page started/finished/errors)
  // - Provide debug logging to help verify the game's HTML/JS is served
  //   correctly and the WebView finishes loading the game.

  // Helpful debug logs will be printed via `debugPrint` and `developer.log`.
  // After page load finishes we attempt a small JS check to see if a global
  // game object exists (best-effort; change the JS expression to match your
  // game's actual global variable if needed).
  WebViewController? _webViewController;
  HttpServer? _server;
  int _port = 8080;
  bool isLoading = true;

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addObserver(this);
    debugPrint('GameScreen: initState — starting local server');
    developer.log('GameScreen initState', name: 'GameScreen');
    _startServer();
  }
  @override
  void dispose() {
    _server?.close(force: true);
    WidgetsBinding.instance.removeObserver(this);
    super.dispose();
  }
  Future<void> _startServer() async {
    try {
      for (int port = 8080; port < 8100; port++) {
        try {
          debugPrint('Trying to bind HTTP server on port $port');
          _server = await HttpServer.bind(InternetAddress.loopbackIPv4, port);
          _port = port;
          debugPrint('Local HTTP server bound on port $_port');
          developer.log('Server bound', name: 'LocalServer', error: 'port=$_port');
          break;
        } catch (_) {
          debugPrint('Port $port unavailable, trying next port');
          continue;
        }
      }

      if (_server == null) return;

      _server!.listen((HttpRequest request) async {
        try {
          String path = request.uri.path.substring(1);
          if (path.isEmpty) path = 'index.html';
          // The project ships the built web files under assets/webapp/
          // (see pubspec.yaml). Serve from that path.
          final assetPath = 'assets/webapp/$path';
          debugPrint('HTTP request for path: $path');
          ByteData data = await rootBundle.load(assetPath);
          final bytes = data.buffer.asUint8List();

          // If serving HTML, log a small snippet to help verify it's the game
          if (path.toLowerCase().endsWith('.html')) {
            try {
              final content = String.fromCharCodes(bytes);
              final snippet = content.substring(0, math.min(content.length, 1000));
              debugPrint('Served HTML ($path) snippet:\n${snippet.replaceAll('\n', ' ')}');
            } catch (e) {
              debugPrint('Failed to decode HTML bytes for $path: $e');
            }
          }

          String contentType = 'text/plain';
          final lower = path.toLowerCase();
          if (lower.endsWith('.html') || lower.endsWith('.htm')) {contentType = 'text/html';}
          else if (lower.endsWith('.js') || lower.endsWith('.mjs')) {contentType = 'application/javascript';}
          else if (lower.endsWith('.css')) {contentType = 'text/css';}
          else if (lower.endsWith('.json') || lower.endsWith('.map')) {contentType = 'application/json';}
          else if (lower.endsWith('.png')) {contentType = 'image/png';}
          else if (lower.endsWith('.jpg') || lower.endsWith('.jpeg')) {contentType = 'image/jpeg';}
          else if (lower.endsWith('.svg')) {contentType = 'image/svg+xml';}

          request.response
            ..headers.contentType = ContentType.parse(contentType)
            ..headers.add('Access-Control-Allow-Origin', '*')
            ..add(bytes)
            ..close();
          debugPrint('Responded with $assetPath (type=$contentType)');
        } catch (e) {
          debugPrint('Asset error while serving request: $e');
          request.response
            ..statusCode = HttpStatus.notFound
            ..write('Not found')
            ..close();
        }
      });

      // Initialize WebView after server starts
      _initializeWebView();
    } catch (e) {
      setState(() => isLoading = false);
    }
  }

  void _initializeWebView() async {
    // Create and configure a WebViewController (webview_flutter v4 API)
    final uri = Uri.parse('http://127.0.0.1:$_port/index.html');
    try {
      debugPrint('Initializing WebView with URL: $uri');
      _webViewController = WebViewController()
        ..setJavaScriptMode(JavaScriptMode.unrestricted)
        ..setBackgroundColor(const Color(0xFF000000))
        ..setNavigationDelegate(
          NavigationDelegate(
            onPageStarted: (url) {
              debugPrint('WebView: onPageStarted -> $url');
              setState(() => isLoading = true);
            },
            onPageFinished: (url) async {
              debugPrint('WebView: onPageFinished -> $url');
              setState(() => isLoading = false);

              // Attempt a simple JS check to see if a game object exists.
              // Adjust the JS expression to match your game's global variable.
              try {
                final jsExpr = "(function(){ try { return (typeof window.game !== 'undefined') ? 'GAME_FOUND' : 'GAME_MISSING'; } catch(e){ return 'JS_ERROR:'+e.toString(); } })();";
                final result = await _webViewController!.runJavaScriptReturningResult(jsExpr);
                debugPrint('JS check result: $result');
                developer.log('JS check result', name: 'WebView', error: result);
              } catch (e) {
                debugPrint('Failed to run JS check: $e');
              }
            },
            onWebResourceError: (err) => debugPrint('WebView resource error: ${err.description} (url=${err.url})'),
          ),
        );

      await _webViewController!.loadRequest(uri);
      debugPrint('WebView loadRequest submitted for $uri');
      setState(() {});
    } catch (e) {
      debugPrint('Failed to initialize WebView controller: $e');
      developer.log('WebView init failed', name: 'WebView', error: e);
      setState(() => isLoading = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    // Show progress indicator while server is starting
    debugPrint('Build: server=$_server isLoading=$isLoading controller=${_webViewController!=null}');
    if (_server == null || isLoading) {
      return const Scaffold(
        body: Center(child: CircularProgressIndicator()),
      );
    }

    // When server is ready, render the WebViewWidget using the controller.
    return Scaffold(
      body: _webViewController == null
          ? const Center(child: CircularProgressIndicator())
          : Stack(
              children: [
                WebViewWidget(controller: _webViewController!),
                if (isLoading)
                  const Center(child: CircularProgressIndicator()),
              ],
            ),
    );
  }
}