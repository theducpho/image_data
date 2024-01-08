import 'dart:io';

import 'package:first_create/database.dart';
import 'package:flutter/material.dart';

import 'SlidePicturePuzzle.dart';
import 'info.dart';
import 'listImageView.dart';
import 'signup.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Welcome to Flutter',
      home: Scaffold(
        appBar: AppBar(
          title: const Text('Welcome to Flutter'),
        ),
        body: FutureBuilder<bool>(
          future: DBProvider.db.checkDb(),
          builder: (BuildContext context, AsyncSnapshot<bool> snapshot) {
            // return const MySlidePicturePuzzleWidget();

            return const ListImageViewWidget();

            // if (snapshot.data == false) {
            //   return const MySignUpWidget();
            // } else {
            //   return const MyInfoWidget();
            // }
          },
        ),
      ),
    );
  }
}

class MySignUpWidget extends StatefulWidget {
  const MySignUpWidget({Key? key}) : super(key: key);
  @override
  State<MySignUpWidget> createState() => MySignUpWidgetState();
}

class MyInfoWidget extends StatefulWidget {
  const MyInfoWidget({Key? key}) : super(key: key);
  @override
  State<MyInfoWidget> createState() => MyInfoWidgetState();
}