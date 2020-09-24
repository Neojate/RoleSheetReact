import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { LoginButton } from '../auth/LoginButton';
import AnimatedImage from '../components/AnimatedImage';
import Article from '../components/Article';
import LanguageSwitch from '../components/LanguageSwitch';

export default class Home extends Component {

    render() {
        return (
            <div className="home">
                <AnimatedImage src="home" text="RoleSheet" />
                <Article
                    subtitle="home.subtitle"
                    text="home.text"
                    title="home.title">
                        <div className="text-center"><LoginButton/></div>
                </Article>
                <Article
                    subtitle="workshop"
                    text="workshop"
                    title="work"/>
                <LanguageSwitch />
            </div>
        );
    }

}