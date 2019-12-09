import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { VeilederHeaderMeny, VeilederTabId } from 'pam-frontend-header';
import { FETCH_REPORTEE } from '../reportee/reporteeReducer';
import { SHOW_HAS_CHANGES_MODAL } from '../ad/adReducer';
import 'pam-frontend-header/dist/style.css';
import './TopMenu.less';
import { FETCH_FEATURE_TOGGLES } from '../featureToggles/featureTogglesReducer';

class HeaderMenu extends React.Component {
    componentDidMount() {
        const {
            displayName,
            fetchDisplayName,
            isFetchingDisplayName,
            fetchFeatureToggles,
        } = this.props;

        if (!displayName && !isFetchingDisplayName) {
            fetchDisplayName();
        }

        fetchFeatureToggles();
    }

    render() {
        const { tabId, displayName, showHasChangesModal, hasChanges } = this.props;
        return (
            <VeilederHeaderMeny
                activeTabID={tabId}
                innloggetBruker={displayName}
                validerNavigasjon={{
                    redirectTillates: () => !hasChanges,
                    redirectForhindretCallback: url => showHasChangesModal(url),
                }}
            />
        );
    }
}

HeaderMenu.propTypes = {
    tabId: PropTypes.string.isRequired,
    displayName: PropTypes.string.isRequired,
    fetchDisplayName: PropTypes.func.isRequired,
    fetchFeatureToggles: PropTypes.func.isRequired,
    isFetchingDisplayName: PropTypes.bool.isRequired,
    showHasChangesModal: PropTypes.func.isRequired,
    hasChanges: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
    displayName: state.reportee.data ? state.reportee.data.displayName : '',
    isFetchingDisplayName: state.reportee.isFetchingReportee,
    hasChanges: state.ad.hasChanges,
});

const stillingssokProps = state => ({
    ...mapStateToProps(state),
    tabId: VeilederTabId.STILLINGSSOK,
});

const mineStillingerProps = state => ({
    ...mapStateToProps(state),
    tabId: VeilederTabId.MINE_STILLINGER,
});

const rekrutteringsbistandProps = state => ({
    ...mapStateToProps(state),
    tabId: VeilederTabId.REKRUTTERINGSBISTAND_INGEN_TAB,
});

const mapDispatchToProps = dispatch => ({
    fetchDisplayName: () => dispatch({ type: FETCH_REPORTEE }),
    fetchFeatureToggles: () => dispatch({ type: FETCH_FEATURE_TOGGLES }),
    showHasChangesModal: leaveUrl => dispatch({ type: SHOW_HAS_CHANGES_MODAL, leaveUrl }),
});

export const StillingssokHeader = connect(stillingssokProps, mapDispatchToProps)(HeaderMenu);
export const MinestillingerHeader = connect(mineStillingerProps, mapDispatchToProps)(HeaderMenu);
export const Rekrutteringsbisstand = connect(
    rekrutteringsbistandProps,
    mapDispatchToProps
)(HeaderMenu);
