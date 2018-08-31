import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import NavFrontendModal from 'nav-frontend-modal';
import { Hovedknapp, Knapp } from 'nav-frontend-knapper';
import { Undertittel } from 'nav-frontend-typografi';
import { HIDE_REJECT_REASON_MODAL, REJECT_AD } from '../../adReducer';
import RemarksEdit from './RemarksEdit';
import './RejectReasonModal.less';

class RejectReasonModal extends React.Component {
    onClose = () => {
        this.props.closeModal();
    };

    onRejectClick = () => {
        this.props.reject();
    };

    render() {
        const { showRejectReasonModal } = this.props;
        return (
            <NavFrontendModal
                isOpen={showRejectReasonModal}
                contentLabel="Fortsett"
                onRequestClose={this.onClose}
                closeButton
                appElement={document.getElementById('app')}
                className="RejectReasonModal"
            >
                <Undertittel className="blokk-s">
                    Avvis annonsen
                </Undertittel>
                <div className="blokk">
                    <RemarksEdit />
                </div>
                <div className="RejectReasonModal__buttons">
                    <Hovedknapp onClick={this.onRejectClick}>Avvis</Hovedknapp>
                    <Knapp onClick={this.onClose}>Avbryt</Knapp>
                </div>
            </NavFrontendModal>
        );
    }
}

RejectReasonModal.propTypes = {
    showRejectReasonModal: PropTypes.bool.isRequired,
    closeModal: PropTypes.func.isRequired,
    reject: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    showRejectReasonModal: state.ad.showRejectReasonModal
});

const mapDispatchToProps = (dispatch) => ({
    closeModal: () => dispatch({ type: HIDE_REJECT_REASON_MODAL }),
    reject: () => dispatch({ type: REJECT_AD })
});

export default connect(mapStateToProps, mapDispatchToProps)(RejectReasonModal);

