import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AlertStripe from 'nav-frontend-alertstriper';
import AdAlertStripeEnum from './AdAlertStripeEnum';
import { formatISOString } from '../../utils';
import './SavedAdAlertStripe.less';


const SavedAdAlertStripe = ({ showAlertStripe, alertStripeMode, isSavingAd, published }) => {
    if (isSavingAd) {
        return <div />;
    }
    if (showAlertStripe && alertStripeMode === AdAlertStripeEnum.SAVED) {
        return (
            <AlertStripe type="suksess" solid className="SavedAdAlertStripe">
                Stillingen er lagret i mine stillinger
            </AlertStripe>
        );
    } else if (showAlertStripe && alertStripeMode === AdAlertStripeEnum.WILL_PUBLISH_CHANGES) {
        return (
            <AlertStripe type="info" solid className="SavedAdAlertStripe">
                Endringene blir publisert {formatISOString(published)}
            </AlertStripe>
        );
    } else if (showAlertStripe && alertStripeMode === AdAlertStripeEnum.PUBLISHED_CHANGES) {
        return (
            <AlertStripe type="suksess" solid className="SavedAdAlertStripe">
                Endringene har blitt publisert
            </AlertStripe>
        );
    }
    return <div />;
};


SavedAdAlertStripe.propTypes = {
    showAlertStripe: PropTypes.bool.isRequired,
    alertStripeMode: PropTypes.string.isRequired,
    isSavingAd: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => ({
    showAlertStripe: state.savedAdAlertStripe.showAlertStripe,
    alertStripeMode: state.savedAdAlertStripe.alertStripeMode,
    isSavingAd: state.ad.isSavingAd,
    published: state.adData.published
});

export default connect(mapStateToProps)(SavedAdAlertStripe);
