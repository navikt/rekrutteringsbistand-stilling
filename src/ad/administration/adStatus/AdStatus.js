import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Alertstripe from 'nav-frontend-alertstriper';
import AdStatusEnum from './AdStatusEnum';
import './AdStatus.less';
import PrivacyStatusEnum from '../publishing/PrivacyStatusEnum';
import { formatISOString } from '../../../utils';

function AdStatus({ adStatus, originalData, published }) {
    // TODO: Add check to see if the ad has been published in the future
    // TODO: Add check to see if the ad has expired
    return (
        <div className="AdStatusPreview">
            {adStatus === AdStatusEnum.INACTIVE && (
                <Alertstripe className="AdStatusPreview__Alertstripe" type="info" solid>
                    Stillingen er ikke publisert
                </Alertstripe>
            )}
            {adStatus === AdStatusEnum.ACTIVE && originalData.privacy === PrivacyStatusEnum.INTERNAL_NOT_SHOWN && (
                <Alertstripe className="AdStatusPreview__Alertstripe" type="suksess" solid>
                    Stillingen er publisert internt i NAV {published ? ` | ${formatISOString(published)}` : ''}
                </Alertstripe>
            )}
            {adStatus === AdStatusEnum.ACTIVE && originalData.privacy === PrivacyStatusEnum.SHOW_ALL && (
                <Alertstripe className="AdStatusPreview__Alertstripe" type="suksess" solid>
                    Stillingen er publisert på arbeidsplassen.no {published ? ` | ${formatISOString(published)}` : ''}
                </Alertstripe>
            )}
            {adStatus === AdStatusEnum.STOPPED && (
                <Alertstripe className="AdStatusPreview__Alertstripe" type="advarsel" solid>
                    Stillingen er stoppet
                </Alertstripe>
            )}
        </div>
    );
}

AdStatus.defaultProps = {
    originalData: undefined
};

AdStatus.propTypes = {
    adStatus: PropTypes.string.isRequired,
    published: PropTypes.string.isRequired,
    originalData: PropTypes.shape({
        privacy: PropTypes.string
    })
};

const mapStateToProps = (state) => ({
    adStatus: state.adData.status,
    published: state.adData.published,
    originalData: state.ad.originalData
});

export default connect(mapStateToProps)(AdStatus);
