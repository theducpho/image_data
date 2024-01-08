import 'package:flutter/material.dart';

import 'listImageView.dart';

class ImagePageWidget extends StatelessWidget {

  final ImageInfoCustom imageInfoCustom;

  const ImagePageWidget({
    Key? key,
    required this.imageInfoCustom,
  }): super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(imageInfoCustom.name),
      ),
      body: Center(
        child: Column(
          children: <Widget>[
            Image.asset(
              imageInfoCustom.urlAvatar,
              height: 400,
              width: double.infinity,
              fit: BoxFit.cover
            ),
            const SizedBox(height: 16),
            Text(
              imageInfoCustom.name,
              style: const TextStyle(
                fontSize: 40,
                fontWeight: FontWeight.bold
              ),
            ),
          ],
        ),
      ),
    );
  }
}