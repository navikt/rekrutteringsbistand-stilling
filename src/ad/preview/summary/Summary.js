import React from 'react';
import PropTypes from 'prop-types';
import { Element } from 'nav-frontend-typografi';
import { formatISOString } from '../../../utils';

export default function Summary({ stilling }) {
    return (
        <div className="detail-section">
            <Element className="detail-section__head">Om annonsen</Element>
            <dl className="dl-flex typo-normal">
                {stilling.published && [
                    <dt key="dt">Publisert:</dt>,
                    <dd key="dd">{formatISOString(stilling.published, 'D. MMMM YYYY HH:MM')}</dd>
                ]}
                {stilling.updated && [
                    <dt key="dt">Sist endret:</dt>,
                    <dd key="dd">{formatISOString(stilling.updated, 'D. MMMM YYYY HH:MM')}</dd>
                ]}
                {stilling.medium && [
                    <dt key="dt">Hentet fra:</dt>,
                    <dd key="dd">{stilling.medium}</dd>
                ]}
                {stilling.id && [
                    <dt key="dt">Stillingsnummer:</dt>,
                    <dd key="dd">{stilling.id}</dd>
                ]}
                {stilling.reference && [
                    <dt key="dt">Referanse:</dt>,
                    <dd key="dd">{stilling.reference}</dd>
                ]}
                {stilling.expires && [
                    <dt key="dt">Utløpsdato:</dt>,
                    <dd key="dd">{formatISOString(stilling.expires, 'D. MMMM YYYY')}</dd>
                ]}
            </dl>
        </div>
    );
}

Summary.propTypes = {
    stilling: PropTypes.shape({
        id: PropTypes.number,
        updated: PropTypes.string,
        medium: PropTypes.string,
        reference: PropTypes.string,
        expires: PropTypes.string
    }).isRequired
};
