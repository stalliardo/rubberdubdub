import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import HomePage from './views/HomePage';
import firebase from 'firebase/app';
import NavBar from './components/NavBar';
import './styles/app.scss';
import Login from './views/Login';
import SignUp from './views/SignUp';
import background from './assets/images/test2.jpg';
import TestPage from './views/testpage';

firebase.initializeApp({
    apiKey: "AIzaSyA_Jb4QPVze61ExISOjqVibHKrvYhQ4Ito",
    authDomain: "rubberdubdub-4b15f.firebaseapp.com",
    projectId: "rubberdubdub-4b15f",
    storageBucket: "rubberdubdub-4b15f.appspot.com",
    messagingSenderId: "806656543200",
    appId: "1:806656543200:web:3675b5f2aca960e1738385",
    measurementId: "G-M3XL5YGH56"
})

class App extends Component {
    render() {
        return (
            <div className="main">
                <div className="image-container">
                    <img className="back-image" src={background}></img>
                </div>
                <Router>
                    <NavBar />
                    <div>
                        <div className="outlet-container">
                        <Switch>
                                <Route exact path="/" component={HomePage} />
                                <Route exact path="/login" component={Login} />
                                <Route exact path="/signup" component={SignUp} />
                                <Route exact path="/test" component={TestPage} />
                        </Switch>
                        </div>
                    </div>
                </Router>
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById("root"));