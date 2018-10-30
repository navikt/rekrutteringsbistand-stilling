import React from 'react';
import PropTypes from 'prop-types';
import { Undertittel } from 'nav-frontend-typografi';
import { formatISOString } from '../../../utils';

export default function Summary({ ad }) {
    return (
        <div className="detail-section">
            <Undertittel className="detail-section__head">Om annonsen</Undertittel>
            <dl className="dl-flex typo-normal">
                {ad.updated && [
                    <dt key="dt">Sist endret:</dt>,
                    <dd key="dd">{formatISOString(ad.updated, 'DD.MM.YYYY')}</dd>
                ]}
                {ad.medium && [
                    <dt key="dt">Hentet fra:</dt>,
                    <dd key="dd">{ad.medium}</dd>
                ]}
                {ad.reference && [
                    <dt key="dt">Referanse:</dt>,
                    <dd key="dd">{ad.reference}</dd>
                ]}
                {ad.id && [
                    <dt key="dt">Stillingsnummer:</dt>,
                    <dd key="dd">{ad.id}</dd>
                ]}
                {ad.administration && ad.administration.reportee && ad.source === 'DIR' && [
                    <dt key="dt">Registrert av:</dt>,
                    <dd key="dd">{ad.administration.reportee}</dd>
                ]}
            </dl>
        </div>
    );
}

Summary.propTypes = {
    ad: PropTypes.shape({
        updated: PropTypes.string,
        medium: PropTypes.string,
        reference: PropTypes.string
    }).isRequired
};
