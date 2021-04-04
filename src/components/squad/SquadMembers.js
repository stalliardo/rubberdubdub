import React, { Component } from 'react';
import SquadPage from '../../views/SqaudPage';
import Button from '../Button';
import SquadMembersTable from './SquadMembersTable';

class SquadMembers extends Component {

    constructor(props) {
        super(props);

    }

    render() {
        console.log("squad Data from memeber = ", this.props.squadData);

        return (
            <div className="squad-members">
                <h1 className="neon-text small">Squad Members ({this.props.squadData.members.length})</h1>
                <h2>Squad General: <span>{this.props.squadData.general}</span></h2>
                <div className="squad-members-table-container">
                    <SquadMembersTable data={this.props.squadData} isGeneral={this.props.isGeneral} />
                </div>
                {this.props.isGeneral ?
                    <div className="squad-members-add-button">
                        <Button text="Add Members" />
                    </div>
                    : null
                }
            </div>
        )
    }
}

export default SquadMembers;