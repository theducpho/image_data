import 'package:flutter/material.dart';
import 'package:slize_puzzle_number/app.dart';
import 'package:slize_puzzle_number/bootstraps.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  bootstraps(const App());
}
