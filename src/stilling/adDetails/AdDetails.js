import React from 'react';
import PropTypes from 'prop-types';
import { Undertittel } from 'nav-frontend-typografi';
import { formatISOString } from '../../utils';

export default function AdDetails({ updated, medium, reference }) {
    return (
        <div className="AdDetails detail-section">
            <Undertittel className="AdDetails__head detail-section__head">Om annonsen</Undertittel>
            <dl className="dl-flex typo-normal">
                {updated && [
                    <dt key="dt">Sist endret:</dt>,
                    <dd key="dd">{formatISOString(updated, 'D. MMMM YYYY')}</dd>
                ]}
                {medium && [
                    <dt key="dt">Hentet fra:</dt>,
                    <dd key="dd">{medium}</dd>
                ]}
                {reference && [
                    <dt key="dt">ID nr.:</dt>,
                    <dd key="dd">{reference}</dd>
                ]}
            </dl>
        </div>
    );
}

AdDetails.propTypes = {
        updated: PropTypes.string.isRequired,
        medium: PropTypes.string.isRequired,
        reference: PropTypes.string.isRequired
};

