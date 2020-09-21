import React, { Component } from 'react';
import logo from '../img/loading.svg';

const Loading = () => (
    <div className="text-center">
        <img src={logo} />
        <h4>Loading</h4>
    </div>
);

export default Loading;