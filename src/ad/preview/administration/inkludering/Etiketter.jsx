import React from 'react';
import PropTypes from 'prop-types';
import { Element } from 'nav-frontend-typografi';
import { EtikettInfo } from 'nav-frontend-etiketter';

const Etiketter = ({ tittel, tags }) => (
    <div className="Administration__preview-panel Inkludering__preview">
        <Element>{tittel}</Element>
        {tags.map(({ tag, navn }) => (
            <EtikettInfo key={tag} type="info" className="preview__tagname">
                {navn}
            </EtikettInfo>
        ))}
    </div>
);

Etiketter.propTypes = {
    tags: PropTypes.arrayOf(
        PropTypes.shape({
            tag: PropTypes.string.isRequired,
            navn: PropTypes.string.isRequired,
        })
    ),
};

export default Etiketter;
