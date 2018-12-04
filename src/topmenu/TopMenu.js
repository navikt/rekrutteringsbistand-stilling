import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { VeilederHeaderMeny, VeilederTabId } from 'pam-frontend-header';
import {FETCH_REPORTEE} from '../reportee/reporteeReducer';
import 'pam-frontend-header/dist/style.css';

const validateDisplayName = (displayName, fetchDisplayName, isFetchingDisplayName) => {
    if (!displayName && !isFetchingDisplayName) {
        fetchDisplayName();
    }
};

const Minestillinger = ({ displayName, fetchDisplayName, isFetchingDisplayName }) => {
    validateDisplayName(displayName, fetchDisplayName, isFetchingDisplayName);
    return <VeilederHeaderMeny activeTabID={VeilederTabId.MINE_STILLINGER} innloggetBruker={displayName}/>;
};

const Stillingssok = ({ displayName, fetchDisplayName, isFetchingDisplayName }) => {
    validateDisplayName(displayName, fetchDisplayName, isFetchingDisplayName);
    return  <VeilederHeaderMeny activeTabID={VeilederTabId.STILLINGSSOK} innloggetBruker={displayName} />;
};

const Rekbistand = ({ displayName, fetchDisplayName, isFetchingDisplayName }) => {
    validateDisplayName(displayName, fetchDisplayName, isFetchingDisplayName);
    return (
        <VeilederHeaderMeny
            activeTabID={VeilederTabId.REKRUTTERINGSBISTAND_INGEN_TAB}
            innloggetBruker={displayName}
        />
    );
};

const mapStateToProps = (state) => ({
        displayName: state.reportee.data ? state.reportee.data.displayName : '',
        isFetchingDisplayName: state.reportee.isFetchingReportee
});

const mapDispatchToProps = (dispatch) => ({
    fetchDisplayName: () => dispatch({ type: FETCH_REPORTEE })
});

const commonPropTypes = {
    displayName: PropTypes.string.isRequired,
    fetchDisplayName: PropTypes.func.isRequired,
    isFetchingDisplayName: PropTypes.bool.isRequired
};

Minestillinger.propTypes = commonPropTypes;
Stillingssok.propTypes = commonPropTypes;
Rekbistand.propTypes = commonPropTypes;

export const MinestillingerHeader = connect(mapStateToProps, mapDispatchToProps)(Minestillinger);
export const StillingssokHeader = connect(mapStateToProps, mapDispatchToProps)(Stillingssok);
export const Rekrutteringsbisstand = connect(mapStateToProps, mapDispatchToProps)(Rekbistand);

