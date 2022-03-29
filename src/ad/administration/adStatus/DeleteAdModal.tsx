import React, { FunctionComponent } from 'react';
import { useHistory } from 'react-router';
import { connect, useSelector } from 'react-redux';
import { Flatknapp, Hovedknapp } from 'nav-frontend-knapper';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import './DeleteAdModal.less';
import { DELETE_AD, HIDE_DELETE_AD_MODAL } from '../../adReducer';
import ModalMedStillingScope from '../../../common/ModalMedStillingScope';
import { State } from '../../../reduxStore';

type Props = {
    closeModal: () => void;
    deleteAd: () => void;
};

const DeleteAdModal: FunctionComponent<Props> = ({ closeModal, deleteAd }) => {
    const history = useHistory();

    const showDeleteAdModal = useSelector((state: State) => state.ad.showDeleteAdModal);
    const title = useSelector((state: State) => state.adData.title);

    const onClose = () => {
        closeModal();
    };

    const onDeleteAdClick = () => {
        deleteAd();
        history.replace({
            pathname: `/stillinger/minestillinger`,
            search: '',
        });
    };

    return (
        <ModalMedStillingScope
            isOpen={showDeleteAdModal}
            contentLabel="Fortsett"
            onRequestClose={onClose}
            closeButton
            className="DeleteAdModal"
        >
            <Undertittel className="blokk-s">Slett stilling og kandidatliste</Undertittel>
            <Normaltekst className="blokk-l">
                {`Er du sikker på at du ønsker å slette "${title}" og tilhørende kandidatliste?
                Stillinger og kandidatlister som er slettet vises ikke i løsningen.`}
            </Normaltekst>
            <div className="DeleteAdModal__buttons">
                <Hovedknapp onClick={onDeleteAdClick}>Slett</Hovedknapp>
                <Flatknapp onClick={onClose}>Avbryt</Flatknapp>
            </div>
        </ModalMedStillingScope>
    );
};

const mapStateToProps = (state) => ({
    showDeleteAdModal: state.ad.showDeleteAdModal,
    title: state.adData.title,
});

const mapDispatchToProps = (dispatch) => ({
    closeModal: () => dispatch({ type: HIDE_DELETE_AD_MODAL }),
    deleteAd: () => dispatch({ type: DELETE_AD }),
});

export default connect(mapStateToProps, mapDispatchToProps)(DeleteAdModal);
