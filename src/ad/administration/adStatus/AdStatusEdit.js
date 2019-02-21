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

class AdStatusEdit extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            onPublishClicked: false,
            onRePublishClicked: false,
            onPublishChangesClicked: false,
            onStopClicked: false
        };
    }

    onPublishClick = () => {
        this.props.publish();
        this.setState({
            onPublishClicked: true,
            onStopClicked: false,
            onPublishChangesClicked: false,
            onRePublishClicked: false
        });
    };

    onRePublishClick = () => {
        this.props.publish();
        this.setState({
            onPublishClicked: false,
            onStopClicked: false,
            onPublishChangesClicked: false,
            onRePublishClicked: true
        });
    };

    onPublishAdChangesClick = () => {
        this.props.publishAdChanges();
        this.setState({
            onPublishClicked: false,
            onStopClicked: false,
            onPublishChangesClicked: true,
            onRePublishClicked: false
        });
    };

    onCancelClick = () => {
        this.props.showHasChangesModal();
        this.setState({
            onPublishClicked: false,
            onStopClicked: false,
            onPublishChangesClicked: false,
            onRePublishClicked: false
        });
    };

    onStopClick = () => {
        this.props.stop();
        this.setState({
            onPublishClicked: false,
            onStopClicked: true,
            onPublishChangesClicked: false,
            onRePublishClicked: false
        });
    };

    onSaveAdClick = () => {
        this.props.saveAd();
        this.setState({
            onPublishClicked: false,
            onStopClicked: false,
            onPublishChangesClicked: false,
            onRePublishClicked: false
        });
    };

    render() {
        const {
            adStatus, activationOnPublishingDate, deactivatedByExpiry, isSavingAd
        } = this.props;

        const isPublished = (adStatus === AdStatusEnum.ACTIVE ||
            (adStatus === AdStatusEnum.INACTIVE && activationOnPublishingDate));
        const isExpired = adStatus === AdStatusEnum.INACTIVE && deactivatedByExpiry;


        const isStopping = this.state.onStopClicked && isSavingAd;
        const isPublishing = this.state.onPublishClicked && isSavingAd;
        const isRePublishing = this.state.onRePublishClicked && isSavingAd;
        const isPublishingChanges = this.state.onPublishChangesClicked && isSavingAd;
        const canSave = !isPublished && !isExpired && !isSavingAd;

        let buttonState = 'NewAd';
        if (isExpired || (adStatus === AdStatusEnum.STOPPED && !isStopping) || isRePublishing) {
            buttonState = 'PublishedBefore';
        } else if ((isPublished && !isPublishing) || isStopping || isPublishingChanges) {
            buttonState = 'IsPublished';
        }

        console.log(isSavingAd, this.state)
        return (
            <div className="AdStatusEdit">
                <PublishErrorModal />
                <StopAdModal />
                <AdPublishedModal />
                <SaveAdErrorModal />
                <div>
                    {buttonState === 'NewAd' && (
                        <div className="AdStatusEdit__buttons">
                            <Hovedknapp
                                className="AdStatusEdit__buttons__button"
                                onClick={this.onPublishClick}
                                spinner={isPublishing}>
                                Publisér
                            </Hovedknapp>
                            <Knapp className="AdStatusEdit__buttons__button" onClick={this.onCancelClick}>
                                Avbryt
                            </Knapp>
                        </div>
                    )}
                    {buttonState === 'PublishedBefore' && (
                        <div className="AdStatusEdit__buttons">
                            <Hovedknapp
                                className="AdStatusEdit__buttons__button"
                                onClick={this.onRePublishClick}
                                spinner={isRePublishing}
                            >
                                Republisér stilling
                            </Hovedknapp>
                            <Knapp className="AdStatusEdit__buttons__button" onClick={this.onCancelClick}>
                                Avbryt
                            </Knapp>
                        </div>
                    )}
                    {buttonState === 'IsPublished' && (
                        <div>
                            <div className="AdStatusEdit__buttons">
                                <Hovedknapp
                                    className="AdStatusEdit__buttons__button AdStatusEdit__PublishChanges__button"
                                    onClick={this.onPublishAdChangesClick}
                                    spinner={isPublishingChanges}
                                >
                                    Publisér endringer
                                </Hovedknapp>
                                <Knapp
                                    className="AdStatusEdit__buttons__button AdStatusEdit__StopAd__button"
                                    onClick={this.onStopClick}
                                    spinner={isStopping}
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
                    <div className="AdStatusEdit__buttons-mini">
                        {canSave && (
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
    isSavingAd: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => ({
    adStatus: state.adData.status,
    activationOnPublishingDate: state.adData.activationOnPublishingDate,
    deactivatedByExpiry: state.adData.deactivatedByExpiry,
    isSavingAd: state.ad.isSavingAd
});

const mapDispatchToProps = (dispatch) => ({
    publish: () => dispatch({ type: PUBLISH_AD }),
    stop: () => dispatch({ type: SHOW_STOP_AD_MODAL }),
    saveAd: () => dispatch({ type: SAVE_AD, showModal: true }),
    showHasChangesModal: () => dispatch({ type: SHOW_HAS_CHANGES_MODAL }),
    publishAdChanges: () => dispatch({ type: PUBLISH_AD_CHANGES })
});

export default connect(mapStateToProps, mapDispatchToProps)(AdStatusEdit);
