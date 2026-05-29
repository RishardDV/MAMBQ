class UserModel {
  final String id;
  final String apodo;
  final int avatarIndex;
  final int obrasCount;
  final int favoritosCount;

  UserModel({
    required this.id,
    required this.apodo,
    required this.avatarIndex,
    this.obrasCount = 0,
    this.favoritosCount = 0,
  });

  factory UserModel.fromJson(Map<String, dynamic> json) {
    return UserModel(
      id: json['_id']?.toString() ?? '',
      apodo: json['apodo']?.toString() ?? '',
      avatarIndex: (json['avatarIndex'] as num?)?.toInt() ?? 0,
      obrasCount: (json['obrasCount'] as num?)?.toInt() ?? 0,
      favoritosCount: (json['favoritosCount'] as num?)?.toInt() ?? 0,
    );
  }
}
