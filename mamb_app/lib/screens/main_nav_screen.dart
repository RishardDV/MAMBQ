import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/obras_provider.dart';
import '../theme/app_theme.dart';
import 'inicio_screen.dart';
import 'galeria_screen.dart';
import 'subir_screen.dart';
import 'perfil_screen.dart';
import 'sobre_nosotros_screen.dart';

class MainNavScreen extends StatefulWidget {
  const MainNavScreen({super.key});

  @override
  State<MainNavScreen> createState() => _MainNavScreenState();
}

class _MainNavScreenState extends State<MainNavScreen> {
  int _currentIndex = 0;

  late final List<Widget> _screens;

  @override
  void initState() {
    super.initState();
    _screens = [
      InicioScreen(onTabChange: _onTabChange),
      const GaleriaScreen(),
      SubirScreen(onTabChange: _onTabChange),
      const PerfilScreen(),
      const SobreNosotrosScreen(),
    ];
    // Load obras on startup
    WidgetsBinding.instance.addPostFrameCallback((_) {
      Provider.of<ObrasProvider>(context, listen: false).loadObras();
    });
  }

  void _onTabChange(int index) {
    setState(() => _currentIndex = index);
    _handleTabLoad(index);
  }

  void _handleTabLoad(int index) {
    final obras = Provider.of<ObrasProvider>(context, listen: false);
    if (index == 0 || index == 1) {
      obras.loadObras();
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: IndexedStack(
        index: _currentIndex,
        children: _screens,
      ),
      bottomNavigationBar: BottomNavigationBar(
        currentIndex: _currentIndex,
        onTap: (index) {
          setState(() => _currentIndex = index);
          _handleTabLoad(index);
        },
        items: [
          const BottomNavigationBarItem(
            icon: Icon(Icons.home_outlined),
            activeIcon: Icon(Icons.home),
            label: 'Inicio',
          ),
          const BottomNavigationBarItem(
            icon: Icon(Icons.grid_view_outlined),
            activeIcon: Icon(Icons.grid_view),
            label: 'Museo',
          ),
          BottomNavigationBarItem(
            icon: Container(
              padding: const EdgeInsets.all(4),
              decoration: BoxDecoration(
                color: _currentIndex == 2 ? AppColors.rust : AppColors.cream2,
                borderRadius: BorderRadius.circular(14),
              ),
              child: Icon(
                Icons.add_circle,
                size: 32,
                color: _currentIndex == 2 ? Colors.white : AppColors.rust,
              ),
            ),
            label: 'Subir',
          ),
          const BottomNavigationBarItem(
            icon: Icon(Icons.person_outline),
            activeIcon: Icon(Icons.person),
            label: 'Perfil',
          ),
          const BottomNavigationBarItem(
            icon: Icon(Icons.info_outline),
            activeIcon: Icon(Icons.info),
            label: 'Nosotros',
          ),
        ],
      ),
    );
  }
}
