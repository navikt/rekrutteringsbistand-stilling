import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { VeilederHeaderMeny, VeilederTabId } from 'pam-frontend-header';
import 'pam-frontend-header/dist/style.css';

const Minestillinger = ({ displayName }) =>
    <VeilederHeaderMeny activeTabID={VeilederTabId.MINE_STILLINGER} innloggetBruker={displayName} />;

Minestillinger.propTypes = {
    displayName: PropTypes.string.isRequired
};


const Stillingssok = ({ displayName }) =>
    <VeilederHeaderMeny activeTabID={VeilederTabId.STILLINGSSOK} innloggetBruker={displayName} />;

Stillingssok.propTypes = {
    displayName: PropTypes.string.isRequired
};

const Rekbistand = ({ displayName }) => (
    <VeilederHeaderMeny
        activeTabID={VeilederTabId.REKRUTTERINGSBISTAND_INGEN_TAB}
        innloggetBruker={displayName}
    />);

Rekbistand.propTypes = {
    displayName: PropTypes.string.isRequired
};

const mapStateToProps = (state) => ({
    displayName: state.reportee.data ? state.reportee.data.displayName : ''
});

export const MinestillingerHeader = connect(mapStateToProps)(Minestillinger);
export const StillingssokHeader = connect(mapStateToProps)(Stillingssok);
export const Rekrutteringsbisstand = connect(mapStateToProps)(Rekbistand);

