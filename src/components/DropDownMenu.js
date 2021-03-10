import React, { Component } from 'react';
import '../styles/components/drop-down-menu.scss';
import DropDownItem from './DropDownItem';

class DropDownMenu extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={`drop-down-menu-container ${this.props.data.length ? "open" : "closed"}`}>
                 {
                    this.props.data.map((item, index) => {
                        return <DropDownItem key={index} data={item} textKey={this.props.textKey}/>
                    })
                }
            </div>
        )

    }
}
export default DropDownMenu;


// TODO -> Debounce the search func
// Extend the input by adding a spinner to it