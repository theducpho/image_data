import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:slize_puzzle_number/src/playboard_state/playboard_local.dart';
import 'package:slize_puzzle_number/src/widgets/buttons.dart';

final playboardInfoControllerProvider =
    ChangeNotifierProvider<PlayboardInfoController>(
  (ref) => PlayboardInfoController(ref),
);

class PlayboardInfoController extends ChangeNotifier {
  PlayboardInfoController(this.ref) {
    _color = ref.read(playboardLocalProvider).buttonColor;
    _boardSize = ref.read(playboardLocalProvider).boardSize;
  }

  final Ref ref;

  ButtonColors _color = ButtonColors.blue;
  ButtonColors get color => _color;
  set color(ButtonColors color) {
    ref.read(playboardLocalProvider).buttonColor = color;
    _color = color;
    notifyListeners();
  }

  int _boardSize = 3;
  int get boardSize => _boardSize;
  set boardSize(int value) {
    ref.read(playboardLocalProvider).boardSize = value;
    _boardSize = value;
    notifyListeners();
  }
}
