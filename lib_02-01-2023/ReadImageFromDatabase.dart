import 'dart:convert';
import 'dart:io';
import 'package:flutter/services.dart';
import 'package:path/path.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:path_provider/path_provider.dart';
import 'package:http/http.dart' as http;

import 'DatabaseImage.dart';
import 'ImagePage.dart';
import 'Model.dart';

class ReadImageWidget extends StatefulWidget {
  const ReadImageWidget({Key? key}) : super(key: key);

  @override
  State<ReadImageWidget> createState() => ReadImageState();
}

class ReadImageState extends State<ReadImageWidget> {

  String searchString = "";

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () => FocusScope.of(context).unfocus(),
      child: Scaffold(
        body: Column(
            mainAxisSize: MainAxisSize.max,
            mainAxisAlignment: MainAxisAlignment.start,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const SizedBox(height: 10),
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 15.0),
                child: TextField(
                  onChanged: (value) {
                    setState(() {
                      searchString = value.toLowerCase();
                    });
                  },
                  decoration: const InputDecoration(
                    labelText: 'Search',
                    suffixIcon: Icon(Icons.search),
                  ),
                ),
              ),
              const SizedBox(height: 10),
              Expanded(
                child: FutureBuilder<List<ImageObj>>(
                    future: getImageFromDB(),
                    builder: (context, snapshot) {
                      if (snapshot.hasData &&
                          snapshot.connectionState == ConnectionState.done) {
                        return ListView.builder(
                          keyboardDismissBehavior: ScrollViewKeyboardDismissBehavior.onDrag,
                          itemCount: snapshot.data!.length,
                          itemBuilder: (context, index) {
                            ImageObj imageInfo = snapshot.data![index];
                            if (snapshot.data![index].name.toLowerCase().contains(searchString)) {
                                return Card(
                                  child: ListTile(
                                    leading: CircleAvatar(
                                      radius: 28,
                                      backgroundImage: Image.memory(imageInfo.content).image,
                                    ),
                                    title: Text(imageInfo.name),
                                    subtitle: Text(
                                      imageInfo.info,
                                      maxLines: 2,
                                    ),
                                    onTap: () {
                                      Navigator.of(context).push(MaterialPageRoute(
                                          builder: (context) {
                                            return ImagePageWidget(imageInfoCustom: imageInfo);
                                          }
                                      ));
                                    },
                                  ),
                                );
                            } else {
                              return Container();
                            }
                          },
                        );
                      } else {
                        return Container();
                      }
                    }
                ),
              ),
            ]
        )
        // body: FutureBuilder<List<ImageObj>>(
        //   future: getImageFromDB(),
        //   builder: (context, snapshot) {
        //     if (snapshot.hasData &&
        //         snapshot.connectionState == ConnectionState.done) {
        //       return ListView.builder(
        //         itemCount: snapshot.data!.length,
        //         itemBuilder: (context, index) {
        //           ImageObj imageInfo = snapshot.data![index];
        //           listImg.add(imageInfo);
        //           return Card(
        //             child: ListTile(
        //               leading: CircleAvatar(
        //                 radius: 28,
        //                 backgroundImage: Image.memory(imageInfo.content).image,
        //               ),
        //               title: Text(imageInfo.name),
        //               subtitle: Text(
        //                   imageInfo.info,
        //                   maxLines: 2,
        //               ),
        //               onTap: () {
        //                 Navigator.of(context).push(MaterialPageRoute(
        //                     builder: (context) {
        //                       return ImagePageWidget(imageInfoCustom: imageInfo);
        //                     }
        //                 ));
        //               },
        //             ),
        //           );
        //         },
        //       );
        //     } else {
        //       return const CircularProgressIndicator();
        //     }
        //   }
        // ),

        // floatingActionButton: FloatingActionButton(
        //   onPressed: ()  async {
        //
        //     var url = "https://www.worldometers.info/img/flags/af-flag.gif";
        //     ByteData imageData = await NetworkAssetBundle(Uri.parse(url)).load("");
        //     Uint8List bytes = imageData.buffer.asUint8List();
        //     ImageObj im = ImageObj(id: 'e.id', info: 'e.info', name: 'e.name', content: bytes);
        //     await DBImageProvider.db.insertImageObj(im);
        //
        //     List<String> listId = [];
        //     for (final e in listImg) {
        //       var currentElement = e;
        //       listId.add(e.id);
        //     }
        //
        //     List<ImgObjectFromJson> listImgInNet = await getListImgFromJson();
        //     int i = 0;
        //     for (final e in listImgInNet) {
        //       var currentElement = e;
        //       if (!listId.contains(e.id)) {
        //         ByteData imageData = await NetworkAssetBundle(Uri.parse(e.url)).load("");
        //         Uint8List bytes = imageData.buffer.asUint8List();
        //         ImageObj im = ImageObj(id: e.id, info: e.info, name: e.name, content: bytes);
        //         await DBImageProvider.db.insertImageObj(im);
        //         i++;
        //         if (i > 2) {
        //           break;
        //         }
        //       }
        //     }
        //
        //   },
        //   tooltip: 'Download data',
        //   child: const Icon(Icons.add),
        // ),
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
