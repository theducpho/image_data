import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:slize_puzzle_number/src/app_setting/app_setting_controller.dart';
import 'package:slize_puzzle_number/src/controllers/playboard_controller.dart';
import 'package:slize_puzzle_number/src/controllers/playboard_info_controller.dart';
import 'package:slize_puzzle_number/src/home_page.dart';
import 'package:slize_puzzle_number/src/single_mode/controllers/single_mode_controller.dart';
import 'package:slize_puzzle_number/src/single_mode/screens/single_mode_page.dart';
import 'package:slize_puzzle_number/src/utils/app_infos/app_infos.dart';
import 'package:slize_puzzle_number/src/widgets/slideparty_button_params.dart';

class App extends ConsumerStatefulWidget {
  const App({Key? key}) : super(key: key);

  static final router = GoRouter(
    initialLocation: '/',
    routes: [
      GoRoute(
        path: '/',
        builder: (context, state) {
          AppInfos.setAppTitle('Slide Puzzle Number - Home');
          return const HomePage();
        },
      ),
      GoRoute(
        path: '/_refresh',
        builder: (context, state) {
          AppInfos.setAppTitle('Loading ...');
          return const Scaffold(
            body: Center(child: CircularProgressIndicator()),
          );
        },
      ),
      GoRoute(
        path: '/s_mode',
        builder: (context, state) {
          AppInfos.setAppTitle('Slide Puzzle Number - Simple Mode');
          return ProviderScope(
            overrides: [
              playboardControllerProvider
                  .overrideWith(simpleModeControllerProvider),
            ],
            child: const SingleModePage(),
          );
        },
      ),
      GoRoute(
        path: '/m_mode',
        builder: (context, state) {
          AppInfos.setAppTitle('Slide Puzzle - Medium Mode');
          return ProviderScope(
            overrides: [
              playboardControllerProvider
                  .overrideWith(mediumModeControllerProvider),
            ],
            child: const SingleModePage(),
          );
        },
      ),
      GoRoute(
        path: '/h_mode',
        builder: (context, state) {
          AppInfos.setAppTitle('Slide Puzzle - Hard Mode');
          return ProviderScope(
            overrides: [
              playboardControllerProvider
                  .overrideWith(hardModeControllerProvider),
            ],
            child: const SingleModePage(),
          );
        },
      ),
    ],
  );

  @override
  ConsumerState<App> createState() => _AppState();
}

class _AppState extends ConsumerState<App> {
  @override
  Widget build(BuildContext context) {
    final playboardDefaultColor = ref
        .watch(playboardInfoControllerProvider.select((value) => value.color));
    final isDarkTheme = ref.watch(
        appSettingControllerProvider.select((value) => value.isDarkTheme));

    return MaterialApp.router(
      routerConfig: App.router,
      debugShowCheckedModeBanner: false,
      themeMode: isDarkTheme ? ThemeMode.dark : ThemeMode.light,
      theme: playboardDefaultColor.lightTheme,
      darkTheme: playboardDefaultColor.darkTheme,
      onGenerateTitle: (context) => 'Not Found',
    );
  }
}
