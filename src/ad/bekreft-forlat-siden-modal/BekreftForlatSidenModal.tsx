import React, { FunctionComponent } from 'react';
import { connect } from 'react-redux';
import { Hovedknapp } from 'nav-frontend-knapper';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import LinkButton from '../../common/linkbutton/LinkButton';
import ModalMedStillingScope from '../../ModalMedStillingScope';
import State from '../../State';
import './BekreftForlatSidenModal.less';

type Props = {
    vis: boolean;
    updated: any;
    created: any;
    onBliPåSidenClick: () => void;
    onForlatSidenClick: () => void;
};
const BekreftForlatSidenModal: FunctionComponent<Props> = (props) => {
    const { vis, updated, created, onBliPåSidenClick, onForlatSidenClick } = props;

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
                <LinkButton className="lenke" onClick={onForlatSidenClick}>
                    Forlat siden
                </LinkButton>
            </div>
        </ModalMedStillingScope>
    );
};

const mapStateToProps = (state: State) => ({
    adStatus: state.adData.status,
    updated: state.adData.updated,
    created: state.adData.created,
});

export default connect(mapStateToProps)(BekreftForlatSidenModal);
