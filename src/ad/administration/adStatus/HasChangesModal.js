import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import NavFrontendModal from 'nav-frontend-modal';
import { Hovedknapp, Knapp } from 'nav-frontend-knapper';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import { HIDE_HAS_CHANGES_MODAL, PUBLISH_AD, SAVE_AD } from '../../adReducer';
import AdStatusEnum from './AdStatusEnum';
import './HasChangesModal.less';

class HasChangesModal extends React.Component {
    onClose = () => {
        this.props.closeModal();
    };

    onLeaveClick = () => {
        this.props.closeModal();
        window.location.href = '/';
    };

    render() {
        const { showHasChangesModal } = this.props;
        return (
            <NavFrontendModal
                isOpen={showHasChangesModal}
                contentLabel="Fortsett"
                onRequestClose={this.onClose}
                closeButton
                appElement={document.getElementById('app')}
                className="HasChangesModal"
            >
                <Undertittel className="blokk-s">
                    Du har startet registrering av en ny stilling
                </Undertittel>
                <div>
                    <Normaltekst className="blokk-s">
                        Hvis du navigerer bort fra denne siden uten å lagre så mister du informasjonen.
                    </Normaltekst>
                    <Hovedknapp onClick={this.onLeaveClick}>
                        Forlat siden
                    </Hovedknapp>
                    <Knapp onClick={this.onClose}>
                        Bli på siden
                    </Knapp>
                </div>
            </NavFrontendModal>
        );
    }
}

HasChangesModal.propTypes = {
    showHasChangesModal: PropTypes.bool.isRequired,
    closeModal: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    showHasChangesModal: state.ad.showHasChangesModal,
    adStatus: state.adData.status
});

const mapDispatchToProps = (dispatch) => ({
    closeModal: () => dispatch({ type: HIDE_HAS_CHANGES_MODAL }),
    saveAd: () => dispatch({ type: SAVE_AD, loadNext: true })
});

export default connect(mapStateToProps, mapDispatchToProps)(HasChangesModal);

