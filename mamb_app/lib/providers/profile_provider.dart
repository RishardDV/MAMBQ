import 'package:flutter/foundation.dart';
import 'package:shared_preferences/shared_preferences.dart';

class ProfileProvider extends ChangeNotifier {
  static const _apodoKey = 'prf_apodo';
  static const _avatarKey = 'prf_avatar';
  static const _favsKey  = 'prf_favs';
  static const _likesKey = 'prf_likes';

  String _apodo = 'Artista';
  int _avatarIndex = 0;
  Set<String> _favoriteIds = {};
  Set<String> _likedIds = {};

  String get apodo => _apodo;
  int get avatarIndex => _avatarIndex;
  Set<String> get favoriteIds => _favoriteIds;
  Set<String> get likedIds => _likedIds;
  bool isFavorite(String id) => _favoriteIds.contains(id);
  bool isLiked(String id) => _likedIds.contains(id);

  Future<void> load() async {
    final prefs = await SharedPreferences.getInstance();
    _apodo = prefs.getString(_apodoKey) ?? 'Artista';
    _avatarIndex = prefs.getInt(_avatarKey) ?? 0;
    _favoriteIds = (prefs.getStringList(_favsKey) ?? []).toSet();
    _likedIds = (prefs.getStringList(_likesKey) ?? []).toSet();
    notifyListeners();
  }

  Future<void> setApodo(String apodo) async {
    _apodo = apodo.trim().isEmpty ? 'Artista' : apodo.trim();
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString(_apodoKey, _apodo);
    notifyListeners();
  }

  Future<void> setAvatar(int idx) async {
    _avatarIndex = idx;
    final prefs = await SharedPreferences.getInstance();
    await prefs.setInt(_avatarKey, idx);
    notifyListeners();
  }

  Future<void> toggleFavorite(String obraId) async {
    if (_favoriteIds.contains(obraId)) {
      _favoriteIds.remove(obraId);
    } else {
      _favoriteIds.add(obraId);
    }
    final prefs = await SharedPreferences.getInstance();
    await prefs.setStringList(_favsKey, _favoriteIds.toList());
    notifyListeners();
  }

  Future<void> addLike(String obraId) async {
    if (_likedIds.contains(obraId)) return;
    _likedIds.add(obraId);
    final prefs = await SharedPreferences.getInstance();
    await prefs.setStringList(_likesKey, _likedIds.toList());
    notifyListeners();
  }
}
