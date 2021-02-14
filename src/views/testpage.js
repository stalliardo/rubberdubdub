import React, { Component } from 'react';
import firebase from 'firebase/app';
import "firebase/auth";
import "../styles/views/input.scss";

class TestPage extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount = () => {

    }



    render() {

        return (
            <section class="e-input">
                <input type="text" placeholder="What are you looking for?" />
            </section>
        )
    }
}

export default TestPage;