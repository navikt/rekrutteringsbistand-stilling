import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import NavFrontendModal from 'nav-frontend-modal';
import { Hovedknapp } from 'nav-frontend-knapper';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import { HIDE_PUBLISH_ERROR_MODAL } from '../../adReducer';
import './PublishErrorModal.less';

class PublishErrorModal extends React.Component {
    onClose = () => {
        this.props.closeModal();
    };

    render() {
        const { showPublishErrorModal, validation } = this.props;
        return (
            <NavFrontendModal
                isOpen={showPublishErrorModal}
                contentLabel="Fortsett"
                onRequestClose={this.onClose}
                closeButton
                appElement={document.getElementById('app')}
                className="PublishErrorModal"
            >
                <Undertittel className="blokk-s">
                    Kan ikke publisere annonsen
                </Undertittel>
                <Normaltekst className="blokk-s">
                    Annonsen kan ikke publiseres før følgende feil er rettet:
                </Normaltekst>
                <ul className="blokk-s">
                    {validation.styrk && (
                        <li className="skjemaelement__feilmelding">
                            {validation.styrk}
                        </li>
                    )}
                    {validation.location && (
                        <li className="skjemaelement__feilmelding">
                            {validation.location}
                        </li>
                    )}
                    {validation.employer && (
                        <li className="skjemaelement__feilmelding">
                            {validation.employer}
                        </li>
                    )}
                    {validation.published && (
                        <li className="skjemaelement__feilmelding">
                            {validation.published}
                        </li>
                    )}
                    {validation.expires && (
                        <li className="skjemaelement__feilmelding">
                            {validation.expires}
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

PublishErrorModal.propTypes = {
    showPublishErrorModal: PropTypes.bool.isRequired,
    validation: PropTypes.shape({
        employer: PropTypes.string,
        styrk: PropTypes.string,
        location: PropTypes.string
    }).isRequired,
    closeModal: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    validation: state.adValidation.errors,
    showPublishErrorModal: state.ad.showPublishErrorModal
});

const mapDispatchToProps = (dispatch) => ({
    closeModal: () => dispatch({ type: HIDE_PUBLISH_ERROR_MODAL })
});

export default connect(mapStateToProps, mapDispatchToProps)(PublishErrorModal);

