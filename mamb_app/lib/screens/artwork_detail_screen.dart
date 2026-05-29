import 'package:flutter/material.dart';
import 'package:cached_network_image/cached_network_image.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:provider/provider.dart';
import '../models/obra.dart';
import '../providers/profile_provider.dart';
import '../providers/obras_provider.dart';
import '../theme/app_theme.dart';
import '../config/constants.dart';
import '../widgets/avatar_widget.dart';

class ArtworkDetailScreen extends StatelessWidget {
  const ArtworkDetailScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final obra = ModalRoute.of(context)!.settings.arguments as Obra;
    final bgColor = Color(AppConstants.artColors[obra.colorIndex]);

    return Scaffold(
      backgroundColor: AppColors.parchment,
      body: Consumer2<ProfileProvider, ObrasProvider>(
        builder: (context, profile, obrasProvider, _) {
          // Get live version of the obra from provider if available
          final liveObra = obrasProvider.obras.firstWhere(
            (o) => o.id == obra.id,
            orElse: () => obra,
          );
          final isLiked = profile.isLiked(liveObra.id);
          final isFavorited = profile.isFavorite(liveObra.id);

          return Stack(
            children: [
              // Scrollable content
              SingleChildScrollView(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    // Top image area
                    _buildImageArea(context, liveObra, bgColor),
                    // Body section
                    Padding(
                      padding: const EdgeInsets.fromLTRB(20, 20, 20, 40),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          // Title row
                          Row(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Expanded(
                                child: Text(
                                  liveObra.titulo,
                                  style: GoogleFonts.playfairDisplay(
                                    fontSize: 24,
                                    fontWeight: FontWeight.w700,
                                    color: AppColors.textDark,
                                    height: 1.2,
                                  ),
                                ),
                              ),
                              const SizedBox(width: 12),
                              IconButton(
                                icon: const Icon(Icons.share_outlined),
                                onPressed: () {
                                  ScaffoldMessenger.of(context).showSnackBar(
                                    SnackBar(
                                      content: Text('¡Enlace copiado!',
                                          style: GoogleFonts.dmSans(color: Colors.white)),
                                      backgroundColor: AppColors.green,
                                      behavior: SnackBarBehavior.floating,
                                      shape: RoundedRectangleBorder(
                                          borderRadius: BorderRadius.circular(12)),
                                    ),
                                  );
                                },
                                color: AppColors.textMid,
                                padding: EdgeInsets.zero,
                                constraints: const BoxConstraints(minWidth: 48, minHeight: 48),
                              ),
                            ],
                          ),
                          const SizedBox(height: 14),
                          // Author row
                          Row(
                            children: [
                              AvatarWidget(avatarIndex: liveObra.avatarIndex, size: 36),
                              const SizedBox(width: 10),
                              Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Text(
                                    liveObra.autorApodo,
                                    style: GoogleFonts.dmSans(
                                      fontSize: 15,
                                      fontWeight: FontWeight.w600,
                                      color: AppColors.textDark,
                                    ),
                                  ),
                                  Text(
                                    'artista del museo',
                                    style: GoogleFonts.dmSans(
                                      fontSize: 12,
                                      color: AppColors.textLight,
                                    ),
                                  ),
                                ],
                              ),
                            ],
                          ),
                          const SizedBox(height: 20),
                          // Action buttons
                          Row(
                            children: [
                              Expanded(
                                child: _buildActionButton(
                                  icon: isLiked ? Icons.favorite : Icons.favorite_border,
                                  label: 'Me gusta ${liveObra.likes}',
                                  isActive: isLiked,
                                  activeColor: AppColors.rust,
                                  onTap: () {
                                    obrasProvider.incrementLike(liveObra.id);
                                    profile.addLike(liveObra.id);
                                  },
                                ),
                              ),
                              const SizedBox(width: 12),
                              Expanded(
                                child: _buildActionButton(
                                  icon: isFavorited ? Icons.star : Icons.star_border,
                                  label: isFavorited ? 'En favoritos' : 'Favorito',
                                  isActive: isFavorited,
                                  activeColor: AppColors.gold,
                                  onTap: () => profile.toggleFavorite(liveObra.id),
                                ),
                              ),
                            ],
                          ),
                          const SizedBox(height: 24),
                          // Description
                          Text(
                            'DESCRIPCIÓN DE LA OBRA',
                            style: GoogleFonts.dmSans(
                              fontSize: 10,
                              fontWeight: FontWeight.w700,
                              letterSpacing: 1.5,
                              color: AppColors.textLight,
                            ),
                          ),
                          const SizedBox(height: 8),
                          Text(
                            liveObra.descripcion.isNotEmpty
                                ? liveObra.descripcion
                                : 'Esta obra no tiene descripción.',
                            style: GoogleFonts.dmSans(
                              fontSize: 15,
                              color: AppColors.textMid,
                              height: 1.6,
                            ),
                          ),
                          const SizedBox(height: 20),
                          // Technique and year chips
                          Wrap(
                            spacing: 8,
                            runSpacing: 8,
                            children: [
                              _buildChip(liveObra.year.toString(), AppColors.navy),
                              if (liveObra.likes > 0)
                                _buildChip(
                                  '${liveObra.likes} me gusta',
                                  AppColors.green,
                                ),
                            ],
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
              ),
              // Back button pill
              Positioned(
                top: MediaQuery.of(context).padding.top + 12,
                left: 16,
                child: GestureDetector(
                  onTap: () => Navigator.of(context).pop(),
                  child: Container(
                    padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 8),
                    decoration: BoxDecoration(
                      color: Colors.white,
                      borderRadius: BorderRadius.circular(20),
                      boxShadow: [
                        BoxShadow(
                          color: Colors.black.withOpacity(0.15),
                          blurRadius: 8,
                          offset: const Offset(0, 2),
                        ),
                      ],
                    ),
                    child: Row(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        const Icon(Icons.arrow_back_ios,
                            size: 14, color: AppColors.textDark),
                        const SizedBox(width: 4),
                        Text(
                          'Atrás',
                          style: GoogleFonts.dmSans(
                            fontSize: 14,
                            fontWeight: FontWeight.w600,
                            color: AppColors.textDark,
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
              ),
              // Top right buttons
              Positioned(
                top: MediaQuery.of(context).padding.top + 12,
                right: 16,
                child: Row(
                  children: [
                    GestureDetector(
                      onTap: () {
                        obrasProvider.incrementLike(obra.id);
                        profile.addLike(obra.id);
                      },
                      child: Container(
                        padding: const EdgeInsets.all(10),
                        decoration: BoxDecoration(
                          color: Colors.white,
                          shape: BoxShape.circle,
                          boxShadow: [
                            BoxShadow(
                              color: Colors.black.withOpacity(0.12),
                              blurRadius: 8,
                              offset: const Offset(0, 2),
                            ),
                          ],
                        ),
                        child: Icon(
                          isLiked ? Icons.favorite : Icons.favorite_border,
                          size: 20,
                          color: isLiked ? AppColors.rust : AppColors.textMid,
                        ),
                      ),
                    ),
                    const SizedBox(width: 8),
                    GestureDetector(
                      onTap: () {
                        ScaffoldMessenger.of(context).showSnackBar(
                          SnackBar(
                            content: Text('¡Enlace copiado!',
                                style: GoogleFonts.dmSans(color: Colors.white)),
                            backgroundColor: AppColors.green,
                            behavior: SnackBarBehavior.floating,
                            shape: RoundedRectangleBorder(
                                borderRadius: BorderRadius.circular(12)),
                          ),
                        );
                      },
                      child: Container(
                        padding: const EdgeInsets.all(10),
                        decoration: BoxDecoration(
                          color: Colors.white,
                          shape: BoxShape.circle,
                          boxShadow: [
                            BoxShadow(
                              color: Colors.black.withOpacity(0.12),
                              blurRadius: 8,
                              offset: const Offset(0, 2),
                            ),
                          ],
                        ),
                        child: const Icon(
                          Icons.share_outlined,
                          size: 20,
                          color: AppColors.textMid,
                        ),
                      ),
                    ),
                  ],
                ),
              ),
            ],
          );
        },
      ),
    );
  }

  Widget _buildImageArea(BuildContext context, Obra obra, Color bgColor) {
    return Stack(
      children: [
        Container(
          width: double.infinity,
          height: 300,
          color: bgColor,
          child: obra.imageUrl.isNotEmpty
              ? CachedNetworkImage(
                  imageUrl: obra.imageUrl,
                  fit: BoxFit.cover,
                  width: double.infinity,
                  height: 300,
                  placeholder: (_, __) => Container(color: bgColor),
                  errorWidget: (_, __, ___) => _buildColorPlaceholder(bgColor, obra),
                )
              : _buildColorPlaceholder(bgColor, obra),
        ),
        // Gradient at bottom
        Positioned(
          bottom: 0,
          left: 0,
          right: 0,
          child: Container(
            height: 80,
            decoration: BoxDecoration(
              gradient: LinearGradient(
                begin: Alignment.topCenter,
                end: Alignment.bottomCenter,
                colors: [
                  Colors.transparent,
                  AppColors.parchment.withOpacity(0.8),
                ],
              ),
            ),
          ),
        ),
      ],
    );
  }

  Widget _buildColorPlaceholder(Color color, Obra obra) {
    final initials = obra.titulo.isNotEmpty
        ? obra.titulo.trim().split(' ').take(2).map((w) => w.isNotEmpty ? w[0].toUpperCase() : '').join()
        : '?';
    return Container(
      width: double.infinity,
      height: 300,
      color: color,
      child: Center(
        child: Text(
          initials,
          style: GoogleFonts.playfairDisplay(
            fontSize: 72,
            fontWeight: FontWeight.w700,
            color: Colors.white.withOpacity(0.4),
          ),
        ),
      ),
    );
  }

  Widget _buildActionButton({
    required IconData icon,
    required String label,
    required bool isActive,
    required Color activeColor,
    required VoidCallback onTap,
  }) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        padding: const EdgeInsets.symmetric(vertical: 12),
        decoration: BoxDecoration(
          color: isActive ? activeColor.withOpacity(0.1) : AppColors.cream2,
          borderRadius: BorderRadius.circular(12),
          border: Border.all(
            color: isActive ? activeColor.withOpacity(0.4) : Colors.transparent,
          ),
        ),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Icon(icon, size: 18, color: isActive ? activeColor : AppColors.textMid),
            const SizedBox(width: 6),
            Text(
              label,
              style: GoogleFonts.dmSans(
                fontSize: 13,
                fontWeight: FontWeight.w600,
                color: isActive ? activeColor : AppColors.textMid,
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildChip(String label, Color color) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 6),
      decoration: BoxDecoration(
        color: color.withOpacity(0.1),
        borderRadius: BorderRadius.circular(20),
      ),
      child: Text(
        label,
        style: GoogleFonts.dmSans(
          fontSize: 12,
          fontWeight: FontWeight.w600,
          color: color,
        ),
      ),
    );
  }
}
