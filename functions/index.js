const functions = require("firebase-functions");
const app = require("express")();
const auth = require('./util/auth');

const { signUpUser } = require("./api/user");
app.post('/signup', auth, signUpUser);

const { getClips, getScrollerClips, setScrollerClips } = require("./api/twitch");

app.get('/clips', getClips);
app.get('/scrollerClips', getScrollerClips);
app.post('/scrollerClips', setScrollerClips);

exports.api = functions.https.onRequest(app);