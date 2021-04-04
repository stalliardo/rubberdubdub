import React, { Component } from 'react';
import firebase from 'firebase/app';
import "firebase/auth";
import "../styles/views/squadpage.scss";
import "../styles/views/fonts.scss";
import "../styles/views/input.scss";

import SquadContainer from '../components/squad/SquadContainer'
import Button from '../components/Button';
import CreateSquadForm from '../components/squad/CreateSquadForm';
import Spinner from '../components/Spinner';
import axios from 'axios';

class SquadPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isAuthenticated: false,
            isLoading: true,
            showPrompts: true,
            showCreateSquadForm: false,
            showJoinSquadForm: false,
            userData: {}
        }
    }

    componentDidMount = () => {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                // TODO ->  Need to check the users memberOfSquad prop and the isGeneral prop
                // console.log("User from squadPage is: ", user.uid);

                // Get the user doc...
                axios.get(`user/${user.uid}`).then((userDoc) => {
                    this.setState({
                        isGeneral: userDoc.data.isGeneral,
                        userData: userDoc.data
                    })
                }).catch((error) => {
                    console.log("Error Getting user in squad page + error = ", error.response);
                }).finally(() => {
                    this.setState({
                        isLoading: false
                    })
                })

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
        this.setState({
            showCreateSquadForm: true,
            showJoinSquadForm: false,
            showPrompts: false
        })
    }

    onJoinSquad = () => {
        this.setState({
            showCreateSquadForm: false,
            showJoinSquadForm: true,
            showPrompts: false
        })
    }

    createSquadCancelled = () => {
        // Cound i have a inline fnction instaed of this....
        // like onCancel = {this.state.}
    }



    render() {

        if (this.state.isLoading) {
            return <Spinner height="100px" width="100px" marginTop="130px" />
        } else {
            if (!this.state.isAuthenticated) {
                return <NonAuthedPrompt />
            } else {
                return (
                    <div className="squad-page">

                        {this.state.userData.memberOfSquad ? <SquadContainer userData={this.state.userData} /> :
                            <div>
                                {this.state.showPrompts ? <NonSquadPrompt onCreateSquad={this.onCreateSquad} onJoinSquad={this.onJoinSquad} /> : null}
                                {this.state.showCreateSquadForm ? <CreateSquadForm onCancel={() => this.setState({ showPrompts: true, showCreateSquadForm: false })} userData={this.state.userData} /> : null}
                                {this.state.showJoinSquadForm ? "join form" : null}
                            </div>
                        }

                    </div>
                )
            }
        }
    }
}

export default SquadPage;

function NonSquadPrompt(props) {
    return (
        <div className="neon-borders">
            <div className="non-squad-prompt">
                <p>You arn't currently a member of a squad! Please use one of the following options.</p>
                <div className="non-squad-buttons">
                    <Button text="Create Squad" clickHandler={props.onCreateSquad} />
                    <Button text="Join Squad" clickHandler={props.onJoinSquad} />
                </div>
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