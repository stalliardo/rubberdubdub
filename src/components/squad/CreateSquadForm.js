import React, { Component } from 'react';
import Button from '../Button';
import SelectMenu from '../SelectMenu';

class CreateSquadForm extends Component {

    handleChange = (e) => {
        console.log("change called + e = ", e.target.value);
    }

    searchForMembers = (e) => {
        // Need to only call the backend then the text is longer than 3 chars
        // need to display the loader at the end of the input
        // The results will then load into a container below the input?
    }

    render() {
        return (
            <div className="create-squad-form">
                <h1>Create Squad</h1>
                <div className="neon-borders">
                <input className="e-input" type="text" name="squadName" placeholder="Squad Name" onChange={this.handleChange}/>
                {/* <input className="e-input" type="text" name="email" placeholder="Search for soldiers" onChange={this.searchForMembers}/> */}
                <SelectMenu title="Add Soldiers"/>
                </div>
            </div>
        )
    }
}

export default CreateSquadForm;