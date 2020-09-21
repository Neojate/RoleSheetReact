import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { LoginButton } from '../auth/LoginButton';
import { LogoutDropDown } from '../auth/LogoutDropDown';

class RenderLi extends Component {
    render() {
        const { children, href } = this.props;
        return (
            <Link className="menu-link" to={href}>
                {children}
            </Link>
        );
    }
}

export default class Menu extends Component {

    render() {

        return (
            <nav className="menu">
                <div className="container top-menu">
                    <RenderLi href="/">Home</RenderLi>
                    <RenderLi href="/sheets">Mis plantillas</RenderLi>
                    <RenderLi href="/workshop">Workshop</RenderLi>
                    <RenderLi href="/parches">Parches</RenderLi>
                    <LoginButton />
                    <LogoutDropDown />
                </div>
            </nav>
        );
    }
}