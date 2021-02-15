import React, { Component } from 'react';
import firebase from 'firebase/app';
import "firebase/auth";
import "../styles/views/input.scss";
import "../styles/views/form.scss";
import "../styles/testpage.scss";
import Spinner from '../components/Spinner';

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
           <div className="testpage">
               
           </div>
        )
    }
}

export default TestPage;