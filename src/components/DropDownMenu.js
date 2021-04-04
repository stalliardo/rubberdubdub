import React, { Component } from 'react';
import '../styles/components/drop-down-menu.scss';
import DropDownItem from './DropDownItem';
import Spinner from './Spinner';

class DropDownMenu extends Component {
    constructor(props) {
        super(props);
    }

    onItemSelected = (item) => {
        this.props.itemSelected(item)
    }

    render() {
        return (
            <div className={`drop-down-menu-container ${this.props.data.length ? "open" : "closed"} ${this.props.isLoading ? "is-loading" : null}`}>
                {
                    this.props.isLoading ? <Spinner height="20px" width="20px" /> : null
                }

                {
                    !this.props.isLoading ? <div>
                        {
                            this.props.data.map((item, index) => {
                                return <DropDownItem key={index} data={item} textKey={this.props.textKey} itemSelected={this.onItemSelected}/>
                            })
                        }
                    </div> : null
                }
            </div>
        )

    }
}
export default DropDownMenu;


// TODO -> Debounce the search func
// Extend the input by adding a spinner to it