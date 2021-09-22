import React, { useEffect } from 'react';
import Modal from 'react-modal';
import { applyMiddleware, createStore, combineReducers, compose } from 'redux';
import { Provider, useDispatch } from 'react-redux';
import { Router, Route, Switch } from 'react-router-dom';
import * as Sentry from '@sentry/react';
import createSagaMiddleware from 'redux-saga';

import './styles.less'; // Må importeres før andre komponenter

import { fjernPersonopplysninger, getMiljø } from './sentryUtils';
import Ad from './ad/Ad';
import adDataReducer, { adDataSaga } from './ad/adDataReducer';
import adReducer, { adSaga } from './ad/adReducer.ts';
import adValidationReducer, { validationSaga } from './ad/adValidationReducer.ts';
import employerReducer, { employerSaga } from './ad/edit/employer/employerReducer';
import featureTogglesReducer, {
    featureTogglesSaga,
    FETCH_FEATURE_TOGGLES,
} from './featureToggles/featureTogglesReducer';
import kandidatReducer, { kandidatSaga } from './ad/kandidatModal/kandidatReducer';
import locationAreaReducer, { locationAreaSaga } from './ad/edit/location/locationAreaReducer';
import locationCodeReducer, { locationCodeSaga } from './ad/edit/location/locationCodeReducer';
import MyAds from './myAds/MyAds';
import myAdsReducer, { myAdsSaga } from './myAds/myAdsReducer';
import reporteeReducer, { FETCH_REPORTEE, reporteeSaga } from './reportee/reporteeReducer';
import savedSearchAlertStripeReducer from './ad/alertstripe/SavedAdAlertStripeReducer';
import stillingsinfoDataReducer from './stillingsinfo/stillingsinfoDataReducer';
import stillingsinfoReducer, { stillingsinfoSaga } from './stillingsinfo/stillingsinfoReducer';
import styrkReducer, { styrkSaga } from './ad/edit/jobDetails/styrk/styrkReducer';
import useLoggNavigering from './useLoggNavigering';

Sentry.init({
    dsn: 'https://34e485d3fd9945e29d5f66f11a29f84e@sentry.gc.nav.no/43',
    environment: getMiljø(),
    release: process.env.REACT_APP_SENTRY_RELEASE || 'unknown',
    enabled: getMiljø() === 'dev-fss' || getMiljø() === 'prod-fss',
    beforeSend: fjernPersonopplysninger,
    autoSessionTracking: false,
});

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    combineReducers({
        ad: adReducer,
        adData: adDataReducer,
        adValidation: adValidationReducer,
        employer: employerReducer,
        kandidat: kandidatReducer,
        locationCode: locationCodeReducer,
        locationArea: locationAreaReducer,
        myAds: myAdsReducer,
        reportee: reporteeReducer,
        savedAdAlertStripe: savedSearchAlertStripeReducer,
        styrk: styrkReducer,
        stillingsinfo: stillingsinfoReducer,
        stillingsinfoData: stillingsinfoDataReducer,
        featureToggles: featureTogglesReducer,
    }),
    composeEnhancers(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(adSaga);
sagaMiddleware.run(validationSaga);
sagaMiddleware.run(employerSaga);
sagaMiddleware.run(locationCodeSaga);
sagaMiddleware.run(styrkSaga);
sagaMiddleware.run(reporteeSaga);
sagaMiddleware.run(myAdsSaga);
sagaMiddleware.run(adDataSaga);
sagaMiddleware.run(locationAreaSaga);
sagaMiddleware.run(kandidatSaga);
sagaMiddleware.run(stillingsinfoSaga);
sagaMiddleware.run(featureTogglesSaga);

const appElement =
    document.getElementById('rekrutteringsbistand-container') ||
    document.getElementById('utviklingsapp');
Modal.setAppElement(appElement);

const App = () => {
    const dispatch = useDispatch();
    useLoggNavigering();

    useEffect(() => {
        dispatch({ type: FETCH_FEATURE_TOGGLES });
        dispatch({ type: FETCH_REPORTEE });
    }, [dispatch]);

    return (
        <main>
            <Switch>
                <Route exact path="/stillinger/minestillinger" component={MyAds} />
                <Route exact path="/stillinger/stilling/:uuid" component={Ad} />
            </Switch>
        </main>
    );
};

export const Main = ({ history }) => {
    return (
        <Sentry.ErrorBoundary>
            <Provider store={store}>
                <Router history={history}>
                    <App />
                </Router>
            </Provider>
        </Sentry.ErrorBoundary>
    );
};
