import React, { Component, useContext } from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';

import { LoginButton } from '../auth/LoginButton';
import { LogoutDropDown } from '../auth/LogoutDropDown';

class RenderLi extends Component {
    render() {
        const { href, idLang } = this.props;
        return (
            <Link className="menu-link" to={href}>
                <FormattedMessage id={idLang} />
            </Link>
        );
    }
}

export default class Menu extends Component {

    render() {

        return (
            <nav className="menu">
                <div className="container top-menu">
                    <RenderLi href="/" idLang="menu.home" />
                    <RenderLi href="/characters" idLang="menu.characters"/>
                    <RenderLi href="/workshop" idLang="menu.workshop"/>
                    <RenderLi href="/parches" idLang="menu.notes"/>
                    <LoginButton />
                    <LogoutDropDown />
                </div>
            </nav>
        );
    }
}