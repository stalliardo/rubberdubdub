import React, { Component } from 'react';
import SquadPage from '../../views/SqaudPage';

class SquadMembers extends Component {

    constructor(props){
        super(props);

    }

    render(){
        console.log("squad Data from memeber = ", this.props.squadData);

        return (
            <div className="squad-members">
                <h1 className="neon-text small">Squad Members</h1>
            </div>
        )
    }    
}

export default SquadMembers;