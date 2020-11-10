import React, { FunctionComponent } from 'react';
import ReactDOM from 'react-dom';
import { Hoved, Main } from './app';
import Utviklingsapp from './utviklingsapp/Utviklingsapp';

const skalEksporteres = process.env.REACT_APP_EXPORT || process.env.NODE_ENV === 'production';

// Alle klassenavn blir prefikset med ".rek-stilling" i craco-configen, så også koden
// som brukes under utvikling må wrappes i et element med dette klassenavnet.
export const cssScopeForApp = 'rek-stilling';

if (process.env.REACT_APP_MOCK) {
    //require('./mock/mock-api');
}

const AppMedCssScope: FunctionComponent = (props: any) => (
    <div className={cssScopeForApp}>Hallååååå</div>
);

ReactDOM.render(<Utviklingsapp />, document.getElementById('utviklingsapp'));
