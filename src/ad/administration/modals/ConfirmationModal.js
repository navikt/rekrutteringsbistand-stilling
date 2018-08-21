import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './ConfirmationModal.less';
import { FETCH_NEXT_AD } from '../../adReducer';
import { CLOSE_MODAL } from './modalReducer';
import AdContainsErrorPopup, { adContainsError } from '../errorPopup/AdContainsErrorPopup';

class ConfirmationModal extends React.Component {
    onClose = () => {
        this.props.closeModal();
    };

    render() {
        const { modalOpen, validation, adStatus } = this.props;
        if (adContainsError(adStatus, validation)) {
            return (
                <AdContainsErrorPopup
                    isOpen={modalOpen}
                    onClose={this.onClose}
                    validation={validation}
                    adStatus={adStatus}
                />
            );
        }
        return (<div />);
    }
}

ConfirmationModal.propTypes = {
    modalOpen: PropTypes.bool.isRequired,
    adStatus: PropTypes.string.isRequired,
    validation: PropTypes.shape({
        employer: PropTypes.string,
        styrk: PropTypes.string,
        location: PropTypes.string
    }).isRequired,
    closeModal: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    validation: state.adValidation.errors,
    adStatus: state.adData.status,
    modalOpen: state.modal.modalOpen
});

const mapDispatchToProps = (dispatch) => ({
    getNextAd: () => dispatch({ type: FETCH_NEXT_AD }),
    closeModal: () => dispatch({ type: CLOSE_MODAL })
});

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmationModal);

