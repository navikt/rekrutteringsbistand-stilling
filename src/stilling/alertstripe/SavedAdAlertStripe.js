import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AlertStripe from 'nav-frontend-alertstriper';
import AdAlertStripeEnum from './AdAlertStripeEnum';
import { formatISOString } from '../../utils/datoUtils.ts';
import './SavedAdAlertStripe.less';

const SavedAdAlertStripe = ({
    showAlertStripe,
    alertStripeMode,
    isSavingAd,
    published,
    limitedAccess,
}) => {
    if (isSavingAd) {
        return null;
    }
    if (showAlertStripe && alertStripeMode === AdAlertStripeEnum.SAVED) {
        return (
            <AlertStripe type="suksess" solid="true" className="SavedAdAlertStripe">
                {limitedAccess ? 'Endringene er lagret' : 'Stillingen er lagret i mine stillinger'}
            </AlertStripe>
        );
    } else if (showAlertStripe && alertStripeMode === AdAlertStripeEnum.WILL_PUBLISH_CHANGES) {
        return (
            <AlertStripe type="info" solid="true" className="SavedAdAlertStripe">
                Endringene blir publisert {formatISOString(published)}
            </AlertStripe>
        );
    } else if (showAlertStripe && alertStripeMode === AdAlertStripeEnum.PUBLISHED_CHANGES) {
        return (
            <AlertStripe type="suksess" solid="true" className="SavedAdAlertStripe">
                Endringene har blitt publisert
            </AlertStripe>
        );
    }
    return <div />;
};

SavedAdAlertStripe.propTypes = {
    showAlertStripe: PropTypes.bool.isRequired,
    alertStripeMode: PropTypes.string.isRequired,
    isSavingAd: PropTypes.bool.isRequired,
    limitedAccess: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
    showAlertStripe: state.savedAdAlertStripe.showAlertStripe,
    alertStripeMode: state.savedAdAlertStripe.alertStripeMode,
    isSavingAd: state.ad.isSavingAd,
    published: state.adData.published,
    limitedAccess: state.adData.createdBy !== 'pam-rekrutteringsbistand',
});

export default connect(mapStateToProps)(SavedAdAlertStripe);
