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
    SHOW_HAS_CHANGES_MODAL,
    PREVIEW_EDIT_AD
} from '../../adReducer';
import PublishErrorModal from './PublishErrorModal';
import './AdStatusEdit.less';
import StopAdModal from './StopAdModal';
import AdPublishedModal from './AdPublishedModal';
import SaveAdErrorModal from './SaveAdErrorModal';

const ButtonEnum = {
    PUBLISH: 'PUBLISH',
    REPUBLISH: 'REPUBLISH',
    PUBLISH_CHANGES: 'PUBLISH_CHANGES',
    STOP: 'STOP',
    CANCEL: 'CANCEL',
    SAVE: 'SAVE'
};

const ButtonGroupEnum = {
    NEW_AD: 'NEW_AD',
    PUBLISHED_BEFORE: 'PUBLISHED_BEFORE',
    IS_PUBLISHED_NOW: 'IS_PUBLISHED_NOW',
    LIMITED_ACCESS: 'LIMITED_ACCESS' 
};

class AdStatusEdit extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            buttonClicked: undefined
        };
    }

    onPublishClick = () => {
        this.props.publish();
        this.setState({
            buttonClicked: ButtonEnum.PUBLISH
        });
    };

    onRePublishClick = () => {
        this.props.publish();
        this.setState({
            buttonClicked: ButtonEnum.REPUBLISH
        });
    };

    onPublishAdChangesClick = () => {
        this.props.publishAdChanges();
        this.setState({
            buttonClicked: ButtonEnum.PUBLISH_CHANGES
        });
    };

    onCancelClick = () => {
        this.props.showHasChangesModal();
        this.setState({
            buttonClicked: undefined
        });
    };

    onStopClick = () => {
        this.props.stop();
        this.setState({
            buttonClicked: ButtonEnum.STOP
        });
    };

    onSaveAdClick = () => {
        this.props.saveAd();
        this.setState({
            buttonClicked: undefined
        });
    };
    
    OnPreviewAdClick = () => {
        this.props.previewAd();
        this.setState({
            buttonClicked: undefined
        });
    }
    
    render() {
        const {
            adStatus, activationOnPublishingDate, deactivatedByExpiry, isSavingAd
        } = this.props;

        const isPublished = ((adStatus === AdStatusEnum.ACTIVE)
            || ((adStatus === AdStatusEnum.INACTIVE) && activationOnPublishingDate));
        const isExpired = (adStatus === AdStatusEnum.INACTIVE) && deactivatedByExpiry;
        const isStopping = (this.state.buttonClicked === ButtonEnum.STOP) && isSavingAd;
        const isPublishing = (this.state.buttonClicked === ButtonEnum.PUBLISH) && isSavingAd;
        const isRePublishing = (this.state.buttonClicked === ButtonEnum.REPUBLISH) && isSavingAd;
        const isPublishingChanges = (this.state.buttonClicked === ButtonEnum.PUBLISH_CHANGES) && isSavingAd;
        const canSave = !isPublished && !isExpired && !isSavingAd;
        const publishingRights = this.props.updatedBy === 'pam-rekrutteringsbistand';

        let buttonState = ButtonGroupEnum.NEW_AD;
        if (isExpired || (adStatus === AdStatusEnum.STOPPED && !isStopping) || isRePublishing) {
            buttonState = ButtonGroupEnum.PUBLISHED_BEFORE;
        } else if ((isPublished && !isPublishing) || isStopping || isPublishingChanges) {
            if(publishingRights) {
                buttonState = ButtonGroupEnum.IS_PUBLISHED_NOW;
            } else {
                buttonState = ButtonGroupEnum.LIMITED_ACCESS;
            }
        }
        
        return (
            <div className="AdStatusEdit">
                <PublishErrorModal />
                <StopAdModal />
                <AdPublishedModal />
                <SaveAdErrorModal />
                {buttonState === ButtonGroupEnum.LIMITED_ACCESS && (
                    <div className="AdStatusEdit__buttons">
                        <Hovedknapp
                            className="AdStatusEdit__buttons__button"
                            onClick={this.onSaveAdClick}
                            spinner={isSavingAd}
                        >
                            Lagre endringer
                        </Hovedknapp>
                        <Knapp className="AdStatusEdit__buttons__button" onClick={this.OnPreviewAdClick}>
                            Avbryt
                        </Knapp>
                    </div>
                )}
                {buttonState === ButtonGroupEnum.NEW_AD && (
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
                {buttonState === ButtonGroupEnum.PUBLISHED_BEFORE && (
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
                {buttonState === ButtonGroupEnum.IS_PUBLISHED_NOW && (
                    <React.Fragment>
                        <div className="AdStatusEdit__buttons">
                            <Hovedknapp
                                className="AdStatusEdit__buttons__button AdStatusEdit__PublishChanges__button"
                                onClick={this.onPublishAdChangesClick}
                                spinner={isPublishingChanges}
                            >
                                Publiser endringer
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
                    </React.Fragment>
                )}
                {canSave && (
                    <div className="AdStatusEdit__buttons-mini AdStatusEdit__Lagre__button">
                        <Flatknapp mini onClick={this.onSaveAdClick}>
                            Lagre og fortsett senere
                        </Flatknapp>
                    </div>
                     )}
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
    isSavingAd: PropTypes.bool.isRequired,
    updatedBy: PropTypes.string.isRequired,
    previewAd: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    adStatus: state.adData.status,
    updatedBy: state.adData.updatedBy,
    activationOnPublishingDate: state.adData.activationOnPublishingDate,
    deactivatedByExpiry: state.adData.deactivatedByExpiry,
    isSavingAd: state.ad.isSavingAd
});

const mapDispatchToProps = (dispatch) => ({
    publish: () => dispatch({ type: PUBLISH_AD }),
    stop: () => dispatch({ type: SHOW_STOP_AD_MODAL }),
    saveAd: () => dispatch({ type: SAVE_AD, showModal: true }),
    showHasChangesModal: () => dispatch({ type: SHOW_HAS_CHANGES_MODAL }),
    publishAdChanges: () => dispatch({ type: PUBLISH_AD_CHANGES }),
    previewAd: () => dispatch({ type: PREVIEW_EDIT_AD })
});

export default connect(mapStateToProps, mapDispatchToProps)(AdStatusEdit);
