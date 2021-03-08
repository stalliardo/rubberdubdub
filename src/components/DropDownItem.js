import React, { Component } from 'react';
import '../styles/components/drop-down-menu.scss';


class DropDownItem extends Component {
    constructor(props) {
        super(props);
    }

    render() {  
        return (
            <div className="drop-down-item">
                <span>{this.props.data[this.props.textKey]}</span>
            </div>
        )
    }
}
export default DropDownItem;
