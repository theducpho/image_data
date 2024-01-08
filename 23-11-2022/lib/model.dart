class User {
  late String name;
  late String level;
  late int exp;

  User({
    required this.name,
    required this.level,
    required this.exp,
  });

  factory User.fromMap(Map<String, dynamic> json) => User(
    name: json["name"],
    level: json["level"],
    exp: json["exp"],
  );

  Map<String, dynamic> toMap() => {
    "name": name,
    "level": level,
    "exp": exp,
  };
}