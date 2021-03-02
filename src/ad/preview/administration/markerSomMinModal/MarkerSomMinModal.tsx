import React, { FunctionComponent } from 'react';
import NavFrontendModal from 'nav-frontend-modal';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import { Flatknapp, Hovedknapp } from 'nav-frontend-knapper';
import './MarkerSomMinModal.less';

type Props = {
    erÅpen: boolean;
    onAvbryt: () => void;
    onMarkerSomMin: () => void;
};

const MarkerSomMinModal: FunctionComponent<Props> = ({ erÅpen, onAvbryt, onMarkerSomMin }) => {
    return (
        <NavFrontendModal
            onRequestClose={onAvbryt}
            isOpen={erÅpen}
            contentLabel="Marker stillingen som min"
            portalClassName="rek-stilling"
            className="MarkerSomMinModal"
        >
            <Undertittel className="blokk-s">Marker stillingen som min</Undertittel>
            <Normaltekst className="blokk-s">
                Hvis du markerer stillingen som din, blir du eier av stillingen og tilhørende
                kandidatliste. Du vil ha ansvar for kontakt med arbeidsgiver, og kan dele CV-er med
                arbeidsgiveren.
            </Normaltekst>
            <Normaltekst className="blokk-l">
                Er du sikker på at du vil markere stillingen som din?
            </Normaltekst>
            <div>
                <Hovedknapp className="MarkerSomMinModal__bekreftKnapp" onClick={onMarkerSomMin}>
                    Marker som min
                </Hovedknapp>
                <Flatknapp
                    className="marker-som-min__avbryt knapp-små-bokstaver"
                    onClick={onAvbryt}
                >
                    Avbryt
                </Flatknapp>
            </div>
        </NavFrontendModal>
    );
};

export default MarkerSomMinModal;
