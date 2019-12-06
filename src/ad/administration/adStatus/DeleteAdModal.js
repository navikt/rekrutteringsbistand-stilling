import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import NavFrontendModal from 'nav-frontend-modal';
import { Flatknapp, Hovedknapp } from 'nav-frontend-knapper';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import './DeleteAdModal.less';
import { DELETE_AD_FROM_MY_ADS, HIDE_DELETE_AD_MODAL } from '../../adReducer';

class DeleteAdModal extends React.Component {
    onClose = () => {
        this.props.closeModal();
    };

    onDeleteAdClick = () => {
        this.props.deleteAd();
        this.props.closeModal();
    };

    render() {
        const { showDeleteAdModal, title } = this.props;
        return (
            <NavFrontendModal
                isOpen={showDeleteAdModal}
                contentLabel="Fortsett"
                onRequestClose={this.onClose}
                closeButton
                appElement={document.getElementById('app')}
                className="DeleteAdModal"
            >
                <Undertittel className="blokk-s">Slett stilling og kandidatliste</Undertittel>
                <Normaltekst className="blokk-l">
                    {`Er du sikker på at du ønsker å slette "${title}" og tilhørende kandidatliste?
                    Stillinger og kandidatlister som er slettet vises ikke i løsningen.`}
                </Normaltekst>
                <div className="DeleteAdModal__buttons">
                    <Hovedknapp onClick={this.onDeleteAdClick}>Slett</Hovedknapp>
                    <Flatknapp onClick={this.onClose}>Avbryt</Flatknapp>
                </div>
            </NavFrontendModal>
        );
    }
}

DeleteAdModal.defaultProps = {
    title: undefined,
};

DeleteAdModal.propTypes = {
    closeModal: PropTypes.func.isRequired,
    deleteAd: PropTypes.func.isRequired,
    showDeleteAdModal: PropTypes.bool.isRequired,
    title: PropTypes.string,
};

const mapStateToProps = state => ({
    showDeleteAdModal: state.ad.showDeleteAdModal,
    title: state.adData.title,
});

const mapDispatchToProps = dispatch => ({
    closeModal: () => dispatch({ type: HIDE_DELETE_AD_MODAL }),
    deleteAd: () => dispatch({ type: DELETE_AD_FROM_MY_ADS }),
});

export default connect(mapStateToProps, mapDispatchToProps)(DeleteAdModal);
