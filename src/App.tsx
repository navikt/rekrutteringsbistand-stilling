import React, { FunctionComponent, useEffect } from 'react';
import Modal from 'react-modal';
import { History } from 'history';
import { Provider, useDispatch } from 'react-redux';
import { Router, Route, Switch } from 'react-router-dom';
import * as Sentry from '@sentry/react';

import './styles.less'; // Må importeres før andre komponenter

import Stilling from './stilling/Stilling';
import MineStillinger from './mine-stillinger/MineStillinger';
import Varsling from './common/varsling/Varsling';
import { startSentry } from './verktøy/sentry';
import { ReporteeAction, ReporteeActionType } from './reportee/ReporteeAction';
import { setNavKontorIAmplitude } from './verktøy/amplitude';
import createReduxStore from './redux/store';

startSentry();

export const store = createReduxStore();

const appElement =
    document.getElementById('rekrutteringsbistand-container') ||
    document.getElementById('utviklingsapp');

if (appElement) {
    Modal.setAppElement(appElement);
}

export type AppProps = {
    history: History;
    navKontor: string | null;
};

const MedRouter: FunctionComponent<AppProps> = ({ navKontor }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        if (navKontor !== null) {
            setNavKontorIAmplitude(navKontor);
        }
    }, [navKontor]);

    useEffect(() => {
        dispatch<ReporteeAction>({ type: ReporteeActionType.FetchReportee });
    }, [dispatch]);

    return (
        <>
            <Varsling />
            <Switch>
                <Route exact path="/stillinger/minestillinger" component={MineStillinger} />
                <Route exact path="/stillinger/stilling/:uuid" component={Stilling} />
            </Switch>
        </>
    );
};

const App: FunctionComponent<AppProps> = ({ history, navKontor }) => {
    return (
        <Sentry.ErrorBoundary>
            <Provider store={store}>
                <Router history={history}>
                    <MedRouter history={history} navKontor={navKontor} />
                </Router>
            </Provider>
        </Sentry.ErrorBoundary>
    );
};

export default App;
