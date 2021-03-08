import axios from 'axios';
import React, { Component } from 'react';
import Button from '../Button';
import DropDownMenu from '../DropDownMenu';
import SelectMenu from '../SelectMenu';

class CreateSquadForm extends Component {

    constructor(props){
        super(props);

        this.state = {
            soldierData: []
        }
    }

    handleChange = (e) => {
        console.log("change called + e = ", e.target.value);
    }

    searchForSoldiers = (e) => {
        // Need to only call the backend then the text is longer than 3 chars
        // need to display the loader at the end of the input
        // The results will then load into a container below the input?
        const searchTerm = e.target.value;

        if(searchTerm.length > 2) {
            console.log("searching....");

            // This will then call the backend api "searchSoldiers/searchterm"
            // When a response is returned it will load that data into the dropdownmenu
            axios.get(`/searchSoldiers/${searchTerm}`).then((data) => {
                console.log("soldier data = ", data.data.data);
                this.setState({
                    soldierData: data.data.data
                })
            }).catch((error) => {
                console.log("error getting soldier data. Error: ", error);
            })
        } else if(searchTerm.length < 3) {
            this.setState({
                soldierData: []
            })
        }
    }

    render() {
        return (
            <div className="create-squad-form">
                <h1>Create Squad</h1>
                <div className="neon-borders">
                <input className="e-input" type="text" name="squadName" placeholder="Squad Name" onChange={this.handleChange}/>
                <input className="e-input" type="text" name="soldierSearch" placeholder="Search for soldiers (case sensitive)" onChange={this.searchForSoldiers}/>
                <DropDownMenu data={this.state.soldierData} textKey="activisionAccount"/>
                </div>
            </div>
        )
    }
}

export default CreateSquadForm;