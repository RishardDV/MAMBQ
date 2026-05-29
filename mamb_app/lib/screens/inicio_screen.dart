import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:provider/provider.dart';
import '../providers/profile_provider.dart';
import '../providers/obras_provider.dart';
import '../theme/app_theme.dart';
import '../widgets/art_card_widget.dart';
import '../widgets/avatar_widget.dart';
import '../widgets/section_header_widget.dart';
import '../models/obra.dart';
import 'artwork_detail_screen.dart';

class InicioScreen extends StatelessWidget {
  final void Function(int)? onTabChange;

  const InicioScreen({super.key, this.onTabChange});

  @override
  Widget build(BuildContext context) {
    return Consumer2<ObrasProvider, ProfileProvider>(
      builder: (context, obras, profile, _) {
        return RefreshIndicator(
          color: AppColors.rust,
          onRefresh: () async {
            await obras.loadObras();
          },
          child: CustomScrollView(
            slivers: [
              SliverToBoxAdapter(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    // Header
                    _buildHeader(context, profile, obras),
                    // Hero section
                    _buildHero(context),
                    const SizedBox(height: 28),
                    // Destacadas
                    Padding(
                      padding: const EdgeInsets.symmetric(horizontal: 20),
                      child: SectionHeaderWidget(
                        label: 'Selección Curatorial',
                        title: 'Obras Destacadas',
                        onVerTodo: () => onTabChange?.call(1),
                      ),
                    ),
                    const SizedBox(height: 12),
                    _buildHorizontalObrasList(
                      context,
                      obras.destacadas.isEmpty ? obras.recientes : obras.destacadas,
                      profile,
                      obras,
                    ),
                    const SizedBox(height: 28),
                    // Recientes
                    Padding(
                      padding: const EdgeInsets.symmetric(horizontal: 20),
                      child: SectionHeaderWidget(
                        label: 'Galería',
                        title: 'Últimas Publicaciones',
                        onVerTodo: () => onTabChange?.call(1),
                      ),
                    ),
                    const SizedBox(height: 12),
                    _buildHorizontalObrasList(
                      context,
                      obras.recientes,
                      profile,
                      obras,
                    ),
                    const SizedBox(height: 28),
                    // My obras
                    Padding(
                      padding: const EdgeInsets.symmetric(horizontal: 20),
                      child: SectionHeaderWidget(
                        label: 'Tu Galería',
                        title: 'Mis Obras',
                        onVerTodo: () => onTabChange?.call(3),
                      ),
                    ),
                    const SizedBox(height: 12),
                    _buildMisObras(context, obras, profile),
                    const SizedBox(height: 80),
                  ],
                ),
              ),
            ],
          ),
        );
      },
    );
  }

  Widget _buildHeader(BuildContext context, ProfileProvider profile, ObrasProvider obras) {
    return Container(
      padding: EdgeInsets.only(
        top: MediaQuery.of(context).padding.top + 12,
        left: 20,
        right: 20,
        bottom: 12,
      ),
      color: AppColors.parchment,
      child: Row(
        children: [
          // Logo block
          Container(
            width: 40,
            height: 40,
            decoration: BoxDecoration(
              color: AppColors.rust,
              borderRadius: BorderRadius.circular(10),
            ),
            child: Center(
              child: Text(
                'M',
                style: GoogleFonts.playfairDisplay(
                  fontSize: 22,
                  fontWeight: FontWeight.w700,
                  color: Colors.white,
                ),
              ),
            ),
          ),
          const SizedBox(width: 10),
          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                'MAMB',
                style: GoogleFonts.playfairDisplay(
                  fontSize: 16,
                  fontWeight: FontWeight.w700,
                  color: AppColors.textDark,
                  letterSpacing: 2,
                ),
              ),
              Text(
                '¡Bienvenido, ${profile.apodo}!',
                style: GoogleFonts.dmSans(
                  fontSize: 12,
                  color: AppColors.textMid,
                ),
              ),
            ],
          ),
          const Spacer(),
          IconButton(
            icon: const Icon(Icons.notifications_outlined, color: AppColors.textMid),
            onPressed: () {},
            iconSize: 24,
            padding: const EdgeInsets.all(8),
            constraints: const BoxConstraints(minWidth: 48, minHeight: 48),
          ),
          GestureDetector(
            onTap: () => onTabChange?.call(3),
            child: AvatarWidget(avatarIndex: profile.avatarIndex, size: 40),
          ),
        ],
      ),
    );
  }

  Widget _buildHero(BuildContext context) {
    return Container(
      margin: const EdgeInsets.symmetric(horizontal: 20),
      height: 160,
      decoration: BoxDecoration(
        gradient: const LinearGradient(
          colors: [AppColors.rust, AppColors.rustDark],
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
        ),
        borderRadius: BorderRadius.circular(20),
        boxShadow: [
          BoxShadow(
            color: AppColors.rust.withOpacity(0.3),
            blurRadius: 16,
            offset: const Offset(0, 6),
          ),
        ],
      ),
      child: Stack(
        children: [
          // Decorative circles
          Positioned(
            right: -20,
            top: -20,
            child: Container(
              width: 120,
              height: 120,
              decoration: BoxDecoration(
                shape: BoxShape.circle,
                color: Colors.white.withOpacity(0.07),
              ),
            ),
          ),
          Positioned(
            right: 30,
            bottom: -30,
            child: Container(
              width: 80,
              height: 80,
              decoration: BoxDecoration(
                shape: BoxShape.circle,
                color: Colors.white.withOpacity(0.05),
              ),
            ),
          ),
          Padding(
            padding: const EdgeInsets.all(24),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Text(
                  'EXPLORA EL ARTE',
                  style: GoogleFonts.playfairDisplay(
                    fontSize: 28,
                    fontWeight: FontWeight.w700,
                    color: Colors.white,
                    height: 1.2,
                  ),
                ),
                const SizedBox(height: 8),
                Text(
                  'Descubre y comparte obras del\nMuseo de Arte Moderno',
                  style: GoogleFonts.dmSans(
                    fontSize: 13,
                    color: Colors.white.withOpacity(0.85),
                    height: 1.4,
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildHorizontalObrasList(
    BuildContext context,
    List<Obra> obras,
    ProfileProvider profile,
    ObrasProvider provider,
  ) {
    if (provider.isLoading) {
      return SizedBox(
        height: 220,
        child: ListView.builder(
          scrollDirection: Axis.horizontal,
          padding: const EdgeInsets.symmetric(horizontal: 20),
          itemCount: 4,
          itemBuilder: (_, __) => Container(
            width: 160,
            height: 220,
            margin: const EdgeInsets.only(right: 12),
            decoration: BoxDecoration(
              color: AppColors.cream2,
              borderRadius: BorderRadius.circular(16),
            ),
          ),
        ),
      );
    }

    if (obras.isEmpty) {
      return SizedBox(
        height: 100,
        child: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              const Icon(Icons.palette_outlined, color: AppColors.textLight, size: 32),
              const SizedBox(height: 8),
              Text(
                'Aún no hay obras publicadas',
                style: GoogleFonts.dmSans(color: AppColors.textLight, fontSize: 14),
              ),
            ],
          ),
        ),
      );
    }

    return SizedBox(
      height: 220,
      child: ListView.builder(
        scrollDirection: Axis.horizontal,
        padding: const EdgeInsets.symmetric(horizontal: 20),
        itemCount: obras.length,
        itemBuilder: (context, i) {
          final obra = obras[i];
          return ArtCardWidget(
            obra: obra,
            isLiked: profile.isLiked(obra.id),
            isHorizontal: true,
            onTap: () => Navigator.of(context).push(
              MaterialPageRoute(
                builder: (_) => const ArtworkDetailScreen(),
                settings: RouteSettings(arguments: obra),
              ),
            ),
            onLike: () => provider.incrementLike(obra.id),
          );
        },
      ),
    );
  }

  Widget _buildMisObras(
    BuildContext context,
    ObrasProvider obrasProvider,
    ProfileProvider profile,
  ) {
    final misObras = obrasProvider.obrasDeAutor(profile.apodo);

    return SizedBox(
      height: 220,
      child: ListView.builder(
        scrollDirection: Axis.horizontal,
        padding: const EdgeInsets.symmetric(horizontal: 20),
        itemCount: misObras.length + 1,
        itemBuilder: (context, i) {
          // Add card at end
          if (i == misObras.length) {
            return GestureDetector(
              onTap: () => onTabChange?.call(2),
              child: Container(
                width: 100,
                height: 220,
                margin: const EdgeInsets.only(right: 12),
                decoration: BoxDecoration(
                  color: AppColors.cream2,
                  borderRadius: BorderRadius.circular(16),
                  border: Border.all(color: AppColors.rust, width: 2, style: BorderStyle.solid),
                ),
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    const Icon(Icons.add_circle_outline, color: AppColors.rust, size: 36),
                    const SizedBox(height: 8),
                    Text(
                      'Añadir\nobra',
                      textAlign: TextAlign.center,
                      style: GoogleFonts.dmSans(
                        fontSize: 13,
                        color: AppColors.rust,
                        fontWeight: FontWeight.w600,
                      ),
                    ),
                  ],
                ),
              ),
            );
          }

          final obra = misObras[i];
          return ArtCardWidget(
            obra: obra,
            isLiked: profile.isLiked(obra.id),
            isHorizontal: true,
            onTap: () => Navigator.of(context).push(
              MaterialPageRoute(
                builder: (_) => const ArtworkDetailScreen(),
                settings: RouteSettings(arguments: obra),
              ),
            ),
            onLike: () => obrasProvider.incrementLike(obra.id),
          );
        },
      ),
    );
  }
}
