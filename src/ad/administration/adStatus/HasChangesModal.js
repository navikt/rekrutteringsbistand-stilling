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

    onSaveClick = () => {
        this.props.closeModal();
        this.props.saveAd();
    };

    onPublishClick = () => {
        this.props.closeModal();
        this.props.publishAd();
    };

    render() {
        const { showHasChangesModal, adStatus } = this.props;
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
                    Lagre endringene
                </Undertittel>
                {adStatus === AdStatusEnum.INACTIVE && (
                    <div>
                        <Normaltekst className="blokk-s">
                            Vil du publisere annonsen med endringer før du går videre til neste annonse?
                        </Normaltekst>
                        <Hovedknapp onClick={this.onPublishClick}>
                            Publisér og gå til neste annonse
                        </Hovedknapp>
                        <Knapp onClick={this.onClose}>
                            Avbryt
                        </Knapp>
                    </div>
                )}
                {adStatus === AdStatusEnum.ACTIVE && (
                    <div>
                        <Normaltekst className="blokk-s">
                            Du har gjort endringer på en allerede publisert annonse. Vil du publisere endringene før du
                            går videre til neste annonse?
                        </Normaltekst>
                        <Hovedknapp onClick={this.onPublishClick}>
                            Publisér endringer og gå til neste annonse
                        </Hovedknapp>
                        <Knapp onClick={this.onClose}>
                            Avbryt
                        </Knapp>
                    </div>
                )}
                {(adStatus === AdStatusEnum.REJECTED || adStatus === AdStatusEnum.STOPPED) && (
                    <div>
                        <Normaltekst className="blokk-s">
                            Du har gjort endringer på annonsen. Vil du lagre før du går videre til neste annonse?
                        </Normaltekst>
                        <Hovedknapp onClick={this.onSaveClick}>
                            Lagre og gå til neste annonse
                        </Hovedknapp>
                        <Knapp onClick={this.onClose}>
                            Avbryt
                        </Knapp>
                    </div>
                )}
            </NavFrontendModal>
        );
    }
}

HasChangesModal.propTypes = {
    adStatus: PropTypes.string.isRequired,
    showHasChangesModal: PropTypes.bool.isRequired,
    closeModal: PropTypes.func.isRequired,
    saveAd: PropTypes.func.isRequired,
    publishAd: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    showHasChangesModal: state.ad.showHasChangesModal,
    adStatus: state.adData.status
});

const mapDispatchToProps = (dispatch) => ({
    closeModal: () => dispatch({ type: HIDE_HAS_CHANGES_MODAL }),
    saveAd: () => dispatch({ type: SAVE_AD, loadNext: true }),
    publishAd: () => dispatch({ type: PUBLISH_AD, loadNext: true })
});

export default connect(mapStateToProps, mapDispatchToProps)(HasChangesModal);

