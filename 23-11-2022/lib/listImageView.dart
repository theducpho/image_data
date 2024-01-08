import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:flutter/services.dart' show rootBundle;

import 'SlidePicturePuzzle.dart';
import 'imagePage.dart';

class ListImageViewWidget extends StatefulWidget {
  const ListImageViewWidget({Key? key}) : super(key: key);
  @override
  State<ListImageViewWidget> createState() => ListImageViewWidgetState();
}

class ListImageViewWidgetState extends State<ListImageViewWidget> {

  String title = '';
  List<ImageInfoCustom> list = [];

  getData() async {
    String response;
    response = await rootBundle.loadString('assets/data.txt');
    setState(() {
      createListImageFromString(response);
    });
  }

  createListImageFromString(String data) {
    LineSplitter ls = const LineSplitter();
    List<String> lines = ls.convert(data);
    if (lines.length % 5 == 0) {
      for (var i = 0; i < lines.length; i = i + 5) {
        var name = lines[i];
        var info = lines[i + 1];
        var flgUnlock = lines[i + 2];
        var numberOfPieces = lines[i + 3];
        var urlAvatar = lines[i + 4];
        ImageInfoCustom imgObj = ImageInfoCustom(name: name, info: info,
            flgUnlock: flgUnlock,
            numberOfPieces: numberOfPieces,
            urlAvatar: urlAvatar);
        list.add(imgObj);
      }
    }
  }

  ListImageViewWidgetState({
    Key? key,
  }) {
    getData();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: ListView.builder(
        itemCount: list.length,
        itemBuilder: (context, index) {
          final imageInfo = list[index];
          return Card(
            child: ListTile(
              leading: CircleAvatar(
                radius: 28,
                backgroundImage: AssetImage(imageInfo.urlAvatar),
              ),
              title: Text(imageInfo.name),
              subtitle: Text(imageInfo.info),
              onTap: () {
                Navigator.of(context).push(MaterialPageRoute(
                    builder: (context) {
                      if (imageInfo.flgUnlock == '1') {
                        return ImagePageWidget(imageInfoCustom: imageInfo);
                      } else {
                        return MySlidePicturePuzzleWidget(
                            numberPuzzle: int.parse(imageInfo.numberOfPieces),
                            urlImage: imageInfo.urlAvatar
                        );
                      }
                    }
                ));
              },
            ),
          );
        },
      ),
    );
  }
}

class ImageInfoCustom {
  String name;
  String info;
  final String flgUnlock;
  final String numberOfPieces;
  final String urlAvatar;

  ImageInfoCustom({
    required this.name,
    required this.info,
    required this.flgUnlock,
    required this.numberOfPieces,
    required this.urlAvatar
  }) {
    if (flgUnlock == '0') {
      name = '***';
      info = '***';
    }
  }
}