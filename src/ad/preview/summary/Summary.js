import React from 'react';
import PropTypes from 'prop-types';
import { Undertittel } from 'nav-frontend-typografi';
import { formatISOString } from '../../../utils';
import KopierTekst from '../../kopierTekst/KopierTekst';
import { VIS_STILLING_URL } from '../../../fasitProperties';

export default function Summary({ ad }) {
    const lenkeTilAnnonse = `${VIS_STILLING_URL}/${ad.uuid}`;

    return (
        <div className="detail-section">
            <Undertittel className="detail-section__head">Om annonsen</Undertittel>
            <dl className="dl-flex typo-normal">
                {ad.updated && [
                    <dt key="dt">Sist endret:</dt>,
                    <dd key="dd">{formatISOString(ad.updated, 'DD.MM.YYYY')}</dd>,
                ]}
                {ad.medium && [<dt key="dt">Hentet fra:</dt>, <dd key="dd">{ad.medium}</dd>]}
                {ad.reference && [<dt key="dt">Referanse:</dt>, <dd key="dd">{ad.reference}</dd>]}
                {ad.id && [<dt key="dt">Annonsenummer:</dt>, <dd key="dd">{ad.id}</dd>]}
                {ad.uuid &&
                    (ad.status !== 'INACTIVE' || ad.deactivatedByExpiry !== false) && [
                        <dt key="dt">Lenke til annonse:</dt>,
                        <dd key="dd">
                            <a className="lenke" href={lenkeTilAnnonse}>
                                {lenkeTilAnnonse}
                            </a>
                            <KopierTekst
                                tooltipTekst="Kopier annonselenken"
                                skalKopieres={lenkeTilAnnonse}
                            />
                        </dd>,
                    ]}
            </dl>
        </div>
    );
}

Summary.propTypes = {
    ad: PropTypes.shape({
        updated: PropTypes.string,
        medium: PropTypes.string,
        reference: PropTypes.string,
    }).isRequired,
};
