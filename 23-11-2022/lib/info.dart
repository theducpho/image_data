import 'dart:developer';

import 'package:first_create/database.dart';
import 'package:flutter/material.dart';

import 'main.dart';

class MyInfoWidgetState extends State<MyInfoWidget> {

  String name = "Loading data...";

  @override
  void initState() {
    log("The: initState");
    super.initState();
    getNameFromDB();
  }

  void getNameFromDB() async {
    log("The:getNameFromDB $name");
    String nameTemp = await DBProvider.db.getUserName();
    setState(() {
      name = nameTemp;
    });
    log("The: $name");
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: Column(
          children: [

            Container(
              decoration: const BoxDecoration(
                  image: DecorationImage(
                      image: NetworkImage(
                          "https://images.pexels.com/photos/213780/pexels-photo-213780.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                      ),
                      fit: BoxFit.cover
                  )
              ),
              child: SizedBox(
                width: double.infinity,
                height: 200,
                child: Container(
                  alignment: const Alignment(0.0,2.5),
                  child: const CircleAvatar(
                    backgroundImage: NetworkImage(
                        "https://images.pexels.com/photos/213780/pexels-photo-213780.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                    ),
                    radius: 60.0,
                  ),
                ),
              ),
            ),

            const SizedBox(
              height: 60,
            ),

            Text(
              name,
              style: const TextStyle(
                fontSize: 25,
                color:Colors.blueGrey,
                letterSpacing: 2.0,
                fontWeight: FontWeight.w400
              ),
            ),

            const SizedBox(
              height: 10,
            ),

            const Text(
              "QuangNgai, VietNam"
              ,style: TextStyle(
                fontSize: 18.0,
                color:Colors.black45,
                letterSpacing: 2.0,
                fontWeight: FontWeight.w300
              ),
            ),

            const SizedBox(
              height: 10,
            ),

            const Text(
              "Developer at XYZ Company"
              ,style: TextStyle(
                fontSize: 15.0,
                color:Colors.black45,
                letterSpacing: 2.0,
                fontWeight: FontWeight.w300
              ),
            ),

            const SizedBox(
              height: 10,
            ),

            const Card(
              margin: EdgeInsets.symmetric(horizontal: 20.0,vertical: 8.0),
              elevation: 2.0,
              child: Padding(
                padding: EdgeInsets.symmetric(vertical: 12,horizontal: 30),
                child: Text(
                  "Skill Sets3",
                  style: TextStyle(
                    letterSpacing: 2.0,
                    fontWeight: FontWeight.w300
                  ),
                )
              )
            ),

            const SizedBox(
              height: 15,
            ),

            const Text(
              "App Developer || Digital Marketer"
              ,style: TextStyle(
                fontSize: 18.0,
                color:Colors.black45,
                letterSpacing: 2.0,
                fontWeight: FontWeight.w300
              ),
            ),

            Card(
              margin: const EdgeInsets.symmetric(horizontal: 20.0,vertical: 8.0),
              child: Padding(
                padding: const EdgeInsets.all(8.0),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                  children: [
                    Expanded(
                        child: Column(
                          children: const [

                            Text("Project",
                              style: TextStyle(
                                color: Colors.blueAccent,
                                fontSize: 22.0,
                                fontWeight: FontWeight.w600
                              ),
                            ),

                            SizedBox(
                              height: 7,
                            ),

                            Text("15",
                              style: TextStyle(
                                color: Colors.black,
                                fontSize: 22.0,
                                fontWeight: FontWeight.w300
                              ),
                            ),
                          ],
                        ),
                    ),

                    Expanded(
                      child:
                      Column(
                        children: const [
                          Text("Followers",
                            style: TextStyle(
                              color: Colors.blueAccent,
                              fontSize: 22.0,
                              fontWeight: FontWeight.w600
                            ),
                          ),

                          SizedBox(
                            height: 7,
                          ),

                          Text("2000",
                            style: TextStyle(
                              color: Colors.black,
                              fontSize: 22.0,
                              fontWeight: FontWeight.w300
                            ),
                          ),
                        ],
                      ),
                    ),

                  ],
                )
              )
            ),

            const SizedBox(
              height: 50,
            ),

            Row(
              mainAxisAlignment: MainAxisAlignment.spaceEvenly,
              children: <Widget>[
                ElevatedButton(
                  onPressed: (){
                  },
                  style: ButtonStyle(
                    shape: MaterialStateProperty.all<RoundedRectangleBorder>(
                      RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(80.0),
                      ),
                    ),
                  ),
                  child: Ink(
                    decoration: BoxDecoration(
                      gradient: const LinearGradient(
                          begin: Alignment.centerLeft,
                          end: Alignment.centerRight,
                          colors: [Colors.pink,Colors.redAccent]
                      ),
                      borderRadius: BorderRadius.circular(30.0),
                    ),
                    child: Container(
                      constraints: const BoxConstraints(maxWidth: 100.0,maxHeight: 40.0,),
                      alignment: Alignment.center,
                      child: const Text(
                        "Contact me",
                        style: TextStyle(
                            color: Colors.white,
                            fontSize: 12.0,
                            letterSpacing: 2.0,
                            fontWeight: FontWeight.w300
                        ),
                      ),
                    ),
                  ),
                ),
                ElevatedButton(
                  onPressed: (){
                  },
                  style: ButtonStyle(
                    shape: MaterialStateProperty.all<RoundedRectangleBorder>(
                      RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(80.0),
                      ),
                    ),
                  ),
                  child: Ink(
                    decoration: BoxDecoration(
                      gradient: const LinearGradient(
                        begin: Alignment.centerLeft,
                        end: Alignment.centerRight,
                        colors: [Colors.pink,Colors.redAccent]
                      ),
                      borderRadius: BorderRadius.circular(80.0),
                    ),
                    child: Container(
                      constraints: const BoxConstraints(maxWidth: 100.0,maxHeight: 40.0,),
                      alignment: Alignment.center,
                      child: const Text(
                        "Portfolio",
                        style: TextStyle(
                          color: Colors.white,
                          fontSize: 12.0,
                          letterSpacing: 2.0,
                          fontWeight: FontWeight.w300
                        ),
                     ),
                    ),
                  ),
                ),
              ],
            ),
          ],
        ),
      )
    );
  }

}