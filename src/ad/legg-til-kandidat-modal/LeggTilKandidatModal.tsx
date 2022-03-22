import React, { FunctionComponent, useEffect, useState } from 'react';
import NavFrontendSpinner from 'nav-frontend-spinner';
import { Feilmelding } from 'nav-frontend-typografi';

import {
    feil,
    ikkeLastet,
    lasterInn,
    Nettressurs,
    Nettstatus,
    suksess,
} from '../../api/Nettressurs';
import ModalMedStillingScope from '../../ModalMedStillingScope';
import { fetchKandidatliste, putKandidatliste } from './kandidatApi';
import { Kandidatliste } from './kandidatlistetyper';
import LeggTilKandidat from './LeggTilKandidat';
import './LeggTilKandidatModal.less';

export type KandidatOutboundDto = {
    kandidatnr: string;
    notat?: string;
};

type Props = {
    vis: boolean;
    stillingsId: string;
    onClose: () => void;
};

const LeggTilKandidatModal: FunctionComponent<Props> = ({ vis, onClose, stillingsId }) => {
    const [kandidatliste, setKandidatliste] = useState<Nettressurs<Kandidatliste>>(ikkeLastet());

    useEffect(() => {
        const hentKandidatliste = async () => {
            setKandidatliste(lasterInn());

            let kandidatliste: Nettressurs<Kandidatliste>;

            try {
                kandidatliste = suksess(await fetchKandidatliste(stillingsId));
            } catch (e) {
                if (e.status === 404) {
                    kandidatliste = suksess(await putKandidatliste(stillingsId));
                } else {
                    kandidatliste = feil(e.message);
                }
            }

            setKandidatliste(kandidatliste);
        };

        hentKandidatliste();
    }, [stillingsId]);

    return (
        <ModalMedStillingScope
            isOpen={vis}
            className="LeggTilKandidatModal"
            contentLabel="Legg til kandidat-modal"
            contentClass="LeggTilKandidatModal__innhold"
            onRequestClose={onClose}
        >
            {kandidatliste.kind === Nettstatus.LasterInn && (
                <NavFrontendSpinner className="LeggTilKandidatModal__spinner" />
            )}

            {kandidatliste.kind === Nettstatus.Feil && (
                <Feilmelding>Klarte ikke å laste ned kandidatliste for stillingen.</Feilmelding>
            )}

            {kandidatliste.kind === Nettstatus.Suksess && (
                <LeggTilKandidat kandidatliste={kandidatliste.data} onClose={onClose} />
            )}
        </ModalMedStillingScope>
    );
};

export default LeggTilKandidatModal;
