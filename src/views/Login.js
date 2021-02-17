import React, { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import axios from 'axios';
import { validEmail } from '../util/validators.js';
import '../styles/views/signup.scss';
import "../styles/views/input.scss";
import "../styles/views/form.scss";
import "../styles/views/fonts.scss";
import Button from '../components/Button';


class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {

            email: "",
            password: "",
            formIsValid: false,
            isLoading: false,
            submitButtonDisabled: true,
            errorText: ""
        }
    }

    setSubmitButtonDisabledState = () => {
        const isEmailValid = validEmail(this.state.email);
        const formIsValid = isEmailValid && this.state.password.length > 5;

        this.setState({
            submitButtonDisabled: !formIsValid
        });
    };

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        }, () => {
            this.setSubmitButtonDisabledState()
        });
    };

    onCancel = () => {
        this.props.history.push("/");
    }

    errorTextHandler = (error) => {
        let errorMessage = "";

        if (error.message) {
            if(error.code === "auth/wrong-password" || error.code === "auth/user-not-found") {
                errorMessage = "Wrong credentials! Please try again."
            }
            
        } else {
            errorMessage = "Something went wrong! Please try again."
        }
        this.setState({
            errorText: errorMessage
        });
    };

    onSubmit = (e) => {
        e.preventDefault()

        this.setState({
            isLoading: true
        });

        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then(() => {
            this.props.history.push("/");
        }).catch((error) => {
            console.log("an error occured while creating the new user. Error = ", error);
            this.errorTextHandler(error);
            this.setState({
                isLoading: false
            });
        });
    }

    onGoogleSignIn = () => {
        this.setState({
            isLoading: true
        });
        // Call this, but no need to call the user API?
        var provider = new firebase.auth.GoogleAuthProvider();

        firebase.auth().signInWithPopup(provider).then(() => {
            // return firebase.auth().currentUser.getIdToken(true);
            this.props.history.push("/");
        }).catch((error) => {
            console.log("An error occured signing in via google. Error = ", error.response);
            this.errorTextHandler(error);
            this.setState({
                isLoading: false
            });
        });
    }

    render() {
        return (
            <div className="auth-form">
                <h2 className="title">Log In</h2>
                <div className="neon-borders">
                    <form onSubmit={(e) => this.onSubmit(e)}>

                        <input className="e-input" type="email" name="email" placeholder="Email Address" onChange={this.handleChange} />
                        <input className="e-input" type="password" name="password" placeholder="Password" onChange={this.handleChange} />
                        {this.state.errorText ? <p className="error-text">{this.state.errorText}</p> : null}
                        <div className="signup-form-button-aligner">
                            <Button text="Submit" type="submit" isLoading={this.state.isLoading} disabled={this.state.submitButtonDisabled} />
                        </div>
                    </form>
                    <div className="signup-form-button-aligner">
                        <Button clickHandler={this.onGoogleSignIn} text="Sign in with Google" />
                    </div>
                    <div className="signup-form-button-aligner">
                        <Button clickHandler={this.onCancel} text="Cancel" />
                    </div>
                </div>
            </div>
        )
    }
}

export default Login;