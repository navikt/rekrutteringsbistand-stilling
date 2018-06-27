import React from 'react';
import PropTypes from 'prop-types';
import { Undertittel, Undertekst } from 'nav-frontend-typografi';
import { formatISOString, isValidISOString } from '../../utils';
import './HowToApply.less';

export const tilpassEmail = (email) => {
    if (email.includes('@') && !email.includes('mailto:')) {
        return `mailto:${email}`;
    }
    return email;
};

export function getApplicationUrl(source, properties) {
    if (source === 'FINN') {
        return properties.sourceurl;
    } else if (properties.applicationurl !== undefined) {
        return properties.applicationurl;
    }
    return properties.sourceurl;
}

export default function HowToApply({ source, properties }) {
    const sokUrl = getApplicationUrl(source, properties);
    const finn = source === 'FINN';
    if (properties.applicationdue || properties.applicationemail || sokUrl) {
        return (
            <div className="HowToApply detail-section">
            </div>

        );
    }
    return null;
}

HowToApply.propTypes = {
    properties: PropTypes.shape({
        applicationdue: PropTypes.string,
        applicationemail: PropTypes.string,
        applicationurl: PropTypes.string,
        sourceurl: PropTypes.string
    }).isRequired
};

