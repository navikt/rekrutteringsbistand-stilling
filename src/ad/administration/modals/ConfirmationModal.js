import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import NavFrontendModal from 'nav-frontend-modal';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import { Hovedknapp, Knapp } from 'nav-frontend-knapper';
import './ConfirmationModal.less';
import { FETCH_NEXT_AD, SAVE_AD } from "../../adReducer";
import { SET_ADMIN_STATUS_AND_GET_NEXT_AD } from "../../adDataReducer";
import { CLOSE_MODAL, OPEN_MODAL } from "./modalReducer";
import AdminStatusEnum from "../adminStatus/AdminStatusEnum";
import AdContainsErrorPopup, {adContainsError} from "../errorPopup/AdContainsErrorPopup";

class ConfirmationModal extends React.Component {
    onNextAndFinishClick = () => {
        if (adContainsError(this.props.adStatus, this.props.validation)) {
            this.props.openModal(false);
        } else {
            this.props.setAdminStatusAndGetNextAd(AdminStatusEnum.DONE);
            this.props.closeModal();
        }
    };

    onNextWithoutFinishClick = () => {
        this.props.getNextAd();
        this.props.closeModal();
    };

    onClose = () => {
        this.props.closeModal();
    };

    render() {
        const { modalOpen, validation, adStatus, nextClicked, adminStatus } = this.props;
        if (nextClicked && adminStatus === AdminStatusEnum.PENDING ) {
            return (
                <NavFrontendModal
                    isOpen={modalOpen}
                    contentLabel="Fortsett"
                    onRequestClose={this.onClose}
                    className="blokk-m"
                    closeButton
                    appElement={document.getElementById('app')}
                >
                    <Undertittel className="ConfirmationPopup__title">
                        Saksbehandling er ikke lagret
                    </Undertittel>
                    <Normaltekst className="ConfirmationPopup__message">
                        Er du sikker på at du vil fortsette uten å lagre?
                    </Normaltekst>
                    <Hovedknapp
                        onClick={this.onNextAndFinishClick}
                        className="ConfirmationPopup__button"
                    >
                        Lagre og gå til neste
                    </Hovedknapp>
                    <Knapp
                        onClick={this.onNextWithoutFinishClick}
                        className="ConfirmationPopup__button"
                    >
                        Fortsett uten å lagre
                    </Knapp>
                </NavFrontendModal>
            );
        } else if (adContainsError(adStatus, validation)) {
            return (
                <AdContainsErrorPopup
                    isOpen={modalOpen}
                    onClose={this.onClose}
                    validation={validation}
                    adStatus={adStatus}
                />
            );
        }
        return (<div></div>);
    }
}

ConfirmationModal.propTypes = {
    modalOpen: PropTypes.bool.isRequired,
    adStatus: PropTypes.string.isRequired,
    adminStatus: PropTypes.string.isRequired,
    nextClicked: PropTypes.bool.isRequired,
    validation: PropTypes.shape({
        employer: PropTypes.string,
        styrk: PropTypes.string,
        location: PropTypes.string
    }).isRequired,
    getNextAd: PropTypes.func.isRequired,
    saveAd: PropTypes.func.isRequired,
    setAdminStatusAndGetNextAd: PropTypes.func.isRequired,
    closeModal: PropTypes.func.isRequired,
    openModal: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    validation: state.adValidation.errors,
    adStatus: state.adData.status,
    modalOpen: state.modal.modalOpen,
    nextClicked: state.modal.nextClicked,
    adminStatus: state.adData.administration.status
});

const mapDispatchToProps = (dispatch) => ({
    getNextAd: () => dispatch({ type: FETCH_NEXT_AD }),
    saveAd: () => dispatch({ type: SAVE_AD }),
    setAdminStatusAndGetNextAd: (status) => dispatch({ type: SET_ADMIN_STATUS_AND_GET_NEXT_AD, status }),
    closeModal: () => dispatch({ type: CLOSE_MODAL }),
    openModal: (value) => dispatch({ type: OPEN_MODAL, value })
});

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmationModal);

