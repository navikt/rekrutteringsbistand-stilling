import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Hovedknapp } from 'nav-frontend-knapper';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import LinkButton from '../../common/linkbutton/LinkButton';
import { DELETE_AD_AND_REDIRECT } from '../adReducer';
import './HasChangesModal.less';
import ModalMedStillingScope from '../../ModalMedStillingScope';

class HasChangesModal extends React.Component {
    onClose = () => {
        this.props.closeModal();
    };

    // onLeaveClick = () => {
    //     const {
    //         updated,
    //         created,
    //         closeModal,
    //         deleteAdAndRedirect,
    //         hasChangesLeaveUrl,
    //     } = this.props;
    //     if (updated === created) {
    //         deleteAdAndRedirect();
    //     } else {
    //         window.location.pathname = hasChangesLeaveUrl;
    //     }
    //     closeModal();
    // };

    slettStillingOgForlatSiden = () => {
        console.log('Slett stilling, forlat siden');

        setTimeout(() => {
            this.props.forlatSiden();
        }, 1000);
    };

    render() {
        const { showHasChangesModal, updated, created } = this.props;

        return (
            <ModalMedStillingScope
                isOpen={showHasChangesModal}
                contentLabel="Fortsett"
                onRequestClose={this.props.bliPåSiden}
                closeButton
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
                        Hvis du navigerer bort fra denne siden uten å lagre så mister du
                        informasjonen.
                    </Normaltekst>
                    <Hovedknapp onClick={this.props.bliPåSiden}>Bli på siden</Hovedknapp>
                    <LinkButton className="lenke" onClick={this.slettStillingOgForlatSiden}>
                        Forlat siden
                    </LinkButton>
                </div>
            </ModalMedStillingScope>
        );
    }
}

HasChangesModal.defaultProps = {
    updated: undefined,
    created: undefined,
    // hasChangesLeaveUrl: '/stillinger/mineStillinger',
};

HasChangesModal.propTypes = {
    bliPåSiden: PropTypes.func.isRequired,
    forlatSiden: PropTypes.func.isRequired,

    showHasChangesModal: PropTypes.bool.isRequired,
    // hasChangesLeaveUrl: PropTypes.string,
    // closeModal: PropTypes.func.isRequired,
    deleteAdAndRedirect: PropTypes.func.isRequired,
    updated: PropTypes.string,
    created: PropTypes.string,
};

const mapStateToProps = (state) => ({
    //showHasChangesModal: state.ad.showHasChangesModal,
    // hasChangesLeaveUrl: state.ad.hasChangesLeaveUrl,
    //leavePageTrigger: state.ad.leavePageTrigger,
    adStatus: state.adData.status,
    updated: state.adData.updated,
    created: state.adData.created,
});

const mapDispatchToProps = (dispatch) => ({
    //closeModal: () => dispatch({ type: HIDE_HAS_CHANGES_MODAL }),
    deleteAdAndRedirect: () => dispatch({ type: DELETE_AD_AND_REDIRECT }),
});

export default connect(mapStateToProps, mapDispatchToProps)(HasChangesModal);
