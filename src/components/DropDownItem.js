import React, { Component } from 'react';
import '../styles/components/drop-down-menu.scss';


class DropDownItem extends Component {
    constructor(props) {
        super(props);
    }

    onItemSelected = (item) => {
        this.props.itemSelected(item)
    }

    render() {  
        return (
            <div className="drop-down-item" onClick={this.onItemSelected.bind(this, this.props.data)}>
                <span>{this.props.data[this.props.textKey]}</span>
            </div>
        )
    }
}
export default DropDownItem;
