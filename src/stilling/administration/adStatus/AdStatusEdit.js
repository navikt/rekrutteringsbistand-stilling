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
    SHOW_DELETE_AD_MODAL,
    PREVIEW_EDIT_AD,
    FETCH_AD,
} from '../../adReducer';
import PublishErrorModal from './PublishErrorModal';
import './AdStatusEdit.less';
import StopAdModal from './StopAdModal';
import AdPublishedModal from './AdPublishedModal';
import SaveAdErrorModal from './SaveAdErrorModal';
import { Link } from 'react-router-dom';
import DeleteAdModal from './DeleteAdModal';
import Sletteknapp from './Sletteknapp';

const ButtonEnum = {
    PUBLISH: 'PUBLISH',
    REPUBLISH: 'REPUBLISH',
    PUBLISH_CHANGES: 'PUBLISH_CHANGES',
    STOP: 'STOP',
    CANCEL: 'CANCEL',
    SAVE: 'SAVE',
    DELETE: 'DELETE',
};

const ButtonGroupEnum = {
    NEW_AD: 'NEW_AD',
    PUBLISHED_BEFORE: 'PUBLISHED_BEFORE',
    IS_PUBLISHED_NOW: 'IS_PUBLISHED_NOW',
    LIMITED_ACCESS: 'LIMITED_ACCESS',
};

class AdStatusEdit extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            buttonClicked: undefined,
        };
    }

    onPublishClick = () => {
        this.props.publish();
        this.setState({
            buttonClicked: ButtonEnum.PUBLISH,
        });
    };

    onRePublishClick = () => {
        this.props.publish();
        this.setState({
            buttonClicked: ButtonEnum.REPUBLISH,
        });
    };

    onPublishAdChangesClick = () => {
        this.props.publishAdChanges();
        this.setState({
            buttonClicked: ButtonEnum.PUBLISH_CHANGES,
        });
    };

    onStopClick = () => {
        this.props.stop();
        this.setState({
            buttonClicked: ButtonEnum.STOP,
        });
    };

    onDeleteClick = () => {
        this.props.delete();
        this.setState({
            buttonClicked: ButtonEnum.DELETE,
        });
    };

    onSaveAdClick = () => {
        this.props.saveAd();
        this.setState({
            buttonClicked: undefined,
        });
    };

    onSavePreviewAdClick = () => {
        this.props.saveAd();
        const validation = this.props.validation;
        if (!(validation && validation.notat)) {
            this.props.previewAd();
        }

        this.setState({ buttonClicked: undefined });
    };

    OnCancelPreviewAdClick = () => {
        this.props.reload(this.props.uuid);
        this.setState({ buttonClicked: undefined });
    };

    render() {
        const { adStatus, activationOnPublishingDate, deactivatedByExpiry, isSavingAd } =
            this.props;

        const isPublished =
            adStatus === AdStatusEnum.ACTIVE ||
            (adStatus === AdStatusEnum.INACTIVE && activationOnPublishingDate);
        const isExpired = adStatus === AdStatusEnum.INACTIVE && deactivatedByExpiry;
        const isStopping = this.state.buttonClicked === ButtonEnum.STOP && isSavingAd;
        const isDeleting = this.state.buttonClicked === ButtonEnum.DELETE && isSavingAd;
        const isPublishing = this.state.buttonClicked === ButtonEnum.PUBLISH && isSavingAd;
        const isRePublishing = this.state.buttonClicked === ButtonEnum.REPUBLISH && isSavingAd;
        const isPublishingChanges =
            this.state.buttonClicked === ButtonEnum.PUBLISH_CHANGES && isSavingAd;
        const canSave = !isPublished && !isExpired && !isSavingAd;
        const publishingRights = this.props.createdBy === 'pam-rekrutteringsbistand';

        let buttonState = ButtonGroupEnum.NEW_AD;
        if (!publishingRights) {
            buttonState = ButtonGroupEnum.LIMITED_ACCESS;
        } else {
            if (isExpired || (adStatus === AdStatusEnum.STOPPED && !isStopping) || isRePublishing) {
                buttonState = ButtonGroupEnum.PUBLISHED_BEFORE;
            } else if ((isPublished && !isPublishing) || isStopping || isPublishingChanges) {
                buttonState = ButtonGroupEnum.IS_PUBLISHED_NOW;
            }
        }

        return (
            <div className="AdStatusEdit">
                <PublishErrorModal />
                <StopAdModal />
                <DeleteAdModal />
                <AdPublishedModal />
                <SaveAdErrorModal />
                {buttonState === ButtonGroupEnum.LIMITED_ACCESS && (
                    <div className="AdStatusEdit__buttons">
                        <Hovedknapp
                            mini
                            className="AdStatusEdit__buttons__button"
                            onClick={this.onSavePreviewAdClick}
                        >
                            Lagre endringer
                        </Hovedknapp>
                        <Knapp
                            mini
                            className="AdStatusEdit__buttons__button"
                            onClick={this.OnCancelPreviewAdClick}
                        >
                            Avbryt
                        </Knapp>
                    </div>
                )}
                {buttonState === ButtonGroupEnum.NEW_AD && (
                    <>
                        <div className="AdStatusEdit__buttons">
                            <Hovedknapp
                                mini
                                className="AdStatusEdit__buttons__button"
                                onClick={this.onPublishClick}
                                spinner={isPublishing}
                            >
                                Publiser
                            </Hovedknapp>
                        </div>
                        <div className="AdStatusEdit__buttons AdStatusEdit__buttons_secondary">
                            <AvbrytKnapp />
                            <Sletteknapp
                                onDeleteClick={this.onDeleteClick}
                                isDeleting={isDeleting}
                            />
                        </div>
                    </>
                )}
                {buttonState === ButtonGroupEnum.PUBLISHED_BEFORE && (
                    <>
                        <div className="AdStatusEdit__buttons">
                            <Hovedknapp
                                mini
                                className="AdStatusEdit__buttons__button"
                                onClick={this.onRePublishClick}
                                spinner={isRePublishing}
                            >
                                Republiser stilling
                            </Hovedknapp>
                        </div>
                        <div className="AdStatusEdit__buttons AdStatusEdit__buttons_secondary">
                            <AvbrytKnapp />
                            <Sletteknapp
                                onDeleteClick={this.onDeleteClick}
                                isDeleting={isDeleting}
                            />
                        </div>
                    </>
                )}
                {buttonState === ButtonGroupEnum.IS_PUBLISHED_NOW && (
                    <>
                        <div className="AdStatusEdit__buttons">
                            <Hovedknapp
                                mini
                                className="AdStatusEdit__buttons__button AdStatusEdit__PublishChanges__button"
                                onClick={this.onPublishAdChangesClick}
                                spinner={isPublishingChanges}
                            >
                                Publiser endringer
                            </Hovedknapp>
                        </div>
                        <div className="AdStatusEdit__buttons AdStatusEdit__buttons_secondary">
                            <Knapp
                                mini
                                className="AdStatusEdit__buttons__button AdStatusEdit__StopAd__button"
                                onClick={this.onStopClick}
                                spinner={isStopping}
                            >
                                Stopp stilling
                            </Knapp>
                            <Sletteknapp
                                onDeleteClick={this.onDeleteClick}
                                isDeleting={isDeleting}
                            />
                        </div>
                        <div className="AdStatusEdit__buttons-mini AdStatusEdit__lagre-stilling">
                            <Link
                                className="knapp knapp--flat knapp--mini"
                                to="/stillinger/minestillinger"
                            >
                                Avbryt
                            </Link>
                        </div>
                    </>
                )}
                {canSave && (
                    <div className="AdStatusEdit__buttons-mini AdStatusEdit__lagre-stilling">
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
    delete: PropTypes.func.isRequired,
    saveAd: PropTypes.func.isRequired,
    publishAdChanges: PropTypes.func.isRequired,
    activationOnPublishingDate: PropTypes.bool.isRequired,
    deactivatedByExpiry: PropTypes.bool.isRequired,
    isSavingAd: PropTypes.bool.isRequired,
    createdBy: PropTypes.string.isRequired,
    previewAd: PropTypes.func.isRequired,
    reload: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    adStatus: state.adData.status,
    createdBy: state.adData.createdBy,
    activationOnPublishingDate: state.adData.activationOnPublishingDate,
    deactivatedByExpiry: state.adData.deactivatedByExpiry,
    isSavingAd: state.ad.isSavingAd,
    uuid: state.adData.uuid,
    validation: state.adValidation.errors,
});

const mapDispatchToProps = (dispatch) => ({
    publish: () => dispatch({ type: PUBLISH_AD }),
    stop: () => dispatch({ type: SHOW_STOP_AD_MODAL }),
    delete: () => dispatch({ type: SHOW_DELETE_AD_MODAL }),
    saveAd: () => dispatch({ type: SAVE_AD, showModal: true }),
    publishAdChanges: () => dispatch({ type: PUBLISH_AD_CHANGES }),
    previewAd: () => dispatch({ type: PREVIEW_EDIT_AD }),
    reload: (uuid) => dispatch({ type: FETCH_AD, uuid, edit: false }),
});

const AvbrytKnapp = () => (
    <Link
        className="knapp knapp--mini AdStatusEdit__buttons__button knapp--standard"
        to="/stillinger/minestillinger"
    >
        Avbryt
    </Link>
);

export default connect(mapStateToProps, mapDispatchToProps)(AdStatusEdit);
