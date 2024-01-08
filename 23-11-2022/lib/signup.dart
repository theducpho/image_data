import 'package:flutter/material.dart';
import 'database.dart';
import 'main.dart';
import 'model.dart';

class MySignUpWidgetState extends State<MySignUpWidget> {
  TextEditingController nameController = TextEditingController();

  Future<void> createUser(String name, VoidCallback onSuccess) async {
    var user = User(name: name, level: '0', exp: 0);
    await DBProvider.db.createUser(user);
    onSuccess.call();
  }

  @override
  Widget build(BuildContext context) {
    return Padding(
        padding: const EdgeInsets.all(10),
        child: ListView(
          children:
          <Widget>[
            Container(
              alignment: Alignment.center,
              padding: const EdgeInsets.all(10),
              child: const Text (
                'Sign Up',
                style: TextStyle(fontSize: 20),
              ),
            ),
            Container(
              padding: const EdgeInsets.all(10),
              child: TextField (
                controller: nameController,
                decoration: const InputDecoration(
                  border: OutlineInputBorder(),
                  labelText: 'Name',
                ),
              ),
            ),
            Container(
              height: 50,
              alignment: Alignment.center,
              padding: const EdgeInsets.fromLTRB(10, 0, 10, 0),
              child: ElevatedButton(
                child: const Text ('Sign Up'),
                onPressed: () => createUser(nameController.text, () {
                  Navigator.push(
                    context,
                    MaterialPageRoute(builder: (context) => const MyInfoWidget()),
                  );
                },
                ),
              ),
            ),
          ],

        )

    );
  }

}