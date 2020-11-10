import React, { FunctionComponent } from 'react';
import ReactDOM from 'react-dom';
import { Hoved, Main } from './app';

const skalEksporteres = process.env.REACT_APP_EXPORT || process.env.NODE_ENV === 'production';

// Alle klassenavn blir prefikset med ".statistikk" i craco-configen, så også koden
// som brukes under utvikling må wrappes i et element med dette klassenavnet.
export const cssScopeForApp = 'rekbis-statistikk';

if (process.env.REACT_APP_MOCK) {
    //require('./mock/mock-api');
}

const AppMedCssScope: FunctionComponent = (props: any) => (
    <div className={cssScopeForApp}>Hallå</div>
);

ReactDOM.render(<Hoved />, document.getElementById('utviklingsapp'));
