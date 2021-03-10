import axios from 'axios';
import React, { Component, useCallback } from 'react';
import Button from '../Button';
import DropDownMenu from '../DropDownMenu';
import SelectMenu from '../SelectMenu';
import _ from 'lodash';
import Spinner from '../Spinner';

class CreateSquadForm extends Component {

    constructor(props){
        super(props);

        this.state = {
            soldierData: [],
            isSearching: false,
        }

        this.startSearch = _.debounce(this.startSearch, 2000);
    }

    startSearch(e){
        const searchTerm = e.target.value;

        if(searchTerm.length > 2) {

            this.setState({
                isSearching: true
            })
            // This will then call the backend api "searchSoldiers/searchterm"
            // When a response is returned it will load that data into the dropdownmenu
            axios.get(`/searchSoldiers/${searchTerm}`).then((data) => {
                console.log("soldier data = ", data.data.data);
                this.setState({
                    soldierData: data.data.data
                })
            }).catch((error) => {
                console.log("error getting soldier data. Error: ", error);
            }).finally(() => {
                this.setState({
                    isSearching: false
                })
            })
        } else if(searchTerm.length < 3) {
            this.setState({
                soldierData: [],
                isSearching: false
            })
        }
    }
    
    handleChange = (e) => {
        console.log("change called + e = ", e.target.value);
    }

    onSearchForSoldiers = (e) => {
        this.startSearch(e)
    }

    render() {
        return (
            <div className="create-squad-form">
                <h1>Create Squad</h1>
                <div className="neon-borders">
                <input className="e-input" type="text" name="squadName" placeholder="Squad Name" onChange={this.handleChange}/>
                <input className="e-input with-spinner" type="text" name="soldierSearch" placeholder="Search for soldiers (case sensitive)" onChange={this.onSearchForSoldiers}/>
                <DropDownMenu 
                    data={this.state.soldierData} 
                    textKey="activisionAccount"
                    isLoading={this.state.isSearching}
                />
                </div>
            </div>
        )
    }
}

export default CreateSquadForm;