import 'package:equatable/equatable.dart';
import 'package:slize_puzzle_number/src/playboard_state/playboard_config.dart';

abstract class PlayboardState extends Equatable {
  final PlayboardConfig config;

  const PlayboardState({required this.config});
}
