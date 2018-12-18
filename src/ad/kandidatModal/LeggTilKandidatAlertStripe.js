import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { AlertStripeSuksess, AlertStripeAdvarselSolid } from 'nav-frontend-alertstriper';
import { KandidatAlertStripeMode } from './kandidatReducer';

const LeggTilKandidatAlertStripe = ({ showAlertStripe, alertStripeMode, kandidat }) => {
    if (showAlertStripe && alertStripeMode === KandidatAlertStripeMode.SAVED) {
        return (
            <AlertStripeSuksess solid className="LeggTilKandidatAlertStripe">
                {`Kandidat ${kandidat.fornavn} ${kandidat.etternavn} er lagt til`}
            </AlertStripeSuksess>
        );
    } else if (showAlertStripe && alertStripeMode === KandidatAlertStripeMode.FAILURE) {
        return (
            <AlertStripeAdvarselSolid className="LeggTilKandidatAlertStripe">
                Kandidat kunne ikke legges til
            </AlertStripeAdvarselSolid>
        );
    }
    return <div />;
};

LeggTilKandidatAlertStripe.propTypes = {
    showAlertStripe: PropTypes.bool.isRequired,
    alertStripeMode: PropTypes.string.isRequired,
    kandidat: PropTypes.shape({
        fornavn: PropTypes.string,
        etternavn: PropTypes.string
    })
};

const mapStateToProps = (state) => ({
    showAlertStripe: state.kandidat.showAlertStripe,
    alertStripeMode: state.kandidat.alertStripeMode,
    kandidat: state.kandidat.kandidat
});

export default connect(mapStateToProps)(LeggTilKandidatAlertStripe);
