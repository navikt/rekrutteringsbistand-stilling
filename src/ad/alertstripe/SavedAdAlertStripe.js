import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { AlertStripeSuksess } from 'nav-frontend-alertstriper';
import './SavedAdAlertStripe.less';

const SavedAdAlertStripe = ({ showAlertStripe }) => {
    if (showAlertStripe) {
        return (
            <AlertStripeSuksess solid className="SavedAdAlertStripe">
                Stillingen er lagret i mine stillinger
            </AlertStripeSuksess>
        );
    }
    return <div />;
};

SavedAdAlertStripe.propTypes = {
    showAlertStripe: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
    showAlertStripe: state.savedAdAlertStripe.showAlertStripe
});

export default connect(mapStateToProps)(SavedAdAlertStripe);
