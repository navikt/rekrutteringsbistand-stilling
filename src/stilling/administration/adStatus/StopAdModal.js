import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Flatknapp, Hovedknapp } from 'nav-frontend-knapper';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import { HIDE_STOP_AD_MODAL, STOP_AD, STOP_AD_FROM_MY_ADS } from '../../adReducer';
import './StopAdModal.less';
import Notat from '../notat/Notat';
import ModalMedStillingScope from '../../../common/ModalMedStillingScope';

class StopAdModal extends React.Component {
    onClose = () => {
        this.props.closeModal();
    };

    onStopAdClick = () => {
        if (this.props.validation.notat === undefined) {
            this.props.closeModal();

            if (this.props.fromMyAds) {
                this.props.stopAdFromMyAds();
            } else {
                this.props.stop();
            }
        }
    };

    render() {
        const { showStopAdModal, title } = this.props;
        return (
            <ModalMedStillingScope
                isOpen={showStopAdModal}
                contentLabel="Fortsett"
                onRequestClose={this.onClose}
                closeButton
                className="StopAdModal"
            >
                <Undertittel className="blokk-s">Stopp stillingen</Undertittel>
                <Normaltekst className="blokk-l">
                    {`Er du sikker på at du ønsker å stoppe "${title}"? Stopper du stillingen
                    vil den ikke lenger være tilgjengelig for søk.`}
                </Normaltekst>
                <div className="StopAdModal__Notat">
                    <Notat />
                </div>
                <div className="StopAdModal__buttons">
                    <Hovedknapp onClick={this.onStopAdClick}>Stopp stillingen</Hovedknapp>
                    <Flatknapp onClick={this.onClose}>Avbryt</Flatknapp>
                </div>
            </ModalMedStillingScope>
        );
    }
}

StopAdModal.defaultProps = {
    fromMyAds: false,
    title: undefined,
};

StopAdModal.propTypes = {
    showStopAdModal: PropTypes.bool.isRequired,
    closeModal: PropTypes.func.isRequired,
    stop: PropTypes.func.isRequired,
    stopAdFromMyAds: PropTypes.func.isRequired,
    validation: PropTypes.shape({
        notat: PropTypes.string,
    }).isRequired,
    fromMyAds: PropTypes.bool,
    title: PropTypes.string,
};

const mapStateToProps = (state) => ({
    showStopAdModal: state.ad.showStopAdModal,
    validation: state.adValidation.errors,
    title: state.adData.title,
});

const mapDispatchToProps = (dispatch) => ({
    closeModal: () => dispatch({ type: HIDE_STOP_AD_MODAL }),
    stop: () => dispatch({ type: STOP_AD }),
    stopAdFromMyAds: () => dispatch({ type: STOP_AD_FROM_MY_ADS }),
});

export default connect(mapStateToProps, mapDispatchToProps)(StopAdModal);
