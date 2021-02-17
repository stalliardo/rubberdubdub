import React, { Component } from 'react';
import firebase from 'firebase/app';
import axios from 'axios';
import Spinner from '../components/Spinner';


class Clips extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true
        }
    }

    componentDidMount = () => {
        // Get the clips by calling the GET /clips api
        this.setState({
            isLoading: true
        })
        axios.get("/clips").then((clips) => {
            console.log("clips from axios = ", clips);
        }).finally(() => {
            this.setState({
                isLoading: false
            })
        })
    }

   

    render() {

        return (
           <div className="clips-page">
               <h1>Clips page</h1>

               {this.state.isLoading ? <Spinner height="100px" width="100px"/> : "Some text"}
           </div>
        )
    }
}

export default Clips;