import React, { Component } from 'react';
import firebase from 'firebase/app';
import "firebase/auth";
import "../styles/views/homepage.scss";

class HomePage extends Component {
    constructor(props){
        super(props);
    }

    componentDidMount = () => {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                // console.log("User = ", user);
                // Set the emial in the navbar err gonna be tricky but could use this stateOb in the nav comp
            }
        });
    }

    testFirebase = () => {
       console.log("test called auth test = ", firebase.auth().createUserWithEmailAndPassword());
    }

    render(){
        
        return (
            <div>
                <h1>This is the home page</h1>
                {/* <button onClick={this.testFirebase}>Test Firebase</button> */}
            </div>
        )
    }
}

export default HomePage;