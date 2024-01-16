import 'package:hive_flutter/hive_flutter.dart';
import 'package:slide_puzzle_number/src/widgets/buttons.dart';

class AdapterIntializer {
  static void initialize() {
    Hive.registerAdapter<ButtonColors>(ButtonColorsAdapter());
  }
}
