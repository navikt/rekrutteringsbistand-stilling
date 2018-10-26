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
        return showPublishErrorModal && (
            <NavFrontendModal
                isOpen={showPublishErrorModal}
                contentLabel="Fortsett"
                onRequestClose={this.onClose}
                closeButton
                appElement={document.getElementById('app')}
                className="PublishErrorModal"
            >
                <Undertittel className="blokk-s">
                    Kan ikke publisere stillingen
                </Undertittel>
                <Normaltekst className="blokk-s">
                    Stillingen kan ikke publiseres før følgende feil er rettet:
                </Normaltekst>
                <ul className="blokk-s">
                    {Object.keys(validation).map((key) => (
                        validation[key] && (
                            <li className="skjemaelement__feilmelding" key={key}>
                                {validation[key]}
                            </li>
                        )
                    ))}
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
        location: PropTypes.string,
        title: PropTypes.string,
        adText: PropTypes.string,
        published: PropTypes.string,
        expires: PropTypes.string,
        postalCode: PropTypes.string
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

