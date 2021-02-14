import React, { Component } from 'react';
import firebase from 'firebase/app';
import "firebase/auth";
import "../styles/views/input.scss";
import "../styles/views/form.scss";
import Button from '../styles/components/Button';

class TestPage extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount = () => {

    }

    buttonClicked = () => {
        console.log("button clicked");
    }

    render() {

        return (
            <div className="neon-borders">

                <div className="wrapper wrapper-rounded">
                   <input type="text" placeholder="This is a test input"/>
                </div>

            </div>
        )
    }
}

export default TestPage;