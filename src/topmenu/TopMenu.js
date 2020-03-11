import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { VeilederHeaderMeny, VeilederTabId } from 'pam-frontend-header';
import { FETCH_REPORTEE } from '../reportee/reporteeReducer';
import { SHOW_HAS_CHANGES_MODAL } from '../ad/adReducer';
import 'pam-frontend-header/dist/style.css';
import NyttIRekrutteringsbistand from '@navikt/nytt-i-rekrutteringsbistand';
import '../../node_modules/@navikt/nytt-i-rekrutteringsbistand/lib/nytt.css';
import './TopMenu.less';

class HeaderMenu extends React.Component {
    componentDidMount() {
        const { displayName, fetchDisplayName, isFetchingDisplayName } = this.props;

        if (!displayName && !isFetchingDisplayName) {
            fetchDisplayName();
        }
    }

    render() {
        const { tabId, displayName, showHasChangesModal, hasChanges, visNyheter } = this.props;
        return (
            <div className="top-menu">
                <VeilederHeaderMeny
                    activeTabID={tabId}
                    innloggetBruker={displayName}
                    validerNavigasjon={{
                        redirectTillates: () => !hasChanges,
                        redirectForhindretCallback: url => showHasChangesModal(url),
                    }}
                />
                {visNyheter && (
                    <div className="top-menu__nyheter">
                        <NyttIRekrutteringsbistand orientering="under-hoyre" />
                    </div>
                )}
            </div>
        );
    }
}

HeaderMenu.propTypes = {
    tabId: PropTypes.string.isRequired,
    displayName: PropTypes.string.isRequired,
    fetchDisplayName: PropTypes.func.isRequired,
    isFetchingDisplayName: PropTypes.bool.isRequired,
    showHasChangesModal: PropTypes.func.isRequired,
    hasChanges: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
    displayName: state.reportee.data ? state.reportee.data.displayName : '',
    isFetchingDisplayName: state.reportee.isFetchingReportee,
    visNyheter: state.featureToggles.visNyheter,
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
    showHasChangesModal: leaveUrl => dispatch({ type: SHOW_HAS_CHANGES_MODAL, leaveUrl }),
});

export const StillingssokHeader = connect(stillingssokProps, mapDispatchToProps)(HeaderMenu);
export const MinestillingerHeader = connect(mineStillingerProps, mapDispatchToProps)(HeaderMenu);
export const Rekrutteringsbisstand = connect(
    rekrutteringsbistandProps,
    mapDispatchToProps
)(HeaderMenu);
