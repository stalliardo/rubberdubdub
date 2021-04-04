import React, { Component } from 'react';
import SquadPage from '../../views/SqaudPage';

class SquadMembersTable extends Component {
    render() {
        let tableRows = null;

        if (this.props.data) {

            tableRows = this.props.data.members.map((data, index) => {
                return (
                    <tr key={index}>
                        <td>
                            {data.activisionAccount}
                        </td>
                        <td>
                            {data.firstname}
                        </td>
                        {
                            this.props.isGeneral ?
                                <td id="table-actions">
                                    <span>Remove User</span>
                                    <span>Promote User</span>
                                </td>
                                : null
                        }

                    </tr>

                );
            })

        }
        return (
            <table id="squadMembers">
                <thead>
                    <tr>
                        <td>Activison Account</td>
                        <td>First Name</td>
                        {this.props.isGeneral ? <td>Actions</td> : null}
                    </tr>
                </thead>
                <tbody>
                    {tableRows}
                </tbody>
            </table>
        )
    }
}

export default SquadMembersTable;


// Row contents
    // isGeneral view:
        // Remove button
        // promote button
