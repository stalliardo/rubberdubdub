import React, { Component } from 'react';

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
                <input className="e-input" type="text" name="teamName" placeholder="Team Name" onChange={this.handleChange}/>
                <input className="e-input" type="text" name="email" placeholder="Search for soldiers" onChange={this.searchForMembers}/>
                </div>
            </div>
        )
    }
}

export default CreateSquadForm;