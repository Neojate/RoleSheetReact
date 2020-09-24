import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { IntlContext } from '../IntlContext';

const LanguageSwitch = () => {
    const { locale, switchLanguage, switchToEnglish, switchToSpanish } = React.useContext(IntlContext);
    console.log(locale);
    return (
        <div>
            <select onChange={switchLanguage}>
                <option
                    selected={'es' === locale}
                    value="es">
                    Spanish
                </option>
                <option
                    selected={'en' === locale}
                    value="en">
                    English
                </option>
            </select>
        </div>
    );
};

export default LanguageSwitch;
