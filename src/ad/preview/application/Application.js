import React from 'react';
import PropTypes from 'prop-types';
import { Element } from 'nav-frontend-typografi';
import { formatISOString, isValidISOString } from '../../../utils';
import {hasExcludingWordsInUrl} from '../markWords';

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

export default function Application({ source, properties }) {
    const sokUrl = getApplicationUrl(source, properties);
    const finn = source === 'FINN';

    return (
        <div className="detail-section">
            <Element className="detail-section__head">Søknad</Element>
            <dl className="dl-flex typo-normal">
                {properties.applicationdue && [
                    <dt key="dt">Søknadsfrist:</dt>,
                    <dd key="dd">
                        {isValidISOString(properties.applicationdue) ?
                            formatISOString(properties.applicationdue, 'D. MMMM YYYY') :
                            properties.applicationdue}
                    </dd>
                ]}
                {!finn && properties.applicationemail && [
                    <dt key="dt">Send søknad til:</dt>,
                    <dd key="dd">
                        <a
                            className="lenke"
                            href={tilpassEmail(properties.applicationemail)}
                        >
                            {properties.applicationemail}
                        </a>
                    </dd>
                ]}

                {sokUrl && sokUrl.startsWith('http') && [
                    <dt key="dt">Søknadslenke:</dt>,
                    <dd key="dd">
                        <a
                            className={"lenke" + (hasExcludingWordsInUrl(sokUrl) ? " AdText__discriminating" : "")}
                            href={sokUrl}
                        >
                            {sokUrl}
                        </a>
                    </dd>
                ]}
            </dl>
        </div>
    );

}

Application.propTypes = {
    properties: PropTypes.shape({
        applicationdue: PropTypes.string,
        applicationemail: PropTypes.string,
        applicationurl: PropTypes.string,
        sourceurl: PropTypes.string
    }).isRequired
};

