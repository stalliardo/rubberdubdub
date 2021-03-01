import React, { Component } from 'react';
import '../styles/components/spinner.scss';

class Spinner extends Component {

    constructor(props){
        super(props);
    }
    
    render() {
        return (
            <div className="sk-fading-circle" style={{height: this.props.height, width: this.props.width, marginTop: this.props.marginTop}}>
                <div className="sk-circle1 sk-circle"></div>
                <div className="sk-circle2 sk-circle"></div>
                <div className="sk-circle3 sk-circle"></div>
                <div className="sk-circle4 sk-circle"></div>
                <div className="sk-circle5 sk-circle"></div>
                <div className="sk-circle6 sk-circle"></div>
                <div className="sk-circle7 sk-circle"></div>
                <div className="sk-circle8 sk-circle"></div>
                <div className="sk-circle9 sk-circle"></div>
                <div className="sk-circle10 sk-circle"></div>
                <div className="sk-circle11 sk-circle"></div>
                <div className="sk-circle12 sk-circle"></div>
            </div>
        )
    }
}

export default Spinner;