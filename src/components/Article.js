import React from 'react';

const Article = ({ title, subtitle, children }) => (
    <div className="article">
        <div className="article-title">
            <h1>{title}</h1>
            {subtitle && <h4>{subtitle}</h4>}
        </div>
        <p className="capital">{children}</p>
    </div>
);

export default Article;