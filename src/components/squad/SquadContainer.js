import React, { Component } from 'react';
import SquadPage from '../../views/SqaudPage';
import LeaderBoard from './LeaderBoard';
import SquadDetails from './SquadDetails';
import SquadMembers from './SquadMembers';
import SquadTeams from './SquadTeams';
import TournamentInformation from './TournamentInfomation';

class SquadContainer extends Component {
    render() {
        return (
            <div className="squad-page-members-area neon-borders">
                <h1 className="neon-text">{this.props.userData.memberOfSquad}</h1>
                <SquadDetails />
                <SquadMembers />
                <TournamentInformation />
                <SquadTeams />
                <LeaderBoard />
            </div>
        )
    }
}

export default SquadContainer;