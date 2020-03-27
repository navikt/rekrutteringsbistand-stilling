import React, { FunctionComponent, createRef } from 'react';
import './LenkeTilAnnonse.less';
import KopierTekst from '../../kopierTekst/KopierTekst';

interface Props {
    stillingId: string;
}

const LenkeTilAnnonse: FunctionComponent<Props> = ({ stillingId }) => {
    const lenkeTilAnnonse = `https://www.nav.no/arbeid/stilling/${stillingId}`;

    return (
        <>
            <label className="typo-normal skjemaelement__label" htmlFor="lenke-til-annonse-input">
                Lenke til annonse
            </label>
            <div className="lenke-til-annonse">
                <input
                    disabled
                    id="lenke-til-annonse-input"
                    type="text"
                    className="typo-normal skjemaelement__input input--fullbredde lenke-til-annonse__input"
                    value={lenkeTilAnnonse}
                />
                <KopierTekst tooltipTekst="Kopier annonselenken" skalKopieres={lenkeTilAnnonse} />
            </div>
        </>
    );
};

export default LenkeTilAnnonse;
