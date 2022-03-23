import React, { FunctionComponent, useEffect } from 'react';
import Modal from 'react-modal';
import { History } from 'history';
import { Provider, useDispatch } from 'react-redux';
import { Router, Route, Switch } from 'react-router-dom';
import * as Sentry from '@sentry/react';

import './styles.less'; // Må importeres før andre komponenter

import Ad from './ad/Ad';
import MyAds from './myAds/MyAds';
import reduxStore from './reduxStore';
import useLoggNavigering from './verktøy/useLoggNavigering';
import Varsling from './common/varsling/Varsling';
import { startSentry } from './verktøy/sentry';
import { ReporteeAction, ReporteeActionType } from './reportee/ReporteeAction';

startSentry();

const appElement =
    document.getElementById('rekrutteringsbistand-container') ||
    document.getElementById('utviklingsapp');

if (appElement) {
    Modal.setAppElement(appElement);
}

const MedRouter: FunctionComponent = () => {
    const dispatch = useDispatch();

    useLoggNavigering();

    useEffect(() => {
        dispatch<ReporteeAction>({ type: ReporteeActionType.FetchReportee });
    }, [dispatch]);

    return (
        <>
            <Varsling />
            <Switch>
                <Route exact path="/stillinger/minestillinger" component={MyAds} />
                <Route exact path="/stillinger/stilling/:uuid" component={Ad} />
            </Switch>
        </>
    );
};

export type AppProps = {
    history: History;
};

const App: FunctionComponent<AppProps> = ({ history }) => {
    return (
        <Sentry.ErrorBoundary>
            <Provider store={reduxStore}>
                <Router history={history}>
                    <MedRouter />
                </Router>
            </Provider>
        </Sentry.ErrorBoundary>
    );
};

export default App;
