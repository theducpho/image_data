import 'dart:math';

import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:slize_puzzle_number/src/controllers/playboard.dart';
import 'package:slize_puzzle_number/src/single_mode/single_playboard_state.dart';
import 'package:slize_puzzle_number/src/utils/breakpoint.dart';

class SingleModeHeader extends ConsumerWidget {
  const SingleModeHeader({Key? key}) : super(key: key);

  double _rSpacing(double playboardSize, int boardSize) =>
      2.5 * _tileSize(playboardSize, boardSize) / 49;
  double _tileSize(double playboardSize, int boardSize) =>
      playboardSize / boardSize;
  double maxPlayboardSize(double screenSize, int boardSize) =>
      screenSize - 16 - 2 * _rSpacing(screenSize, boardSize);

  static const bp = Breakpoint(small: 300, normal: 400, large: 500);

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final boardSize = ref.watch(playboardControllerProvider.select((state) {
      if (state is SinglePlayboardState) {
        return state.playboard.size;
      }
      throw UnimplementedError('This cannot happen');
    }));
    final screenSize = MediaQuery.of(context).size;

    return ConstrainedBox(
      constraints: BoxConstraints(
        maxWidth: maxPlayboardSize(
          min(425, screenSize.shortestSide),
          boardSize,
        ),
      ),
      child: Padding(
        padding: const EdgeInsets.only(top: 16.0),
        child: LayoutBuilder(
          builder: (context, constraints) {
            final textStyle = Theme.of(context).textTheme.titleMedium!.copyWith(
                  fontSize: bp.responsiveValue(
                    constraints.biggest,
                    watch: 10,
                    tablet: 16,
                    defaultValue: 14,
                  ),
                );

            return Row(
              mainAxisAlignment: MainAxisAlignment.spaceEvenly,
              children: [
                Flexible(
                  child: Align(
                    alignment: Alignment.centerLeft,
                    child: Consumer(
                      builder: (context, ref, child) {
                        final step = ref
                            .watch(playboardControllerProvider.select((state) {
                          if (state is SinglePlayboardState) {
                            return state.step;
                          }
                          throw UnimplementedError('This cannot happen');
                        }));

                        return Padding(
                          padding: const EdgeInsets.only(left: 1),
                          child: Text.rich(
                            TextSpan(
                              text: 'STEP: ',
                              children: [
                                TextSpan(
                                  text: '$step',
                                  style: textStyle.copyWith(
                                    color:
                                        Theme.of(context).colorScheme.primary,
                                  ),
                                ),
                              ],
                            ),
                            style: textStyle,
                          ),
                        );
                      },
                    ),
                  ),
                ),
                // Flexible(
                //   child: Center(
                //     child: Consumer(
                //       builder: (context, ref, child) {
                //         final duration = ref.watch(counterProvider);
                //         return Text(
                //           "Durations.watchFormat(duration)",
                //           style: textStyle.copyWith(
                //             color: Theme.of(context).colorScheme.primary,
                //           ),
                //         );
                //       },
                //     ),
                //   ),
                // ),
                Flexible(
                  child: Align(
                      alignment: Alignment.centerRight,
                      child: Consumer(builder: (context, ref, child) {
                        final bestStep = ref
                            .watch(playboardControllerProvider.select((state) {
                          if (state is SinglePlayboardState) {
                            return state.bestStep;
                          }
                          throw UnimplementedError('This cannot happen');
                        }));

                        return Text.rich(
                          TextSpan(
                            text: 'AUTO: ',
                            children: [
                              TextSpan(
                                text:
                                    bestStep == -1 ? '?' : bestStep.toString(),
                                style: textStyle.copyWith(
                                  color: Theme.of(context).colorScheme.primary,
                                ),
                              ),
                            ],
                          ),
                          style: textStyle,
                        );
                      })),
                ),
              ],
            );
          },
        ),
      ),
    );
  }
}
