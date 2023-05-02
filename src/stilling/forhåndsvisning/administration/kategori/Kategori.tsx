import React, { FunctionComponent } from 'react';
import { useSelector } from 'react-redux';
import { Stillingskategori } from '../../../../opprett-ny-stilling/VelgStillingskategori';
import { State } from '../../../../redux/store';
import { BodyShort, Label } from '@navikt/ds-react';

const Kategori: FunctionComponent = () => {
    const { stillingskategori } = useSelector((state: State) => state.stillingsinfoData);

    return (
        <>
            <BodyShort size="small" spacing>
                <Label size="small">Kategori</Label>
            </BodyShort>
            <BodyShort size="small">{kategoriTilVisningsnavn(stillingskategori)}</BodyShort>
        </>
    );
};

export const kategoriTilVisningsnavn = (kategori: Stillingskategori | null) => {
    switch (kategori) {
        case Stillingskategori.Stilling:
            return 'Stilling';
        case Stillingskategori.Formidling:
            return 'Formidling';
        case Stillingskategori.Arbeidstrening:
            return 'Arbeidstrening';
        case Stillingskategori.Jobbmesse:
            return 'Jobbmesse/jobbtreff';
        default:
            return 'Stilling';
    }
};

export default Kategori;
