import axios from 'axios';
import React, { Component } from 'react';
import SquadPage from '../../views/SqaudPage';
import Spinner from '../Spinner';
import LeaderBoard from './LeaderBoard';
import SquadDetails from './SquadDetails';
import SquadMembers from './SquadMembers';
import SquadTeams from './SquadTeams';
import TournamentInformation from './TournamentInfomation';

class SquadContainer extends Component {
    constructor(props){
        super(props);

        this.state = {
            isInitializing: true
        }

        
    }

    componentDidMount(){ 
        axios.get(`/squad/${this.props.userData.memberOfSquad}`).then((squad) => {
            this.setState({
                squadData: squad.data
            })
        }).catch((error) => {
            console.log("Error getting squad. Error = ", error.response);
        }).finally(() => {
            this.setState({
                isInitializing: false
            })
        });
    }

    render() {
        if(this.state.isInitializing) {
            return <Spinner height="100px" width="100px" marginTop="130px" />
        } else {
            return (
                <div className="squad-page-members-area neon-borders">
                    <SquadDetails userData={this.props.userData} squadData={this.state.squadData}/>
                    <div className="members-and-teams">
                        <SquadMembers squadData={this.state.squadData}/>
                        <SquadTeams />
                    </div>
                    <TournamentInformation />
                    <LeaderBoard />
                </div>
            )
        }
    }
}

export default SquadContainer;