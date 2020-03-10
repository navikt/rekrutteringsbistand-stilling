import React, { FunctionComponent } from 'react';
import { connect } from 'react-redux';
// import { FETCH_REPORTEE } from '../reportee/reporteeReducer';
import { SHOW_HAS_CHANGES_MODAL } from '../ad/adReducer';
import 'pam-frontend-header/dist/style.css';
import NyttIRekrutteringsbistand from '@navikt/nytt-i-rekrutteringsbistand';
import '../../node_modules/@navikt/nytt-i-rekrutteringsbistand/lib/nytt.css';
import './Navigeringsmeny.less';
import Tab, { TabConfig } from './Tab';
import { useLocation, Link } from 'react-router-dom';
import { Location } from 'history';
import Hus from './Hus';
/*
class Navigeringsmeny extends React.Component {
    componentDidMount() {
        const { displayName, fetchDisplayName, isFetchingDisplayName }: any = this.props;

        if (!displayName && !isFetchingDisplayName) {
            fetchDisplayName();
        }
    }

    render() {
        const { tabId, displayName, showHasChangesModal, hasChanges, visNyheter }: any = this.props;
        return (
            <div className="navigeringsmeny">
                <VeilederHeaderMeny
                    activeTabID={tabId}
                    innloggetBruker={displayName}
                    validerNavigasjon={{
                        redirectTillates: () => !hasChanges,
                        redirectForhindretCallback: url => showHasChangesModal(url),
                    }}
                />
                {visNyheter && (
                    <div className="navigeringsmeny__nyheter">
                        {/*<NyttIRekrutteringsbistand orientering="under-hoyre" />
                    </div>
                )}
            </div>
        );
    }
}*/

const tabs: TabConfig[] = [
    {
        tittel: 'Søk etter stilling',
        href: '/stillinger',
        erSammeApp: true,
    },
    {
        tittel: 'Mine stillinger',
        href: '/minestillinger',
        erSammeApp: true,
    },
    {
        tittel: 'Kandidatsøk',
        href: '/kandidater',
        erSammeApp: false,
    },
    {
        tittel: 'Kandidatlister',
        href: '/kandidater/lister',
        erSammeApp: false,
    },
];

type Props = {
    showHasChangesModal: () => void;
    hasChanges: boolean;
};

const Navigeringsmeny: FunctionComponent<Props> = props => {
    const { pathname }: Location = useLocation();

    return (
        <nav className="navigeringsmeny">
            <div className="navigeringsmeny__tabs">
                <Link className="navigeringsmeny__forside" to="/">
                    <Hus />
                </Link>
                {tabs.map(tab => (
                    <Tab key={tab.href} config={tab} erAktiv={pathname === tab.href} />
                ))}
            </div>
            <div className="navigeringsmeny__nyheter">
                <NyttIRekrutteringsbistand orientering={'under-hoyre' as any} />
            </div>
        </nav>
    );
};

const mapStateToProps = (state: any) => ({
    hasChanges: state.ad.hasChanges,
});

const mapDispatchToProps = (dispatch: any) => ({
    showHasChangesModal: (leaveUrl: any) => dispatch({ type: SHOW_HAS_CHANGES_MODAL, leaveUrl }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Navigeringsmeny);
