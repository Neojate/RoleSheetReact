import React, { Component } from 'react';
import AnimatedImage from '../components/AnimatedImage';

export default class CharactersContainer extends Component {
    render() {
        return (
            <div className="home">
                <AnimatedImage src="characters" text="My characters" />
                <span>Buenas tardes</span>
            </div>
        );
    }
}