const { admin, db } = require("../util/admin");
// const config = require("../util/config");
// const firebase = require("firebase");
const functions = require("firebase-functions");
const axios = require("axios");
const clientId = "lj9dkyd9oj3qjslm3dp20fytryg94v";

function getScrollerClipsFromFirebase() {
    return db.doc(`/admin/Pyy1WxeqiNyX3ogcWMIq`).get();
}

exports.getClips = (request, response) => {
    const axiosConfig = {
        headers: {
            "Authorization": `Bearer ${functions.config().twitch.token}`,
            "client-id": clientId,
        }
    }
    const clipData = [];
    axios.get("https://api.twitch.tv/helix/clips?broadcaster_id=407695237&first=50", axiosConfig).then((clips) => {

        clips.data.data.forEach((clip) => {
            clipData.push({
                thumbnailUrl: clip.thumbnail_url,
                clipTitle: clip.title,
                clipUrl: clip.url,
                isScrollerClip: false
            })
        });

        return getScrollerClipsFromFirebase();
    }).then((doc) => {
        const clipUrls = doc.data().scrollerUrls;
        const mainScrollerClipUrl = doc.data().main;

        clipUrls.forEach((url) => {
            const scrollerClip = clipData.find(item => item.clipUrl === url)
            if (scrollerClip) {
                scrollerClip.isScrollerClip = true;
            }
        });

        const mainclip = clipData.find(item => item.clipUrl === mainScrollerClipUrl);
        mainclip.isMainScrollerClip = true;
        console.log("main clip = ", mainclip);

        response.status(200).json(clipData);
    }).catch ((error) => {
        console.log("error getting the clips. Error = ", error);
        response.status(500).json({ error: "An error occured while getting the clips" })
    })
}



exports.getScrollerClips = (request, response) => {
    getScrollerClipsFromFirebase().then((doc) => {
        console.log("doc  = = ", doc.data().scrollerUrls);
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
        response.status(200).json({ message: "Scroller urls updated succussfully!" });
    }).catch((error) => {
        console.log("Error updating scrollerUrls. Error = ", error);
        response.status(500).json({ error: error.code })
    });
}