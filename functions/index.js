const functions = require('firebase-functions');

exports.insertData = functions.https.onRequest((request, response) => {
  response.header({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': '*',
    'Access-Control-Allow-Credentials':  true,
    'Access-Control-Allow-Methods': '*',
  });
  response.send("hello");
});
