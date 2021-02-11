const { request } = require("express");
const { admin } = require("./admin");

module.exports = (request, response, next) => {
    console.log("request.body.token from auth = ", request.body.token);
    request.uid = "some uid geneerated"
    console.log("\n\nrequest.uid = ", request.uid);

    if(!request.body.token) {
        return response.status(403).json({error: "Unauthorized"})
    }

    // else pass token through validateToken
    console.log("Running validationChecks");

    admin.auth().verifyIdToken(request.body.token).then((decodedToken) => {
        request.body.user = decodedToken;
        return next();
    }).catch((error) => {
        console.log("Error while retreiving token. ", error);
        return response.status(403).json(error)
    })
}