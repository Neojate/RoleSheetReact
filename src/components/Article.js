import React from 'react';
import { FormattedMessage } from 'react-intl';

const Article = ({ children, subtitle, text, title }) => (
    <div className="article">
        <div className="article-title">
            <FormattedMessage id={title} tagName="h1" />
            {subtitle && <FormattedMessage id={subtitle} tagName="h4" />}
        </div>
        <p><FormattedMessage id={text} /></p>
        <div>
            {children}
        </div>
    </div>
);

export default Article;