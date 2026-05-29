import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:provider/provider.dart';
import '../providers/profile_provider.dart';
import '../providers/obras_provider.dart';
import '../theme/app_theme.dart';
import '../widgets/art_card_widget.dart';
import 'artwork_detail_screen.dart';

class GaleriaScreen extends StatefulWidget {
  const GaleriaScreen({super.key});

  @override
  State<GaleriaScreen> createState() => _GaleriaScreenState();
}

class _GaleriaScreenState extends State<GaleriaScreen> {
  final _searchController = TextEditingController();

  @override
  void dispose() {
    _searchController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.parchment,
      body: SafeArea(
        child: Consumer2<ObrasProvider, ProfileProvider>(
          builder: (context, obras, profile, _) {
            return Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                // Header
                _buildHeader(context),
                const SizedBox(height: 4),
                // Title
                Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 20),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        'MUSEO · GALERÍA',
                        style: GoogleFonts.dmSans(
                          fontSize: 10,
                          fontWeight: FontWeight.w600,
                          letterSpacing: 1.5,
                          color: AppColors.textLight,
                        ),
                      ),
                      const SizedBox(height: 2),
                      Text(
                        'Todas las Obras',
                        style: GoogleFonts.playfairDisplay(
                          fontSize: 22,
                          fontWeight: FontWeight.w700,
                          color: AppColors.textDark,
                        ),
                      ),
                    ],
                  ),
                ),
                const SizedBox(height: 12),
                // Search bar
                Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 20),
                  child: Container(
                    height: 48,
                    decoration: BoxDecoration(
                      color: AppColors.cream2,
                      borderRadius: BorderRadius.circular(14),
                    ),
                    child: Row(
                      children: [
                        const SizedBox(width: 12),
                        const Icon(Icons.search, color: AppColors.textLight, size: 20),
                        const SizedBox(width: 8),
                        Expanded(
                          child: TextField(
                            controller: _searchController,
                            decoration: InputDecoration(
                              hintText: 'Buscar obras, artistas...',
                              hintStyle: GoogleFonts.dmSans(
                                fontSize: 14,
                                color: AppColors.textLight,
                              ),
                              border: InputBorder.none,
                              fillColor: Colors.transparent,
                              filled: false,
                              contentPadding: EdgeInsets.zero,
                            ),
                            style: GoogleFonts.dmSans(fontSize: 14, color: AppColors.textDark),
                            onChanged: (value) => obras.setSearch(value),
                          ),
                        ),
                        if (_searchController.text.isNotEmpty)
                          IconButton(
                            icon: const Icon(Icons.close, size: 18, color: AppColors.textLight),
                            onPressed: () {
                              _searchController.clear();
                              obras.setSearch('');
                            },
                          ),
                      ],
                    ),
                  ),
                ),
                const SizedBox(height: 16),
                // Grid
                Expanded(
                  child: obras.isLoading
                      ? const Center(
                          child: CircularProgressIndicator(color: AppColors.rust),
                        )
                      : obras.obras.isEmpty
                          ? Center(
                              child: Column(
                                mainAxisAlignment: MainAxisAlignment.center,
                                children: [
                                  const Icon(
                                    Icons.palette_outlined,
                                    size: 64,
                                    color: AppColors.textLight,
                                  ),
                                  const SizedBox(height: 16),
                                  Text(
                                    'No hay obras aún',
                                    style: GoogleFonts.playfairDisplay(
                                      fontSize: 18,
                                      color: AppColors.textMid,
                                    ),
                                  ),
                                  const SizedBox(height: 8),
                                  Text(
                                    '¡Sé el primero en publicar!',
                                    style: GoogleFonts.dmSans(
                                      fontSize: 14,
                                      color: AppColors.textLight,
                                    ),
                                  ),
                                ],
                              ),
                            )
                          : GridView.builder(
                              padding: const EdgeInsets.symmetric(horizontal: 20),
                              gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                                crossAxisCount: 2,
                                mainAxisSpacing: 16,
                                crossAxisSpacing: 16,
                                childAspectRatio: 0.72,
                              ),
                              itemCount: obras.obras.length,
                              itemBuilder: (context, i) {
                                final obra = obras.obras[i];
                                return ArtCardWidget(
                                  obra: obra,
                                  isLiked: profile.isLiked(obra.id),
                                  isHorizontal: false,
                                  onTap: () => Navigator.of(context).push(
                                    MaterialPageRoute(
                                      builder: (_) => const ArtworkDetailScreen(),
                                      settings: RouteSettings(arguments: obra),
                                    ),
                                  ),
                                  onLike: () => obras.incrementLike(obra.id),
                                );
                              },
                            ),
                ),
              ],
            );
          },
        ),
      ),
    );
  }

  Widget _buildHeader(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.fromLTRB(20, 12, 20, 8),
      child: Row(
        children: [
          Container(
            width: 36,
            height: 36,
            decoration: BoxDecoration(
              color: AppColors.rust,
              borderRadius: BorderRadius.circular(9),
            ),
            child: Center(
              child: Text(
                'M',
                style: GoogleFonts.playfairDisplay(
                  fontSize: 18,
                  fontWeight: FontWeight.w700,
                  color: Colors.white,
                ),
              ),
            ),
          ),
          const SizedBox(width: 8),
          Text(
            'MAMB',
            style: GoogleFonts.playfairDisplay(
              fontSize: 14,
              fontWeight: FontWeight.w700,
              color: AppColors.textDark,
              letterSpacing: 2,
            ),
          ),
        ],
      ),
    );
  }
}
