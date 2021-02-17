import React, { Component } from 'react';
import '../styles/components/twitch-container.scss';
// import Spinner from './Spinner';

class TwitchContainer extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        return (
            <div className="twitch-container">
                <p>Twitch container</p>
                <div className="twitch-scroller">
                    <p>Twitch scroller</p>
                </div>
                <div className="twitch-thumbnails">
                    <p>Twitch thumbs</p>
                </div>
            </div>
        )
    }
}
export default TwitchContainer;