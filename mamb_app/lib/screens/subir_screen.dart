import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:image_picker/image_picker.dart';
import 'package:provider/provider.dart';
import '../providers/profile_provider.dart';
import '../providers/obras_provider.dart';
import '../theme/app_theme.dart';

class SubirScreen extends StatefulWidget {
  final void Function(int)? onTabChange;

  const SubirScreen({super.key, this.onTabChange});

  @override
  State<SubirScreen> createState() => _SubirScreenState();
}

class _SubirScreenState extends State<SubirScreen> {
  XFile? _selectedImage;
  final _tituloController = TextEditingController();
  final _descripcionController = TextEditingController();
  final _formKey = GlobalKey<FormState>();
  final _picker = ImagePicker();

  @override
  void dispose() {
    _tituloController.dispose();
    _descripcionController.dispose();
    super.dispose();
  }

  Future<void> _pickImage(ImageSource source) async {
    try {
      final picked = await _picker.pickImage(
        source: source,
        maxWidth: 1920,
        maxHeight: 1920,
        imageQuality: 85,
      );
      if (picked != null) {
        setState(() => _selectedImage = picked);
      }
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text('Error al seleccionar imagen: $e',
                style: GoogleFonts.dmSans(color: Colors.white)),
            backgroundColor: AppColors.rust,
          ),
        );
      }
    }
  }

  void _showImageSourceSheet() {
    showModalBottomSheet(
      context: context,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(20)),
      ),
      backgroundColor: AppColors.parchment,
      builder: (_) => SafeArea(
        child: Padding(
          padding: const EdgeInsets.symmetric(vertical: 16),
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
                'Añadir imagen',
                style: GoogleFonts.playfairDisplay(
                  fontSize: 18,
                  fontWeight: FontWeight.w600,
                  color: AppColors.textDark,
                ),
              ),
              const SizedBox(height: 16),
              ListTile(
                leading: Container(
                  padding: const EdgeInsets.all(10),
                  decoration: BoxDecoration(
                    color: AppColors.rust.withOpacity(0.1),
                    borderRadius: BorderRadius.circular(12),
                  ),
                  child: const Icon(Icons.camera_alt, color: AppColors.rust),
                ),
                title: Text('Cámara', style: GoogleFonts.dmSans(fontWeight: FontWeight.w600)),
                subtitle: Text('Tomar una nueva foto',
                    style: GoogleFonts.dmSans(fontSize: 12, color: AppColors.textMid)),
                onTap: () {
                  Navigator.pop(context);
                  _pickImage(ImageSource.camera);
                },
              ),
              ListTile(
                leading: Container(
                  padding: const EdgeInsets.all(10),
                  decoration: BoxDecoration(
                    color: AppColors.green.withOpacity(0.1),
                    borderRadius: BorderRadius.circular(12),
                  ),
                  child: const Icon(Icons.photo_library, color: AppColors.green),
                ),
                title: Text('Galería', style: GoogleFonts.dmSans(fontWeight: FontWeight.w600)),
                subtitle: Text('Elegir de tus fotos',
                    style: GoogleFonts.dmSans(fontSize: 12, color: AppColors.textMid)),
                onTap: () {
                  Navigator.pop(context);
                  _pickImage(ImageSource.gallery);
                },
              ),
            ],
          ),
        ),
      ),
    );
  }

  Future<void> _handlePublicar() async {
    if (_selectedImage == null) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text('Selecciona una imagen para tu obra',
              style: GoogleFonts.dmSans(color: Colors.white)),
          backgroundColor: AppColors.rust,
          behavior: SnackBarBehavior.floating,
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
        ),
      );
      return;
    }

    if (!_formKey.currentState!.validate()) return;

    final obras = Provider.of<ObrasProvider>(context, listen: false);
    final profile = Provider.of<ProfileProvider>(context, listen: false);

    final success = await obras.uploadObra(
      image: _selectedImage!,
      titulo: _tituloController.text.trim(),
      descripcion: _descripcionController.text.trim(),
      autorApodo: profile.apodo,
      avatarIndex: profile.avatarIndex,
    );

    if (!mounted) return;

    if (success) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text('¡Obra publicada en el museo!',
              style: GoogleFonts.dmSans(color: Colors.white)),
          backgroundColor: AppColors.green,
          behavior: SnackBarBehavior.floating,
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
        ),
      );
      // Clear form
      setState(() {
        _selectedImage = null;
      });
      _tituloController.clear();
      _descripcionController.clear();
      // Navigate to gallery
      widget.onTabChange?.call(1);
    } else {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text(obras.error ?? 'Error al publicar',
              style: GoogleFonts.dmSans(color: Colors.white)),
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
      body: Consumer<ObrasProvider>(
        builder: (context, obras, _) {
          return Stack(
            children: [
              SafeArea(
                child: SingleChildScrollView(
                  padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 16),
                  child: Form(
                    key: _formKey,
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        // Header
                        _buildHeader(),
                        const SizedBox(height: 8),
                        // Tagline
                        Container(
                          padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
                          decoration: BoxDecoration(
                            color: AppColors.rust.withOpacity(0.08),
                            borderRadius: BorderRadius.circular(12),
                          ),
                          child: Row(
                            children: [
                              const Icon(Icons.star, color: AppColors.gold, size: 18),
                              const SizedBox(width: 8),
                              Expanded(
                                child: Text(
                                  'EL MUSEO VIVE GRACIAS A ARTISTAS COMO TÚ',
                                  style: GoogleFonts.dmSans(
                                    fontSize: 12,
                                    fontWeight: FontWeight.w600,
                                    color: AppColors.rust,
                                    letterSpacing: 0.5,
                                  ),
                                ),
                              ),
                            ],
                          ),
                        ),
                        const SizedBox(height: 24),
                        // Upload zone
                        Text(
                          'Tu obra de arte',
                          style: GoogleFonts.playfairDisplay(
                            fontSize: 18,
                            fontWeight: FontWeight.w600,
                            color: AppColors.textDark,
                          ),
                        ),
                        const SizedBox(height: 12),
                        GestureDetector(
                          onTap: _showImageSourceSheet,
                          child: Container(
                            width: double.infinity,
                            height: 200,
                            decoration: BoxDecoration(
                              color: AppColors.cream2,
                              borderRadius: BorderRadius.circular(16),
                              border: Border.all(
                                color: AppColors.rust.withOpacity(0.3),
                                width: 2,
                                style: BorderStyle.solid,
                              ),
                            ),
                            child: _selectedImage != null
                                ? ClipRRect(
                                    borderRadius: BorderRadius.circular(14),
                                    child: Image.network(
                                      _selectedImage!.path,
                                      fit: BoxFit.cover,
                                      width: double.infinity,
                                    ),
                                  )
                                : Column(
                                    mainAxisAlignment: MainAxisAlignment.center,
                                    children: [
                                      Container(
                                        padding: const EdgeInsets.all(16),
                                        decoration: BoxDecoration(
                                          color: AppColors.rust.withOpacity(0.1),
                                          shape: BoxShape.circle,
                                        ),
                                        child: const Icon(
                                          Icons.cloud_upload_outlined,
                                          color: AppColors.rust,
                                          size: 40,
                                        ),
                                      ),
                                      const SizedBox(height: 12),
                                      Text(
                                        'Toca para añadir tu obra',
                                        style: GoogleFonts.dmSans(
                                          fontSize: 15,
                                          fontWeight: FontWeight.w600,
                                          color: AppColors.rust,
                                        ),
                                      ),
                                      const SizedBox(height: 4),
                                      Text(
                                        'JPG, PNG o WEBP · Máx. 20MB',
                                        style: GoogleFonts.dmSans(
                                          fontSize: 12,
                                          color: AppColors.textLight,
                                        ),
                                      ),
                                    ],
                                  ),
                          ),
                        ),
                        const SizedBox(height: 12),
                        // Quick action buttons
                        Row(
                          children: [
                            Expanded(
                              child: OutlinedButton.icon(
                                icon: const Icon(Icons.camera_alt, size: 18),
                                label: const Text('CÁMARA'),
                                style: OutlinedButton.styleFrom(
                                  foregroundColor: AppColors.gold,
                                  side: const BorderSide(color: AppColors.gold),
                                  shape: RoundedRectangleBorder(
                                    borderRadius: BorderRadius.circular(12),
                                  ),
                                  padding: const EdgeInsets.symmetric(vertical: 12),
                                  textStyle: GoogleFonts.dmSans(
                                    fontSize: 13,
                                    fontWeight: FontWeight.w600,
                                    letterSpacing: 0.5,
                                  ),
                                ),
                                onPressed: () => _pickImage(ImageSource.camera),
                              ),
                            ),
                            const SizedBox(width: 12),
                            Expanded(
                              child: OutlinedButton.icon(
                                icon: const Icon(Icons.photo_library, size: 18),
                                label: const Text('GALERÍA'),
                                style: OutlinedButton.styleFrom(
                                  foregroundColor: AppColors.gold,
                                  side: const BorderSide(color: AppColors.gold),
                                  shape: RoundedRectangleBorder(
                                    borderRadius: BorderRadius.circular(12),
                                  ),
                                  padding: const EdgeInsets.symmetric(vertical: 12),
                                  textStyle: GoogleFonts.dmSans(
                                    fontSize: 13,
                                    fontWeight: FontWeight.w600,
                                    letterSpacing: 0.5,
                                  ),
                                ),
                                onPressed: () => _pickImage(ImageSource.gallery),
                              ),
                            ),
                          ],
                        ),
                        const SizedBox(height: 28),
                        // Details section
                        Text(
                          'DETALLES',
                          style: GoogleFonts.dmSans(
                            fontSize: 11,
                            fontWeight: FontWeight.w700,
                            letterSpacing: 1.5,
                            color: AppColors.textLight,
                          ),
                        ),
                        const SizedBox(height: 12),
                        // Title field
                        TextFormField(
                          controller: _tituloController,
                          textInputAction: TextInputAction.next,
                          decoration: const InputDecoration(
                            labelText: 'Título de la obra *',
                            hintText: 'Dale un nombre a tu creación',
                            prefixIcon: Icon(Icons.title, color: AppColors.rust),
                          ),
                          validator: (v) {
                            if (v == null || v.trim().isEmpty) return 'El título es requerido';
                            if (v.trim().length > 100) return 'Máximo 100 caracteres';
                            return null;
                          },
                        ),
                        const SizedBox(height: 16),
                        // Description field
                        TextFormField(
                          controller: _descripcionController,
                          maxLines: 4,
                          textInputAction: TextInputAction.done,
                          decoration: const InputDecoration(
                            labelText: 'Descripción (opcional)',
                            hintText: 'Cuéntanos sobre tu obra, la técnica, la inspiración...',
                            alignLabelWithHint: true,
                            prefixIcon: Padding(
                              padding: EdgeInsets.only(bottom: 56),
                              child: Icon(Icons.description_outlined, color: AppColors.rust),
                            ),
                          ),
                          validator: (v) {
                            if (v != null && v.length > 500) return 'Máximo 500 caracteres';
                            return null;
                          },
                        ),
                        const SizedBox(height: 32),
                        // Publish button
                        Consumer<ObrasProvider>(
                          builder: (_, obrasP, __) => ElevatedButton(
                            onPressed: obrasP.isUploading ? null : _handlePublicar,
                            style: ElevatedButton.styleFrom(
                              backgroundColor:
                                  obrasP.isUploading ? AppColors.textLight : AppColors.rust,
                            ),
                            child: Row(
                              mainAxisAlignment: MainAxisAlignment.center,
                              children: [
                                const Icon(Icons.upload, size: 20),
                                const SizedBox(width: 8),
                                const Text('PUBLICAR OBRA'),
                              ],
                            ),
                          ),
                        ),
                        const SizedBox(height: 80),
                      ],
                    ),
                  ),
                ),
              ),
              // Loading overlay
              if (obras.isUploading)
                Container(
                  color: Colors.black.withOpacity(0.4),
                  child: Center(
                    child: Container(
                      padding: const EdgeInsets.all(32),
                      decoration: BoxDecoration(
                        color: AppColors.parchment,
                        borderRadius: BorderRadius.circular(20),
                      ),
                      child: Column(
                        mainAxisSize: MainAxisSize.min,
                        children: [
                          const CircularProgressIndicator(color: AppColors.rust),
                          const SizedBox(height: 16),
                          Text(
                            'Publicando tu obra...',
                            style: GoogleFonts.dmSans(
                              fontSize: 16,
                              fontWeight: FontWeight.w600,
                              color: AppColors.textDark,
                            ),
                          ),
                        ],
                      ),
                    ),
                  ),
                ),
            ],
          );
        },
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
          'Subir obra',
          style: GoogleFonts.dmSans(
            fontSize: 13,
            color: AppColors.textMid,
            fontWeight: FontWeight.w500,
          ),
        ),
      ],
    );
  }
}
