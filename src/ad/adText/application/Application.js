import React from 'react';
import PropTypes from 'prop-types';
import { Undertittel } from 'nav-frontend-typografi';
import { formatISOString, isValidISOString } from '../../../utils';
import Panel from 'nav-frontend-paneler';

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
        <Panel border className="detail-section">
            <Undertittel className="detail-section__head">Søknad</Undertittel>
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
                            className="lenke"
                            href={sokUrl}
                        >
                            {sokUrl}
                        </a>
                    </dd>
                ]}
            </dl>
        </Panel>
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

