import React, { FunctionComponent, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { Radio, RadioGruppe } from 'nav-frontend-skjema';
import { Flatknapp, Hovedknapp } from 'nav-frontend-knapper';
import { Element, Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import { CREATE_AD } from '../ad/adReducer';
import { REDIGERINGSMODUS_QUERY_PARAM } from '../ad/Ad';
import { useDispatch, useSelector } from 'react-redux';
import ModalMedStillingScope from '../ModalMedStillingScope';
import State from '../State';
import './OpprettNyStilling.less';
import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';

export enum Stillingskategori {
    Stilling = 'STILLING',
    Arbeidstrening = 'ARBEIDSTRENING',
    Formidling = 'FORMIDLING',
}

type Props = {
    onClose: () => void;
};

const OpprettNyStilling: FunctionComponent<Props> = ({ onClose }) => {
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
            onRequestClose={onClose}
            contentLabel="Opprett ny stilling, velg kategori"
            className="opprett-ny-stilling"
        >
            <Systemtittel className="blokk-m">Opprett ny stilling</Systemtittel>
            <AlertStripeAdvarsel className="blokk-m">
                NAV har kun lov til å bruke Rekrutteringsbistand til en konkret stilling.
                <br />
                Derfor kan du ikke registere arrangement, webinar, jobbtreff og lignende her.
            </AlertStripeAdvarsel>
            <RadioGruppe
                className="blokk-m"
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
                        className="opprett-ny-stilling--kategori"
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
            <Hovedknapp onClick={onOpprettClick} className="opprett-ny-stilling--opprett-knapp">
                Opprett
            </Hovedknapp>
            <Flatknapp onClick={onClose}>Avbryt</Flatknapp>
        </ModalMedStillingScope>
    );
};

export default OpprettNyStilling;
