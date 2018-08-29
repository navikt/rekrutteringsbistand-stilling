import React from 'react';
import PropTypes from 'prop-types';
import { Element } from 'nav-frontend-typografi';
import { formatISOString, isValidISOString } from '../../../utils';
import { isValidUrl } from '../../../common/utils';

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
                        {properties.applicationemail}
                    </dd>
                ]}

                {sokUrl && isValidUrl(sokUrl) && [
                    <dt key="dt">Søknadslenke:</dt>,
                    <dd key="dd">
                        <a
                            href={sokUrl}
                            className="lenke"
                            target="_blank"
                        >
                            {sokUrl}
                        </a>
                    </dd>
                ]}

                {sokUrl && !isValidUrl(sokUrl) && [
                    <dt key="dt">Søknadslenke:</dt>,
                    <dd key="dd">
                        <span>
                            {sokUrl}
                        </span>
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

