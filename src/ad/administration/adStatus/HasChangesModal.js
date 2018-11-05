import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import NavFrontendModal from 'nav-frontend-modal';
import { Hovedknapp } from 'nav-frontend-knapper';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import { DELETE_AD_AND_REDIRECT, HIDE_HAS_CHANGES_MODAL } from '../../adReducer';
import './HasChangesModal.less';

class HasChangesModal extends React.Component {
    onClose = () => {
        this.props.closeModal();
    };

    onLeaveClick = () => {
        const { updated, created, closeModal, deleteAdAndRedirect } = this.props;
        if (updated === created) {
            deleteAdAndRedirect('/mine');
        }
        closeModal();
    };

    render() {
        const { showHasChangesModal, updated, created } = this.props;
        return (
            <NavFrontendModal
                isOpen={showHasChangesModal}
                contentLabel="Fortsett"
                onRequestClose={this.onClose}
                closeButton
                appElement={document.getElementById('app')}
                className="HasChangesModal"
            >
                {updated === created ? (
                    <Undertittel className="blokk-s">
                        Du har startet registrering av en ny stilling
                    </Undertittel>
                ) : (
                    <Undertittel className="blokk-s">
                        Du har gjort endringer på stillingen
                    </Undertittel>
                )}
                <div>
                    <Normaltekst className="blokk-l">
                        Hvis du navigerer bort fra denne siden uten å lagre så mister du informasjonen.
                    </Normaltekst>
                    <Hovedknapp onClick={this.onClose}>
                        Bli på siden
                    </Hovedknapp>
                    <Hovedknapp
                        className="lenke"
                        onClick={this.onLeaveClick}
                    >
                        Forlat siden
                    </Hovedknapp>
                </div>
            </NavFrontendModal>
        );
    }
}

HasChangesModal.defaultProps = {
    updated: undefined,
    created: undefined
};

HasChangesModal.propTypes = {
    showHasChangesModal: PropTypes.bool.isRequired,
    closeModal: PropTypes.func.isRequired,
    deleteAdAndRedirect: PropTypes.func.isRequired,
    updated: PropTypes.string,
    created: PropTypes.string
};

const mapStateToProps = (state) => ({
    showHasChangesModal: state.ad.showHasChangesModal,
    adStatus: state.adData.status,
    updated: state.adData.updated,
    created: state.adData.created
});

const mapDispatchToProps = (dispatch) => ({
    closeModal: () => dispatch({ type: HIDE_HAS_CHANGES_MODAL }),
    deleteAdAndRedirect: (url) => dispatch({ type: DELETE_AD_AND_REDIRECT, url })
});

export default connect(mapStateToProps, mapDispatchToProps)(HasChangesModal);

