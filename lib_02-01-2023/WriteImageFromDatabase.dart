import 'dart:convert';
import 'dart:developer';
import 'dart:io';
import 'package:flutter/services.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:path/path.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:path_provider/path_provider.dart';
import 'package:http/http.dart' as http;

import 'DatabaseImage.dart';
import 'ImagePage.dart';
import 'Model.dart';

class WriteImageWidget extends StatefulWidget {
  const WriteImageWidget({Key? key}) : super(key: key);

  @override
  State<WriteImageWidget> createState() => WriteImageState();
}

class WriteImageState extends State<WriteImageWidget> {

  List<ImageObj> listImg = [];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: const Center(
        child: Text('Create database from json'),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: ()  async {

          List<ImageObj> listImg = await getImageFromDB();
          List<ImgObjectFromJson> listImgInNet = await getListImgFromJson();
          int i = 0;
          for (final e in listImgInNet) {
            ByteData imageData = await NetworkAssetBundle(Uri.parse(e.url)).load("");
            Uint8List bytes = imageData.buffer.asUint8List();
            ByteData location = await NetworkAssetBundle(Uri.parse(e.urlLocation)).load("");
            Uint8List imgLocation = location.buffer.asUint8List();
            ImageObj im = ImageObj(id: e.id, info: e.info, name: e.name, content: bytes, location: imgLocation);
            await DBImageProvider.db.insertImageObj(im);
            log(e.id);
          }
          Fluttertoast.showToast(
              msg: "Success",
              toastLength: Toast.LENGTH_SHORT,
              gravity: ToastGravity.CENTER,
              timeInSecForIosWeb: 1,
              textColor: Colors.white,
              fontSize: 16.0
          );
          log('success');
        },
        tooltip: 'Download data',
        child: const Icon(Icons.add),
      ),
    );
  }
}

Future<List<ImageObj>> getImageFromDB() async {

  // Construct a file path to copy database to
  Directory documentsDirectory = await getApplicationDocumentsDirectory();
  String path = "${documentsDirectory.path}Image.db";

  // Only copy if the database doesn't exist
  if (FileSystemEntity.typeSync(path) == FileSystemEntityType.notFound){

    // Load database from asset and copy
    ByteData data = await rootBundle.load(join('assets', 'asset_Image.db'));
    List<int> bytes = data.buffer.asUint8List(data.offsetInBytes, data.lengthInBytes);

    // Save copied asset to documents
    await File(path).writeAsBytes(bytes);
  }
  return await DBImageProvider.db.getListImageObj();
}

Future<List<ImgObjectFromJson>> getListImgFromJson() async {
  // make request
  var url = Uri.parse("https://my-json-server.typicode.com/theducpho/image_data/users");
  final response = await http.get(url);
  if (response.statusCode == 200) {
    return parseJsonToList(response.body);
  } else {
    return [];
  }
}

List<ImgObjectFromJson> parseJsonToList(String responseBody) {
  final parsed = jsonDecode(responseBody).cast<Map<String, dynamic>>();

  return parsed.map<ImgObjectFromJson>((json) => ImgObjectFromJson.fromJson(json)).toList();
}
