import 'dart:math';

import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:gap/gap.dart';
import 'package:go_router/go_router.dart';
import 'package:line_icons/line_icons.dart';
import 'package:slide_puzzle_number/src/app_setting/app_setting_controller.dart';
import 'package:slide_puzzle_number/src/theme_setting_bar.dart';
import 'package:slide_puzzle_number/src/widgets/widgets.dart';
import 'package:slide_puzzle_number/src2/menu_setting.dart';

final menuSettingProvider = StateProvider.autoDispose<bool>((ref) => false);

class HomePage extends StatelessWidget {
  const HomePage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final screenSize = MediaQuery.of(context).size;
    return Scaffold(
      body: SafeArea(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Consumer(
              builder: (context, ref, child) {
                final openSetting = ref.watch(menuSettingProvider.notifier);
                return IconButton(
                  onPressed: () =>
                      openSetting.state = !openSetting.state,
                  icon: Icon(
                    LineIcons.cog,
                    color: Theme.of(context).colorScheme.primary,
                  )
                );
              },
            ),
            Padding(
              padding: const EdgeInsets.only(bottom: 32.0),
              child: Text.rich(
                TextSpan(
                  text: 'Slide puzzle ',
                  children: [
                    TextSpan(
                      text: 'number',
                      style: Theme.of(context).textTheme.titleLarge!.copyWith(
                            color: Theme.of(context).colorScheme.primary,
                          ),
                    ),
                  ],
                  style: Theme.of(context).textTheme.titleLarge,
                ),
              ),
            ),
            createMenuHome(screenSize),
            const ThemeSettingBar(),
            const Gap(16),
            Consumer(
              builder: (context, ref, child) {
                final appSettingController =
                    ref.watch(appSettingControllerProvider.notifier);
                final reduceMotion = ref.watch(appSettingControllerProvider
                    .select((value) => value.reduceMotion));
                return TextButton(
                  onPressed: () =>
                      appSettingController.reduceMotion = !reduceMotion,
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
                );
              },
            ),
          ],
        ),
      ),
    );
  }

  ConstrainedBox createMenuHome(
    Size screenSize,
  ) {
    return ConstrainedBox(
      constraints: BoxConstraints(
        maxHeight: min(425, screenSize.shortestSide),
        maxWidth: min(425, screenSize.shortestSide),
      ),
      child: LayoutBuilder(
        builder: (context, constraints) {
          final frameSize = constraints.biggest;
          final size = frameSize.shortestSide;
          
          return SizedBox(
            height: size,
            width: size,
            child: Consumer(
              builder: (context, ref, child) {
                final openSetting = ref.watch(menuSettingProvider);
                return Stack(
                  children: [
                    Column(
                      children: [
                        SlidepartyButton(
                          color: ButtonColors.green,
                          onPressed: () => context.go('/s_mode'),
                          child: const Text('Simple Mode'),
                        ),
                        const SizedBox(height: 8),
                        SlidepartyButton(
                          color: ButtonColors.yellow,
                          onPressed: () => context.go('/m_mode'),
                          child: const Text('Medium Mode'),
                        ),
                        const SizedBox(height: 8),
                        SlidepartyButton(
                          color: ButtonColors.red,
                          onPressed: () => context.go('/h_mode'),
                          child: const Text('Hard Mode'),
                        ),
                      ],
                    ),
                    if (openSetting) const MenuSetting(),
                  ],
                );
              },
            ),
          );
        },
      ),
    );
  }
}
