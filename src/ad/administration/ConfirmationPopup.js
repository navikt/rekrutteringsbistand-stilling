import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import NavFrontendModal from 'nav-frontend-modal';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import { Hovedknapp, Knapp } from 'nav-frontend-knapper';
import AdminStatusEnum from './adminStatus/AdminStatusEnum';
import {DISCARD_AD_CHANGES, FETCH_NEXT_AD, SAVE_AD} from '../adReducer';
import {
    SET_ADMIN_STATUS,
    SET_ADMIN_STATUS_AND_GET_NEXT_AD
} from '../adDataReducer';
import './ConfirmationPopup.less';

class ConfirmationPopup extends React.Component {
    componentDidMount() {
        NavFrontendModal.setAppElement('#app');
    }

    onSaveClick = () => {
        if (!this.props.next) {
            this.props.setAdminStatus(AdminStatusEnum.DONE);
            this.props.onClosePopup();
        }
        this.props.saveAd();
    };

    onNotSaveClick = () => {
        this.props.discardAdChanges();
        if (!this.props.next) {
            this.props.setAdminStatus(AdminStatusEnum.DONE);
            this.props.onClosePopup();
        }
    };

    onNextAndFinishClick = () => {
        this.props.setAdminStatusAndGetNextAd(AdminStatusEnum.DONE);
    };

    onNextWithoutFinishClick = () => {
        this.props.getNextAd();
    };

    render() {
        const { isOpen, onClosePopup, isEditingAd } = this.props;
        return (
            <NavFrontendModal
                isOpen={isOpen}
                contentLabel="Fortsett"
                onRequestClose={onClosePopup}
                className="blokk-m"
                closeButton
            >
                {isEditingAd ? (
                    <div>
                        <Undertittel className="ConfirmationPopup__title">
                            Annonsen er ikke lagret
                        </Undertittel>
                        <Normaltekst className="ConfirmationPopup__message">
                            Er du sikker på at du vil fortsette uten å lagre?
                        </Normaltekst>
                        <Hovedknapp
                            onClick={this.onSaveClick}
                            className="ConfirmationPopup__button"
                        >
                            Lagre
                        </Hovedknapp>
                        <Knapp
                            onClick={this.onNotSaveClick}
                            className="ConfirmationPopup__button"
                        >
                            Ikke lagre
                        </Knapp>
                    </div>

                ) : (
                    <div>
                        <Undertittel className="ConfirmationPopup__title">
                            Saksbehandling er ikke avsluttet
                        </Undertittel>
                        <Normaltekst className="ConfirmationPopup__message">
                            Er du sikker på at du vil fortsette uten å avslutte?
                        </Normaltekst>
                        <Hovedknapp
                            onClick={this.onNextAndFinishClick}
                            className="ConfirmationPopup__button"
                        >
                            Avslutt og gå til neste
                        </Hovedknapp>
                        <Knapp
                            onClick={this.onNextWithoutFinishClick}
                            className="ConfirmationPopup__button"
                        >
                            Fortsett uten å avslutte
                        </Knapp>
                    </div>
                )}
            </NavFrontendModal>
        );
    }
}

ConfirmationPopup.propTypes = {
    setAdminStatus: PropTypes.func.isRequired,
    discardAdChanges: PropTypes.func.isRequired,
    saveAd: PropTypes.func.isRequired,
    isEditingAd: PropTypes.bool.isRequired,
    getNextAd: PropTypes.func.isRequired,
    setAdminStatusAndGetNextAd: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    isEditingAd: state.ad.isEditingAd
});

const mapDispatchToProps = (dispatch) => ({
    setAdminStatus: (status) => dispatch({ type: SET_ADMIN_STATUS, status }),
    saveAd: () => dispatch({ type: SAVE_AD }),
    discardAdChanges: () => dispatch({ type: DISCARD_AD_CHANGES }),
    setAdminStatusAndGetNextAd: (status) => dispatch({ type: SET_ADMIN_STATUS_AND_GET_NEXT_AD, status }),
    getNextAd: () => dispatch({ type: FETCH_NEXT_AD })
});

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmationPopup);
