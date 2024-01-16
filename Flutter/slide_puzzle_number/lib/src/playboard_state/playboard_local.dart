import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:slide_puzzle_number/src/widgets/buttons.dart';

import '../core/db/db_core.dart';

final playboardLocalProvider = Provider<PlayboardLocal>(
  (ref) => PlayboardLocalImpl(),
);

abstract class PlayboardLocal extends DbCore<dynamic> {
  ButtonColors get buttonColor;
  set buttonColor(ButtonColors color);

  int get boardSize;
  set boardSize(int size);
}

class PlayboardLocalImpl extends PlayboardLocal {
  @override
  ButtonColors get buttonColor => box.get(
        'buttonColor',
        defaultValue: ButtonColors.blue,
      );

  @override
  set buttonColor(ButtonColors color) => box.put('buttonColor', color);

  @override
  int get boardSize => box.get('boardSize', defaultValue: 3);

  @override
  set boardSize(int size) => box.put('boardSize', size);
}
