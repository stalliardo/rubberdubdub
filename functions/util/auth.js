const { request } = require("express");
const { admin } = require("./admin");

module.exports = (request, response, next) => {
    request.uid = "some uid geneerated"

    if(!request.body.token) {
        return response.status(403).json({error: "Unauthorized"})
    }

    admin.auth().verifyIdToken(request.body.token).then((decodedToken) => {
        request.body.user = decodedToken;
        return next();
    }).catch((error) => {
        console.log("Error while retreiving token. ", error);
        return response.status(403).json(error)
    })
}