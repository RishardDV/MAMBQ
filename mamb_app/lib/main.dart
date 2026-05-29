import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:provider/provider.dart';
import 'theme/app_theme.dart';
import 'providers/profile_provider.dart';
import 'providers/obras_provider.dart';
import 'screens/splash_screen.dart';
import 'screens/main_nav_screen.dart';

void main() {
  WidgetsFlutterBinding.ensureInitialized();
  SystemChrome.setPreferredOrientations([
    DeviceOrientation.portraitUp,
    DeviceOrientation.portraitDown,
  ]);
  runApp(const MambApp());
}

class MambApp extends StatelessWidget {
  const MambApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (_) => ProfileProvider()),
        ChangeNotifierProvider(create: (_) => ObrasProvider()),
      ],
      child: MaterialApp(
        title: 'MAMB - Museo de Arte Moderno de Barranquilla',
        debugShowCheckedModeBanner: false,
        theme: AppTheme.theme,
        initialRoute: '/',
        routes: {
          '/': (context) => const SplashScreen(),
          '/home': (context) => const MainNavScreen(),
        },
        onUnknownRoute: (settings) => MaterialPageRoute(
          builder: (_) => const MainNavScreen(),
        ),
      ),
    );
  }
}
