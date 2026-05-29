import 'package:flutter/material.dart';
import '../config/constants.dart';

class AvatarWidget extends StatelessWidget {
  final int avatarIndex;
  final double size;

  const AvatarWidget({
    super.key,
    required this.avatarIndex,
    this.size = 48,
  });

  static const List<IconData> _icons = [
    Icons.palette,       // 0: Artista
    Icons.brush,         // 1: Pintor
    Icons.star,          // 2: Estrella
    Icons.auto_awesome,  // 3: Mágico
    Icons.water_drop,    // 4: Mar
    Icons.favorite,      // 5: Amor
    Icons.bolt,          // 6: Rayo
    Icons.diamond,       // 7: Gema
  ];

  @override
  Widget build(BuildContext context) {
    final idx = avatarIndex.clamp(0, AppConstants.avatarOptions.length - 1);
    final color = Color(AppConstants.avatarOptions[idx]['color'] as int);
    final icon = _icons[idx];

    return Container(
      width: size,
      height: size,
      decoration: BoxDecoration(
        color: color,
        borderRadius: BorderRadius.circular(size * 0.25),
      ),
      child: Icon(
        icon,
        color: Colors.white,
        size: size * 0.5,
      ),
    );
  }
}
