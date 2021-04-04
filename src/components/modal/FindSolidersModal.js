import React, { Component } from 'react';
import Button from '../Button';
import "../../styles/components/modal.scss";
import "../../styles/views/form.scss";
import DropDownMenu from '../DropDownMenu';
import axios from 'axios';

class FindSoldiersModal extends Component {

    constructor(props) {
        super(props);

        this.state = {
            data: []
        }

    }

    startSearch = (e) => {
        const searchTerm = e.target.value;

        if (searchTerm.length > 2) {

            this.setState({
                isSearching: true
            })
           
            axios.get(`/searchSoldiers/${searchTerm}`).then((data) => {
                console.log("soldier data = ", data.data.data);
                this.setState({
                    data: data.data.data
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
                data: [],
                isSearching: false
            })
        }
    }

    render() {
        return (
            <div className="modal find-soldiers">
                <h1>Find soliders</h1>
                <label>Only soldiers that are NOT in a squad will be found</label>
                <div id="find-solider-input">
                    <input className="e-input with-spinner" id="soldierSearchBox" type="text" name="soldierSearch" placeholder="Optional - Search for soldiers (case sensitive)" onChange={this.startSearch} />
                </div>
                <DropDownMenu
                    data={this.state.data}
                    textKey="activisionAccount"
                    isLoading={this.props.isSearching}
                    itemSelected={this.soliderSelected}
                />

                {/* {
                    this.state.selectedSoldiers.length ?
                        <ul>
                            {
                                this.state.selectedSoldiers.map((soldier, index) => {
                                    return <li key={index + soldier}>{soldier.activisionAccount} <span onClick={this.onDeselectSoldier.bind(this, soldier)}>X</span></li>
                                })
                            }
                        </ul> : null
                } */}

                <div className="modal-buttons">
                    <Button text="Cancel"/>
                    <Button text="Save?"/>
                </div>
            </div>
        )
    }
}

export default FindSoldiersModal;