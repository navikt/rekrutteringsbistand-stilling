import React, { FunctionComponent, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { Radio, RadioGruppe } from 'nav-frontend-skjema';
import { Flatknapp, Hovedknapp } from 'nav-frontend-knapper';
import { Element, Normaltekst, Systemtittel } from 'nav-frontend-typografi';

import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';
import { CREATE_AD } from '../ad/adReducer';
import { kategoriTilVisningsnavn } from '../ad/preview/administration/kategori/Kategori';
import { REDIGERINGSMODUS_QUERY_PARAM } from '../ad/Ad';
import { State } from '../reduxStore';
import ModalMedStillingScope from '../common/ModalMedStillingScope';
import './OpprettNyStilling.less';
import VelgArbeidsgiver, { Arbeidsgiverforslag } from './VelgArbeidsgiver';

export enum Stillingskategori {
    Stilling = 'STILLING',
    Arbeidstrening = 'ARBEIDSTRENING',
    Jobbmesse = 'JOBBMESSE',
    Formidling = 'FORMIDLING',
}

const stillingskategoriSomIkkeLengerKanVelges = Stillingskategori.Arbeidstrening;

type Props = {
    onClose: () => void;
};

const OpprettNyStilling: FunctionComponent<Props> = ({ onClose }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { hasSavedChanges } = useSelector((state: State) => state.ad);
    const stilling = useSelector((state: State) => state.ad.originalData);

    const [stillingskategori, setStillingskategori] = useState<Stillingskategori | null>(null);
    const [arbeidsgiver, setArbeidsgiver] = useState<Arbeidsgiverforslag | null>(null);
    const [arbeidsgiverfeilmelding, setArbeidsgiverfeilmelding] = useState<string | null>(null);

    useEffect(() => {
        if (hasSavedChanges === true && stilling) {
            history.replace({
                pathname: `/stillinger/stilling/${stilling.uuid}`,
                search: `${REDIGERINGSMODUS_QUERY_PARAM}=true`,
            });
        }
        // eslint-disable-next-line
    }, [hasSavedChanges, stilling]);

    const onOpprettClick = () => {
        if (arbeidsgiver == null) {
            setArbeidsgiverfeilmelding('Bedriftens navn mangler');
        }
        if (stillingskategori == null || arbeidsgiver == null) {
            return;
        }

        dispatch({
            type: CREATE_AD,
            kategori: stillingskategori,
            arbeidsgiver: arbeidsgiver,
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
                Det arbeides fremdeles med å avklare hva som er lov å registrere i
                Rekrutteringsbistand. Derfor kan du ikke registrere NAV-kurs, webinar,
                arbeidstrening og lignende. Det er kun kategoriene nedenfor som skal brukes.
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
                {Object.values(Stillingskategori)
                    .filter((kategori) => kategori !== stillingskategoriSomIkkeLengerKanVelges)
                    .map((kategori) => (
                        <Radio
                            key={kategori}
                            className="opprett-ny-stilling--kategori"
                            name="stillingskategori"
                            onChange={(event) =>
                                setStillingskategori(event.target.value as Stillingskategori)
                            }
                            checked={stillingskategori === kategori}
                            label={kategoriTilVisningsnavn(kategori)}
                            value={kategori}
                        />
                    ))}
            </RadioGruppe>
            <VelgArbeidsgiver
                arbeidsgiver={arbeidsgiver}
                setArbeidsgiver={setArbeidsgiver}
                feilmelding={arbeidsgiverfeilmelding}
                setFeilmelding={setArbeidsgiverfeilmelding}
            />
            <Hovedknapp onClick={onOpprettClick} className="opprett-ny-stilling--opprett-knapp">
                Opprett
            </Hovedknapp>
            <Flatknapp onClick={onClose}>Avbryt</Flatknapp>
        </ModalMedStillingScope>
    );
};

export default OpprettNyStilling;
