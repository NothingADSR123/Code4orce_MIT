const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json'); // Get from Firebase console

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.FIREBASE_DB_URL,
});

module.exports = admin;
