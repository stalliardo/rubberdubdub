import React, { Component } from 'react';

class SquadDetails extends Component {

    componentDidMount(){
    }

    render(){
        return (
            <div className="squad-details">
                <h1 className="neon-text small">Squad Details</h1>
                <p>Squad General: {this.props.squadData.general}</p>
                <p>Squad members: {this.props.squadData.members.length}</p>
            </div>
        )
    }    
}

export default SquadDetails;
