import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { EtikettLiten } from 'nav-frontend-typografi';
import { Flatknapp, Hovedknapp, Fareknapp, Knapp } from 'nav-frontend-knapper';
import Etikett from 'nav-frontend-etiketter';
import Remarks from './Remarks';
import AdminStatusEnum from './AdminStatusEnum';
import AdStatusEnum from './AdStatusEnum';
import { FETCH_NEXT_AD, SET_AD_STATUS, SET_ADMIN_STATUS, FETCH_AD } from './../adReducer';
import './Administration.less';
import { TOGGLE_REMARKS_FORM } from './administrationReducer';
import RemarksEnum from './RemarksEnum';
import DelayedSpinner from '../../common/DelayedSpinner';
import { registerShortcuts } from '../../common/shortcuts/Shortcuts';
import { withRouter } from 'react-router-dom';

class Administration extends React.Component {
    componentDidMount() {
        this.shortcuts();

        const { adUuid } = this.props;
        const uuidHasChangedInUrl = adUuid !== this.props.match.params.uuid;
        if (uuidHasChangedInUrl) {
            this.props.history.push('/ads/' + adUuid);
        }
    }

    componentDidUpdate() {
        this.shortcuts();

        const { adUuid } = this.props;
        const uuidHasChangedInUrl = adUuid !== this.props.match.params.uuid;
        if (uuidHasChangedInUrl) {
            this.props.getStilling(this.props.match.params.uuid);
        }
    }

    shortcuts = () => {
        const { adminStatus, adStatus, showRemarksForm } = this.props;
        registerShortcuts('annonseDetaljer', {
            'g g': () => {
                if (adminStatus === AdminStatusEnum.PENDING && !showRemarksForm) {
                    this.onApproveClick();
                }
            },
            'a a': () => {
                if (adminStatus === AdminStatusEnum.PENDING) {
                    if (showRemarksForm) {
                        this.onRejectClick();
                    } else {
                        this.onToggleRemarksFormClick();
                    }
                }
            },
            'v n': () => {
                if (adminStatus !== AdminStatusEnum.PENDING) {
                    this.onNextClick();
                }
            },
            'g j': () => {
                if (this.showReopenButton(adminStatus, adStatus)) {
                    this.onReopenClick();
                }
            },
            's s': () => {
                if (adminStatus === AdminStatusEnum.APPROVED && adStatus === AdStatusEnum.ACTIVE ) {
                    this.onStopClick();
                }
            }
        });
    };

    onApproveClick = () => {
        this.props.setAdStatus(AdStatusEnum.ACTIVE);
        this.props.setAdminStatus(AdminStatusEnum.APPROVED);
    };

    onRejectClick = () => {
        this.props.toggleRemarksForm();
        this.props.setAdStatus(AdStatusEnum.INACTIVE);
        this.props.setAdminStatus(AdminStatusEnum.REJECTED);
    };

    onReopenClick = () => {
        this.props.setAdminStatus(AdminStatusEnum.PENDING);
    };

    onStopClick = () => {
        this.props.setAdStatus(AdStatusEnum.INACTIVE);
        this.props.setAdminStatus(AdminStatusEnum.STOPPED);
    };

    onCancelWorkClick = (e) => {
        e.preventDefault();
        this.props.setAdminStatus(AdminStatusEnum.RECEIVED);
    };

    onStartWorkClick = (e) => {
        e.preventDefault();
        this.props.setAdminStatus(AdminStatusEnum.PENDING);
    };

    onNextClick = () => {
        this.props.getNextAd();
    };

    onToggleRemarksFormClick = () => {
        this.props.toggleRemarksForm();
    };

    showReopenButton = (adminStatus, adStatus) => (
        (adminStatus === AdminStatusEnum.APPROVED && adStatus === AdStatusEnum.INACTIVE)
        || adminStatus === AdminStatusEnum.REJECTED
        || adminStatus === AdminStatusEnum.STOPPED);

    render() {
        const {
            adminStatus, remarks, isSavingAd, showRemarksForm, adStatus
        } = this.props;
        return (
            <div className="Administration">
                {isSavingAd ? (
                    <div className="Administration__spinner">
                        <DelayedSpinner type="XL" />
                    </div>
                ) : (
                    <div>
                        <div className="Administration__status">
                            <div className="Administration__status__column">
                                <EtikettLiten className="blokk-xxxs">Behandlingsstatus:</EtikettLiten>
                                {adminStatus === AdminStatusEnum.RECEIVED && (
                                    <Etikett type="info">
                                        Klar til behandling (<a href="#" className="lenke" onClick={this.onStartWorkClick}>Start</a>)
                                    </Etikett>
                                )}
                                {adminStatus === AdminStatusEnum.APPROVED && (
                                    <Etikett type="suksess">
                                        Godkjent
                                    </Etikett>
                                )}
                                {adminStatus === AdminStatusEnum.REJECTED && (
                                    <Etikett type="advarsel">
                                        Avvist ({remarks.map((remark) => (RemarksEnum[remark].label)).join(', ')})
                                    </Etikett>
                                )}
                                {adminStatus === AdminStatusEnum.PENDING && (
                                    <Etikett type="fokus">
                                        Under behandling (<a href="#" className="lenke" onClick={this.onCancelWorkClick}>Avbryt</a>)
                                    </Etikett>
                                )}
                                {adminStatus === AdminStatusEnum.STOPPED && (
                                    <Etikett type="advarsel">
                                        Stoppet
                                    </Etikett>
                                )}
                            </div>
                            <div className="Administration__status__column">
                                <EtikettLiten className="blokk-xxxs">Publiseringsstatus:</EtikettLiten>
                                {adStatus === AdStatusEnum.ACTIVE && (
                                    <Etikett type="suksess">
                                        Aktiv
                                    </Etikett>
                                )}
                                {adStatus === AdStatusEnum.INACTIVE && (
                                    <Etikett type="info">
                                        Inaktiv
                                    </Etikett>
                                )}
                            </div>
                        </div>

                        {showRemarksForm ? (
                            <div>
                                <Remarks />
                                <Fareknapp className="Administration__button" onClick={this.onRejectClick}>
                                    Avvis
                                </Fareknapp>
                                <Flatknapp className="Administration__button" onClick={this.onToggleRemarksFormClick}>
                                    Avbryt
                                </Flatknapp>
                            </div>
                        ) : (
                            <div>
                                {adminStatus === AdminStatusEnum.PENDING && (
                                    <div>
                                        <Hovedknapp className="Administration__button" onClick={this.onApproveClick}>
                                            Godkjenn
                                        </Hovedknapp>
                                        <Knapp
                                            className="Administration__button"
                                            onClick={this.onToggleRemarksFormClick}
                                        >
                                            Avvis
                                        </Knapp>
                                    </div>
                                )}
                                {adminStatus === AdminStatusEnum.APPROVED && adStatus === AdStatusEnum.ACTIVE && (
                                    <div>
                                        <Hovedknapp className="Administration__button" onClick={this.onNextClick}>
                                            Neste
                                        </Hovedknapp>
                                        <Fareknapp className="Administration__button" onClick={this.onStopClick}>
                                            Stopp
                                        </Fareknapp>
                                    </div>
                                )}
                                {this.showReopenButton(adminStatus, adStatus) && (
                                    <div>
                                        <Hovedknapp className="Administration__button" onClick={this.onNextClick}>
                                            Neste
                                        </Hovedknapp>
                                        <Knapp className="Administration__button" onClick={this.onReopenClick}>
                                            Gjenåpne
                                        </Knapp>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
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
    setAdminStatus: (status) => dispatch({ type: SET_ADMIN_STATUS, status }),
    setAdStatus: (status) => dispatch({ type: SET_AD_STATUS, status }),
    toggleRemarksForm: () => dispatch({ type: TOGGLE_REMARKS_FORM }),
    getStilling: (uuid) => dispatch({ type: FETCH_AD, uuid })
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Administration));
