import React, { Component } from 'react';
import firebase from 'firebase/app';
import "firebase/auth";
import "../styles/views/input.scss";
import "../styles/views/form.scss";

class TestPage extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount = () => {

    }



    render() {

        return (
            <div className="form-container">
                <div className="glow-form">
                    <input className="e-input" placeholder="This is a test"/>
                </div>
            </div>
        )
    }
}

export default TestPage;