import axios from 'axios';
import React, { Component, useCallback } from 'react';
import Button from '../Button';
import DropDownMenu from '../DropDownMenu';
import SelectMenu from '../SelectMenu';
import _ from 'lodash';
import Spinner from '../Spinner';
import firebase from 'firebase/app';
import "firebase/auth";

class CreateSquadForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            soldierData: [],
            squadName: "",
            isSearching: false,
            saveButtonDisabled: true,
            selectedSoldiers: [],
            isSaving: false,
            creatorId: null
        }

        this.startSearch = _.debounce(this.startSearch, 1000);
    }

    componentDidMount = () => {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                // TODO ->  Need to check the users isSquadMember prop
                console.log("User from createSquad is: ", user.uid);
                this.setState({
                    creatorId: user.uid
                })
            } else {
                this.props.onCancel();
            }
        });
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

    setSaveButtonDisabled = (squadName) => {
        this.setState({
            saveButtonDisabled: squadName.length < 4
        });
    }

    onSquadNameChanged = (e) => {
        this.setState({
            squadName: e.target.value
        }, () => {
            this.setSaveButtonDisabled(e.target.value);
        })
    }

    onSearchForSoldiers = (e) => {
        this.startSearch(e);
    }

    soliderSelected = (soldier) => {
        const selectedSoldiers = [...this.state.selectedSoldiers];
        const soliderAlreadySelected = selectedSoldiers.find((i) => i.activisionAccount === soldier.activisionAccount);

        if (!soliderAlreadySelected) {
            selectedSoldiers.push(soldier);
            this.setState({
                soldierData: [],
                selectedSoldiers
            })
        } else {
            this.setState({
                soldierData: [],
            })
        }

        const searchBox = document.getElementById("soldierSearchBox");
        searchBox.value = "";
    }

    onCancelClicked = () => {
        this.props.onCancel();
    }

    onSaveClicked = () => {
        const selectedSoldiers = [...this.state.selectedSoldiers];
        const userId = selectedSoldiers.map((solider) => {
            return solider.id;
        });
        const objectToPost = {
            squadName: this.state.squadName,
            members: userId,
            creatorId: this.state.creatorId
        };

        this.setState({
            isSaving: true
        });

        axios.post("/squad", objectToPost).then((response) => {
            console.log("response from post /squad = ", response);
            // this.setState({
            //     soldierData: []
            // })
            // Completed successfully!
            // TODO -> Now what??? Go to the main squad page
        }).catch((error) => {
            console.log("error from POST /squad = ", error.response);
        }).finally(() => {
            this.setState({
                isSaving: false
            });
        })
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
                    <input className="e-input" type="text" name="squadName" placeholder="Squad Name" onChange={this.onSquadNameChanged} />
                    <label>Only soldiers that are NOT in a squad will be found</label>
                    <input className="e-input with-spinner" id="soldierSearchBox" type="text" name="soldierSearch" placeholder="Optional - Search for soldiers (case sensitive)" onChange={this.onSearchForSoldiers} />
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
                        <Button text="Save" isLoading={this.state.isSaving} disabled={this.state.saveButtonDisabled} clickHandler={this.onSaveClicked} />
                        <Button text="cancel" clickHandler={this.onCancelClicked} />
                    </div>
                </div>
            </div>
        )
    }
}

export default CreateSquadForm;