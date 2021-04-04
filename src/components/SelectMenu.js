import React, { Component } from 'react';
import '../styles/components/select-menu.scss';


class SelectMenu extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpen: false
        }
    }

    toggleOpen = () => {
        this.setState({
            isOpen: !this.state.isOpen
        })

        console.log("isOpen = ", this.state.isOpen);
    }

    render() {
        return (
            <div className="select-menu-container">
                <div onClick={this.toggleOpen} className="select-menu-title">
                    <span>{this.props.title}</span>
                    <span className={`arrow ${this.state.isOpen ? "up" : "down"}`}></span>
                </div>
            </div>
        )

    }
}
export default SelectMenu;
