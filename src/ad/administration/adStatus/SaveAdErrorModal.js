import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import NavFrontendModal from 'nav-frontend-modal';
import { Hovedknapp } from 'nav-frontend-knapper';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import { HIDE_AD_SAVED_ERROR_MODAL } from '../../adReducer';
import './SaveAdErrorModal.less';

class SaveAdErrorModal extends React.Component {
    onClose = () => {
        this.props.closeModal();
    };

    render() {
        const { showAdSavedErrorModal, validation } = this.props;
        return showAdSavedErrorModal && (
            <NavFrontendModal
                isOpen={showAdSavedErrorModal}
                contentLabel="Fortsett"
                onRequestClose={this.onClose}
                closeButton
                appElement={document.getElementById('app')}
                className="SaveAdErrorModal"
            >
                <Undertittel className="blokk-s">
                    Kan ikke lagre stillingen
                </Undertittel>
                <Normaltekst className="blokk-s">
                    Stillingen kan ikke lagres før følgende feil er rettet:
                </Normaltekst>
                <ul className="blokk-l">
                    {validation.title && (
                        <li className="skjemaelement__feilmelding">
                            {validation.title}
                        </li>
                    )}
                    {validation.comment && (
                        <li className="skjemaelement__feilmelding">
                            {validation.comment}
                        </li>
                    )}
                    {validation.styrk && (
                        <li className="skjemaelement__feilmelding">
                            {validation.styrk}
                        </li>
                    )}
                </ul>
                <Hovedknapp onClick={this.onClose}>
                    Lukk
                </Hovedknapp>
            </NavFrontendModal>
        );
    }
}

SaveAdErrorModal.propTypes = {
    showAdSavedErrorModal: PropTypes.bool.isRequired,
    validation: PropTypes.shape({
        title: PropTypes.string,
        comments: PropTypes.string,
        styrk: PropTypes.string
    }).isRequired,
    closeModal: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    validation: state.adValidation.errors,
    showAdSavedErrorModal: state.ad.showAdSavedErrorModal
});

const mapDispatchToProps = (dispatch) => ({
    closeModal: () => dispatch({ type: HIDE_AD_SAVED_ERROR_MODAL })
});

export default connect(mapStateToProps, mapDispatchToProps)(SaveAdErrorModal);

