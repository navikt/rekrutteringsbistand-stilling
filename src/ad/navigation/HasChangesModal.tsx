import React, { FunctionComponent, useEffect } from 'react';
import { connect } from 'react-redux';
import { Hovedknapp } from 'nav-frontend-knapper';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import LinkButton from '../../common/linkbutton/LinkButton';
import { DELETE_AD } from '../adReducer';
import ModalMedStillingScope from '../../ModalMedStillingScope';
import State from '../../State';
import './HasChangesModal.less';

type Props = {
    bliPåSiden: () => void;
    forlatSiden: () => void;
    vis: boolean;
    hasDeletedAd: boolean;
    deleteAd: () => void;
    updated: any;
    created: any;
};
const HasChangesModal: FunctionComponent<Props> = (props) => {
    console.log('ALLE RPOSP:', props);

    const { vis, updated, created, bliPåSiden, forlatSiden, deleteAd, hasDeletedAd } = props;

    return (
        <ModalMedStillingScope
            isOpen={vis}
            contentLabel="Fortsett"
            onRequestClose={bliPåSiden}
            closeButton
            className="HasChangesModal"
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
                <Hovedknapp onClick={bliPåSiden}>Bli på siden</Hovedknapp>
                <LinkButton className="lenke" onClick={forlatSiden}>
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
    hasDeletedAd: state.ad.hasDeletedAd,
});

const mapDispatchToProps = (dispatch: any) => ({
    deleteAd: () => dispatch({ type: DELETE_AD }),
});

export default connect(mapStateToProps, mapDispatchToProps)(HasChangesModal);
