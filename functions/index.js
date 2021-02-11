const functions = require("firebase-functions");
const app = require("express")();
const auth = require('./util/auth');

// TODO -> 
// const { 
//   loginUser,
//   signUpUser,
//   uploadProfilePhoto,
//   getUserDetail,
//   updateUserDetails
// } = require('./APIs/users')

const { signUpUser } = require("./api/user");
app.post('/signup', auth, signUpUser);

exports.api = functions.https.onRequest(app);