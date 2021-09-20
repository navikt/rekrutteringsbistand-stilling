import React, { FunctionComponent, useEffect, useState } from 'react';
import { Element, Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import ModalMedStillingScope from '../ModalMedStillingScope';
import { Radio, RadioGruppe } from 'nav-frontend-skjema';
import { Hovedknapp } from 'nav-frontend-knapper';
import { CREATE_AD } from '../ad/adReducer';
import { useDispatch, useSelector } from 'react-redux';
import State from '../State';
import { useHistory } from 'react-router';
import { REDIGERINGSMODUS_QUERY_PARAM } from '../ad/Ad';

export enum Stillingskategori {
    Stilling = 'STILLING',
    Arbeidstrening = 'ARBEIDSTRENING',
    Formidling = 'FORMIDLING',
}

const OpprettNyStilling: FunctionComponent = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { hasSavedChanges } = useSelector((state: State) => state.ad);
    const stilling = useSelector((state: State) => state.ad.originalData);

    const [stillingskategori, setStillingskategori] = useState<Stillingskategori | null>(null);

    useEffect(() => {
        if (hasSavedChanges === true && stilling) {
            history.replace({
                pathname: `/stillinger/stilling/${stilling.uuid}`,
                search: `${REDIGERINGSMODUS_QUERY_PARAM}=true`,
            });
        }
    }, [hasSavedChanges, stilling]);

    const onOpprettClick = () => {
        if (stillingskategori == null) {
            return;
        }

        dispatch({
            type: CREATE_AD,
            kategori: stillingskategori,
        });
    };

    return (
        <ModalMedStillingScope
            isOpen
            closeButton={false}
            onRequestClose={() => {}}
            shouldCloseOnEsc={false}
            contentLabel="Opprett ny stilling, velg kategori"
        >
            <Systemtittel className="blokk-s">Opprett ny stilling</Systemtittel>
            <RadioGruppe
                legend={
                    <>
                        <Element tag="span">Hva skal du bruke stillingen til? </Element>
                        <Normaltekst tag="span">
                            Du kan ikke endre kategori i etterkant.
                        </Normaltekst>
                    </>
                }
            >
                {Object.entries(Stillingskategori).map(([kategori, verdi]) => (
                    <Radio
                        key={verdi}
                        name="stillingskategori"
                        onChange={(event) =>
                            setStillingskategori(event.target.value as Stillingskategori)
                        }
                        checked={stillingskategori === verdi}
                        label={kategori}
                        value={verdi}
                    />
                ))}
            </RadioGruppe>
            <Hovedknapp onClick={onOpprettClick}>Opprett</Hovedknapp>
        </ModalMedStillingScope>
    );
};

export default OpprettNyStilling;
