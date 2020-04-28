import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Alertstripe from 'nav-frontend-alertstriper';
import AdStatusEnum from '../../../common/enums/AdStatusEnum';
import './AdStatus.less';
import PrivacyStatusEnum from '../../../common/enums/PrivacyStatusEnum';
import { formatISOString } from '../../../utils';

function AdStatus(props) {
    const {
        adStatus,
        deactivatedByExpiry,
        activationOnPublishingDate,
        originalData,
        isSavingAd,
    } = props;

    return isSavingAd ? (
        <Alertstripe className="AdStatusPreview__Alertstripe" type="info" solid="true">
            Stillingen er lagret
        </Alertstripe>
    ) : (
        <div className="AdStatusPreview">
            {adStatus === AdStatusEnum.INACTIVE && deactivatedByExpiry && (
                <Alertstripe className="AdStatusPreview__Alertstripe" type="advarsel" solid="true">
                    Stillingen er utløpt
                </Alertstripe>
            )}
            {adStatus === AdStatusEnum.INACTIVE && activationOnPublishingDate && (
                <Alertstripe className="AdStatusPreview__Alertstripe" type="info" solid="true">
                    Stillingen blir publisert {formatISOString(originalData.published)}
                </Alertstripe>
            )}
            {adStatus === AdStatusEnum.INACTIVE &&
                !deactivatedByExpiry &&
                !activationOnPublishingDate && (
                    <Alertstripe className="AdStatusPreview__Alertstripe" type="info" solid="true">
                        Stillingen er ikke publisert
                    </Alertstripe>
                )}
            {adStatus === AdStatusEnum.ACTIVE &&
                originalData.privacy === PrivacyStatusEnum.INTERNAL_NOT_SHOWN && (
                    <Alertstripe
                        className="AdStatusPreview__Alertstripe"
                        type="suksess"
                        solid="true"
                    >
                        Stillingen er publisert internt i NAV |{' '}
                        {originalData.published ? formatISOString(originalData.published) : ''}
                    </Alertstripe>
                )}
            {adStatus === AdStatusEnum.ACTIVE &&
                originalData.privacy === PrivacyStatusEnum.SHOW_ALL && (
                    <Alertstripe
                        className="AdStatusPreview__Alertstripe"
                        type="suksess"
                        solid="true"
                    >
                        Stillingen er publisert på Arbeidsplassen |{' '}
                        {originalData.published ? formatISOString(originalData.published) : ''}
                    </Alertstripe>
                )}
            {adStatus === AdStatusEnum.STOPPED && (
                <Alertstripe className="AdStatusPreview__Alertstripe" type="advarsel" solid="true">
                    Stillingen er stoppet
                </Alertstripe>
            )}
        </div>
    );
}

AdStatus.defaultProps = {
    originalData: undefined,
    deactivatedByExpiry: undefined,
    activationOnPublishingDate: undefined,
};

AdStatus.propTypes = {
    adStatus: PropTypes.string.isRequired,
    isEditingAd: PropTypes.bool.isRequired,
    originalData: PropTypes.shape({
        privacy: PropTypes.string,
        published: PropTypes.string,
    }),
    deactivatedByExpiry: PropTypes.bool,
    activationOnPublishingDate: PropTypes.bool,
    isSavingAd: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
    adStatus: state.adData.status,
    originalData: state.ad.originalData,
    isEditingAd: state.ad.isEditingAd,
    deactivatedByExpiry: state.adData.deactivatedByExpiry,
    activationOnPublishingDate: state.adData.activationOnPublishingDate,
    isSavingAd: state.ad.isSavingAd,
});

export default connect(mapStateToProps)(AdStatus);
