import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Flatknapp, Hovedknapp, Knapp } from 'nav-frontend-knapper';
import AdStatusEnum from '../../../common/enums/AdStatusEnum';
import {
    PUBLISH_AD,
    SAVE_AD,
    PUBLISH_AD_CHANGES,
    SHOW_STOP_AD_MODAL,
    SHOW_HAS_CHANGES_MODAL
} from '../../adReducer';
import PublishErrorModal from './PublishErrorModal';
import './AdStatusEdit.less';
import StopAdModal from './StopAdModal';
import AdPublishedModal from './AdPublishedModal';
import SaveAdErrorModal from './SaveAdErrorModal';
import AdAlertStripeEnum from '../../alertstripe/AdAlertStripeEnum';
import { formatISOString } from '../../../utils';

class AdStatusEdit extends React.Component {
    onPublishClick = () => {
        this.props.publish();
    };

    onPublishAdChangesClick = () => {
        if (this.props.adStatus === AdStatusEnum.INACTIVE && this.props.activationOnPublishingDate) {
            const variable = formatISOString(this.props.published);
            this.props.publishAdChanges(AdAlertStripeEnum.WILL_PUBLISH_CHANGES, variable);
        } else {
            this.props.publishAdChanges(AdAlertStripeEnum.PUBLISHED_CHANGES);
        }
    };

    onCancelClick = () => {
        this.props.showHasChangesModal();
    };

    onStopClick = () => {
        this.props.stop();
    };

    onSaveAdClick = () => {
        this.props.saveAd();
    };

    render() {
        const {
            adStatus, activationOnPublishingDate, deactivatedByExpiry
        } = this.props;

        const isPublished = (adStatus === AdStatusEnum.ACTIVE ||
            (adStatus === AdStatusEnum.INACTIVE && activationOnPublishingDate));
        const isExpired = adStatus === AdStatusEnum.INACTIVE && deactivatedByExpiry;

        return (
            <div className="AdStatusEdit">
                <PublishErrorModal />
                <StopAdModal />
                <AdPublishedModal />
                <SaveAdErrorModal />
                <div>
                    {adStatus === AdStatusEnum.INACTIVE && !activationOnPublishingDate && !deactivatedByExpiry && (
                        <div className="AdStatusEdit__buttons">
                            <Hovedknapp className="AdStatusEdit__buttons__button" onClick={this.onPublishClick}>
                                Publisér
                            </Hovedknapp>
                            <Knapp className="AdStatusEdit__buttons__button" onClick={this.onCancelClick}>
                                Avbryt
                            </Knapp>
                        </div>
                    )}
                    {isExpired && (
                        <div className="AdStatusEdit__buttons">
                            <Hovedknapp className="AdStatusEdit__buttons__button" onClick={this.onPublishClick}>
                                Republisér stilling
                            </Hovedknapp>
                        </div>
                    )}
                    {isPublished && (
                        <div>
                            <div className="AdStatusEdit__buttons">
                                <Hovedknapp
                                    className="AdStatusEdit__buttons__button AdStatusEdit__PublishChanges__button"
                                    onClick={this.onPublishAdChangesClick}
                                >
                                    Publisér endringer
                                </Hovedknapp>
                                <Knapp
                                    className="AdStatusEdit__buttons__button AdStatusEdit__StopAd__button"
                                    onClick={this.onStopClick}
                                >
                                    Stopp stilling
                                </Knapp>
                            </div>
                            <div className="AdStatusEdit__buttons-mini">
                                <Flatknapp mini onClick={this.onCancelClick}>
                                    Avbryt
                                </Flatknapp>
                            </div>
                        </div>
                    )}
                    {adStatus === AdStatusEnum.STOPPED && (
                        <div className="AdStatusEdit__buttons">
                            <Hovedknapp className="AdStatusEdit__buttons__button" onClick={this.onPublishClick}>
                                Republisér stilling
                            </Hovedknapp>
                            <Knapp className="AdStatusEdit__buttons__button" onClick={this.onCancelClick}>
                                Avbryt
                            </Knapp>
                        </div>
                    )}
                    <div className="AdStatusEdit__buttons-mini">
                        {!isPublished && !isExpired && (
                            <Flatknapp mini onClick={this.onSaveAdClick}>
                                Lagre
                            </Flatknapp>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

AdStatusEdit.propTypes = {
    adStatus: PropTypes.string.isRequired,
    publish: PropTypes.func.isRequired,
    stop: PropTypes.func.isRequired,
    saveAd: PropTypes.func.isRequired,
    showHasChangesModal: PropTypes.func.isRequired,
    publishAdChanges: PropTypes.func.isRequired,
    activationOnPublishingDate: PropTypes.bool.isRequired,
    deactivatedByExpiry: PropTypes.bool.isRequired,
    published: PropTypes.string.isRequired
};

const mapStateToProps = (state) => ({
    adStatus: state.adData.status,
    activationOnPublishingDate: state.adData.activationOnPublishingDate,
    deactivatedByExpiry: state.adData.deactivatedByExpiry,
    published: state.ad.originalData.published
});

const mapDispatchToProps = (dispatch) => ({
    publish: () => dispatch({ type: PUBLISH_AD }),
    stop: () => dispatch({ type: SHOW_STOP_AD_MODAL }),
    saveAd: () => dispatch({ type: SAVE_AD, showModal: true }),
    showHasChangesModal: () => dispatch({ type: SHOW_HAS_CHANGES_MODAL }),
    publishAdChanges: (mode, variable) => dispatch({ type: PUBLISH_AD_CHANGES, mode, variable })
});

export default connect(mapStateToProps, mapDispatchToProps)(AdStatusEdit);
