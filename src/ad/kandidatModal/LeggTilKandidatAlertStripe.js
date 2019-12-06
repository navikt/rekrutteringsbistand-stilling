import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { AlertStripeSuksess, AlertStripeAdvarselSolid } from 'nav-frontend-alertstriper';
import { KandidatAlertStripeMode } from './kandidatReducer';
import './LeggTilKandidatAlertStripe.less';

const LeggTilKandidatAlertStripe = ({
    showAlertStripe,
    alertStripeMode,
    kandidat,
    fodselsnummer,
}) => {
    if (showAlertStripe && alertStripeMode === KandidatAlertStripeMode.SAVED) {
        return (
            <AlertStripeSuksess solid="true" className="LeggTilKandidatAlertStripe">
                {`${kandidat.fornavn} ${kandidat.etternavn} (${fodselsnummer}) er lagt til i kandidatlisten`}
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
        etternavn: PropTypes.string,
    }),
    fodselsnummer: PropTypes.string,
};

const mapStateToProps = state => ({
    showAlertStripe: state.kandidat.showAlertStripe,
    alertStripeMode: state.kandidat.alertStripeMode,
    kandidat: state.kandidat.kandidat,
    fodselsnummer: state.kandidat.fodselsnummer,
});

export default connect(mapStateToProps)(LeggTilKandidatAlertStripe);
