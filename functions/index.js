const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();
const firestore = admin.firestore();
firestore.settings({ timestampsInSnapshots: true });
const usersRef = firestore.collection('users');
process.on('unhandledRejection', console.dir);

exports.insertData = functions.https.onRequest(async ({ method, headers: { 'firebase-user-token': token } }, res) => {
  res.header({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': '*',
    'Access-Control-Allow-Credentials': true,
    'Access-Control-Allow-Methods': '*',
  });
  if(['OPTIONS'].includes(method)) return res.send('');
  const { uid } = await admin.auth().verifyIdToken(token);
  const userSnap = await usersRef.doc(uid).get();
  const allowAccess = userSnap.data() && userSnap.data().allowAccess;
  res.send(!!allowAccess);
});
