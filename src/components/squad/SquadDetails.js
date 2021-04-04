import React, { Component } from 'react';
import Button from '../Button';

class SquadDetails extends Component {

    componentDidMount() {
    }

    render() {
        return (
            <div className="squad-details">
                <h1 className="neon-text squad-name">{this.props.userData.memberOfSquad}</h1>
                <div className="squad-leave-button">
                    <Button text="Leave Squad" class="danger" />
                </div>
            </div>
        )
    }
}

export default SquadDetails;
