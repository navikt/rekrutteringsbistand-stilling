import { Element, Normaltekst } from 'nav-frontend-typografi';
import React, { FunctionComponent } from 'react';
import { useSelector } from 'react-redux';
import { Stillingskategori } from '../../../../opprett-ny-stilling/OpprettNyStilling';
import State from '../../../../State';

const Kategori: FunctionComponent = () => {
    const { stillingskategori } = useSelector((state: State) => state.stillingsinfoData);

    return (
        <>
            <Element className="blokk-xxs">Kategori</Element>
            <Normaltekst>{kategoriTilVisningsnavn(stillingskategori)}</Normaltekst>
        </>
    );
};

const kategoriTilVisningsnavn = (kategori: Stillingskategori | null) => {
    switch (kategori) {
        case Stillingskategori.Stilling:
            return 'Stilling';
        case Stillingskategori.Formidling:
            return 'Formidling';
        case Stillingskategori.Arbeidstrening:
            return 'Arbeidstrening';
        default:
            return 'Stilling';
    }
};

export default Kategori;
