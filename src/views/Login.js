import React, { Component } from 'react';
import '../styles/views/login.scss';

class Login extends Component {
    constructor(props){
        super(props);

        this.state = {
            email: "",
            password: "",
            // TODO -> ...
        }
    }


    render(){
        return(
            <div>Log in form</div>
        )
    }
}

export default Login;