import 'package:flutter/material.dart';

import 'Model.dart';

class ImagePageWidget extends StatelessWidget {
  final ImageObj imageInfoCustom;

  const ImagePageWidget({
    Key? key,
    required this.imageInfoCustom,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(imageInfoCustom.name),
        elevation: 1.0,
      ),
      body: SingleChildScrollView(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.start,
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: <Widget>[
            Image.memory(imageInfoCustom.content,
                width: double.infinity, fit: BoxFit.fitWidth),
            const SizedBox(height: 16),
            Padding(
              padding: const EdgeInsets.only(left:10, right: 10),
              child: Text(
                imageInfoCustom.info,
                style: const TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
              ),
            ),
            const SizedBox(height: 16),
            Image.memory(imageInfoCustom.location, height: 225.0, fit: BoxFit.fitHeight),
            const SizedBox(height: 16),
          ],
        )
      ),
    );
  }
}
