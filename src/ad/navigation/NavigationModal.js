import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import NavFrontendModal from 'nav-frontend-modal';
import { Hovedknapp } from 'nav-frontend-knapper';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import LinkButton from '../../common/linkbutton/LinkButton';
import { DELETE_AD_FROM_MY_ADS } from '../adReducer';
import './NavigationModal.less';

class NavigationModal extends React.Component {
    onLeaveClick = () => {
        const { updated, created, onConfirm, deleteAd } = this.props;
        if (updated === created) {
            deleteAd();
        }
        onConfirm();
    };

    render() {
        const { isOpen, onCancel, updated, created } = this.props;
        return (
            <NavFrontendModal
                isOpen={isOpen}
                contentLabel="Forlate siden?"
                onRequestClose={onCancel}
                closeButton
                appElement={document.getElementById('app')}
                className="NavigationModal"
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
                    <Hovedknapp onClick={onCancel}>
                        Bli på siden
                    </Hovedknapp>
                    <LinkButton
                        className="lenke"
                        onClick={this.onLeaveClick}
                    >
                        Forlat siden
                    </LinkButton>
                </div>
            </NavFrontendModal>
        );
    }
}

NavigationModal.defaultProps = {
    created: undefined,
    updated: undefined
};

NavigationModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    updated: PropTypes.string,
    created: PropTypes.string,
    onCancel: PropTypes.func.isRequired,
    onConfirm: PropTypes.func.isRequired,
    deleteAd: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    adStatus: state.adData.status,
    updated: state.adData.updated,
    created: state.adData.created
});


const mapDispatchToProps = (dispatch) => ({
    deleteAd: () => dispatch({ type: DELETE_AD_FROM_MY_ADS })
});

export default connect(mapStateToProps, mapDispatchToProps)(NavigationModal);
