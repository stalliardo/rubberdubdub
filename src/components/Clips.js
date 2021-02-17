import React, { Component } from 'react';
import firebase from 'firebase/app';
import axios from 'axios';
import Spinner from './Spinner';
import "../styles/components/clips.scss";


class Clips extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            clipThumbnails: []
        }
    }

    componentDidMount = () => {
        // Get the clips by calling the GET /clips api
        this.setState({
            isLoading: true
        })
        axios.get("/clips").then((thumbnails) => {
            console.log("clips from axios = ", thumbnails);
            this.setState({
                clipThumbnails: thumbnails.data
            })
        }).finally(() => {
            this.setState({
                isLoading: false
            })
        })
    }

   

    render() {

        return (
           <div className="clips-page">
               {/* <h1>Clips page</h1> */}

               {this.state.isLoading ? <Spinner height="100px" width="100px" marginTop="200px"/> : <ClipDisplay thumbnails={this.state.clipThumbnails}/>}
           </div>
        )
    }
}

export default Clips;


function ClipDisplay(props){
    // This will display the clip thumbnails
    // Will loop over the thumbnails array and for each display an image with click handler
    return (
        <div className="clip-container">
            {props.thumbnails.map((name, index) => {
                return <img src={name} key={index}/>
            })}
        </div>
    )
}