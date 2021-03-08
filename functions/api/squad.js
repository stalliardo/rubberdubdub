const { admin, db } = require("../util/admin");

exports.getAllSoldiers = (request, response) => {
    db.collection("users").where("activisionAccount", "!=", null).get().then((querySnapshot) => {
        const soldiers = [];
        querySnapshot.forEach((doc) => {
            soldiers.push(doc.data())
        });
        return response.status(200).json({data: soldiers})
    }).catch((error) => {
        return response.status(500).json({error})
    })
}

exports.searchForSoldiers = (request, response) => {
    const searchParam = request.params.search;
    db.collection("users").orderBy("activisionAccount").startAt(searchParam).endAt(searchParam + "\uf8ff")
    .get().then((querySnapshot) => {
        const soldiers = [];
        querySnapshot.forEach((doc) => {
            soldiers.push(doc.data())
        });
        return response.status(200).json({data: soldiers})
    }).catch((error) => {
        return response.status(500).json({error})
    })
}
