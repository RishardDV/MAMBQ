import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class AppColors {
  static const Color rust = Color(0xFFC1440E);
  static const Color rustDark = Color(0xFF9B3309);
  static const Color green = Color(0xFF2D6A4F);
  static const Color navy = Color(0xFF1B3A5C);
  static const Color gold = Color(0xFFC8963E);
  static const Color parchment = Color(0xFFF8F4EC);
  static const Color cream = Color(0xFFF5F0E8);
  static const Color cream2 = Color(0xFFEDE8DE);
  static const Color textDark = Color(0xFF1A1008);
  static const Color textMid = Color(0xFF5A4A3A);
  static const Color textLight = Color(0xFF9A8A7A);
  static const Color purple = Color(0xFF7B2D8B);
  static const Color magenta = Color(0xFFC2185B);
  static const Color teal = Color(0xFF006064);
  static const Color slate = Color(0xFF546E7A);
}

class AppTheme {
  static ThemeData get theme {
    return ThemeData(
      useMaterial3: true,
      colorScheme: ColorScheme(
        brightness: Brightness.light,
        primary: AppColors.rust,
        onPrimary: Colors.white,
        primaryContainer: AppColors.rustDark,
        onPrimaryContainer: Colors.white,
        secondary: AppColors.green,
        onSecondary: Colors.white,
        secondaryContainer: const Color(0xFFB7E4C7),
        onSecondaryContainer: AppColors.textDark,
        tertiary: AppColors.gold,
        onTertiary: Colors.white,
        tertiaryContainer: const Color(0xFFF5DEB3),
        onTertiaryContainer: AppColors.textDark,
        error: const Color(0xFFB00020),
        onError: Colors.white,
        errorContainer: const Color(0xFFFFDAD6),
        onErrorContainer: AppColors.textDark,
        surface: AppColors.parchment,
        onSurface: AppColors.textDark,
        surfaceContainerHighest: AppColors.cream2,
        onSurfaceVariant: AppColors.textMid,
        outline: AppColors.textLight,
        outlineVariant: AppColors.cream2,
        shadow: Colors.black,
        scrim: Colors.black,
        inverseSurface: AppColors.navy,
        onInverseSurface: Colors.white,
        inversePrimary: AppColors.gold,
      ),
      scaffoldBackgroundColor: AppColors.parchment,
      textTheme: TextTheme(
        displayLarge: GoogleFonts.playfairDisplay(
          fontSize: 32,
          fontWeight: FontWeight.w700,
          color: AppColors.textDark,
        ),
        displayMedium: GoogleFonts.playfairDisplay(
          fontSize: 24,
          fontWeight: FontWeight.w600,
          color: AppColors.textDark,
        ),
        headlineMedium: GoogleFonts.playfairDisplay(
          fontSize: 20,
          fontWeight: FontWeight.w600,
          color: AppColors.textDark,
        ),
        titleLarge: GoogleFonts.dmSans(
          fontSize: 18,
          fontWeight: FontWeight.w600,
          color: AppColors.textDark,
        ),
        titleMedium: GoogleFonts.dmSans(
          fontSize: 15,
          fontWeight: FontWeight.w500,
          color: AppColors.textDark,
        ),
        bodyLarge: GoogleFonts.dmSans(
          fontSize: 15,
          fontWeight: FontWeight.w400,
          color: AppColors.textDark,
        ),
        bodyMedium: GoogleFonts.dmSans(
          fontSize: 13,
          fontWeight: FontWeight.w400,
          color: AppColors.textMid,
        ),
        labelSmall: GoogleFonts.dmSans(
          fontSize: 10,
          fontWeight: FontWeight.w600,
          letterSpacing: 1.2,
          color: AppColors.textMid,
        ),
      ),
      appBarTheme: AppBarTheme(
        backgroundColor: AppColors.parchment,
        elevation: 0,
        scrolledUnderElevation: 0,
        centerTitle: false,
        titleTextStyle: GoogleFonts.playfairDisplay(
          fontSize: 20,
          fontWeight: FontWeight.w600,
          color: AppColors.textDark,
        ),
        iconTheme: const IconThemeData(color: AppColors.textDark),
      ),
      elevatedButtonTheme: ElevatedButtonThemeData(
        style: ElevatedButton.styleFrom(
          backgroundColor: AppColors.rust,
          foregroundColor: Colors.white,
          minimumSize: const Size(double.infinity, 52),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(16),
          ),
          textStyle: GoogleFonts.dmSans(
            fontSize: 15,
            fontWeight: FontWeight.w600,
            letterSpacing: 0.5,
          ),
          elevation: 0,
        ),
      ),
      inputDecorationTheme: InputDecorationTheme(
        filled: true,
        fillColor: AppColors.cream2,
        contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
        border: OutlineInputBorder(
          borderRadius: BorderRadius.circular(14),
          borderSide: BorderSide.none,
        ),
        enabledBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(14),
          borderSide: BorderSide.none,
        ),
        focusedBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(14),
          borderSide: const BorderSide(color: AppColors.rust, width: 2),
        ),
        errorBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(14),
          borderSide: const BorderSide(color: Color(0xFFB00020), width: 1.5),
        ),
        focusedErrorBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(14),
          borderSide: const BorderSide(color: Color(0xFFB00020), width: 2),
        ),
        labelStyle: GoogleFonts.dmSans(color: AppColors.textMid),
        hintStyle: GoogleFonts.dmSans(color: AppColors.textLight),
      ),
      chipTheme: ChipThemeData(
        backgroundColor: AppColors.cream2,
        selectedColor: AppColors.rust,
        labelStyle: GoogleFonts.dmSans(
          fontSize: 13,
          fontWeight: FontWeight.w500,
          color: AppColors.textMid,
        ),
        secondaryLabelStyle: GoogleFonts.dmSans(
          fontSize: 13,
          fontWeight: FontWeight.w500,
          color: Colors.white,
        ),
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
        side: BorderSide.none,
        padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
      ),
      bottomNavigationBarTheme: BottomNavigationBarThemeData(
        backgroundColor: AppColors.parchment,
        selectedItemColor: AppColors.rust,
        unselectedItemColor: AppColors.textLight,
        type: BottomNavigationBarType.fixed,
        selectedLabelStyle: GoogleFonts.dmSans(fontSize: 11, fontWeight: FontWeight.w600),
        unselectedLabelStyle: GoogleFonts.dmSans(fontSize: 11),
        elevation: 8,
      ),
    );
  }
}
