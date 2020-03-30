import React, { FunctionComponent } from 'react';
import { hentAnnonselenke } from '../../adUtils';
import KopierTekst from '../../kopierTekst/KopierTekst';
import './LenkeTilAnnonse.less';

interface Props {
    stillingId: string;
}

const LenkeTilAnnonse: FunctionComponent<Props> = ({ stillingId }) => {
    const lenke = hentAnnonselenke(stillingId);

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
                    value={lenke}
                />
                <KopierTekst tooltipTekst="Kopier annonselenken" skalKopieres={lenke} />
            </div>
        </>
    );
};

export default LenkeTilAnnonse;
