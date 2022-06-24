import React, { FunctionComponent } from 'react';
import ReactDOM from 'react-dom';
import Navspa from '@navikt/navspa';
import '@navikt/ds-css';

import App, { AppProps } from './App';
import Utviklingsapp from './utviklingsapp/Utviklingsapp';

const skalEksporteres = process.env.REACT_APP_EXPORT || process.env.NODE_ENV === 'production';

// Alle klassenavn blir prefikset med ".rek-stilling" i craco-configen, så også koden
// som brukes under utvikling må wrappes i et element med dette klassenavnet.
export const cssScopeForApp = 'rek-stilling';

const AppMedCssScope: FunctionComponent<AppProps> = (props) => (
    <div className={cssScopeForApp}>
        <App {...props} />
    </div>
);

if (skalEksporteres) {
    Navspa.eksporter('rekrutteringsbistand-stilling', AppMedCssScope);
} else {
    ReactDOM.render(<Utviklingsapp />, document.getElementById('utviklingsapp'));
}
