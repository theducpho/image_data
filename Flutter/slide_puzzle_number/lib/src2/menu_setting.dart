import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:slide_puzzle_number/src/app_setting/app_setting_controller.dart';
import 'package:slide_puzzle_number/src/audio/general_audio_controller.dart';
import 'package:slide_puzzle_number/src/widgets/widgets.dart';

class MenuSetting extends ConsumerWidget {
  const MenuSetting({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final appSettingController = ref.watch(appSettingControllerProvider.notifier);
    final reduceMotion = ref.watch(appSettingControllerProvider.select((value) => value.reduceMotion));
    return Card(
      color: Theme.of(context).colorScheme.surface,
      margin: const EdgeInsets.symmetric(horizontal: 10.0, vertical: 16.0),
      child: SizedBox.expand(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.start,
          children: [
            Padding(
              padding:
                  const EdgeInsets.only(top: 32.0, left: 32.0, right: 32.0),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  TextButton(
                    onPressed: () => appSettingController.reduceMotion = !reduceMotion,
                    child: Text.rich(
                      TextSpan(
                        text: 'Reduce motion: ',
                        style: Theme.of(context).textTheme.bodyMedium!.copyWith(
                            color: Theme.of(context).colorScheme.onBackground),
                        children: [
                          TextSpan(
                            text: reduceMotion ? 'ON' : 'OFF',
                            style: Theme.of(context)
                                .textTheme
                                .bodyMedium!
                                .copyWith(
                                    color: Theme.of(context).colorScheme.primary),
                          )
                        ],
                      ),
                    ),
                  )
                ],
              ),
            ),
            Padding(
              padding: const EdgeInsets.only(left: 32.0, top: 32.0, right: 32.0),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Consumer(
                    builder: (context, ref, _) {
                      final audioController = ref.watch(generalAudioControllerProvider);
                      return SlidepartyButton(
                        color: ButtonColors.blue,
                        size: ButtonSize.square,
                        onPressed: () => audioController.isMuted = !audioController.isMuted,
                        child: audioController.isMuted ? const Icon(Icons.music_off) : const Icon(Icons.music_note),
                      );
                    },
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}