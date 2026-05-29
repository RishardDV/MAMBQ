import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:provider/provider.dart';
import '../providers/profile_provider.dart';
import '../providers/obras_provider.dart';
import '../theme/app_theme.dart';
import '../widgets/avatar_widget.dart';
import '../widgets/art_card_widget.dart';
import '../models/obra.dart';
import 'artwork_detail_screen.dart';

class PerfilScreen extends StatefulWidget {
  const PerfilScreen({super.key});

  @override
  State<PerfilScreen> createState() => _PerfilScreenState();
}

class _PerfilScreenState extends State<PerfilScreen> {
  bool _isEditing = false;
  late TextEditingController _apodoController;

  @override
  void initState() {
    super.initState();
    _apodoController = TextEditingController();
  }

  @override
  void dispose() {
    _apodoController.dispose();
    super.dispose();
  }

  void _startEditing(ProfileProvider profile) {
    _apodoController.text = profile.apodo;
    setState(() => _isEditing = true);
  }

  Future<void> _saveChanges(ProfileProvider profile) async {
    await profile.setApodo(_apodoController.text.trim());
    if (!mounted) return;
    setState(() => _isEditing = false);
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text('¡Perfil actualizado!',
            style: GoogleFonts.dmSans(color: Colors.white)),
        backgroundColor: AppColors.green,
        behavior: SnackBarBehavior.floating,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
      ),
    );
  }

  void _showAvatarSelector(ProfileProvider profile) {
    showModalBottomSheet(
      context: context,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(20)),
      ),
      backgroundColor: AppColors.parchment,
      builder: (_) => SafeArea(
        child: Padding(
          padding: const EdgeInsets.all(24),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              Container(
                width: 40,
                height: 4,
                decoration: BoxDecoration(
                  color: AppColors.cream2,
                  borderRadius: BorderRadius.circular(2),
                ),
              ),
              const SizedBox(height: 16),
              Text(
                'Elige tu avatar',
                style: GoogleFonts.playfairDisplay(
                  fontSize: 18,
                  fontWeight: FontWeight.w600,
                  color: AppColors.textDark,
                ),
              ),
              const SizedBox(height: 20),
              GridView.builder(
                shrinkWrap: true,
                physics: const NeverScrollableScrollPhysics(),
                gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                  crossAxisCount: 4,
                  mainAxisSpacing: 16,
                  crossAxisSpacing: 16,
                  childAspectRatio: 1,
                ),
                itemCount: 8,
                itemBuilder: (context, i) {
                  final isSelected = profile.avatarIndex == i;
                  return GestureDetector(
                    onTap: () async {
                      Navigator.pop(context);
                      await profile.setAvatar(i);
                    },
                    child: Container(
                      decoration: BoxDecoration(
                        borderRadius: BorderRadius.circular(16),
                        border: Border.all(
                          color: isSelected ? AppColors.rust : Colors.transparent,
                          width: 3,
                        ),
                      ),
                      child: Padding(
                        padding: const EdgeInsets.all(3),
                        child: AvatarWidget(avatarIndex: i, size: 56),
                      ),
                    ),
                  );
                },
              ),
            ],
          ),
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.parchment,
      body: SafeArea(
        child: Consumer2<ProfileProvider, ObrasProvider>(
          builder: (context, profile, obras, _) {
            final misObras = obras.obrasDeAutor(profile.apodo);
            final misFavoritos = obras.obras.where((o) => profile.isFavorite(o.id)).toList();
            return SingleChildScrollView(
              padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 16),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  // Header
                  _buildHeader(),
                  const SizedBox(height: 24),
                  // Profile section
                  _buildProfileSection(context, profile),
                  const SizedBox(height: 20),
                  // Stats
                  _buildStats(misObras, misFavoritos),
                  const SizedBox(height: 28),
                  // Mis obras
                  _buildObrasSection(context, obras, profile, misObras),
                  const SizedBox(height: 28),
                  // Mis favoritos
                  _buildFavoritosSection(context, obras, profile, misFavoritos),
                  const SizedBox(height: 40),
                ],
              ),
            );
          },
        ),
      ),
    );
  }

  Widget _buildHeader() {
    return Row(
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
        const Spacer(),
        Text(
          'Mi Perfil',
          style: GoogleFonts.dmSans(fontSize: 13, color: AppColors.textMid),
        ),
      ],
    );
  }

  Widget _buildProfileSection(BuildContext context, ProfileProvider profile) {
    return Container(
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(20),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.05),
            blurRadius: 10,
            offset: const Offset(0, 2),
          ),
        ],
      ),
      child: Column(
        children: [
          // Avatar
          GestureDetector(
            onTap: () => _showAvatarSelector(profile),
            child: Stack(
              children: [
                AvatarWidget(avatarIndex: profile.avatarIndex, size: 80),
                Positioned(
                  right: 0,
                  bottom: 0,
                  child: Container(
                    padding: const EdgeInsets.all(4),
                    decoration: const BoxDecoration(
                      color: AppColors.rust,
                      shape: BoxShape.circle,
                    ),
                    child: const Icon(Icons.edit, color: Colors.white, size: 14),
                  ),
                ),
              ],
            ),
          ),
          const SizedBox(height: 12),
          // Apodo
          if (_isEditing) ...[
            TextField(
              controller: _apodoController,
              textAlign: TextAlign.center,
              decoration: const InputDecoration(
                hintText: 'Tu apodo artístico',
              ),
              style: GoogleFonts.playfairDisplay(
                fontSize: 20,
                fontWeight: FontWeight.w700,
                color: AppColors.textDark,
              ),
            ),
            const SizedBox(height: 12),
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                TextButton(
                  onPressed: () => setState(() => _isEditing = false),
                  child: Text('Cancelar',
                      style: GoogleFonts.dmSans(color: AppColors.textMid)),
                ),
                const SizedBox(width: 12),
                ElevatedButton(
                  onPressed: () => _saveChanges(profile),
                  style: ElevatedButton.styleFrom(
                    minimumSize: Size.zero,
                    padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 10),
                  ),
                  child: const Text('Guardar'),
                ),
              ],
            ),
          ] else ...[
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              mainAxisSize: MainAxisSize.min,
              children: [
                Text(
                  profile.apodo,
                  style: GoogleFonts.playfairDisplay(
                    fontSize: 22,
                    fontWeight: FontWeight.w700,
                    color: AppColors.textDark,
                  ),
                ),
                const SizedBox(width: 8),
                GestureDetector(
                  onTap: () => _startEditing(profile),
                  child: const Icon(Icons.edit_outlined,
                      size: 18, color: AppColors.textLight),
                ),
              ],
            ),
          ],
          const SizedBox(height: 6),
          Text(
            'Artista del MAMB',
            style: GoogleFonts.dmSans(
              fontSize: 13,
              color: AppColors.textLight,
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildStats(List<Obra> misObras, List<Obra> misFavoritos) {
    return Row(
      children: [
        Expanded(
          child: _buildStatCard(
            icon: Icons.palette,
            value: misObras.length.toString(),
            label: 'Obras',
          ),
        ),
        const SizedBox(width: 12),
        Expanded(
          child: _buildStatCard(
            icon: Icons.favorite,
            value: misFavoritos.length.toString(),
            label: 'Favoritos',
          ),
        ),
        const SizedBox(width: 12),
        Expanded(
          child: _buildStatCard(
            icon: Icons.thumb_up,
            value: misObras
                .fold<int>(0, (sum, o) => sum + o.likes)
                .toString(),
            label: 'Likes',
          ),
        ),
      ],
    );
  }

  Widget _buildStatCard({
    required IconData icon,
    required String value,
    required String label,
  }) {
    return Container(
      padding: const EdgeInsets.symmetric(vertical: 16),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(16),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.04),
            blurRadius: 8,
            offset: const Offset(0, 2),
          ),
        ],
      ),
      child: Column(
        children: [
          Icon(icon, color: AppColors.rust, size: 20),
          const SizedBox(height: 6),
          Text(
            value,
            style: GoogleFonts.playfairDisplay(
              fontSize: 22,
              fontWeight: FontWeight.w700,
              color: AppColors.textDark,
            ),
          ),
          Text(
            label,
            style: GoogleFonts.dmSans(
              fontSize: 11,
              color: AppColors.textLight,
              fontWeight: FontWeight.w500,
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildObrasSection(
    BuildContext context,
    ObrasProvider obras,
    ProfileProvider profile,
    List<Obra> misObras,
  ) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          children: [
            Text(
              'MIS OBRAS',
              style: GoogleFonts.dmSans(
                fontSize: 10,
                fontWeight: FontWeight.w700,
                letterSpacing: 1.5,
                color: AppColors.textLight,
              ),
            ),
            const SizedBox(width: 6),
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
              decoration: BoxDecoration(
                color: AppColors.rust.withOpacity(0.1),
                borderRadius: BorderRadius.circular(10),
              ),
              child: Text(
                '${misObras.length}',
                style: GoogleFonts.dmSans(
                  fontSize: 11,
                  fontWeight: FontWeight.w700,
                  color: AppColors.rust,
                ),
              ),
            ),
          ],
        ),
        const SizedBox(height: 12),
        if (misObras.isEmpty)
          _buildEmptyState(
            'Aún no has publicado obras',
            'Tu galería personal está esperando',
            Icons.palette_outlined,
          )
        else
          SizedBox(
            height: 220,
            child: ListView.builder(
              scrollDirection: Axis.horizontal,
              itemCount: misObras.length,
              itemBuilder: (context, i) {
                final obra = misObras[i];
                return _buildObraItem(context, obra, profile, obras);
              },
            ),
          ),
      ],
    );
  }

  Widget _buildFavoritosSection(
    BuildContext context,
    ObrasProvider obras,
    ProfileProvider profile,
    List<Obra> misFavoritos,
  ) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          children: [
            Text(
              'MIS FAVORITOS',
              style: GoogleFonts.dmSans(
                fontSize: 10,
                fontWeight: FontWeight.w700,
                letterSpacing: 1.5,
                color: AppColors.textLight,
              ),
            ),
            const SizedBox(width: 6),
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
              decoration: BoxDecoration(
                color: AppColors.gold.withOpacity(0.15),
                borderRadius: BorderRadius.circular(10),
              ),
              child: Text(
                '${misFavoritos.length}',
                style: GoogleFonts.dmSans(
                  fontSize: 11,
                  fontWeight: FontWeight.w700,
                  color: AppColors.gold,
                ),
              ),
            ),
          ],
        ),
        const SizedBox(height: 12),
        if (misFavoritos.isEmpty)
          _buildEmptyState(
            'No tienes favoritos aún',
            'Guarda las obras que más te gusten',
            Icons.favorite_outline,
          )
        else
          SizedBox(
            height: 220,
            child: ListView.builder(
              scrollDirection: Axis.horizontal,
              itemCount: misFavoritos.length,
              itemBuilder: (context, i) {
                final obra = misFavoritos[i];
                return _buildObraItem(context, obra, profile, obras);
              },
            ),
          ),
      ],
    );
  }

  Widget _buildObraItem(
    BuildContext context,
    Obra obra,
    ProfileProvider profile,
    ObrasProvider obrasProvider,
  ) {
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
  }

  Widget _buildEmptyState(String title, String subtitle, IconData icon) {
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.symmetric(vertical: 28),
      decoration: BoxDecoration(
        color: AppColors.cream2.withOpacity(0.5),
        borderRadius: BorderRadius.circular(16),
      ),
      child: Column(
        children: [
          Icon(icon, size: 40, color: AppColors.textLight),
          const SizedBox(height: 10),
          Text(
            title,
            style: GoogleFonts.dmSans(
              fontSize: 14,
              fontWeight: FontWeight.w600,
              color: AppColors.textMid,
            ),
          ),
          const SizedBox(height: 4),
          Text(
            subtitle,
            style: GoogleFonts.dmSans(fontSize: 12, color: AppColors.textLight),
          ),
        ],
      ),
    );
  }
}
