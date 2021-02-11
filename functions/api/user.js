const { admin, db } = require("../util/admin");
const config = require("../util/config");
const firebase = require("firebase");
firebase.initializeApp(config);

exports.signUpUser = (request, response) => {
    db.doc(`/users/${request.body.user.uid}`).get().then((doc) => {
        if (doc.exists) {
            return response.status(400).json({ error: 'Account already exists' });
        } else {
            let userCredentials;
            if(request.body.isGoogleAuth) {
                userCredentials = { email: request.body.user.email };
            } else {
                userCredentials = { ...request.body.userDetails, email: request.body.user.email };
            }

            return db.doc(`users/${request.body.user.uid}`).set(userCredentials);
        }
    }).then(() => {
        return response.status(201).json({ message: "User successfully created!" })
    }).catch((error) => {
        return response.status(500).json({ error: "Unable to add user to database! Error = ", error })
    });
}