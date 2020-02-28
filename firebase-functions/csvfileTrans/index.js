const admin = require('./node_modules/firebase-admin');
const serviceAccount = require("./serviceAccountKey.json");
const data = require("./hospital.json");
const collectionKey = "hospital"; //name of the collection

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://firestore-41646.firebaseio.com"
});
const firestore = admin.firestore();
const settings = {timestampsInSnapshots: true};
firestore.settings(settings);

if (data && (typeof data === "object")) {
    Object.keys(data).forEach(no => {
        firestore.collection(collectionKey)
        .doc(no)
        .set(data[no])
        .then((res) => {
            console.log("Document " + no + " successfully written!");
        }).catch((error) => {
            console.error("Error writing document: ", error);
        });
    });
}