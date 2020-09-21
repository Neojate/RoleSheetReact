import React from 'react';

import homeImg from '../img/dragon.jpg';

const images = {
    home: homeImg
}

const AnimatedImage = ({src, text}) => (
    <div className="animated-image">
        <img src={images[src]} />
        <span>{text}</span>
    </div>
);

export default AnimatedImage;
