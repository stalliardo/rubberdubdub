import React, { Component } from 'react';
import '../styles/components/twitch-container.scss';
// import Spinner from './Spinner';
import ReactPlayer from "react-player"


class TwitchContainer extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        var video = document.querySelector('video');
        console.log("video = ", video);
    }


    videoStarted = () => {
        console.log("Video started called");
    }

    render() {
        const videoUrl = 916261897; // TODO -> This will need to be set when the user clicks on one of the thunbnails or set by default
        return (
            <div className="twitch-container">
                <div className="twitch-scroller">
                    <div className="twitch-video queued small">
                        <img src="https://static-cdn.jtvnw.net/cf_vods/d3c27h4odz752x/e2b4c0f60e7cc27046d1_danrob911_41124685996_1613477032//thumb/thumb0-160x90.jpg" />
                    </div>
                    <div className="twitch-video queued medium">
                        <img src="https://static-cdn.jtvnw.net/cf_vods/d2nvs31859zcd8/6b7e0ce597266c0f0744_danrob911_40531102477_1612985446//thumb/thumb0-240x135.jpg" />
                    </div>
                    <div className="twitch-video playing">
                        {/* <ReactPlayer
                            url={`https://www.twitch.tv/videos/${videoUrl}`}
                            onPlay={this.videoStarted}
                            width="480px"
                            height="270px"
                            muted={false}
                            playing={false}
                            controls={true}
                            style={{
                                // backgroundColor: "red"
                            }}
                            config={{
                                twitch: {
                                    options: {
                                        allowfullscreen: true
                                    }
                                }
                            }}
                        /> */}
                        <iframe
                            src="https://clips.twitch.tv/embed?clip=ComfortableOddChipmunkBatChest&parent=localhost"
                            height="360"
                            width="640"
                            allowFullScreen={true}>
                        </iframe>

                    </div>
                    <div className="twitch-video queued medium">
                        <img src="https://static-cdn.jtvnw.net/cf_vods/d3c27h4odz752x/90c4ebf45046a4d16c4a_danrob911_41043544780_1612817006//thumb/thumb0-240x135.jpg" />
                    </div>
                    <div className="twitch-video queued small">
                        <img src="https://static-cdn.jtvnw.net/cf_vods/d3c27h4odz752x/88a70d5529780a0c17ae_danrob911_40989853612_1612467080//thumb/thumb0-160x90.jpg" />
                    </div>
                </div>
                <div className="twitch-thumbnail-container">
                    <div className="twitch-thumbnail">
                        {/* <img src="https://static-cdn.jtvnw.net/cf_vods/d3c27h4odz752x/e2b4c0f60e7cc27046d1_danrob911_41124685996_1613477032//thumb/thumb0-200x200.jpg" /> */}
                    </div>
                </div>

                {/* <img src="https://clips-media-assets2.twitch.tv/vod-890264918-offset-18-preview-480x272.jpg"/> */}
            </div>
        )
    }
}
export default TwitchContainer;


// TODO -> Remove...
// 3m0xbu8of3bx3bvh4jes85a06tfrwt

{/* <img src="https://static-cdn.jtvnw.net/cf_vods/d3c27h4odz752x/e2b4c0f60e7cc27046d1_danrob911_41124685996_1613477032//thumb/thumb0-200x200.jpg"/> */ }
// The above image source is hard coded and will need to be obtained in an other way

// App access tokens are meant only for server-to-server API requests and should never be included in client code.
