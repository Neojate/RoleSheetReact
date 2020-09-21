import React, { Component } from 'react';

export default class Notes extends Component {
    
    state = { version: '0.1.0' };

    render () {
        return (
            <div>
                <h1>Notas del Parche {this.state.version} </h1>
            </div>
        );
    }

}