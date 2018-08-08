import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Hovedknapp, Fareknapp, Knapp } from 'nav-frontend-knapper';
import { Normaltekst, EtikettLiten } from 'nav-frontend-typografi';
import Modal from 'nav-frontend-modal';
import Etikett from 'nav-frontend-etiketter';
import AlertStripe from 'nav-frontend-alertstriper';
import Remarks from './Remarks';
import AdminStatusEnum from './AdminStatusEnum';
import AdStatusEnum from './AdStatusEnum';
import { FETCH_NEXT_AD, SET_AD_STATUS, SET_ADMIN_STATUS, FETCH_AD, SAVE_AD } from './../adReducer';
import './Administration.less';
import { TOGGLE_REMARKS_FORM } from './administrationReducer';
import { registerShortcuts } from '../../common/shortcuts/Shortcuts';

class Administration extends React.Component {
    componentDidMount() {
        registerShortcuts('annonseDetaljer', {
            'g g': () => {
                this.props.setAdStatus(AdStatusEnum.ACTIVE);
            },
            'a a': () => {
                this.props.setAdStatus(AdStatusEnum.REJECTED);
            },
            's s': () => {
                this.props.setAdStatus(AdStatusEnum.STOPPED);
            },
            'v n': () => {
                this.props.getNextAd();
            }
        });

        const { adUuid } = this.props;
        const uuidHasChangedInUrl = adUuid !== this.props.match.params.uuid;
        if (uuidHasChangedInUrl) {
            this.props.history.push(`/ads/${adUuid}`);
        }
    }

    componentDidUpdate() {
        const { adUuid } = this.props;
        const uuidHasChangedInUrl = adUuid !== this.props.match.params.uuid;
        if (uuidHasChangedInUrl) {
            this.props.getStilling(this.props.match.params.uuid);
        }
    }

    onPublishClick = () => {
        this.props.setAdStatus(AdStatusEnum.ACTIVE);
        this.props.setAdminStatus(AdminStatusEnum.DONE);
        this.props.saveAd();
    };

    onRejectClick = () => {
        this.props.toggleRemarksForm();
    };

    onRejectConfirmClick = () => {
        this.props.toggleRemarksForm();
        this.props.setAdStatus(AdStatusEnum.REJECTED);
        this.props.setAdminStatus(AdminStatusEnum.DONE);
        this.props.saveAd();
    };

    onStopClick = () => {
        this.props.setAdStatus(AdStatusEnum.STOPPED);
        this.props.setAdminStatus(AdminStatusEnum.DONE);
        this.props.saveAd();
    };

    onNextClick = () => {
        this.props.getNextAd();
    };

    onSetToReceivedClick = (e) => {
        e.preventDefault();
        this.props.setAdminStatus(AdminStatusEnum.RECEIVED);
    };

    onSetToPendingClick = (e) => {
        e.preventDefault();
        this.props.setAdminStatus(AdminStatusEnum.PENDING);
    };

    render() {
        const {
            adminStatus, isSavingAd, adStatus, showRemarksForm
        } = this.props;
        return (
            <div className="Administration">
                <div className="Administration__adminStatus">
                    {adminStatus === AdminStatusEnum.RECEIVED && (
                        <Normaltekst>
                            Ikke behandlet (<a href="#" className="lenke" onClick={this.onSetToPendingClick}>Start
                            saksbehnadling
                        </a>)
                        </Normaltekst>
                    )}
                    {adminStatus === AdminStatusEnum.PENDING && (
                        <Normaltekst>
                            Under behandling (<a href="#" className="lenke" onClick={this.onSetToReceivedClick}>Stopp
                            saksbehnadling
                        </a>)
                        </Normaltekst>
                    )}
                    {adminStatus === AdminStatusEnum.DONE && (
                        <Normaltekst>
                            Ferdigbehandlet (<a href="#" className="lenke" onClick={this.onSetToPendingClick}>Gjennåpne
                            saksbehnadling
                        </a>)
                        </Normaltekst>
                    )}
                </div>
                <div className="Administration__adStatus">
                    {adStatus === AdStatusEnum.INACTIVE && (
                        <AlertStripe type="info" solid>
                            Annonsen er ikke publisert
                        </AlertStripe>
                    )}
                    {adStatus === AdStatusEnum.ACTIVE && (
                        <AlertStripe type="suksess" solid>
                            Annonsen er publisert
                        </AlertStripe>
                    )}
                    {adStatus === AdStatusEnum.REJECTED && (
                        <AlertStripe type="advarsel" solid>
                            Annonsen er avvist
                        </AlertStripe>
                    )}
                    {adStatus === AdStatusEnum.STOPPED && (
                        <AlertStripe type="stopp" solid>
                            Annonsen er stoppet
                        </AlertStripe>
                    )}
                    {adStatus === AdStatusEnum.DELETED && (
                        <AlertStripe type="advarsel">
                            Annonsen er slettet
                        </AlertStripe>
                    )}
                </div>
                <div className="Administration__changeAdStatus">
                    {adStatus === AdStatusEnum.INACTIVE && (
                        <Hovedknapp className="Administration__button" onClick={this.onPublishClick}>
                            Publisér annonsen
                        </Hovedknapp>
                    )}
                    {adStatus === AdStatusEnum.STOPPED && (
                        <Hovedknapp className="Administration__button" onClick={this.onPublishClick}>
                            Publisér annonsen på nytt
                        </Hovedknapp>
                    )}
                    {(adStatus === AdStatusEnum.INACTIVE || adStatus === AdStatusEnum.STOPPED) && (
                        <Knapp className="Administration__button" onClick={this.onRejectClick}>
                            Avvis annonsen
                        </Knapp>
                    )}
                    {adminStatus !== AdminStatusEnum.PENDING && (
                        <Knapp className="Administration__button" onClick={this.onNextClick}>
                            Neste annonse
                        </Knapp>
                    )}
                    {adStatus === AdStatusEnum.ACTIVE && (
                        <Fareknapp className="Administration__button" onClick={this.onStopClick}>
                            Stopp annonsen
                        </Fareknapp>
                    )}
                </div>
                {showRemarksForm && (
                    <Modal
                        isOpen={showRemarksForm}
                        onRequestClose={this.props.toggleRemarksForm}
                        closeButton
                        contentLabel="Oppgi årsak til avvising"
                        className="RemarksModal"
                        appElement={document.getElementById('app')}
                    >
                        <Remarks/>
                        <Fareknapp className="Administration__button" onClick={this.onRejectConfirmClick}>
                            Avvis annonse
                        </Fareknapp>
                        <Knapp className="Administration__button" onClick={this.props.toggleRemarksForm}>
                            Avbryt
                        </Knapp>
                    </Modal>
                )}
            </div>
        );
    }
}

Administration.defaultProps = {
    adminStatus: undefined,
    remarks: undefined
};

Administration.propTypes = {
    adStatus: PropTypes.string.isRequired,
    adminStatus: PropTypes.string,
    remarks: PropTypes.arrayOf(PropTypes.string),
    isSavingAd: PropTypes.bool.isRequired,
    showRemarksForm: PropTypes.bool.isRequired,
    adUuid: PropTypes.string.isRequired,
    setAdminStatus: PropTypes.func.isRequired,
    setAdStatus: PropTypes.func.isRequired,
    toggleRemarksForm: PropTypes.func.isRequired,
    getNextAd: PropTypes.func.isRequired,
    saveAd: PropTypes.func.isRequired,
    getStilling: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    adStatus: state.ad.data.status,
    adminStatus: state.ad.data.administration.status,
    remarks: state.ad.data.administration.remarks,
    isSavingAd: state.ad.isSavingAd,
    showRemarksForm: state.administration.showRemarksForm,
    adUuid: state.ad.data.uuid
});

const mapDispatchToProps = (dispatch) => ({
    getNextAd: () => dispatch({ type: FETCH_NEXT_AD }),
    saveAd: () => dispatch({ type: SAVE_AD }),
    setAdminStatus: (status) => dispatch({ type: SET_ADMIN_STATUS, status }),
    setAdStatus: (status) => dispatch({ type: SET_AD_STATUS, status }),
    toggleRemarksForm: () => dispatch({ type: TOGGLE_REMARKS_FORM }),
    getStilling: (uuid) => dispatch({ type: FETCH_AD, uuid })
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Administration));
