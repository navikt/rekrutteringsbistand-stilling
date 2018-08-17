import React from 'react';
import PropTypes from 'prop-types';
import { Element } from 'nav-frontend-typografi';
import './Employer.less';

export default function Employer({ employer, properties }) {
    return (
        <div className="detail-section">
            {employer && (
                <div>
                    <Element className="detail-section__head">Arbeidsgiver fra Enhetsregisteret</Element>
                    <dl className="dl-flex typo-normal blokk-s">
                        {employer.name && [
                            <dt key="dt">Arbeidsgivernavn:</dt>,
                            <dd key="dd">{employer.name}</dd>
                        ]}
                        {employer.location && employer.location.address && [
                            <dt key="dt">Gateadresse:</dt>,
                            <dd key="dd">{employer.location.address}</dd>]
                        }
                        {employer.location && employer.location.postalCode && [
                            <dt key="dt">Poststed:</dt>,
                            <dd key="dd">{employer.location.postalCode} {employer.location.city}</dd>]
                        }
                    </dl>
                </div>
            )}
            <Element className="detail-section__head">Oppgitt arbeidsgiver</Element>
            <dl className="dl-flex typo-normal">
                {properties.employer && [
                    <dt key="dt">Arbeidsgivernavn:</dt>,
                    <dd key="dd">{properties.employer}</dd>
                ]}
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
