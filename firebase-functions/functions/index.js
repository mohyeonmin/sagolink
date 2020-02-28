// import GOOGLE_APPLICATION_CREDENTIALS="/home/user/mohyeonmin/test/firebase-functions/functions/serviceAccountKey.json"

const functions = require('firebase-functions');

const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);



// const admin = require('firebase-admin');

// const serviceAccount = require("./serviceAccountKey.json");

// admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount),
//     databaseURL: "https://firestore-41646.firebaseio.com",

// });


// credential: admin.credential.applicationDefault(),
// credential: admin.credential.cert(serviceAccount),
// databaseURL: "https://firestore-41646.firebaseio.com"




exports.updateUser = functions.firestore
    .document('hospital/{1}')
    .onUpdate((change, context) => {
      // Get an object representing the current document
      const newValue = change.after.data();

      console.log(newValue);


    });

exports.hospitalTest = functions.https.onRequest((request, response) => {

    const db = admin.firestore();

    db.collection('hospital').get()
    .then((snapshot) => {
    snapshot.forEach((doc) => {
        console.log(doc.id, '=>', doc.data());

    });
    return;
  })
  .catch((err) => {
    console.log('Error getting documents', err);

  });


    //ref("hospital").limitToLast(10);
    // var ref = db.ref("/public_resource");

    // ref.once("value", function(snapshot) {
    //     console.log(snapshot.val());
    // });
    // const address =rute.ref("/address");
    // response.send();

    // response.send(rute);
});


// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//


// exports.addMessage = functions.https.onRequest(async (req, res) => {
//     // Grab the text parameter.
//     const original = req.query.text;
//     const URL = 'https://us-central1-firestore-41646.cloudfunctions.net/addMessage';

//     // Push the new message into the Realtime Database using the Firebase Admin SDK.
//     const snapshot = await admin.database().ref('/hospital/1'); //.push({1:address});  // 이렇게 하면 화면 이동으로 된다.
//     // Redirect with 303 SEE OTHER to the URL of the pushed object in the Firebase console.
//     res.redirect(URL, snapshot.ref.toString());

// });




// exports.hello = functions.https.onRequest((request, response)=<{

//     const serviceAccount = require("./serviceAccountKey.json");

//     admin.initializeApp({
//         credential: admin.credential.cert(serviceAccount),
//         databaseURL: "https://firestore-41646.firebaseio.com"
//     }

//     const db = admin.database();
//     const rute = db.ref("hospital/1");

//     ruto.once("no", function(snapshot) {
//         response.send(snapshot.val());
//     });

// });

// exports.addres = functions.https.onRequest(async (resq, res) =>{

// }
// )

