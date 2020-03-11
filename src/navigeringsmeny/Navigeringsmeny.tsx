import React, { FunctionComponent } from 'react';
import { connect } from 'react-redux';
import { Location } from 'history';
import { useLocation } from 'react-router-dom';
import NyttIRekrutteringsbistand from '@navikt/nytt-i-rekrutteringsbistand';

import { SHOW_HAS_CHANGES_MODAL } from '../ad/adReducer';
import Tab, { TabConfig } from './Tab';
import Hus from './Hus';

import '../../node_modules/@navikt/nytt-i-rekrutteringsbistand/lib/nytt.css';
import 'pam-frontend-header/dist/style.css';
import './Navigeringsmeny.less';

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
        <div className="navigeringsmeny">
            <nav className="navigeringsmeny__tabs">
                <Hus href="/" erAktiv={pathname === '/'} />
                {tabs.map(tab => (
                    <Tab key={tab.href} config={tab} erAktiv={pathname === tab.href} />
                ))}
            </nav>
            <div className="navigeringsmeny__nyheter">
                <NyttIRekrutteringsbistand orientering={'under-hoyre' as any} />
            </div>
        </div>
    );
};

const mapStateToProps = (state: any) => ({
    hasChanges: state.ad.hasChanges,
});

const mapDispatchToProps = (dispatch: any) => ({
    showHasChangesModal: (leaveUrl: any) => dispatch({ type: SHOW_HAS_CHANGES_MODAL, leaveUrl }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Navigeringsmeny);
