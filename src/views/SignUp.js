import React, { Component } from 'react';
import '../styles/views/signup.scss';
import firebase from 'firebase/app';
import 'firebase/auth';
import axios from 'axios';
import { validEmail } from '../util/validators.js';
import "../styles/views/input.scss";
import "../styles/views/form.scss";
import Button from '../components/Button';

class SignUp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            firstname: "",
            lastname: "",
            email: "",
            password: "",
            confirmPassword: "",
            formIsValid: false,
            isSaving: false,
            submitButtonDisabled: true,
            errorText: ""
        }
    };

    setSubmitButtonDisabledState = () => {
        const isEmailValid = validEmail(this.state.email);
        const formIsValid =
            this.state.firstname.length > 1 &&
            this.state.lastname.length > 1 &&
            isEmailValid &&
            this.state.password.length > 5 &&
            this.state.confirmPassword === this.state.password;

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

    errorTextHandler = (error) => {
        let errorMessage = "";

        if(error.message) {
           errorMessage = error.message
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
            isSaving: true
        });

        firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then(() => {
            return firebase.auth().currentUser.getIdToken(true);
        }).then((token) => {
            return axios.post("/signup", {
                token: token,
                userDetails: {
                    firstname: this.state.firstname,
                    lastname: this.state.lastname,
                }
            });
        }).then(() => {
            this.props.history.push("/")
        }).catch((error) => {
            console.log("an error occured while creating the new user. Error = ", error);
            this.errorTextHandler(error);
        }).finally(() => {
            this.setState({
                isSaving: false
            });
        });
    }

    onCancel = () => {
        this.props.history.push("/");
    }

    OnSigninClicked = () => {
        this.props.history.push("/login");
    }

    onGoogleSignup = () => {
        var provider = new firebase.auth.GoogleAuthProvider();

        firebase.auth().signInWithPopup(provider).then(() => {
            return firebase.auth().currentUser.getIdToken(true);
        }).then((token) => {
            return axios.post("/signup", {
                token: token,
                isGoogleAuth: true
            });
        }).then(() => {
            this.props.history.push("/");
        }).catch((error) => {
            console.log("An error occured signing in via google. Error = ", error.response);
            if (error.response.data.error === "Account already exists") {
                this.props.history.push("/");
            } else {
                this.errorTextHandler(error);
            }
        });
    }

    render() {
        return (
            <div className="sign-up-form">
                <h1>Sign up TODO Add glow effect to titles</h1>
                <p>Or <span onClick={this.OnSigninClicked}>Sign in to your account</span></p>
                <div className="neon-borders">
                    <form onSubmit={(e) => this.onSubmit(e)}>
                        <input className="e-input" type="text" name="firstname" placeholder="Firstname" onChange={this.handleChange} />
                        <input className="e-input" type="text" name="lastname" placeholder="Surname" onChange={this.handleChange} />
                        <input className="e-input" type="email" name="email" placeholder="Email Address" onChange={this.handleChange} />
                        <input className="e-input" type="password" name="password" placeholder="Password" onChange={this.handleChange} />
                        <input className="e-input" type="password" name="confirmPassword" placeholder="Confirm Password" onChange={this.handleChange} />
                        {this.state.errorText ? <p className="error-text">{this.state.errorText}</p> : null}
                        <div className="signup-form-button-aligner">
                            <Button text="Submit" type="submit" isLoading={this.state.isSaving} disabled={this.state.submitButtonDisabled} />
                        </div>
                    </form>
                    <div className="signup-form-button-aligner">
                        <Button clickHandler={this.onGoogleSignup} text="Sign up with Google" />
                    </div>
                    <div className="signup-form-button-aligner">
                        <Button clickHandler={this.onCancel} text="Cancel" />
                    </div>
                </div>
            </div>
        )
    }
}

export default SignUp;