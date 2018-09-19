import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import NavFrontendModal from 'nav-frontend-modal';
import { Hovedknapp, Knapp } from 'nav-frontend-knapper';
import { Undertittel } from 'nav-frontend-typografi';
import { HIDE_STOP_AD_MODAL, STOP_AD } from '../../adReducer';
import CommentsEdit from './CommentsEdit';
import './StopReasonModal.less';


class StopReasonModal extends React.Component {
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
                    Stopp annonsen
                </Undertittel>
                <CommentsEdit
                    label="Hvorfor skal annonsen stoppes?"
                    placeholder="Skriv inn årsak"
                />
                <div className="StopReasonModal__buttons">
                    <Hovedknapp onClick={this.onStopAdClick}>Stopp annonsen</Hovedknapp>
                    <Knapp onClick={this.onClose}>Avbryt</Knapp>
                </div>
            </NavFrontendModal>
        );
    }
}

StopReasonModal.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(StopReasonModal);
