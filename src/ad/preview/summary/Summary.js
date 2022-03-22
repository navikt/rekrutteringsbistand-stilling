import React from 'react';
import PropTypes from 'prop-types';
import { Undertittel } from 'nav-frontend-typografi';
import { formatISOString } from '../../../datoUtils.ts';

export default function Summary({ ad }) {
    return (
        <div className="detail-section">
            <Undertittel className="detail-section__head">Om annonsen</Undertittel>
            <dl className="dl-flex typo-normal">
                {ad.updated && (
                    <>
                        <dt key="dt">Sist endret:</dt>
                        <dd key="dd">{formatISOString(ad.updated, 'DD.MM.YYYY')}</dd>
                    </>
                )}
                {ad.medium && (
                    <>
                        <dt key="dt">Hentet fra:</dt>
                        <dd key="dd">{ad.medium}</dd>
                    </>
                )}
                {ad.reference && (
                    <>
                        <dt key="dt">Referanse:</dt>
                        <dd key="dd">{ad.reference}</dd>
                    </>
                )}
                {ad.id && (
                    <>
                        <dt key="dt">Annonsenummer:</dt>
                        <dd key="dd">{ad.id}</dd>
                    </>
                )}
            </dl>
        </div>
    );
}

Summary.propTypes = {
    ad: PropTypes.shape({
        updated: PropTypes.string,
        medium: PropTypes.string,
        reference: PropTypes.string,
        uuid: PropTypes.string,
        status: PropTypes.string,
    }).isRequired,
};
