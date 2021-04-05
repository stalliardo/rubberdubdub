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
            data: [],
            isSearchingForMembers: false,
            showAddMemberPrompt: false,
            member: null
        }

    }

    startSearch = (e) => {
        const searchTerm = e.target.value;

        if (searchTerm.length > 2) {

            this.setState({
                isSearchingForMembers: true
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
                    isSearchingForMembers: false
                })
            })
        } else if (searchTerm.length < 3) {
            this.setState({
                data: [],
                isSearchingForMembers: false
            })
        }
    }

    memberSelected = (member) => {
        console.log("member selected = ", member);
        this.setState({
            data: [],
            showAddMemberPrompt: true,
            member
        })
    }

    addMemberConfirmed = () => {
        console.log("Addmember confirmed");
        // TODO -> Close the modal on confirm and call the callback
    }

    onCancel = () => {
        // TODO -> close the modal via a callback
    }

    render() {
        return (
            <div className="modal find-soldiers">
                <h1>Find soliders</h1>
                {
                    !this.state.showAddMemberPrompt ? <SearchUI context={this} /> : <AddMemberPrompt context={this}/>
                }
            </div>
        )
    }
}

export default FindSoldiersModal;

function SearchUI(props) {
    return (
        <div>
            <label>Only soldiers that are NOT in a squad will be found</label>
            <div id="find-solider-input">
                <input className="e-input with-spinner" id="soldierSearchBox" type="text" name="soldierSearch" placeholder="Optional - Search for soldiers (case sensitive)" onChange={props.context.startSearch} />
            </div>
            <DropDownMenu
                data={props.context.state.data}
                textKey="activisionAccount"
                isLoading={props.context.state.isSearchingForMembers}
                itemSelected={props.context.memberSelected}
            />

            <div className="modal-buttons">
                <Button text="Cancel" />
                <Button text="Save?" />
            </div>
        </div>
    )
}

function AddMemberPrompt(props) {
    
    return <div>
        <label>Are you sure you want to add <span id="member-highlight">{props.context.state.member.activisionAccount}</span> to your squad?</label>
       
        <div className="modal-buttons">
            <Button text="Confirm" clickHandler={props.context.addMemberConfirmed}/>
            <Button text="Cancel" clickHandler={props.context.onCancel}/>
        </div>
    </div>
}