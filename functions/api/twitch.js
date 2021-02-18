const { admin, db } = require("../util/admin");
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

    // const thumbnailArray = [];
    const clipData = [];

    axios.get("https://api.twitch.tv/helix/clips?broadcaster_id=407695237&first=50", axiosConfig).then((clips) => {

        // Need to return the clip url and the title also

        clips.data.data.forEach((clip) => {
            // thumbnailArray.push(clip.thumbnail_url);
            clipData.push({
                thumbnailUrl: clip.thumbnail_url,
                clipTitle: clip.title,
                clipUrl: clip.url
            })
        });
        response.status(200).json(clipData);
    }).catch((error) => {
        console.log("error getting the clips. Error = ", error);
        response.status(500).json({ error: "An error occured while getting the clips" })
    })

}

exports.getScrollerClips = (request, response) => {
    // Will need to call the backend and get the admin -> Pyy1WxeqiNyX3ogcWMIq -> main and scrollerUrls docs
    db.doc(`/admin/Pyy1WxeqiNyX3ogcWMIq`).get().then((doc) => {
        console.log("doc  = = ", doc.data());
        response.status(200).json(doc.data())
    }).catch((error) => {
        console.log("There was an error getting the admin doc. Error = ", error);
        response.status(500).json({ error: "An error occured while getting the scroller clips" })

    })
}

exports.setScrollerClips = (request, response) => {
    // DOING
    // Check the request structure?

    // Request.body will need to look lile
    // {
    //     main: "https://clips.twitch.tv/ComfortableOddChipmunkBatChest",
    //         scrollerUrls: [
    //             "https://clips.twitch.tv/ComfortableOddChipmunkBatChest",
    //             "https://clips.twitch.tv/RelentlessAttractiveHamburgerVoHiYo-B4Nl5Hss--FwGoC8",
    //             "https://clips.twitch.tv/VibrantDiligentSquidBatChest-QRQHA7lPKFzGNcoJ",
    //             "https://clips.twitch.tv/TiredBoxyAsteriskDBstyle",
    //             "https://clips.twitch.tv/RelievedThankfulPepperKappaWealth"
    //         ]
    // }

    const document = db.collection("admin").doc("Pyy1WxeqiNyX3ogcWMIq");
    document.update(request.body).then(() => {
        console.log("update Success!");
        response.status(200).json({message: "Scroller urls updated succussfully!"});
    }).catch((error) => {
        console.log("Error updating scrollerUrls. Error = ", error);
        response.status(500).json({error: error.code})
    });
}