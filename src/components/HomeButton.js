import React from 'react';
import { Link } from 'react-router-dom';

const HomeButton = () => (
    <Link
        className="btn btn-primary"
        to="/">
        Home
    </Link>
);

export default HomeButton;