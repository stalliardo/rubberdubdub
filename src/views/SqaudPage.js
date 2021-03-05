import React, { Component } from 'react';
import firebase from 'firebase/app';
import "firebase/auth";
import "../styles/views/squadpage.scss";
import "../styles/views/fonts.scss";
// import "../styles/views/form.scss";

import SquadContainer from '../components/squad/SquadContainer'
import Button from '../components/Button';

class SquadPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            squadMember: false,
            isAuthenticated: false
        }
    }

    componentDidMount = () => {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                // TODO ->  Need to check the users isSquadMember prop

                this.setState({
                    isAuthenticated: true
                })
            } else {
                // set the member prop to false
                this.setState({
                    isAuthenticated: false
                })
            }
        });
    }

    onCreateSquad = () => {
        console.log("on create squad clicked");
    }

    onJoinSquad = () => {
        console.log("on join squad clicked");
    }



    render() {

        if (!this.state.isAuthenticated) {
            return <NonAuthedPrompt />
        } else {
            return (
                <div className="squad-page">

                    {this.state.squadMember ? <SquadContainer /> :
                        <NonSquadPrompt onCreateSquad={this.onCreateSquad} onJoinSquad={this.onJoinSquad}/>
                    }

                </div>
            )
        }



    }
}

export default SquadPage;

function NonSquadPrompt(props) {
    return (
        <div className="non-squad-prompt">
            <p className="squad-prompt">You arn't currently a member of a squad! Please use one of the following options.</p>
            <div className="non-squad-buttons">
                <Button text="Create Squad" clickHandler={props.onCreateSquad}/>
                <Button text="Join Squad" clickHandler={props.onJoinSquad}/>
            </div>
        </div>
    )
}

function NonAuthedPrompt() {
    return (
        <div className="non-authed-prompt">
            <p className="squad-prompt">You have to be signed in to use this part of the site.</p>
        </div>
    )
}