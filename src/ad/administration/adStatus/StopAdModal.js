import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import NavFrontendModal from 'nav-frontend-modal';
import { Hovedknapp, Knapp } from 'nav-frontend-knapper';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import { HIDE_STOP_AD_MODAL, STOP_AD } from '../../adReducer';
import './StopAdModal.less';


class StopAdModal extends React.Component {
    onClose = () => {
        this.props.closeModal();
    };

    onStopAdClick = () => {
        this.props.closeModal();
        this.props.stop();
    };

    render() {
        const { showStopAdModal } = this.props;
        return (
            <NavFrontendModal
                isOpen={showStopAdModal}
                contentLabel="Fortsett"
                onRequestClose={this.onClose}
                closeButton
                appElement={document.getElementById('app')}
                className="StopReasonModal"
            >
                <Undertittel className="blokk-s">
                    Stopp stillingen
                </Undertittel>
                <Normaltekst>
                    Er du sikker på at du ønsker å stoppe stillingen? Stopper du stillingen
                    vil den ikke lenger være tilgjengelig for søk.
                </Normaltekst>
                <div className="StopReasonModal__buttons">
                    <Hovedknapp onClick={this.onStopAdClick}>Stopp stillingen</Hovedknapp>
                    <Knapp onClick={this.onClose}>Avbryt</Knapp>
                </div>
            </NavFrontendModal>
        );
    }
}

StopAdModal.propTypes = {
    showStopAdModal: PropTypes.bool.isRequired,
    closeModal: PropTypes.func.isRequired,
    stop: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    showStopAdModal: state.ad.showStopAdModal
});

const mapDispatchToProps = (dispatch) => ({
    closeModal: () => dispatch({ type: HIDE_STOP_AD_MODAL }),
    stop: () => dispatch({ type: STOP_AD })
});

export default connect(mapStateToProps, mapDispatchToProps)(StopAdModal);
