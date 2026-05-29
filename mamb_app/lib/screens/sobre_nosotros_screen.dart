import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import '../theme/app_theme.dart';

class SobreNosotrosScreen extends StatelessWidget {
  const SobreNosotrosScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.parchment,
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 16),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // Header
              _buildHeader(),
              const SizedBox(height: 24),
              // Hero section
              _buildHeroSection(context),
              const SizedBox(height: 24),
              // El Museo card
              _buildMuseoCard(),
              const SizedBox(height: 16),
              // Quote card
              _buildQuoteCard(),
              const SizedBox(height: 16),
              // Álvaro Cepeda card
              _buildAlvaroCard(),
              const SizedBox(height: 16),
              // Alianzas card
              _buildAlianzasCard(),
              const SizedBox(height: 16),
              // Equipo card
              _buildEquipoCard(),
              const SizedBox(height: 40),
            ],
          ),
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
      ],
    );
  }

  Widget _buildHeroSection(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(24),
      decoration: BoxDecoration(
        color: AppColors.navy,
        borderRadius: BorderRadius.circular(20),
      ),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Expanded(
            flex: 3,
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  'SOBRE NOSOTROS',
                  style: GoogleFonts.dmSans(
                    fontSize: 10,
                    fontWeight: FontWeight.w600,
                    letterSpacing: 1.5,
                    color: Colors.white.withOpacity(0.6),
                  ),
                ),
                const SizedBox(height: 8),
                RichText(
                  text: TextSpan(
                    children: [
                      TextSpan(
                        text: 'Arte vivo en el ',
                        style: GoogleFonts.playfairDisplay(
                          fontSize: 24,
                          fontWeight: FontWeight.w700,
                          color: Colors.white,
                          height: 1.2,
                        ),
                      ),
                      TextSpan(
                        text: 'Caribe',
                        style: GoogleFonts.playfairDisplay(
                          fontSize: 24,
                          fontWeight: FontWeight.w700,
                          color: AppColors.gold,
                          fontStyle: FontStyle.italic,
                          height: 1.2,
                        ),
                      ),
                    ],
                  ),
                ),
                const SizedBox(height: 10),
                Text(
                  'Un espacio cultural dedicado a la preservación, difusión y celebración del arte moderno en Colombia.',
                  style: GoogleFonts.dmSans(
                    fontSize: 13,
                    color: Colors.white.withOpacity(0.8),
                    height: 1.5,
                  ),
                ),
              ],
            ),
          ),
          const SizedBox(width: 16),
          Column(
            children: [
              RotatedBox(
                quarterTurns: 1,
                child: Text(
                  'MAMB',
                  style: GoogleFonts.playfairDisplay(
                    fontSize: 18,
                    fontWeight: FontWeight.w700,
                    color: Colors.white.withOpacity(0.15),
                    letterSpacing: 6,
                  ),
                ),
              ),
              const SizedBox(height: 8),
              Text(
                'Barranquilla',
                style: GoogleFonts.dmSans(
                  fontSize: 11,
                  color: Colors.white.withOpacity(0.4),
                ),
              ),
              Text(
                '· Colombia',
                style: GoogleFonts.dmSans(
                  fontSize: 11,
                  color: Colors.white.withOpacity(0.4),
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildMuseoCard() {
    return _buildCard(
      title: 'EL MUSEO',
      child: Column(
        children: [
          _buildInfoItem(
            Icons.location_on_outlined,
            'Ubicación',
            'Carrera 36 # 41-34, Barranquilla, Colombia',
          ),
          const SizedBox(height: 12),
          _buildInfoItem(
            Icons.calendar_today_outlined,
            'Fundación',
            'El MAMB fue fundado para preservar y promover el arte moderno en el Caribe colombiano',
          ),
          const SizedBox(height: 12),
          _buildInfoItem(
            Icons.palette_outlined,
            'Misión',
            'Promovemos el acceso libre al arte y la creatividad para todas las personas, especialmente los niños',
          ),
          const SizedBox(height: 12),
          _buildInfoItem(
            Icons.visibility_outlined,
            'Visión',
            'Ser el principal referente del arte moderno en el Caribe y Latinoamérica',
          ),
        ],
      ),
    );
  }

  Widget _buildQuoteCard() {
    return Container(
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        color: AppColors.rust.withOpacity(0.06),
        borderRadius: BorderRadius.circular(16),
        border: Border(left: BorderSide(color: AppColors.rust, width: 4)),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            '"',
            style: GoogleFonts.playfairDisplay(
              fontSize: 48,
              color: AppColors.rust,
              height: 0.6,
            ),
          ),
          const SizedBox(height: 8),
          Text(
            'Promovemos la creatividad y el acceso libre al arte para todos.',
            style: GoogleFonts.playfairDisplay(
              fontSize: 16,
              fontStyle: FontStyle.italic,
              color: AppColors.textDark,
              height: 1.5,
            ),
          ),
          const SizedBox(height: 12),
          Text(
            '— Misión Institucional',
            style: GoogleFonts.dmSans(
              fontSize: 13,
              fontWeight: FontWeight.w600,
              color: AppColors.rust,
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildAlvaroCard() {
    return _buildCard(
      title: 'FIGURA CULTURAL',
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Container(
            width: 52,
            height: 52,
            decoration: BoxDecoration(
              color: AppColors.navy,
              borderRadius: BorderRadius.circular(26),
            ),
            child: Center(
              child: Text(
                'Á',
                style: GoogleFonts.playfairDisplay(
                  fontSize: 24,
                  fontWeight: FontWeight.w700,
                  color: Colors.white,
                ),
              ),
            ),
          ),
          const SizedBox(width: 16),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  'Álvaro Cepeda Samudio',
                  style: GoogleFonts.playfairDisplay(
                    fontSize: 16,
                    fontWeight: FontWeight.w700,
                    color: AppColors.textDark,
                  ),
                ),
                const SizedBox(height: 4),
                Text(
                  'Escritor · Periodista · Figura Caribeña',
                  style: GoogleFonts.dmSans(
                    fontSize: 12,
                    color: AppColors.textMid,
                  ),
                ),
                const SizedBox(height: 10),
                Text(
                  'Escritor y periodista barranquillero, amigo cercano de Gabriel García Márquez y figura clave del "Grupo de Barranquilla". Su obra literaria y periodística ha sido fundamental para la cultura caribeña colombiana.',
                  style: GoogleFonts.dmSans(
                    fontSize: 13,
                    color: AppColors.textMid,
                    height: 1.5,
                  ),
                ),
                const SizedBox(height: 12),
                Wrap(
                  spacing: 6,
                  runSpacing: 6,
                  children: ['Barranquilla', 'Literatura', 'Arte'].map((tag) {
                    return Container(
                      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                      decoration: BoxDecoration(
                        color: AppColors.navy.withOpacity(0.08),
                        borderRadius: BorderRadius.circular(12),
                      ),
                      child: Text(
                        tag,
                        style: GoogleFonts.dmSans(
                          fontSize: 11,
                          fontWeight: FontWeight.w600,
                          color: AppColors.navy,
                        ),
                      ),
                    );
                  }).toList(),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildAlianzasCard() {
    return _buildCard(
      title: 'ALIANZAS ACADÉMICAS',
      child: Wrap(
        spacing: 10,
        runSpacing: 10,
        children: [
          _buildAlianzaChip('Promigas', AppColors.teal),
          _buildAlianzaChip('Universidad del Norte', AppColors.navy),
          _buildAlianzaChip('Ministerio de Cultura', AppColors.green),
          _buildAlianzaChip('Gobernación del Atlántico', AppColors.rust),
        ],
      ),
    );
  }

  Widget _buildAlianzaChip(String name, Color color) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 8),
      decoration: BoxDecoration(
        color: color.withOpacity(0.08),
        borderRadius: BorderRadius.circular(20),
        border: Border.all(color: color.withOpacity(0.25)),
      ),
      child: Text(
        name,
        style: GoogleFonts.dmSans(
          fontSize: 13,
          fontWeight: FontWeight.w600,
          color: color,
        ),
      ),
    );
  }

  Widget _buildEquipoCard() {
    return _buildCard(
      title: 'NUESTRO EQUIPO',
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceAround,
        children: [
          Expanded(child: _buildTeamMember('SP', AppColors.rust, 'Diseñadora', 'Beca 2')),
          Expanded(child: _buildTeamMember('RM', AppColors.green, 'Diseñadora', 'Beca 3')),
          Expanded(child: _buildTeamMember('DB', AppColors.navy, 'Diseñadora', 'Beca 1')),
        ],
      ),
    );
  }

  Widget _buildTeamMember(String initials, Color color, String role, String title) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.center,
      children: [
        Container(
          width: 56,
          height: 56,
          decoration: BoxDecoration(
            color: color,
            shape: BoxShape.circle,
          ),
          child: Center(
            child: Text(
              initials,
              style: GoogleFonts.playfairDisplay(
                fontSize: 18,
                fontWeight: FontWeight.w700,
                color: Colors.white,
              ),
            ),
          ),
        ),
        const SizedBox(height: 8),
        Text(
          role,
          style: GoogleFonts.dmSans(
            fontSize: 12,
            fontWeight: FontWeight.w600,
            color: AppColors.textDark,
          ),
        ),
        Text(
          title,
          style: GoogleFonts.dmSans(
            fontSize: 11,
            color: AppColors.textLight,
          ),
        ),
      ],
    );
  }

  Widget _buildInfoItem(IconData icon, String label, String value) {
    return Row(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Icon(icon, color: AppColors.rust, size: 20),
        const SizedBox(width: 12),
        Expanded(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                label,
                style: GoogleFonts.dmSans(
                  fontSize: 11,
                  fontWeight: FontWeight.w700,
                  color: AppColors.textLight,
                  letterSpacing: 0.5,
                ),
              ),
              const SizedBox(height: 2),
              Text(
                value,
                style: GoogleFonts.dmSans(
                  fontSize: 13,
                  color: AppColors.textMid,
                  height: 1.4,
                ),
              ),
            ],
          ),
        ),
      ],
    );
  }

  Widget _buildCard({required String title, required Widget child}) {
    return Container(
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(16),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.05),
            blurRadius: 8,
            offset: const Offset(0, 2),
          ),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            title,
            style: GoogleFonts.dmSans(
              fontSize: 10,
              fontWeight: FontWeight.w700,
              letterSpacing: 1.5,
              color: AppColors.rust,
            ),
          ),
          const SizedBox(height: 14),
          child,
        ],
      ),
    );
  }
}
