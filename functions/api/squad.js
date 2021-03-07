const { admin, db } = require("../util/admin");

exports.getAllSoldiers = (request, response) => {
    db.collection("users").where("activisonAccount", "!=", null).get().then((querySnapshot) => {
        const soldiers = [];
        querySnapshot.forEach((doc) => {
            soldiers.push(doc.data())
        });
        return response.status(200).json({data: soldiers})
    }).catch((error) => {
        return response.status(500).json({error})
    })
}
