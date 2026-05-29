import 'package:flutter/foundation.dart';
import 'package:image_picker/image_picker.dart';
import '../models/obra.dart';
import '../services/api_service.dart';

class ObrasProvider extends ChangeNotifier {
  List<Obra> _obras = [];
  bool _isLoading = false;
  bool _isUploading = false;
  String _searchQuery = '';
  String? _error;

  List<Obra> get obras => _obras;
  bool get isLoading => _isLoading;
  bool get isUploading => _isUploading;
  String get searchQuery => _searchQuery;
  String? get error => _error;

  List<Obra> get destacadas {
    final sorted = List<Obra>.from(_obras)..sort((a, b) => b.likes.compareTo(a.likes));
    return sorted.where((o) => o.likes > 0).take(6).toList();
  }

  List<Obra> get recientes => _obras.take(8).toList();

  List<Obra> obrasDeAutor(String apodo) =>
      _obras.where((o) => o.autorApodo.toLowerCase() == apodo.toLowerCase()).toList();

  Future<void> loadObras() async {
    _isLoading = true;
    _error = null;
    notifyListeners();
    try {
      _obras = await ApiService.getObras(
        search: _searchQuery.isEmpty ? null : _searchQuery,
      );
    } catch (e) {
      _error = e.toString();
    } finally {
      _isLoading = false;
      notifyListeners();
    }
  }

  Future<void> setSearch(String query) async {
    _searchQuery = query;
    notifyListeners();
    await loadObras();
  }

  Future<bool> uploadObra({
    required XFile image,
    required String titulo,
    required String descripcion,
    required String autorApodo,
    required int avatarIndex,
  }) async {
    _isUploading = true;
    _error = null;
    notifyListeners();
    try {
      final obra = await ApiService.uploadObra(
        image: image,
        titulo: titulo,
        descripcion: descripcion,
        autorApodo: autorApodo,
        avatarIndex: avatarIndex,
      );
      _obras.insert(0, obra);
      _isUploading = false;
      notifyListeners();
      return true;
    } catch (e) {
      _error = e.toString();
      _isUploading = false;
      notifyListeners();
      return false;
    }
  }

  Future<void> incrementLike(String obraId) async {
    try {
      final newCount = await ApiService.incrementLike(obraId);
      final idx = _obras.indexWhere((o) => o.id == obraId);
      if (idx != -1) {
        _obras[idx].likes = newCount;
        notifyListeners();
      }
    } catch (_) {}
  }

  void clearError() {
    _error = null;
    notifyListeners();
  }
}
