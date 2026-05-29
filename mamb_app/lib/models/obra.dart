import '../config/constants.dart';

class Obra {
  final String id;
  final String titulo;
  final String descripcion;
  final String imageUrl;
  final String autorApodo;
  final int avatarIndex;
  int likes;
  final DateTime createdAt;

  Obra({
    required this.id,
    required this.titulo,
    required this.descripcion,
    required this.imageUrl,
    required this.autorApodo,
    required this.avatarIndex,
    required this.likes,
    required this.createdAt,
  });

  factory Obra.fromJson(Map<String, dynamic> json) => Obra(
        id: json['_id']?.toString() ?? '',
        titulo: json['titulo']?.toString() ?? '',
        descripcion: json['descripcion']?.toString() ?? '',
        imageUrl: json['imageUrl']?.toString() ?? '',
        autorApodo: json['autorApodo']?.toString() ?? '',
        avatarIndex: (json['avatarIndex'] as num?)?.toInt() ?? 0,
        likes: (json['likes'] as num?)?.toInt() ?? 0,
        createdAt: json['createdAt'] != null
            ? DateTime.tryParse(json['createdAt'].toString()) ?? DateTime.now()
            : DateTime.now(),
      );

  int get year => createdAt.year;

  int get colorIndex =>
      id.isEmpty ? 0 : id.codeUnits.reduce((a, b) => a + b) % AppConstants.artColors.length;
}
