import React, { FunctionComponent } from 'react';
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import { Hovedknapp, Flatknapp } from 'nav-frontend-knapper';
import './OpprettKandidatlisteModal.less';
import ModalMedStillingScope from '../../../ModalMedStillingScope';

type Props = {
    åpen: boolean;
    onClose: () => void;
    onBekreft: () => void;
};

const OpprettKandidatlisteModal: FunctionComponent<Props> = ({ åpen, onClose, onBekreft }) => (
    <ModalMedStillingScope
        className="opprett-kandidatliste-modal"
        isOpen={åpen}
        contentLabel="Opprett kandidatliste"
        onRequestClose={onClose}
    >
        <Systemtittel className="opprett-kandidatliste-modal__tittel">
            Opprett kandidatliste
        </Systemtittel>
        <Normaltekst className="opprett-kandidatliste-modal__avsnitt">
            Viktig: Kontakt arbeidsgiveren før du oppretter kandidatlisten. Arbeidsgiveren må
            bekrefte at de ønsker å motta kandidater fra NAV.
        </Normaltekst>
        <Normaltekst className="opprett-kandidatliste-modal__avsnitt">
            Er du sikker på at du ønsker å opprette kandidatlisten? Svarer du ja, blir du eier av
            stillingen og listen. Du har da ansvar for å sende kandidater til arbeidsgiveren.
        </Normaltekst>

        <Hovedknapp className="opprett-kandidatliste-modal__bekreftknapp" onClick={onBekreft}>
            Ja, opprett kandidatlisten
        </Hovedknapp>
        <Flatknapp onClick={onClose}>Nei, avbryt</Flatknapp>
    </ModalMedStillingScope>
);

export default OpprettKandidatlisteModal;
