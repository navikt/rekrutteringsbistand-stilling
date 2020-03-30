import React from 'react';
import PropTypes from 'prop-types';
import { Undertittel } from 'nav-frontend-typografi';

import KopierTekst from '../../kopierTekst/KopierTekst';
import { stillingErPublisert, hentAnnonselenke } from '../../adUtils';
import { formatISOString } from '../../../utils';

export default function Summary({ ad }) {
    const lenke = hentAnnonselenke(ad.uuid);

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
                {stillingErPublisert(ad) && (
                    <>
                        <dt key="dt">Lenke til annonse:</dt>
                        <dd key="dd">
                            <a className="lenke" href={lenke}>
                                {lenke}
                            </a>
                            <KopierTekst tooltipTekst="Kopier annonselenken" skalKopieres={lenke} />
                        </dd>
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
