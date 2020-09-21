import React, { Component } from 'react';
import HomeButton from '../components/HomeButton';

export default class PageNotFound extends Component {

    render () {
        return (
            <div>
                <h1>Error 404</h1>
                <h3>La página no ha sido encontrada</h3>
                <HomeButton />
            </div>
        );
    }

}
