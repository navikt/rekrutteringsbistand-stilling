import React, { FunctionComponent, useEffect } from 'react';
import Modal from 'react-modal';
import { Provider, useDispatch } from 'react-redux';
import { Router, Route, Switch } from 'react-router-dom';
import * as Sentry from '@sentry/react';

import './styles.less'; // Må importeres før andre komponenter

import { FETCH_FEATURE_TOGGLES } from './featureToggles/featureTogglesReducer';
import { FETCH_REPORTEE } from './reportee/reporteeReducer';
import { fjernPersonopplysninger, getMiljø, Miljø } from './sentryUtils';
import Ad from './ad/Ad';
import MyAds from './myAds/MyAds';
import useLoggNavigering from './useLoggNavigering';
import Varsling from './common/varsling/Varsling';
import reduxStore from './reduxStore';
import { History } from 'history';

Sentry.init({
    dsn: 'https://34e485d3fd9945e29d5f66f11a29f84e@sentry.gc.nav.no/43',
    environment: getMiljø(),
    release: process.env.REACT_APP_SENTRY_RELEASE || 'unknown',
    enabled: getMiljø() === Miljø.DevGcp || getMiljø() === Miljø.ProdGcp,
    beforeSend: fjernPersonopplysninger,
    autoSessionTracking: false,
});

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
        dispatch({ type: FETCH_FEATURE_TOGGLES });
        dispatch({ type: FETCH_REPORTEE });
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
