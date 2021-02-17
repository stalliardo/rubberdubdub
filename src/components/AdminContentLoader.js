import React, { Component } from 'react';
import Clips from '../views/Clips';
import Button from './Button';

class AdminContentLoader extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        return (
           <div>
                {this.props.view === "clips" ? <Clips/> : null}
                {this.props.view === "button" ? <Button/> : null}
           </div>
        )
    }
}
export default AdminContentLoader;