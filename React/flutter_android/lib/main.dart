import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:webview_flutter/webview_flutter.dart';
import 'package:webview_flutter_android/webview_flutter_android.dart';
import 'package:webview_flutter_platform_interface/webview_flutter_platform_interface.dart';
import 'dart:io';
import 'package:shelf/shelf.dart' as shelf;
import 'package:shelf/shelf_io.dart' as shelf_io;
import 'package:shelf_static/shelf_static.dart';

void main() {
  WidgetsFlutterBinding.ensureInitialized();
  
  // Lock orientation to landscape
  SystemChrome.setPreferredOrientations([
    DeviceOrientation.landscapeLeft,
    DeviceOrientation.landscapeRight,
  ]);
  
  // Hide system UI (immersive mode)
  SystemChrome.setEnabledSystemUIMode(SystemUiMode.immersiveSticky);
  
  runApp(const GameApp());
}

class GameApp extends StatelessWidget {
  const GameApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Cross-Platform Game',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        primarySwatch: Colors.blue,
        scaffoldBackgroundColor: Colors.black,
      ),
      home: const GameScreen(),
    );
  }
}

class GameScreen extends StatefulWidget {
  const GameScreen({super.key});

  @override
  State<GameScreen> createState() => _GameScreenState();
}

class _GameScreenState extends State<GameScreen> with WidgetsBindingObserver {
  WebViewController? controller;
  bool isLoading = true;
  HttpServer? _server;
  int _port = 8080;

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addObserver(this);
    _startServer();
  }

  @override
  void dispose() {
    _server?.close();
    WidgetsBinding.instance.removeObserver(this);
    super.dispose();
  }

  Future<void> _startServer() async {
    try {
      // Find available port
      for (int port = 8080; port < 8090; port++) {
        try {
          _server = await HttpServer.bind(InternetAddress.loopbackIPv4, port);
          _port = port;
          debugPrint('HTTP server started on port $_port');
          break;
        } catch (e) {
          debugPrint('Port $port unavailable: $e');
          continue;
        }
      }
      
      if (_server == null) {
        debugPrint('Failed to start HTTP server - no available ports');
        setState(() {
          isLoading = false;
        });
        return;
      }
      
      // Handle requests
      _server!.listen((HttpRequest request) async {
        try {
          // Remove leading slash
          String path = request.uri.path.substring(1);
          if (path.isEmpty) path = 'index.html';
          
          // Load asset
          final asset = 'assets/web/$path';
          debugPrint('Loading asset: $asset');
          
          ByteData data = await rootBundle.load(asset);
          final bytes = data.buffer.asUint8List();
          
          // Determine content type
          String contentType = 'text/plain';
          if (path.endsWith('.html')) contentType = 'text/html';
          else if (path.endsWith('.js')) contentType = 'application/javascript';
          else if (path.endsWith('.css')) contentType = 'text/css';
          else if (path.endsWith('.json')) contentType = 'application/json';
          else if (path.endsWith('.svg')) contentType = 'image/svg+xml';
          
          request.response
            ..headers.contentType = ContentType.parse(contentType)
            ..headers.add('Access-Control-Allow-Origin', '*')
            ..add(bytes)
            ..close();
        } catch (e) {
          debugPrint('Error serving ${ request.uri.path}: $e');
          request.response
            ..statusCode = HttpStatus.notFound
            ..write('Not found')
            ..close();
        }
      });
      
      // Initialize WebView after server starts
      _initializeWebView();
    } catch (e) {
      debugPrint('Failed to start server: $e');
      setState(() {
        isLoading = false;
      });
    }
  }

  @override
  void didChangeAppLifecycleState(AppLifecycleState state) {
    // Pause WebView when app goes to background
    if (state == AppLifecycleState.paused) {
      // WebView will automatically pause
    } else if (state == AppLifecycleState.resumed) {
      // WebView will automatically resume
    }
  }

  void _initializeWebView() async {
    // Configure Android WebView first
    if (WebViewPlatform.instance is AndroidWebViewPlatform) {
      AndroidWebViewController.enableDebugging(true);
    }
    
    controller = WebViewController()
      ..setJavaScriptMode(JavaScriptMode.unrestricted)
      ..setBackgroundColor(const Color(0xFF000000))
      ..enableZoom(false)
      ..setNavigationDelegate(
        NavigationDelegate(
          onPageStarted: (String url) {
            debugPrint('Page started loading: $url');
            setState(() {
              isLoading = true;
            });
          },
          onPageFinished: (String url) {
            debugPrint('Page finished loading: $url');
            setState(() {
              isLoading = false;
            });
          },
          onWebResourceError: (WebResourceError error) {
            debugPrint('WebView error: ${error.description}');
            debugPrint('URL: ${error.url}');
          },
        ),
      );
    
    // Configure Android-specific settings
    if (controller!.platform is AndroidWebViewController) {
      final androidController = controller!.platform as AndroidWebViewController;
      await androidController.setMediaPlaybackRequiresUserGesture(false);
      
      // Enable mixed content mode
      await androidController.setMixedContentMode(
        MixedContentMode.alwaysAllow,
      );
    }
    
    // Trigger rebuild to show WebView
    setState(() {});
    
    // Load from local HTTP server
    await controller!.loadRequest(
      Uri.parse('http://127.0.0.1:$_port/index.html'),
    );
  }

  @override
  Widget build(BuildContext context) {
    return WillPopScope(
      onWillPop: () async {
        // Handle back button - could show exit dialog or pause game
        return true;
      },
      child: Scaffold(
        body: controller == null
            ? const Center(
                child: CircularProgressIndicator(
                  color: Colors.blue,
                ),
              )
            : Stack(
                children: [
                  WebViewWidget(controller: controller!),
                  if (isLoading)
                    const Center(
                      child: CircularProgressIndicator(
                        color: Colors.blue,
                      ),
                    ),
                ],
              ),
      ),
    );
  }
}
