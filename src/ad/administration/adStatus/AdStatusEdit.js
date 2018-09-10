import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Hovedknapp, Knapp } from 'nav-frontend-knapper';
import { Normaltekst } from 'nav-frontend-typografi';
import Chevron from 'nav-frontend-chevron';
import AdStatusEnum from './AdStatusEnum';
import { registerShortcuts, removeShortcuts } from '../../../common/shortcuts/Shortcuts';
import {
    PUBLISH_AD,
    STOP_AD,
    SAVE_AD,
    SHOW_REJECT_REASON_MODAL,
    FETCH_NEXT_AD
} from '../../adReducer';
import PublishErrorModal from './PublishErrorModal';
import RejectReasonModal from './RejectReasonModal';
import LinkButton from '../../../common/linkbutton/LinkButton';
import './AdStatusEdit.less';
import HasChangesModal from './HasChangesModal';
import AdminStatusEnum from '../adminStatus/AdminStatusEnum';

class AdStatusEdit extends React.Component {
    componentDidMount() {
        registerShortcuts('administrationEdit', {
            'p p': () => {
                this.onPublishClick();
            },
            'n n': () => {
                this.onNextClick();
            }
        });
    }

    componentWillUnmount() {
        removeShortcuts('administrationEdit');
    }

    onPublishClick = () => {
        this.props.publish();
    };

    onRejectClick = () => {
        this.props.reject();
    };

    onStopClick = () => {
        this.props.stop();
    };

    onSaveAdClick = () => {
        this.props.saveAd();
    };

    onNextClick = () => {
        this.props.getNextAd();
    };

    render() {
        const {
            adStatus, hasChanges, isSavingAd, hasSavedChanges, adminStatus
        } = this.props;
        return (
            <div className="AdStatusEdit">
                <PublishErrorModal />
                <RejectReasonModal />
                <HasChangesModal />
                <div>
                    {adStatus === AdStatusEnum.INACTIVE && (
                        <div className="AdStatusEdit__buttons">
                            <Hovedknapp className="AdStatusEdit__buttons__button" onClick={this.onPublishClick}>
                                Publisér
                            </Hovedknapp>
                            <Knapp className="AdStatusEdit__buttons__button" onClick={this.onRejectClick}>
                                Avvis
                            </Knapp>
                        </div>
                    )}
                    {!hasChanges && adStatus === AdStatusEnum.ACTIVE && (
                        <div className="AdStatusEdit__buttons">
                            <Hovedknapp className="AdStatusEdit__buttons__button" onClick={this.onStopClick}>
                                Stopp annonsen
                            </Hovedknapp>
                        </div>
                    )}
                    {hasChanges && adStatus === AdStatusEnum.ACTIVE && (
                        <div className="AdStatusEdit__buttons">
                            <Hovedknapp className="AdStatusEdit__buttons__button" onClick={this.onSaveAdClick}>
                                Publisér endringer
                            </Hovedknapp>
                            <Knapp className="AdStatusEdit__buttons__button" onClick={this.onStopClick}>
                                Stopp
                            </Knapp>
                        </div>
                    )}
                    {adStatus === AdStatusEnum.REJECTED && (
                        <div className="AdStatusEdit__buttons">
                            <Hovedknapp className="AdStatusEdit__buttons__button" onClick={this.onPublishClick}>
                                Publisér annonsen
                            </Hovedknapp>
                        </div>
                    )}
                    {adStatus === AdStatusEnum.STOPPED && (
                        <div className="AdStatusEdit__buttons">
                            <Hovedknapp className="AdStatusEdit__buttons__button" onClick={this.onPublishClick}>
                                Republisér
                            </Hovedknapp>
                            <Knapp className="AdStatusEdit__buttons__button" onClick={this.onRejectClick}>
                                Avvis
                            </Knapp>
                        </div>
                    )}
                    <div className="AdStatusEdit__links">
                        {hasChanges && !isSavingAd && adStatus !== AdStatusEnum.ACTIVE && adminStatus === AdminStatusEnum.PENDING && (
                            <LinkButton onClick={this.onSaveAdClick}>
                                Lagre og forsett senere
                            </LinkButton>
                        )}
                        {hasChanges && !isSavingAd && adStatus !== AdStatusEnum.ACTIVE && adminStatus !== AdminStatusEnum.PENDING && (
                            <LinkButton onClick={this.onSaveAdClick}>
                                Lagre endringer
                            </LinkButton>
                        )}
                        {hasSavedChanges && adminStatus === AdminStatusEnum.PENDING && (
                            <Normaltekst tag="span">
                                Annonsen er lagret i &quot;Under arbeid&quot;
                            </Normaltekst>
                        )}
                        <button className="AdStatusEdit__links__next-button" onClick={this.onNextClick}>
                            <span className="AdStatusEdit__links__next-button__text">Neste annonse</span>
                            <Chevron type="høyre" className="AdStatusEdit__links__next-button__chevron" />
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

AdStatusEdit.propTypes = {
    isSavingAd: PropTypes.bool.isRequired,
    hasChanges: PropTypes.bool.isRequired,
    hasSavedChanges: PropTypes.bool.isRequired,
    adminStatus: PropTypes.string.isRequired,
    adStatus: PropTypes.string.isRequired,
    publish: PropTypes.func.isRequired,
    reject: PropTypes.func.isRequired,
    stop: PropTypes.func.isRequired,
    saveAd: PropTypes.func.isRequired,
    getNextAd: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    adminStatus: state.adData.administration.status,
    adStatus: state.adData.status,
    isSavingAd: state.ad.isSavingAd,
    hasChanges: state.ad.hasChanges,
    hasSavedChanges: state.ad.hasSavedChanges
});

const mapDispatchToProps = (dispatch) => ({
    publish: () => dispatch({ type: PUBLISH_AD }),
    reject: () => dispatch({ type: SHOW_REJECT_REASON_MODAL }),
    stop: () => dispatch({ type: STOP_AD }),
    saveAd: () => dispatch({ type: SAVE_AD }),
    getNextAd: () => dispatch({ type: FETCH_NEXT_AD })
});

export default connect(mapStateToProps, mapDispatchToProps)(AdStatusEdit);
