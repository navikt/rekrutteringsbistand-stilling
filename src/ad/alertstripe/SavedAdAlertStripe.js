import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AlertStripe from 'nav-frontend-alertstriper';
import AdAlertStripeEnum from './AdAlertStripeEnum';
import { formatISOString } from '../../utils';
import './SavedAdAlertStripe.less';
import { Link } from 'react-router-dom';

const SavedAdAlertStripe = ({
    showAlertStripe,
    alertStripeMode,
    isSavingAd,
    published,
    limitedAccess,
}) => {
    if (isSavingAd) {
        return <div />;
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
    } else if (showAlertStripe && alertStripeMode === AdAlertStripeEnum.TRANSFERRED) {
        return (
            <AlertStripe type="suksess" solid="true" className="SavedAdAlertStripe">
                Stillingen og kandidatlisten er nå markert som din. Du kan finne den under
                <Link to="/minestillinger" className="typo-normal lenke">
                    "mine stillinger".
                </Link>
            </AlertStripe>
        );
    } else if (showAlertStripe && alertStripeMode === AdAlertStripeEnum.MARKED) {
        return (
            <AlertStripe type="suksess" solid="true" className="SavedAdAlertStripe">
                Du er nå eier av stillingen og kandidatlisten. Du kan finne den under
                <Link to="/minestillinger" className="typo-normal lenke">
                    "mine stillinger".
                </Link>
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

const mapStateToProps = state => ({
    showAlertStripe: state.savedAdAlertStripe.showAlertStripe,
    alertStripeMode: state.savedAdAlertStripe.alertStripeMode,
    isSavingAd: state.ad.isSavingAd,
    published: state.adData.published,
    limitedAccess: state.adData.createdBy !== 'pam-rekrutteringsbistand',
});

export default connect(mapStateToProps)(SavedAdAlertStripe);
