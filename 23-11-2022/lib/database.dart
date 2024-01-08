import 'dart:async';
import 'dart:developer';
import 'dart:io';
import 'package:path_provider/path_provider.dart';
import 'package:sqflite/sqflite.dart';

import 'model.dart';

class DBProvider {

  DBProvider._();
  static final DBProvider db = DBProvider._();

  static Database? _database;

  Future<Database?> get database async {
    if (_database != null) {
      return _database;
    }

    // if _database is null we instantiate it
    _database = await initDB();
    return _database;
  }

  Future<bool> checkDb() async{
    Directory documentDirectory = await getApplicationDocumentsDirectory();
    var dbPath = "${documentDirectory.path}HabitDB.db";
    bool exist = await databaseExists(dbPath);
    log("The: checkDB");
    return exist;
  }

  initDB() async {
    Directory documentsDirectory = await getApplicationDocumentsDirectory();
    String path = "${documentsDirectory.path}HabitDB.db";
    return await openDatabase(path, version: 1, onOpen: (db) {
    }, onCreate: (Database db, int version) async {

      log("The: createDB");

      await db.execute("CREATE TABLE User ("
          "name TEXT PRIMARY KEY,"
          "level TEXT,"
          "exp INTEGER"
          ")");

      await db.execute("CREATE TABLE History ("
          "date TEXT,"
          "level TEXT,"
          "exp INTEGER"
          ")");

      await db.execute("CREATE TABLE Action ("
          "id INTEGER PRIMARY KEY,"
          "name TEXT,"
          "exp INTEGER"
          ")");
    });
  }

  createUser(User newUser) async {
    final db = await database;
    var res = await db!.insert("User", newUser.toMap());
    return res;
  }

  Future<String> getUserName() async {
    final db = await database;
    var results = await db!.query("User");

    var user = User.fromMap(results[0]);
    return user.name;
  }

}

