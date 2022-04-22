import { RadioGruppe, Radio } from 'nav-frontend-skjema';
import React, { FunctionComponent } from 'react';
import { Element } from 'nav-frontend-typografi';
import { kategoriTilVisningsnavn } from '../stilling/preview/administration/kategori/Kategori';

export enum Stillingskategori {
    Stilling = 'STILLING',
    Arbeidstrening = 'ARBEIDSTRENING',
    Jobbmesse = 'JOBBMESSE',
    Formidling = 'FORMIDLING',
}

const stillingskategoriSomIkkeLengerKanVelges = Stillingskategori.Arbeidstrening;

type Props = {
    stillingskategori: Stillingskategori | null;
    onChange: (stillingskategori: Stillingskategori) => void;
    feilmelding: string | null;
};

const VelgStillingskategori: FunctionComponent<Props> = ({
    stillingskategori,
    onChange,
    feilmelding,
}) => {
    const onStillingskategoriChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.value as Stillingskategori);
    };

    return (
        <RadioGruppe
            className="blokk-m"
            legend={<Element tag="span">Hva skal du bruke stillingen til?</Element>}
            feil={feilmelding ? feilmelding : null}
        >
            {Object.values(Stillingskategori)
                .filter((kategori) => kategori !== stillingskategoriSomIkkeLengerKanVelges)
                .map((kategori) => (
                    <Radio
                        key={kategori}
                        className="opprett-ny-stilling--kategori"
                        name="stillingskategori"
                        onChange={onStillingskategoriChange}
                        checked={stillingskategori === kategori}
                        label={kategoriTilVisningsnavn(kategori)}
                        value={kategori}
                    />
                ))}
        </RadioGruppe>
    );
};

export default VelgStillingskategori;
