import React, { Component } from 'react';

export default class Prueba extends Component {
    state = { hola: 'buenas tardes'};

    render() {
        return (<h1>{this.state.hola}</h1>);
    }
}