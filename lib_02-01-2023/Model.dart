import 'dart:typed_data';

class ImageObj {
  late String id;
  late String info;
  late String name;
  late Uint8List content;
  late Uint8List location;

  ImageObj({
    required this.id,
    required this.info,
    required this.name,
    required this.content,
    required this.location
  });

  factory ImageObj.fromMap(Map<String, dynamic> map) => ImageObj(
    id: map['id'],
    info: map['info'],
    name: map['name'],
    content: map['content'],
    location: map['location']
  );

  Map<String, dynamic> toMap() => {
    "id": id,
    "info": info,
    "name": name,
    "content": content,
    "location": location
  };
}

class ImgObjectFromJson {
  late String id;
  late String info;
  late String name;
  late String url;
  late String urlLocation;

  ImgObjectFromJson({
    required this.id,
    required this.info,
    required this.name,
    required this.url,
    required this.urlLocation
});

  factory ImgObjectFromJson.fromJson(Map<String, dynamic> json) {
    return ImgObjectFromJson(
      id: json['id'] as String,
      info: json['info'] as String,
      name: json['name'] as String,
      url: json['link'] as String,
      urlLocation: json['location'] as String
    );
  }
}