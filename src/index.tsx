import React, { FunctionComponent } from 'react';
import ReactDOM from 'react-dom';
import Navspa from '@navikt/navspa';
import * as Sentry from '@sentry/react';
import '@navikt/ds-css';

import App, { AppProps, store } from './App';
import Utviklingsapp from './utviklingsapp/Utviklingsapp';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';

const skalEksporteres = process.env.REACT_APP_EXPORT || process.env.NODE_ENV === 'production';

// Alle klassenavn blir prefikset med ".rek-stilling" i craco-configen, så også koden
// som brukes under utvikling må wrappes i et element med dette klassenavnet.
export const cssScopeForApp = 'rek-stilling';

const AppMedRouter: FunctionComponent<AppProps> = (props) => (
    <div className={cssScopeForApp}>
        <Sentry.ErrorBoundary>
            <Router navigator={props.history} location={props.history.location}>
                <AppMedStore {...props} />
            </Router>
        </Sentry.ErrorBoundary>
    </div>
);

export const AppMedStore: FunctionComponent<AppProps> = ({ history, navKontor }) => (
    <Provider store={store}>
        <App history={history} navKontor={navKontor} />
    </Provider>
);

if (skalEksporteres) {
    Navspa.eksporter('rekrutteringsbistand-stilling', AppMedRouter);
} else {
    ReactDOM.render(<Utviklingsapp />, document.getElementById('utviklingsapp'));
}
