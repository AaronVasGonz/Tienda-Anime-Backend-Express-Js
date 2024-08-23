const admin  = require('firebase-admin');

const serviceAccount = require('./tiendaanime-9e7dc-firebase-adminsdk-1fg4w-61fdba53f6.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: 'tiendaanime-9e7dc.appspot.com',

});

const bucket = admin.storage().bucket();

module.exports = { admin, bucket };
