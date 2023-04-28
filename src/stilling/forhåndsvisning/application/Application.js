import React from 'react';
import PropTypes from 'prop-types';
import { Undertittel } from 'nav-frontend-typografi';
import { formatISOString, isValidISOString } from '../../../utils/datoUtils.ts';
import { isValidUrl } from '../../../common/urlUtils.ts';

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
            <Undertittel className="detail-section__head">Søknad</Undertittel>
            <dl className="dl-flex typo-normal">
                {properties.applicationdue && [
                    <dt key="dt">Søknadsfrist:</dt>,
                    <dd key="dd">
                        {isValidISOString(properties.applicationdue)
                            ? formatISOString(properties.applicationdue, 'DD.MM.YYYY')
                            : properties.applicationdue}
                    </dd>,
                ]}
                {!finn &&
                    properties.applicationemail && [
                        <dt key="dt">Send søknad til:</dt>,
                        <dd key="dd">{properties.applicationemail}</dd>,
                    ]}

                {sokUrl &&
                    isValidUrl(sokUrl) && [
                        <dt key="dt">Søknadslenke:</dt>,
                        <dd key="dd">
                            <a
                                href={sokUrl}
                                className="lenke"
                                rel="noopener noreferrer"
                                target="_blank"
                            >
                                {sokUrl}
                            </a>
                        </dd>,
                    ]}

                {sokUrl &&
                    !isValidUrl(sokUrl) && [
                        <dt key="dt">Søknadslenke:</dt>,
                        <dd key="dd">
                            <span>{sokUrl}</span>
                        </dd>,
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
        sourceurl: PropTypes.string,
    }).isRequired,
};
