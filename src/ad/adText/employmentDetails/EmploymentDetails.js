import React from 'react';
import PropTypes from 'prop-types';
import { Undertittel } from 'nav-frontend-typografi';

export default function EmploymentDetails({ properties }) {

    return (
        <div className="detail-section">
            <Undertittel className="detail-section__head">Om stillingen</Undertittel>
            <dl className="dl-flex typo-normal">
                {properties.location && [
                    <dt key="dt">Arbeidssted:</dt>,
                    <dd key="dd">{properties.location}</dd>
                ]}
                {properties.engagementtype && [
                    <dt key="dt">Ansettelsesform:</dt>,
                    <dd key="dd">{properties.engagementtype }</dd>
                ]}
            </dl>
        </div>
    );
}

EmploymentDetails.propTypes = {
    properties: PropTypes.shape({
        location: PropTypes.string,
        engagementtype: PropTypes.string,
    }).isRequired
};

