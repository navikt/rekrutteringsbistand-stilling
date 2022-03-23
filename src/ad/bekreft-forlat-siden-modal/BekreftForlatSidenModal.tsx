import React, { FunctionComponent } from 'react';
import { connect } from 'react-redux';
import { Hovedknapp } from 'nav-frontend-knapper';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import NavFrontendSpinner from 'nav-frontend-spinner';

import { NyStillingState } from '../adReducer';
import LinkButton from '../../common/linkbutton/LinkButton';
import ModalMedStillingScope from '../../common/ModalMedStillingScope';
import { State } from '../../reduxStore';
import { AlertStripeFeil } from 'nav-frontend-alertstriper';
import './BekreftForlatSidenModal.less';

type Props = {
    vis: boolean;
    updated: any;
    created: any;
    onBliPåSidenClick: () => void;
    onForlatSidenClick: () => void;
    nyStillingState: NyStillingState;
};

const BekreftForlatSidenModal: FunctionComponent<Props> = (props) => {
    const { vis, updated, created, onBliPåSidenClick, onForlatSidenClick, nyStillingState } = props;

    return (
        <ModalMedStillingScope
            isOpen={vis}
            contentLabel="Fortsett"
            onRequestClose={onBliPåSidenClick}
            closeButton
            className="BekreftForlatSidenModal"
        >
            {updated === created ? (
                <Undertittel className="blokk-s">
                    Du har startet registrering av en ny stilling
                </Undertittel>
            ) : (
                <Undertittel className="blokk-s">Du har gjort endringer på stillingen</Undertittel>
            )}
            <div>
                <Normaltekst className="blokk-l">
                    Hvis du navigerer bort fra denne siden uten å lagre så mister du informasjonen.
                </Normaltekst>
                <Hovedknapp onClick={onBliPåSidenClick}>Bli på siden</Hovedknapp>
                <LinkButton
                    className="lenke BekreftForlatSidenModal__forlat-siden-knapp"
                    onClick={onForlatSidenClick}
                >
                    Forlat siden
                    {nyStillingState === NyStillingState.Forkastes && (
                        <NavFrontendSpinner className="BekreftForlatSidenModal__forkaster-stilling-spinner" />
                    )}
                </LinkButton>
            </div>
            {nyStillingState === NyStillingState.Feil && (
                <AlertStripeFeil className="BekreftForlatSidenModal__forkast-stilling-feil">
                    Klarte ikke å forkaste den nye stillingen.
                </AlertStripeFeil>
            )}
        </ModalMedStillingScope>
    );
};

const mapStateToProps = (state: State) => ({
    adStatus: state.adData.status,
    updated: state.adData.updated,
    created: state.adData.created,
    nyStillingState: state.ad.nyStillingState,
});

export default connect(mapStateToProps)(BekreftForlatSidenModal);
