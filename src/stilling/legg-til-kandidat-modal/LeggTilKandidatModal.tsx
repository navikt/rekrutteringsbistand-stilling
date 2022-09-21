import React, { FunctionComponent } from 'react';
import NavFrontendSpinner from 'nav-frontend-spinner';
import { Feilmelding, Systemtittel } from 'nav-frontend-typografi';

import { Nettressurs, Nettstatus } from '../../api/Nettressurs';
import ModalMedStillingScope from '../../common/ModalMedStillingScope';
import { Kandidatliste } from './kandidatlistetyper';
import LeggTilKandidat from './LeggTilKandidat';
import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';
import './LeggTilKandidatModal.less';

export type KandidatOutboundDto = {
    kandidatnr: string;
    notat?: string;
};

type Props = {
    vis: boolean;
    onClose: () => void;
    kandidatliste: Nettressurs<Kandidatliste>;
};

const LeggTilKandidatModal: FunctionComponent<Props> = ({ vis, onClose, kandidatliste }) => {
    return (
        <ModalMedStillingScope
            isOpen={vis}
            className="LeggTilKandidatModal"
            contentLabel="Legg til kandidat-modal"
            contentClass="LeggTilKandidatModal__innhold"
            onRequestClose={onClose}
        >
            <Systemtittel className="LeggTilKandidatModal__tittel">Legg til kandidat</Systemtittel>
            <AlertStripeAdvarsel className="LeggTilKandidatModal__advarsel">
                Før du legger en kandidat på kandidatlisten må du undersøke om personen oppfyller
                kravene som er nevnt i stillingen.
            </AlertStripeAdvarsel>
            {kandidatliste.kind === Nettstatus.LasterInn && (
                <NavFrontendSpinner className="LeggTilKandidatModal__spinner LeggTilKandidatModal__spinner--vertikal" />
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
