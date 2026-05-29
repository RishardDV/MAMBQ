import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:provider/provider.dart';
import '../../providers/auth_provider.dart';
import '../../theme/app_theme.dart';
import '../../widgets/avatar_widget.dart';

class RegisterScreen extends StatefulWidget {
  const RegisterScreen({super.key});

  @override
  State<RegisterScreen> createState() => _RegisterScreenState();
}

class _RegisterScreenState extends State<RegisterScreen> {
  final _apodoController = TextEditingController();
  final _passwordController = TextEditingController();
  final _confirmController = TextEditingController();
  final _formKey = GlobalKey<FormState>();
  int _selectedAvatar = 0;
  bool _obscurePassword = true;
  bool _obscureConfirm = true;

  @override
  void dispose() {
    _apodoController.dispose();
    _passwordController.dispose();
    _confirmController.dispose();
    super.dispose();
  }

  Future<void> _handleRegister() async {
    if (!_formKey.currentState!.validate()) return;

    final auth = Provider.of<AuthProvider>(context, listen: false);
    final success = await auth.register(
      _apodoController.text.trim(),
      _passwordController.text,
      _selectedAvatar,
    );

    if (!mounted) return;

    if (success) {
      Navigator.of(context).pushReplacementNamed('/home');
    } else {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text(
            auth.error ?? 'Error al crear la cuenta',
            style: GoogleFonts.dmSans(color: Colors.white),
          ),
          backgroundColor: AppColors.rust,
          behavior: SnackBarBehavior.floating,
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
        ),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.parchment,
      appBar: AppBar(
        title: Text(
          'Crear cuenta',
          style: GoogleFonts.playfairDisplay(
            fontSize: 20,
            fontWeight: FontWeight.w600,
            color: AppColors.textDark,
          ),
        ),
        backgroundColor: AppColors.parchment,
        elevation: 0,
        iconTheme: const IconThemeData(color: AppColors.textDark),
      ),
      body: Consumer<AuthProvider>(
        builder: (context, auth, _) {
          return SingleChildScrollView(
            padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 16),
            child: Form(
              key: _formKey,
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  // Section 1: Avatar
                  Text(
                    'Elige tu avatar',
                    style: GoogleFonts.playfairDisplay(
                      fontSize: 18,
                      fontWeight: FontWeight.w600,
                      color: AppColors.textDark,
                    ),
                  ),
                  const SizedBox(height: 4),
                  Text(
                    '¿Con cuál te identificas más?',
                    style: GoogleFonts.dmSans(fontSize: 13, color: AppColors.textMid),
                  ),
                  const SizedBox(height: 16),
                  GridView.builder(
                    shrinkWrap: true,
                    physics: const NeverScrollableScrollPhysics(),
                    gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                      crossAxisCount: 4,
                      mainAxisSpacing: 12,
                      crossAxisSpacing: 12,
                      childAspectRatio: 1,
                    ),
                    itemCount: 8,
                    itemBuilder: (context, i) {
                      final isSelected = _selectedAvatar == i;
                      return GestureDetector(
                        onTap: () => setState(() => _selectedAvatar = i),
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
                            child: AvatarWidget(avatarIndex: i, size: 60),
                          ),
                        ),
                      );
                    },
                  ),
                  const SizedBox(height: 28),
                  // Section 2: Apodo
                  Text(
                    'Tu apodo artístico',
                    style: GoogleFonts.playfairDisplay(
                      fontSize: 18,
                      fontWeight: FontWeight.w600,
                      color: AppColors.textDark,
                    ),
                  ),
                  const SizedBox(height: 4),
                  Text(
                    'Este será tu nombre en el museo',
                    style: GoogleFonts.dmSans(fontSize: 13, color: AppColors.textMid),
                  ),
                  const SizedBox(height: 12),
                  TextFormField(
                    controller: _apodoController,
                    textInputAction: TextInputAction.next,
                    decoration: const InputDecoration(
                      hintText: 'ej: PintorEstelar, ColorMago...',
                      prefixIcon: Icon(Icons.palette, color: AppColors.rust),
                    ),
                    validator: (v) {
                      if (v == null || v.trim().isEmpty) return 'Elige un apodo';
                      if (v.trim().length < 2) return 'Mínimo 2 caracteres';
                      if (v.trim().length > 20) return 'Máximo 20 caracteres';
                      return null;
                    },
                  ),
                  const SizedBox(height: 6),
                  Row(
                    children: [
                      const Icon(Icons.info_outline, size: 14, color: AppColors.textLight),
                      const SizedBox(width: 4),
                      Text(
                        'No uses tu nombre real por tu seguridad',
                        style: GoogleFonts.dmSans(fontSize: 12, color: AppColors.textLight),
                      ),
                    ],
                  ),
                  const SizedBox(height: 24),
                  // Section 3: Password
                  Text(
                    'Contraseña secreta',
                    style: GoogleFonts.playfairDisplay(
                      fontSize: 18,
                      fontWeight: FontWeight.w600,
                      color: AppColors.textDark,
                    ),
                  ),
                  const SizedBox(height: 12),
                  TextFormField(
                    controller: _passwordController,
                    obscureText: _obscurePassword,
                    textInputAction: TextInputAction.next,
                    decoration: InputDecoration(
                      hintText: 'Mínimo 4 caracteres',
                      prefixIcon: const Icon(Icons.lock_outline, color: AppColors.rust),
                      suffixIcon: IconButton(
                        icon: Icon(
                          _obscurePassword
                              ? Icons.visibility_outlined
                              : Icons.visibility_off_outlined,
                          color: AppColors.textLight,
                        ),
                        onPressed: () => setState(() => _obscurePassword = !_obscurePassword),
                      ),
                    ),
                    validator: (v) {
                      if (v == null || v.isEmpty) return 'Crea una contraseña';
                      if (v.length < 4) return 'Mínimo 4 caracteres';
                      return null;
                    },
                  ),
                  const SizedBox(height: 12),
                  TextFormField(
                    controller: _confirmController,
                    obscureText: _obscureConfirm,
                    textInputAction: TextInputAction.done,
                    onFieldSubmitted: (_) => _handleRegister(),
                    decoration: InputDecoration(
                      hintText: 'Repite la contraseña',
                      prefixIcon: const Icon(Icons.lock, color: AppColors.rust),
                      suffixIcon: IconButton(
                        icon: Icon(
                          _obscureConfirm
                              ? Icons.visibility_outlined
                              : Icons.visibility_off_outlined,
                          color: AppColors.textLight,
                        ),
                        onPressed: () => setState(() => _obscureConfirm = !_obscureConfirm),
                      ),
                    ),
                    validator: (v) {
                      if (v == null || v.isEmpty) return 'Confirma tu contraseña';
                      if (v != _passwordController.text) return 'Las contraseñas no coinciden';
                      return null;
                    },
                  ),
                  const SizedBox(height: 32),
                  // Register button
                  auth.isLoading
                      ? const Center(
                          child: CircularProgressIndicator(color: AppColors.rust),
                        )
                      : ElevatedButton(
                          onPressed: _handleRegister,
                          child: const Text('¡UNIRME AL MUSEO!'),
                        ),
                  const SizedBox(height: 24),
                ],
              ),
            ),
          );
        },
      ),
    );
  }
}
