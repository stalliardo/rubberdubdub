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
                // TODO -> This is a git test
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