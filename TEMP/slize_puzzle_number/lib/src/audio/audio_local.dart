import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:slize_puzzle_number/src/core/db/db_core.dart';

final audioLocalProvider = Provider<AudioLocal>((ref) => AudioLocalImpl());

abstract class AudioLocal extends DbCore {
  bool get isMuted;
  set isMuted(bool value);
}

class AudioLocalImpl extends AudioLocal {
  @override
  bool get isMuted => box.get('isMute', defaultValue: true);

  @override
  set isMuted(bool value) => box.put('isMute', value);
}
