import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import NavFrontendModal from 'nav-frontend-modal';
import {Normaltekst, Undertittel} from "nav-frontend-typografi";
import {Hovedknapp, Knapp} from "nav-frontend-knapper";
import AdminStatusEnum from "./AdminStatusEnum";
import {DISCARD_AD_CHANGES, SAVE_AD, SET_ADMIN_STATUS} from "../adReducer";
import './ConfirmationPopup.less';

class ConfirmationPopup extends React.Component {
    componentDidMount() {
        NavFrontendModal.setAppElement('#app');
    }

    onSaveClick = () => {
        this.props.setAdminStatus(AdminStatusEnum.DONE);
        this.props.saveAd();
    };

    onNotSaveClick = () => {
        this.props.discardAdChanges();
        this.props.setAdminStatus(AdminStatusEnum.DONE);
        this.props.saveAd();
    };

    render() {
        const { isOpen, onCancel } = this.props;
        return (
            <NavFrontendModal
                isOpen={isOpen}
                contentLabel={'Fortsett'}
                onRequestClose={onCancel}
                className="blokk-m"
                closeButton
            >
                <div>
                    <Undertittel className="ConfirmationPopup__title">
                        Annonsen er ikke lagret
                    </Undertittel>
                    <Normaltekst className="ConfirmationPopup__message">
                        Er du sikker på at du vil fortsette uten å lagre?
                    </Normaltekst>
                    <Hovedknapp
                        onClick={this.onSaveClick}
                        className="ConfirmationPopup__button"
                    >
                        Lagre
                    </Hovedknapp>
                    <Knapp
                        onClick={this.onNotSaveClick}
                        className="ConfirmationPopup__button"
                    >
                        Ikke lagre
                    </Knapp>
                </div>
            </NavFrontendModal>
        );
    }
}

ConfirmationPopup.propTypes = {
    setAdminStatus: PropTypes.func.isRequired,
    saveAd: PropTypes.func.isRequired,
    discardAdChanges: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = (dispatch) => ({
    setAdminStatus: (status) => dispatch({ type: SET_ADMIN_STATUS, status }),
    saveAd: () => dispatch({ type: SAVE_AD }),
    discardAdChanges: () => dispatch({ type: DISCARD_AD_CHANGES })
});

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmationPopup);
