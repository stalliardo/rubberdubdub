import React, { Component } from 'react';
import '../../styles/components/button.scss';

class Button extends Component {
    constructor(props) {
        super(props);


    }

    render() {

        if (this.props.type === "submit") {
            return (
                <button className="glow-on-hover" type="button" disabled={this.props.disabled}>{this.props.text}</button>

            )
        } else {
            return (
                <button className="glow-on-hover" type="button" disabled={this.props.disabled} onClick={this.props.clickHandler}>{this.props.text}</button>
            )
        }
    }
}
export default Button;