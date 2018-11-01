import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { AlertStripeSuksess } from 'nav-frontend-alertstriper';
import './SavedAdAlertStripe.less';
import { AdAlertStripeMode } from './SavedAdAlertStripeReducer';

const SavedAdAlertStripe = ({ showAlertStripe, alertStripeMode }) => {
    if (showAlertStripe && alertStripeMode === AdAlertStripeMode.SAVED) {
        return (
            <AlertStripeSuksess solid className="SavedAdAlertStripe">
                Stillingen er lagret i mine stillinger
            </AlertStripeSuksess>
        );
    } else if (showAlertStripe && alertStripeMode === AdAlertStripeMode.PUBLISHED_CHANGES) {
        return (
            <AlertStripeSuksess solid className="SavedAdAlertStripe">
                Endringene har blitt publisert
            </AlertStripeSuksess>
        );
    }
    return <div />;
};

SavedAdAlertStripe.propTypes = {
    showAlertStripe: PropTypes.bool.isRequired,
    alertStripeMode: PropTypes.string.isRequired
};

const mapStateToProps = (state) => ({
    showAlertStripe: state.savedAdAlertStripe.showAlertStripe,
    alertStripeMode: state.savedAdAlertStripe.alertStripeMode
});

export default connect(mapStateToProps)(SavedAdAlertStripe);
