import React, { Component } from 'react';
import '../../styles/components/button.scss';

class Button extends Component {
    constructor(props) {
        super(props);


    }

    render() {
        return (
            // <button onClick={this.props.clickHandler}>{this.props.text}</button>

            <button className="glow-on-hover" type="button">{this.props.text}</button>
        )
    }
}
export default Button;