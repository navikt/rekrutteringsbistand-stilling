import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { VeilederHeaderMeny, VeilederTabId } from 'pam-frontend-header';
import {FETCH_REPORTEE} from '../reportee/reporteeReducer';
import 'pam-frontend-header/dist/style.css';

const HeaderMenu = ({ tabId, displayName, fetchDisplayName, isFetchingDisplayName }) => {
    if (!displayName && !isFetchingDisplayName) {
        fetchDisplayName();
    }
    return <VeilederHeaderMeny activeTabID={tabId} innloggetBruker={displayName}/>;
};

HeaderMenu.propTypes = {
    tabId: PropTypes.string.isRequired,
    displayName: PropTypes.string.isRequired,
    fetchDisplayName: PropTypes.func.isRequired,
    isFetchingDisplayName: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => ({
        displayName: state.reportee.data ? state.reportee.data.displayName : '',
        isFetchingDisplayName: state.reportee.isFetchingReportee
});

const stillingssokProps = (state) => ({
    ...mapStateToProps(state),
    tabId: VeilederTabId.STILLINGSSOK
});

const mineStillingerProps = (state) => ({
    ...mapStateToProps(state),
    tabId: VeilederTabId.MINE_STILLINGER
});

const rekrutteringsbistandProps = (state) => ({
    ...mapStateToProps(state),
    tabId: VeilederTabId.REKRUTTERINGSBISTAND_INGEN_TAB
});

const mapDispatchToProps = (dispatch) => ({
    fetchDisplayName: () => dispatch({ type: FETCH_REPORTEE })
});

export const StillingssokHeader = connect(stillingssokProps, mapDispatchToProps)(HeaderMenu);
export const MinestillingerHeader = connect(mineStillingerProps, mapDispatchToProps)(HeaderMenu);
export const Rekrutteringsbisstand = connect(rekrutteringsbistandProps, mapDispatchToProps)(HeaderMenu);

