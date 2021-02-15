import React, { Component } from 'react';
import '../styles/components/navbar.scss';
import dubpic from '../assets/images/dubpic.png';
import { NavLink, withRouter } from "react-router-dom";
import firebase from 'firebase/app';
import "firebase/auth";

class NavBar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            isAuthenticated: false
        }
    }

    componentDidMount = () => {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                console.log("Nav User = ", user);
                this.setState({ 
                    email: user.email,
                    isAuthenticated: true
                 })
            } else {
                this.setState({
                    email: "",
                    isAuthenticated: false
                })
            }
        });
    }

    goToHomePage = () => {
        this.props.history.push("/");
    }

    onSignOut = () => {
        firebase.auth().signOut().then(() => {
            // TEST -> Make sure the users data is cleared etc
            // Sign-out successful.
          }).catch((error) => {
            // An error happened.
          });
    }

    render() {
        return (
            <div className="navbar">
                <img src={dubpic} onClick={this.goToHomePage}></img>
                <div className="nav-links">
                    <span className="nav-identifier">{this.state.email}</span>
                    {!this.state.isAuthenticated ? <NavLink to="/login" activeClassName="selected-nav">Log in</NavLink> : null}
                    {!this.state.isAuthenticated ? <NavLink to="/signup" activeClassName="selected-nav">Sign Up</NavLink> : null}
                    <span onClick={this.onSignOut}>{this.state.isAuthenticated ? "Log out" : ""}</span>

                </div>
            </div>
        )
    }
}

const NavbarWithRouter = withRouter(NavBar);
export default NavbarWithRouter;