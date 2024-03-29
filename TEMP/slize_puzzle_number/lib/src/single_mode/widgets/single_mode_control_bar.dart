import 'dart:math';

import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:line_icons/line_icons.dart';
import 'package:slize_puzzle_number/src/controllers/playboard.dart';
import 'package:slize_puzzle_number/src/single_mode/controllers/single_mode_controller.dart';
import 'package:slize_puzzle_number/src/single_mode/single_playboard_state.dart';
import 'package:go_router/go_router.dart';

class SingleModeControlBar extends ConsumerWidget {
  const SingleModeControlBar({Key? key}) : super(key: key);

  double _rSpacing(double playboardSize, int boardSize) =>
      2.5 * _tileSize(playboardSize, boardSize) / 49;
  double _tileSize(double playboardSize, int boardSize) =>
      playboardSize / boardSize;
  double maxPlayboardSize(double screenSize, int boardSize) =>
      screenSize - 16 - 2 * _rSpacing(screenSize, boardSize);

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final controller = ref.watch(playboardControllerProvider.notifier)
        as SingleModePlayboardController;
    final state =
        ref.watch(playboardControllerProvider) as SinglePlayboardState;
    final screenSize = MediaQuery.of(context).size;

    //final settingController = ref.watch(singleModeSettingProvider.notifier);

    return ConstrainedBox(
      constraints: BoxConstraints(
        maxWidth: maxPlayboardSize(
          min(425, screenSize.shortestSide),
          state.playboard.size,
        ),
      ),
      child: Padding(
        padding: const EdgeInsets.only(bottom: 16.0),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
          children: [
            IconButton(
              onPressed: () => controller.reset(),
              icon: Icon(
                LineIcons.syncIcon,
                color: Theme.of(context).colorScheme.primary,
              ),
            ),
            if (controller.isSolving == false) ...[
              TextButton(
                onPressed: () => controller.autoSolve(context),
                child: const Text('SOLVE'),
              ),
              IconButton(
                onPressed: () => context.go('/'),
                // onPressed: () =>
                //     settingController.state = !settingController.state,
                icon: Icon(
                  LineIcons.home,
                  color: Theme.of(context).colorScheme.primary,
                ),
              ),
            ],
          ],
        ),
      ),
    );
  }
}
