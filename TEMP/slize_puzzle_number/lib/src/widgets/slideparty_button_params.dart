import 'package:flutter/material.dart';
import 'package:hive/hive.dart';
import 'package:flex_color_scheme/flex_color_scheme.dart';
import 'package:slize_puzzle_number/src/core/db.dart';
import 'package:slize_puzzle_number/src/utils/slideparty_colors.dart';

part 'slideparty_button_params.g.dart';

@HiveType(typeId: DbIdNumbering.buttonColorsId)
enum ButtonColors {
  @HiveField(0)
  blue,
  @HiveField(1)
  green,
  @HiveField(2)
  red,
  @HiveField(3)
  yellow,
}

extension BackgroundColor on ButtonColors {
  Color backgroundColor(BuildContext context) {
    switch (this) {
      case ButtonColors.blue:
        return Theme.of(context).brightness == Brightness.dark
            ? SlidepartyColors.dark.blueBg
            : SlidepartyColors.light.blueBg;
      case ButtonColors.green:
        return Theme.of(context).brightness == Brightness.dark
            ? SlidepartyColors.dark.greenBg
            : SlidepartyColors.light.greenBg;

      case ButtonColors.red:
        return Theme.of(context).brightness == Brightness.dark
            ? SlidepartyColors.dark.redBg
            : SlidepartyColors.light.redBg;

      case ButtonColors.yellow:
        return Theme.of(context).brightness == Brightness.dark
            ? SlidepartyColors.dark.yellowBg
            : SlidepartyColors.light.yellowBg;
      default:
        throw Exception('ButtonColors not found');
    }
  }
}

extension ColorSchemeExt on ButtonColors {
  Color get primaryColor {
    switch (this) {
      case ButtonColors.blue:
        return const Color(0xFF25ADE6);
      case ButtonColors.green:
        return const Color(0xFF75CF4E);
      case ButtonColors.yellow:
        return const Color(0xFFFFCD06);
      case ButtonColors.red:
        return const Color(0xFFED701E);
    }
  }
}

extension ThemeBaseOnColor on ButtonColors {
  ThemeData adaptiveTheme(BuildContext context) =>
      Theme.of(context).brightness == Brightness.light ? lightTheme : darkTheme;

  ThemeData get lightTheme => FlexColorScheme.light(
        fontFamily: 'kenvector_future',
        primary: primaryColor,
        blendLevel: 20,
        surfaceMode: FlexSurfaceMode.highSurfaceLowScaffold,
        onPrimary: Colors.white,
      ).toTheme;
  ThemeData get darkTheme => FlexColorScheme.dark(
        fontFamily: 'kenvector_future',
        primary: primaryColor,
        blendLevel: 20,
        surfaceMode: FlexSurfaceMode.highSurfaceLowScaffold,
        onPrimary: Colors.white,
      ).toTheme;
}

enum ButtonSize { large, square }
