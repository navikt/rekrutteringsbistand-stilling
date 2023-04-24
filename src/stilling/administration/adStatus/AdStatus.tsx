import React from 'react';
import { useSelector } from 'react-redux';
import AdStatusEnum from '../../../common/enums/AdStatusEnum';

import PrivacyStatusEnum from '../../../common/enums/PrivacyStatusEnum';
import { formatISOString } from '../../../utils/datoUtils';
import { Alert } from '@navikt/ds-react';

const AdStatus = () => {
    const adStatus = useSelector((state: any) => state.adData.status);
    const originalData = useSelector((state: any) => state.ad.originalData);
    const deactivatedByExpiry = useSelector((state: any) => state.adData.deactivatedByExpiry);
    const activationOnPublishingDate = useSelector(
        (state: any) => state.adData.activationOnPublishingDate
    );
    const isSavingAd = useSelector((state: any) => state.ad.isSavingAd);

    return isSavingAd ? (
        <Alert variant="info">Stillingen er lagret</Alert>
    ) : (
        <div className="AdStatusPreview">
            {adStatus === AdStatusEnum.INACTIVE && deactivatedByExpiry && (
                <Alert variant="warning">Stillingen er utløpt</Alert>
            )}
            {adStatus === AdStatusEnum.INACTIVE && activationOnPublishingDate && (
                <Alert variant="info">
                    Stillingen blir publisert {formatISOString(originalData.published)}
                </Alert>
            )}
            {adStatus === AdStatusEnum.INACTIVE &&
                !deactivatedByExpiry &&
                !activationOnPublishingDate && (
                    <Alert variant="info">Stillingen er ikke publisert</Alert>
                )}
            {adStatus === AdStatusEnum.ACTIVE &&
                originalData.privacy === PrivacyStatusEnum.INTERNAL_NOT_SHOWN && (
                    <Alert variant="success">
                        Stillingen er publisert internt i NAV |{' '}
                        {originalData.published ? formatISOString(originalData.published) : ''}
                    </Alert>
                )}
            {adStatus === AdStatusEnum.ACTIVE &&
                originalData.privacy === PrivacyStatusEnum.SHOW_ALL && (
                    <Alert variant="success">
                        Stillingen er publisert på Arbeidsplassen |{' '}
                        {originalData.published ? formatISOString(originalData.published) : ''}
                    </Alert>
                )}
            {adStatus === AdStatusEnum.STOPPED && (
                <Alert variant="warning">Stillingen er stoppet</Alert>
            )}
        </div>
    );
};

export default AdStatus;
