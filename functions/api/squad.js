const { admin, db } = require("../util/admin");

exports.getAllSoldiers = (request, response) => {
    db.collection("users").where("activisionAccount", "!=", null).get().then((querySnapshot) => {
        const soldiers = [];
        querySnapshot.forEach((doc) => {
            soldiers.push(doc.data())
        });
        return response.status(200).json({ data: soldiers })
    }).catch((error) => {
        return response.status(500).json({ error })
    })
}

exports.searchForSoldiers = (request, response) => {
    const searchParam = request.params.search;
    db.collection("users").orderBy("activisionAccount").startAt(searchParam).endAt(searchParam + "\uf8ff")
        .get().then((querySnapshot) => {
            const soldiers = [];
            let soldierData = {};

            querySnapshot.forEach((doc) => {
                if (!doc.data().memberOfSquad) {
                    soldierData = doc.data();
                    soldierData.id = doc.id;
                    soldiers.push(soldierData)
                }
            });
            return response.status(200).json({ data: soldiers })
        }).catch((error) => {
            return response.status(500).json({ error })
        })
}

exports.createSquad = (request, response) => {
    const squadRef = db.collection("squad").doc(request.body.squadName);
    squadRef.get().then((doc) => {
        if (doc.exists) {
            return response.status(400).json({ error: "Squad name already in use!" })
        } else {
            const members = request.body.members;
            return squadRef.set({ members, general: request.body.generalsName });
        }
    }).then(() => {
        const batch = db.batch();
        request.body.members.forEach((member) => {
            batch.update(db.collection("users").doc(member), { memberOfSquad: request.body.squadName });
        });
        batch.update(db.collection("users").doc(request.body.creatorId), { isGeneral: true, memberOfSquad: request.body.squadName });
        return batch.commit();
    }).then(() => {
        return response.status(200).json({ message: "Squad successfully created!" });
    }).catch((error) => {
        return response.status(500).json({ error })
    })
}

function getSquadMembers(userIds) {
    const refs = userIds.map(id => db.collection("users").doc(id));
    return db.getAll(...refs);
}

exports.getSquad = (request, response) => {
    let general;

    db.collection("squad").doc(request.params.squadName).get().then((doc) => {
        if (doc.exists) {
            general = doc.data().general;
            return getSquadMembers(doc.data().members);
        } else {
            return response.status(400).json({ message: "Squad not found" });
        }
    }).then((memberData) => {
        let data = {
            members: []
        };
        memberData.forEach((member) => {
            data.members.push({ ...member.data(), id: member.id });
        });
        data.general = general;
        return response.status(200).json(data)
    }).catch((error) => {
        return response.status(500).json({ error })
    })
}