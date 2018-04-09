var firebase = require('firebase');
var firebaseConfig = {
    apiKey: "AIzaSyDKstoSby1YdpTfy7xqAiDPt5Ta50PoOIw",
    authDomain: "nomad-e1934.firebaseapp.com",
    databaseURL: "https://nomad-e1934.firebaseio.com",
    projectId: "nomad-e1934",
};

var FBApp = firebase.initializeApp(firebaseConfig);
module.exports.database = firebase.database();
