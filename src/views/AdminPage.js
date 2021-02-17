import React, { Component } from 'react';
import firebase from 'firebase/app';
import "firebase/auth";
import "../styles/views/admin.scss";
import "../styles/views/fonts.scss";
import "../styles/views/form.scss";

import AdminContentLoader from '../components/AdminContentLoader';

class AdminPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            view: "Clips"
        }
    }

    componentDidMount = () => {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                // TODO -> This is a git test
            }
        });
    }

    setView = (e) => {
        this.setState({
            view: e
        })
    }

    render() {
        return (
            <div className="admin-page">
                <div className="neon-borders">
                    <h1 className="neon-text">Admin Page</h1>
                    <div className="admin-content">
                        <div className="admin-left-nav">
                            <ul>
                                <li className="neon-text" onClick={this.setView.bind(this, "clips")}>
                                    Clips
                                </li>
                                <li className="neon-text">
                                    Account
                                </li>
                                <li className="neon-text" onClick={this.setView.bind(this, "button")}>
                                    Button
                                </li>
                            </ul>
                        </div>
                        <div className="admin-outlet-container">
                            <AdminContentLoader view={this.state.view}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default AdminPage;