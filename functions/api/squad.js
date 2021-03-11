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
            if(!doc.data().memberOfSquad) {
                soldiers.push(doc.data())
            }
        });
        return response.status(200).json({data: soldiers})
    }).catch((error) => {
        return response.status(500).json({error})
    })
}

exports.createSquad = (request, response) => {
    const squadRef = db.collection("squad").doc(request.body.squadName);
    squadRef.get().then((doc) => {
        if(doc.exists) {
            return response.status(400).json({error: "Squad name already in use!"})
        } else {
            return squadRef.set(request.body.members)
        }
    }).then(() => {

        // Squad created...
        // Now update the creators user profile add him to the menbers of prop
        // Update all other members' memberOfSquad props
        // But first check if they are in a squad or not



        return response.status(200).json({message: "Squad successfully created!"});
    }).catch((error) => {
        return response.status(500).json({error})
    })


}
