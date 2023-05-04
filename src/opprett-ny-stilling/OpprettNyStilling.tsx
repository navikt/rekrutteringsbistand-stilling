import React, { FunctionComponent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Flatknapp, Hovedknapp } from 'nav-frontend-knapper';
import { Systemtittel } from 'nav-frontend-typografi';

import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';
import { CREATE_AD } from '../stilling/adReducer';
import { REDIGERINGSMODUS_QUERY_PARAM } from '../stilling/Stilling';
import { State } from '../redux/store';
import Modal from '../common/modal/Modal';
import VelgArbeidsgiver, { Arbeidsgiverforslag } from './VelgArbeidsgiver';
import VelgStillingskategori, { Stillingskategori } from './VelgStillingskategori';
import { useNavigate } from 'react-router-dom';
import './OpprettNyStilling.less';

type Props = {
    onClose: () => void;
};

const OpprettNyStilling: FunctionComponent<Props> = ({ onClose }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { hasSavedChanges } = useSelector((state: State) => state.ad);
    const stilling = useSelector((state: State) => state.ad.originalData);

    const [stillingskategori, setStillingskategori] = useState<Stillingskategori | null>(null);
    const [stillingskategorifeilmelding, setStillingskatergorifeilmelding] = useState<
        string | null
    >(null);
    const [arbeidsgiver, setArbeidsgiver] = useState<Arbeidsgiverforslag | null>(null);
    const [arbeidsgiverfeilmelding, setArbeidsgiverfeilmelding] = useState<string | null>(null);

    useEffect(() => {
        if (hasSavedChanges === true && stilling) {
            navigate(
                {
                    pathname: `/stillinger/stilling/${stilling.uuid}`,
                    search: `${REDIGERINGSMODUS_QUERY_PARAM}=true`,
                },
                {
                    replace: true,
                }
            );
        }
        // eslint-disable-next-line
    }, [hasSavedChanges, stilling]);

    const onOpprettClick = () => {
        if (stillingskategori === null || arbeidsgiver === null) {
            if (stillingskategori === null) {
                setStillingskatergorifeilmelding('Du må velge en stillingskategori');
            }

            if (arbeidsgiver === null) {
                setArbeidsgiverfeilmelding('Du må velge en arbeidsgiver');
            }

            return;
        }
        dispatch({
            type: CREATE_AD,
            kategori: stillingskategori,
            arbeidsgiver: arbeidsgiver,
        });
    };

    const onStillingkategoriChange = (valgtKategori: Stillingskategori) => {
        setStillingskatergorifeilmelding(null);
        setStillingskategori(valgtKategori);
    };

    return (
        <Modal open onClose={onClose} aria-label="Opprett ny stilling, velg kategori">
            <Systemtittel className="blokk-m">Opprett ny stilling</Systemtittel>
            <AlertStripeAdvarsel className="blokk-m">
                Det arbeides fremdeles med å avklare hva som er lov å registrere i
                Rekrutteringsbistand. Derfor kan du ikke registrere NAV-kurs, webinar,
                arbeidstrening og lignende. Det er kun kategoriene nedenfor som skal brukes.
                <br />
                <br />
                Du kan ikke endre stillingskategori eller arbeidsgiver etter stillingen er
                opprettet.
            </AlertStripeAdvarsel>
            <VelgStillingskategori
                stillingskategori={stillingskategori}
                onChange={onStillingkategoriChange}
                feilmelding={stillingskategorifeilmelding}
            />
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
        </Modal>
    );
};

export default OpprettNyStilling;
