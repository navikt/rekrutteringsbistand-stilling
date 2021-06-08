import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Hovedknapp } from 'nav-frontend-knapper';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import { HIDE_AD_SAVED_ERROR_MODAL } from '../../adReducer';
import './SaveAdErrorModal.less';
import ModalMedStillingScope from '../../../ModalMedStillingScope';

class SaveAdErrorModal extends React.Component {
    onClose = () => {
        this.props.closeModal();
    };

    render() {
        const { showAdSavedErrorModal, validation } = this.props;
        return (
            showAdSavedErrorModal && (
                <ModalMedStillingScope
                    isOpen={showAdSavedErrorModal}
                    contentLabel="Fortsett"
                    onRequestClose={this.onClose}
                    closeButton
                    className="SaveAdErrorModal"
                >
                    <Undertittel className="blokk-s">Kan ikke lagre stillingen</Undertittel>
                    <Normaltekst className="blokk-s">
                        Stillingen kan ikke lagres før følgende feil er rettet:
                    </Normaltekst>
                    <Normaltekst tag="ul" className="blokk-l">
                        {validation.title && (
                            <li className="skjemaelement__feilmelding">{validation.title}</li>
                        )}
                        {validation.notat && (
                            <li className="skjemaelement__feilmelding">{validation.notat}</li>
                        )}
                        {validation.styrk && (
                            <li className="skjemaelement__feilmelding">{validation.styrk}</li>
                        )}
                        {validation.applicationEmail && (
                            <li className="skjemaelement__feilmelding">
                                {validation.applicationEmail}
                            </li>
                        )}
                        {validation.contactPersonEmail && (
                            <li className="skjemaelement__feilmelding">
                                {validation.contactPersonEmail}
                            </li>
                        )}
                        {validation.contactPersonPhone && (
                            <li className="skjemaelement__feilmelding">
                                {validation.contactPersonPhone}
                            </li>
                        )}
                        {validation.postalCode && (
                            <li className="skjemaelement__feilmelding">{validation.postalCode}</li>
                        )}
                    </Normaltekst>
                    <Hovedknapp onClick={this.onClose}>Lukk</Hovedknapp>
                </ModalMedStillingScope>
            )
        );
    }
}

SaveAdErrorModal.propTypes = {
    showAdSavedErrorModal: PropTypes.bool.isRequired,
    validation: PropTypes.shape({
        title: PropTypes.string,
        notat: PropTypes.string,
        styrk: PropTypes.string,
        applicationEmail: PropTypes.string,
        contactPersonEmail: PropTypes.string,
        contactPersonPhone: PropTypes.string,
        postalCode: PropTypes.string,
    }).isRequired,
    closeModal: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    validation: state.adValidation.errors,
    showAdSavedErrorModal: state.ad.showAdSavedErrorModal,
});

const mapDispatchToProps = (dispatch) => ({
    closeModal: () => dispatch({ type: HIDE_AD_SAVED_ERROR_MODAL }),
});

export default connect(mapStateToProps, mapDispatchToProps)(SaveAdErrorModal);
