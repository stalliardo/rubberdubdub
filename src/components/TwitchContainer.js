import React, { Component } from 'react';
import '../styles/components/twitch-container.scss';
import Spinner from './Spinner';
import axios from 'axios';
// import Button from './Button';

class TwitchContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            clipsLoading: true,
            scrollerClips: {},
            clips: []
        }
    }

    shuffleClips = () => {
        setInterval(() => {
            const clips = [...this.state.clips];
            const last = clips.pop()
            clips.unshift(last);
            this.setState({
                clips
            })
        }, 30000);
    }

    componentDidMount = () => {
        this.setState({
            clipsLoading: true
        });

        axios.get('/clips').then((response) => {
            const clips = response.data.filter(clip => clip.isScrollerClip);
            const mainScrollerClip = response.data.find(clip => clip.isMainScrollerClip);

            clips.splice(2, 0, mainScrollerClip);

            this.setState({
                clips
            });

            this.shuffleClips()
        }).catch((error) => {
            console.log("error getting sdcroller clips = ", error);
            // TODO -> If error getting clips set is loading to false and display something else in the container
        }).finally(() => {
            this.setState({
                clipsLoading: false
            })
        })
    }

    render = () => {
        const videoUrl = 916261897; // TODO -> This will need to be set when the user clicks on one of the thunbnails or set by default
        if (this.state.clipsLoading) {
            return (
                <div className="twitch-container">
                    <div className="twitch-scroller">
                        <Spinner height="100px" width="100px" marginTop="130px" />
                    </div>
                </div>
            )
        } else {
            return (
                <div className="twitch-container">
                    <div className="twitch-scroller">
                        <div className="twitch-video queued small">
                            <img src={`${this.state.clips[0].thumbnailUrl}`} height="90" width="160" />
                        </div>
                        <div className="twitch-video queued medium">
                            <img src={`${this.state.clips[1].thumbnailUrl}`} height="135" width="240" />
                        </div>
                        <div className="twitch-video playing">
                           
                            <iframe
                                src={`https://clips.twitch.tv/embed?clip=${this.state.clips[2].clipUrl.split('/')[3]}&parent=localhost&autoplay=true`}
                                height="360"
                                width="640"
                                allowFullScreen={true}
                                >
                            </iframe>

                        </div>
                        <div className="twitch-video queued medium">
                            <img src={`${this.state.clips[3].thumbnailUrl}`} height="135" width="240" />
                        </div>
                        <div className="twitch-video queued small">
                            <img src={`${this.state.clips[4].thumbnailUrl}`} height="90" width="160" />
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
}
export default TwitchContainer;


// TODO -> Remove...
// 3m0xbu8of3bx3bvh4jes85a06tfrwt

{/* <img src="https://static-cdn.jtvnw.net/cf_vods/d3c27h4odz752x/e2b4c0f60e7cc27046d1_danrob911_41124685996_1613477032//thumb/thumb0-200x200.jpg"/> */ }
// The above image source is hard coded and will need to be obtained in an other way

// App access tokens are meant only for server-to-server API requests and should never be included in client code.
