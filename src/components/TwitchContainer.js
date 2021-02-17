import React, { Component } from 'react';
import '../styles/components/twitch-container.scss';
// import Spinner from './Spinner';
import ReactPlayer from "react-player"


class TwitchContainer extends Component {
    constructor(props) {
        super(props);
    }


    videoStarted = () => {
        console.log("Video started called");
    }

    render() {

        return (
            <div className="twitch-container">
                <p>Twitch container</p>
                <div className="twitch-scroller">
                    <p>Twitch scroller</p>
                    <div className="twitch-video queued">
                        <ReactPlayer
                            url="https://www.twitch.tv/videos/916261897"
                            width="300px"
                            height="200px"
                            playing={false}
                            controls={false}
                            style={{
                                backgroundColor: "red"
                            }}
                        />
                    </div>
                    <div className="twitch-video playing">
                        <ReactPlayer
                            url="https://www.twitch.tv/videos/916261897"
                            onPlay={this.videoStarted}
                            width="500px"
                            muted={false}
                            playing={true}
                            controls={true}
                            style={{
                                backgroundColor: "red"
                            }}
                            config={{
                                twitch: {
                                    options: {
                                        allowfullscreen: true
                                    }
                                }
                            }}
                        />
                    </div>
                    <div className="twitch-video queued">
                        <ReactPlayer
                            url="https://www.twitch.tv/videos/916261897"
                            width="300px"
                            height="200px"
                            playing={false}
                            controls={false}
                            style={{
                                backgroundColor: "red"
                            }}
                        />
                    </div>
                </div>
                <div className="twitch-thumbnail-container">
                    <p>Twitch thumbs</p>
                    <div className="twitch-thumbnail">

                    </div>
                </div>
            </div>
        )
    }
}
export default TwitchContainer;