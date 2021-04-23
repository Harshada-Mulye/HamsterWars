var admin = require("firebase-admin");
 
const serviceAccount = require("./firebase-private-key.json");
 
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
 
});
 
const firestore = admin.firestore();
const path = require("path");
const fs = require("fs");
const directoryPath = path.join(__dirname, "files");
 
fs.readdir(directoryPath, function(err, files) {
    if (err) {
        return console.log("Unable to scan directory: " + err);
    }
    console.log("5")
    files.forEach(function(file) {
        var lastDotIndex = file.lastIndexOf(".");
        console.log("6")
        var menu = require("./files/" + file);
        console.log("7")
        menu.forEach(function(obj) {
            console.log("8", (obj.id))
            firestore
                .collection(file.substring(0, lastDotIndex))
                //.doc(obj.id)
                //.set(obj)
                .add(obj)
                .then(function(docRef) {
                    console.log("Document written");
                })
                .catch(function(error) {
                    console.error("Error adding document: ", error);
                });
        });
    });
});