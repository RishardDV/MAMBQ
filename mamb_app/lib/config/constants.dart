import 'package:flutter/material.dart';

class AppConstants {
  // For Android emulator use 10.0.2.2, for iOS simulator use localhost
  // Web/desktop: localhost | Android emulator: 10.0.2.2 | iOS simulator: localhost
  static const String baseUrl = 'http://localhost:3000/api';

  static const List<Map<String, dynamic>> avatarOptions = [
    {'label': 'Artista', 'color': 0xFFC1440E},  // 0: rust
    {'label': 'Pintor',  'color': 0xFF2D6A4F},  // 1: green
    {'label': 'Estrella','color': 0xFFC8963E},  // 2: gold
    {'label': 'Mágico',  'color': 0xFF7B2D8B},  // 3: purple
    {'label': 'Mar',     'color': 0xFF006064},  // 4: teal
    {'label': 'Amor',    'color': 0xFFC2185B},  // 5: magenta
    {'label': 'Rayo',    'color': 0xFFE64A19},  // 6: deep orange
    {'label': 'Gema',    'color': 0xFF1B3A5C},  // 7: navy
  ];

  static const List<IconData> avatarIcons = []; // handled in AvatarWidget

  static const List<int> artColors = [
    0xFFC1440E, 0xFF2D6A4F, 0xFF1B3A5C, 0xFF7B2D8B,
    0xFFC2185B, 0xFF006064, 0xFF546E7A, 0xFFC8963E,
  ];
}
