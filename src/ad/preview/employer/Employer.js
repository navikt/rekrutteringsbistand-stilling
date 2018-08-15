import React from 'react';
import PropTypes from 'prop-types';
import { Element } from 'nav-frontend-typografi';
import './Employer.less';

export default function Employer({ employer }) {
    if (!employer) {
        return null;
    }
    const { location } = employer;
    return (
        <div className="detail-section">
            <Element className="detail-section__head">Om arbeidsgiver</Element>
            <dl className="dl-flex typo-normal">
                {employer.name && [
                    <dt key="dt">Arbeidsgiver:</dt>,
                    <dd key="dd">{employer.name}</dd>
                ]}
                {location && location.address && [
                    <dt key="dt">Gateadresse:</dt>,
                    <dd key="dd">{location.address}</dd>]
                }
                {location && location.postalCode && [
                    <dt key="dt">Poststed:</dt>,
                    <dd key="dd">{location.postalCode} {location.city}</dd>]
                }
            </dl>
        </div>
    );
}

Employer.defaultProps = {
    employer: null
};

Employer.propTypes = {
    employer: PropTypes.shape({
        name: PropTypes.string,
        location: PropTypes.shape({
            address: PropTypes.string,
            postalCode: PropTypes.string,
            city: PropTypes.string,
            municipal: PropTypes.string,
            county: PropTypes.string
        })
    })
};
