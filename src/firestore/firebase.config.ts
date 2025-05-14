var admin = require("firebase-admin");

var serviceAccount = require("../../nestjs-10dd2-firebase-adminsdk-fbsvc-61cb1dbfc8.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

export const firestore = admin.firestore();