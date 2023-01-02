import 'package:flag_nation/WriteImageFromDatabase.dart';
import 'package:flutter/material.dart';

import 'ReadImageFromDatabase.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flag of nation',
      home: Scaffold(
        appBar: AppBar(
          title: const Text('Flag of nation'),
        ),
        body: //const WriteImageWidget()
        const ReadImageWidget(),
        // const ShowImageWidget(),
      ),
    );
  }
}

class ShowImageWidget extends StatelessWidget {
  const ShowImageWidget({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Image.network('https://www.worldometers.info/img/flags/af-flag.gif'),
    );
  }teState() => const ShowImageWidget();
}