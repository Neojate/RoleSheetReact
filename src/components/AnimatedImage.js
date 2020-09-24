import React from 'react';

import homeImg from '../img/dragon.jpg';
import characterImg from '../img/character.jpg';

const images = {
    home: homeImg,
    characters: characterImg
}

const AnimatedImage = ({src, text}) => (
    <div className="animated-image">
        <img src={images[src]} />
        <span>{text}</span>
    </div>
);

export default AnimatedImage;
