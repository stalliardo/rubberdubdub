import React, { Component } from 'react';
import firebase from 'firebase/app';
import "firebase/auth";
import "../styles/views/homepage.scss";
import "../styles/views/fonts.scss";
import "../styles/views/form.scss";
import TwitchContainer from '../components/TwitchContainer';

class HomePage extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount = () => {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                // TODO -> This is a git test
            }
        });
    }

    render() {

        return (
            <div className="homepage">
                <h1 className="title">Home Page</h1>
                <div className="neon-borders">
                    <TwitchContainer />
                </div>
            </div>
        )
    }
}

export default HomePage;