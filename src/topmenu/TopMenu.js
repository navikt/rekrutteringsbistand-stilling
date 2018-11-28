import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { VeilederHeaderMeny, VeilederTabId } from 'pam-frontend-header';
import 'pam-frontend-header/dist/style.css';

const Minestillinger = ({ data }) =>
    <VeilederHeaderMeny activeTabID={VeilederTabId.MINE_STILLINGER} innloggetBruker={data.displayName} />;

Minestillinger.defaultProps = {
    data: {
        displayName: ''
    }
};

Minestillinger.propTypes = {
    data: PropTypes.shape({
        displayName: PropTypes.string
    })
};


const Stillingssok = ({ data }) =>
    <VeilederHeaderMeny activeTabID={VeilederTabId.STILLINGSSOK} innloggetBruker={data.displayName} />;

Stillingssok.defaultProps = {
    data: {
        displayName: ''
    }
};

Stillingssok.propTypes = {
    data: PropTypes.shape({
        displayName: PropTypes.string
    })
};

const Rekbistand = ({ data }) => (
    <VeilederHeaderMeny
        activeTabID={VeilederTabId.REKRUTTERINGSBISTAND_INGEN_TAB}
        innloggetBruker={data.displayName}
    />);

Rekbistand.defaultProps = {
    data: {
        displayName: ''
    }
};

Rekbistand.propTypes = {
    data: PropTypes.shape({
        displayName: PropTypes.string
    })
};

const mapStateToProps = (state) => ({
    data: state.reportee.data
});

export const MinestillingerHeader = connect(mapStateToProps)(Minestillinger);
export const StillingssokHeader = connect(mapStateToProps)(Stillingssok);
export const Rekrutteringsbisstand = connect(mapStateToProps)(Rekbistand);

