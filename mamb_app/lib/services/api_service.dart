import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:image_picker/image_picker.dart';
import '../config/constants.dart';
import '../models/obra.dart';

class ApiService {
  static String _decode(http.Response res) => utf8.decode(res.bodyBytes);

  // ── Obras ─────────────────────────────────────────────────────────────────

  static Future<List<Obra>> getObras({
    String? search,
    String? autorApodo,
  }) async {
    final params = <String, String>{};
    if (search != null && search.isNotEmpty) params['search'] = search;
    if (autorApodo != null && autorApodo.isNotEmpty) params['autorApodo'] = autorApodo;

    final uri = Uri.parse('${AppConstants.baseUrl}/obras').replace(queryParameters: params);
    final res = await http.get(uri);

    if (res.statusCode == 200) {
      final List<dynamic> data = json.decode(_decode(res));
      return data.map((e) => Obra.fromJson(e as Map<String, dynamic>)).toList();
    }
    throw json.decode(_decode(res))['error']?.toString() ?? 'Error al obtener obras';
  }

  static Future<Obra> getObra(String id) async {
    final res = await http.get(Uri.parse('${AppConstants.baseUrl}/obras/$id'));
    if (res.statusCode == 200) {
      return Obra.fromJson(json.decode(_decode(res)) as Map<String, dynamic>);
    }
    throw json.decode(_decode(res))['error']?.toString() ?? 'Obra no encontrada';
  }

  static Future<Obra> uploadObra({
    required XFile image,
    required String titulo,
    required String descripcion,
    required String autorApodo,
    required int avatarIndex,
  }) async {
    final request = http.MultipartRequest('POST', Uri.parse('${AppConstants.baseUrl}/obras'));
    request.fields['titulo'] = titulo;
    request.fields['descripcion'] = descripcion;
    request.fields['autorApodo'] = autorApodo;
    request.fields['avatarIndex'] = avatarIndex.toString();
    final bytes = await image.readAsBytes();
    request.files.add(http.MultipartFile.fromBytes('image', bytes, filename: image.name));

    final streamed = await request.send();
    final res = await http.Response.fromStream(streamed);
    final body = json.decode(utf8.decode(res.bodyBytes));

    if (res.statusCode == 201) return Obra.fromJson(body as Map<String, dynamic>);
    throw body['error']?.toString() ?? 'Error al publicar la obra';
  }

  static Future<int> incrementLike(String obraId) async {
    final res = await http.post(Uri.parse('${AppConstants.baseUrl}/obras/$obraId/like'));
    if (res.statusCode == 200) {
      return (json.decode(_decode(res))['likes'] as num?)?.toInt() ?? 0;
    }
    throw 'Error al procesar el like';
  }
}
