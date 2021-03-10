import axios from 'axios';
import React, { Component, useCallback } from 'react';
import Button from '../Button';
import DropDownMenu from '../DropDownMenu';
import SelectMenu from '../SelectMenu';
import _ from 'lodash';
import Spinner from '../Spinner';

class CreateSquadForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            soldierData: [],
            isSearching: false,
            saveButtonDisabled: true,
            selectedSoldiers: []
        }

        this.startSearch = _.debounce(this.startSearch, 1000);
    }

    startSearch(e) {
        const searchTerm = e.target.value;

        if (searchTerm.length > 2) {

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
        } else if (searchTerm.length < 3) {
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
        this.startSearch(e);
    }

    soliderSelected = (solider) => {
        console.log("soldier passed to the createSquadForm = ", solider);

        // Will this require shallow copying bullshit?????
        const selectedSoldiers = [...this.state.selectedSoldiers];
        selectedSoldiers.push(solider);


        this.setState({
            soldierData: [],
            selectedSoldiers
        })

        const searchBox = document.getElementById("soldierSearchBox");
        searchBox.value = "";
    }


    onCancelClicked = () => {
        this.props.onCancel()
    }

    onSaveClicked = () => {
        console.log("save clicked");
    }

    onDeselectSoldier = (soldier) => {
        const selectedSoldiers = [...this.state.selectedSoldiers];
        const newArray = selectedSoldiers.filter((i) => i.activisionAccount !== soldier.activisionAccount);
        this.setState({
            selectedSoldiers: newArray
        })
    }

    render() {
        return (
            <div className="create-squad-form">
                <h1>Create Squad</h1>
                <div className="neon-borders">
                    <input className="e-input" type="text" name="squadName" placeholder="Squad Name" onChange={this.handleChange} />
                    <input className="e-input with-spinner" id="soldierSearchBox" type="text" name="soldierSearch" placeholder="Search for soldiers (case sensitive)" onChange={this.onSearchForSoldiers} />
                    <DropDownMenu
                        data={this.state.soldierData}
                        textKey="activisionAccount"
                        isLoading={this.state.isSearching}
                        itemSelected={this.soliderSelected}
                    />

                    {
                        this.state.selectedSoldiers.length ?
                            <ul>
                                {
                                    this.state.selectedSoldiers.map((soldier, index) => {
                                        return <li key={index + soldier}>{soldier.activisionAccount} <span onClick={this.onDeselectSoldier.bind(this, soldier)}>X</span></li>
                                    })
                                }
                            </ul> : null
                    }

                    <div className="create-squad-buttons">
                        <Button text="Save" disabled={this.state.saveButtonDisabled} clickHandler={this.onSaveClicked} />
                        <Button text="cancel" clickHandler={this.onCancelClicked} />
                    </div>
                </div>
            </div>
        )
    }
}

export default CreateSquadForm;