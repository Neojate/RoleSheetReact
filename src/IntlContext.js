import React from "react";
import { IntlProvider, addLocaleData } from "react-intl";

import enMsgs from './lang/en-US.json';
import esMsgs from './lang/es-ES.json';


const Context = React.createContext();

const languages = {
    en: enMsgs,
    es: esMsgs
}

class IntlProviderWrapper extends React.Component {
    constructor(...args) {
        super(...args);

        this.switchToEnglish = () =>
            this.setState({ locale: "en", messages: enMsgs });

        this.switchToSpanish = () =>
            this.setState({ locale: "es", messages: esMsgs });

        this.switchLanguage = (e) => {
            const lang = e.target.value;
            this.setState({ locale: lang, messages: languages[lang]});
        };

        // pass everything in state to avoid creating object inside render method (like explained in the documentation)
        this.state = {
            locale: "es",
            messages: esMsgs,
            switchToEnglish: this.switchToEnglish,
            switchToSpanish: this.switchToSpanish,
            switchLanguage: this.switchLanguage
        };
    }

    render() {
        const { children } = this.props;
        const { locale, messages } = this.state;
        return (
            <Context.Provider value={this.state}>
                <IntlProvider
                    key={locale}
                    messages={messages}
                    defaultLocale="es">
                    {children}
                </IntlProvider>
            </Context.Provider>
        );
    }
}

export { IntlProviderWrapper, Context as IntlContext };