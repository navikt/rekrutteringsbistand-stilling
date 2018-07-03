import React from 'react';
import PropTypes from 'prop-types';
import { Undertittel } from 'nav-frontend-typografi';

export default function EmployerDetails({ properties }) {
    return (
        <div className="detail-section">
            <Undertittel className="detail-section__head">Om arbeidsgiver</Undertittel>
            <dl className="dl-flex typo-normal">
                {properties.employer && [
                    <dt key="dt">Arbeidsgiver:</dt>,
                    <dd key="dd">{properties.employer}</dd>
                ]}
            </dl>
        </div>
    );
}

EmployerDetails.propTypes = {
    properties: PropTypes.shape({
        employer: PropTypes.string,
    }).isRequired
};

