const functions = require("firebase-functions");
const app = require("express")();
const auth = require('./util/auth');

const { signUpUser, getUser } = require("./api/user");
app.get("/user/:uid", getUser)
app.post('/signup', auth, signUpUser);

const { getClips, getScrollerClips, setScrollerClips } = require("./api/twitch");

app.get('/clips', getClips);
app.get('/scrollerClips', getScrollerClips);
app.post('/scrollerClips', setScrollerClips);

const { getAllSoldiers, searchForSoldiers, createSquad, getSquad } = require("./api/squad");

app.get('/soldiers', getAllSoldiers);
app.get('/searchSoldiers/:search', searchForSoldiers);
app.post('/squad', createSquad);
app.get('/squad/:squadName', getSquad);


exports.api = functions.https.onRequest(app);