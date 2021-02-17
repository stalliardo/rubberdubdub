// const { admin, db } = require("../util/admin");
// const config = require("../util/config");
// const firebase = require("firebase");
const functions = require("firebase-functions");
const axios = require("axios");
const clientId = "lj9dkyd9oj3qjslm3dp20fytryg94v";

exports.getClips = (request, response) => {

    const axiosConfig = {
        headers: {
            "Authorization": `Bearer ${functions.config().twitch.token}`,
            "client-id": clientId,
        }
    }

    const thumbnailArray = [];

    axios.get("https://api.twitch.tv/helix/clips?broadcaster_id=407695237&first=5", axiosConfig).then((clips) => {
        clips.data.data.forEach((clip) => {
            thumbnailArray.push(clip.thumbnail_url)
        });
        response.status(200).json(thumbnailArray);
    }).catch((error) => {
        console.log("error getting the clips. Error = ", error);
        response.status(500).json({error: "An error occured while getting the clips"})
    })

}


    // db.doc(`/users/${request.body.user.uid}`).get().then((doc) => {
    //     if (doc.exists) {
    //         return response.status(400).json({ error: 'Account already exists' });
    //     } else {
    //         let userCredentials;
    //         if(request.body.isGoogleAuth) {
    //             userCredentials = { email: request.body.user.email };
    //         } else {
    //             userCredentials = { ...request.body.userDetails, email: request.body.user.email };
    //         }

    //         return db.doc(`users/${request.body.user.uid}`).set(userCredentials);
    //     }
    // }).then(() => {
    //     return response.status(201).json({ message: "User successfully created!" })
    // }).catch((error) => {
    //     return response.status(500).json({ error: "Unable to add user to database! Error = ", error })
    // });