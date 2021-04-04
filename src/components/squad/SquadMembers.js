import React, { Component } from 'react';
import SquadPage from '../../views/SqaudPage';
import SquadMembersTable from './SquadMembersTable';

class SquadMembers extends Component {

    constructor(props){
        super(props);

    }

    render(){
        console.log("squad Data from memeber = ", this.props.squadData);

        return (
            <div className="squad-members">
                <h1 className="neon-text small">Squad Members</h1>
                <SquadMembersTable data={this.props.squadData}/>
            </div>
        )
    }    
}

export default SquadMembers;