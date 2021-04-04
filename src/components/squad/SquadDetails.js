import React, { Component } from 'react';
import Button from '../Button';

class SquadDetails extends Component {

    componentDidMount() {
    }

    render() {
        return (
            <div className="squad-details">
                <h1 className="neon-text squad-name">{this.props.userData.memberOfSquad}</h1>
                {/* <h1 className="neon-text small">Squad Details</h1> */}
                <p>Squad General: {this.props.squadData.general}</p>
                <p>Squad members: {this.props.squadData.members.length}</p>
                <div className="squad-leave-button">
                    <Button text="Leave Squad" class="danger" />
                </div>
            </div>
        )
    }
}

export default SquadDetails;
