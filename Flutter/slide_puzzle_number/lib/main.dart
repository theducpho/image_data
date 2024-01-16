import 'package:flutter/material.dart';
import 'package:slide_puzzle_number/app.dart';
import 'package:slide_puzzle_number/bootstraps.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  bootstraps(const App());
}
