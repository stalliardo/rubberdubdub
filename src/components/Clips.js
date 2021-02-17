import React, { Component } from 'react';
import firebase from 'firebase/app';
import axios from 'axios';
import Spinner from './Spinner';
import "../styles/components/clips.scss";
import Button from './Button';


class Clips extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            clipThumbnails: [],
            saveButtonDisabled: false
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

    setSaveButtonDisabled = () => {
        // TODO -> Will be based off the selected images count
    }



    render() {

        return (
            <div className="clips-page">
                {!this.state.isLoading ?  <ClipActions saveButtonDisabled={this.state.saveButtonDisabled}/> : null}
                {this.state.isLoading ? <Spinner height="100px" width="100px" marginTop="200px" /> : <ClipDisplay thumbnails={this.state.clipThumbnails} />}
            </div>
        )
    }
}

export default Clips;


function ClipDisplay(props) {
    return (
        <div className="clip-images">
            {props.thumbnails.map((name, index) => {
                return <img src={name} key={index} />
            })}
        </div>
    )
}

function ClipActions(props) {
    return (
      <div className="clip-actions">
          <p>
              Select the five clips that are to be displayed in the homepage scroller.
          </p>
         <div className="clips-button">
            <Button text="Save" disabled={props.saveButtonDisabled}/>
         </div>
      </div>
    )
}