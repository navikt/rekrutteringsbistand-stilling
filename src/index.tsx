import React, { FunctionComponent } from 'react';
import { createRoot } from 'react-dom/client';
import Navspa from '@navikt/navspa';
import * as Sentry from '@sentry/react';

import '@navikt/ds-css';
import '@navikt/ds-css-internal';
import './index.css';

import App, { AppProps, store } from './app/App';
import Utviklingsapp from './utviklingsapp/Utviklingsapp';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';

const skalEksporteres = import.meta.env.VITE_EXPORT || import.meta.env.PROD;

const AppMedRouter: FunctionComponent<AppProps> = (props) => (
    <Sentry.ErrorBoundary>
        <Router navigator={props.history} location={props.history.location}>
            <AppMedStore {...props} />
        </Router>
    </Sentry.ErrorBoundary>
);

export const AppMedStore: FunctionComponent<AppProps> = ({ history, navKontor }) => (
    <Provider store={store}>
        <App history={history} navKontor={navKontor} />
    </Provider>
);

const renderUtviklingsapp = async () => {
    if (import.meta.env.VITE_MOCK) {
        await import('./mock/api');
    }

    const element = document.getElementById('utviklingsapp');
    const root = createRoot(element!);

    root.render(<Utviklingsapp />);
};

if (skalEksporteres) {
    Navspa.eksporter('rekrutteringsbistand-stilling', AppMedRouter);
} else {
    renderUtviklingsapp();
}
