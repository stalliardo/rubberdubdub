import React, { Component } from 'react';
import '../styles/components/button.scss';
import Spinner from './Spinner';

class Button extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        if (this.props.type === "submit") {
            // Return a form button
            return (
                <button 
                    className="e-button" 
                    type="button" 
                    type={this.props.type} 
                    disabled={this.props.disabled}
                >
                    {this.props.isLoading ? <Spinner height="20px" width="20px"/> : this.props.text}
                </button>

            )
        } else {
            return (
                <button className="e-button" type="button" disabled={this.props.disabled} onClick={this.props.clickHandler}>{this.props.text}</button>
            )
        }
    }
}
export default Button;


// When the button is clicked it shows the glow continuosly, this is not desired behaviour, just enable that on hover - DONE
// Disabled should disbale the glow effect or have a red glow???? - DONE
// Text colour - DONE?