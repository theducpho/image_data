import 'dart:async';
import 'dart:io';
import 'package:path_provider/path_provider.dart';
import 'package:sqflite/sqflite.dart';

import 'Model.dart';

class DBImageProvider {

  DBImageProvider._();
  static final DBImageProvider db = DBImageProvider._();

  static Database? _database;

  Future<Database?> get database async {
    if (_database != null) {
      return _database;
    }

    // if _database is null we instantiate it
    _database = await initDB();
    return _database;
  }

  Future<bool> checkDBExist() async{
    Directory documentDirectory = await getApplicationDocumentsDirectory();
    var dbPath = "${documentDirectory.path}ImageDB.db";
    bool exist = await databaseExists(dbPath);
    return exist;
  }

  initDB() async {
    Directory documentsDirectory = await getApplicationDocumentsDirectory();
    String path = "${documentsDirectory.path}Image.db";
    return await openDatabase(path, version: 1, onOpen: (db) {
    }, onCreate: (Database db, int version) async {

      await db.execute("CREATE TABLE Image ("
          "id TEXT PRIMARY KEY,"
          "name TEXT,"
          "info TEXT,"
          "content TEXT,"
          "location TEXT"
          ")");
    });
  }

  insertImageObj(ImageObj newImage) async {
    final db = await database;
    var res = await db!.insert("Image", newImage.toMap());
    return res;
  }

  Future<List<ImageObj>> getListImageObj() async {
    final db = await database;
    var results = await db!.query("Image");

    List<ImageObj> list = results.isNotEmpty ? results.map((c) => ImageObj.fromMap(c)).toList() : [];

    return list;
  }

}

