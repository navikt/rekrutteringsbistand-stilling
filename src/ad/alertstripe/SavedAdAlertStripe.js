import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AlertStripe from 'nav-frontend-alertstriper';
import AdAlertStripeEnum from './AdAlertStripeEnum';
import './SavedAdAlertStripe.less';


const SavedAdAlertStripe = ({ showAlertStripe, alertStripeMode, variable, isSavingAd }) => {
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
                Endringene blir publisert {variable}
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


SavedAdAlertStripe.defaultProps = {
    variable: undefined
};

SavedAdAlertStripe.propTypes = {
    showAlertStripe: PropTypes.bool.isRequired,
    alertStripeMode: PropTypes.string.isRequired,
    variable: PropTypes.string,
    isSavingAd: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => ({
    showAlertStripe: state.savedAdAlertStripe.showAlertStripe,
    alertStripeMode: state.savedAdAlertStripe.alertStripeMode,
    variable: state.savedAdAlertStripe.variable,
    isSavingAd: state.ad.isSavingAd
});

export default connect(mapStateToProps)(SavedAdAlertStripe);
