import React, { useEffect } from 'react';
import { applyMiddleware, createStore, combineReducers, compose } from 'redux';
import { Provider, useDispatch } from 'react-redux';
import { Router, Route, Switch } from 'react-router-dom';
import * as Sentry from '@sentry/react';
import createSagaMiddleware from 'redux-saga';
import ReactDOM from 'react-dom';

import './styles.less'; // Må importeres før andre komponenter

import { fjernPersonopplysninger, getMiljø } from './sentryUtils';
import { urlHasPath, redirectToUrlPath } from './login';
import Ad from './ad/Ad';
import adDataReducer, { adDataSaga } from './ad/adDataReducer';
import adReducer, { adSaga } from './ad/adReducer.ts';
import adValidationReducer, { validationSaga } from './ad/adValidationReducer.ts';
import Dekoratør from './dekoratør/Dekoratør.tsx';
import employerReducer, { employerSaga } from './ad/edit/employer/employerReducer';
import featureTogglesReducer, {
    featureTogglesSaga,
    FETCH_FEATURE_TOGGLES,
} from './featureToggles/featureTogglesReducer';
import filterLocationReducer, {
    filterLocationSaga,
} from './searchPage/filter/location/filterLocationReducer';
import history from './history';
import kandidatReducer, { kandidatSaga } from './ad/kandidatModal/kandidatReducer';
import locationAreaReducer, { locationAreaSaga } from './ad/edit/location/locationAreaReducer';
import locationCodeReducer, { locationCodeSaga } from './ad/edit/location/locationCodeReducer';
import MyAds from './myAds/MyAds';
import myAdsReducer, { myAdsSaga } from './myAds/myAdsReducer';
import Navigeringsmeny from './navigeringsmeny/Navigeringsmeny.tsx';
import navKontorReducer from './navKontor/navKontorReducer.ts';
import reporteeReducer, { FETCH_REPORTEE, reporteeSaga } from './reportee/reporteeReducer';
import savedSearchAlertStripeReducer from './ad/alertstripe/SavedAdAlertStripeReducer';
import SearchPage from './searchPage/SearchPage';
import searchReducer, { searchSaga } from './searchPage/searchReducer';
import StartPage from './startPage/StartPage';
import stillingsinfoDataReducer from './stillingsinfo/stillingsinfoDataReducer';
import stillingsinfoReducer, { stillingsinfoSaga } from './stillingsinfo/stillingsinfoReducer';
import styrkReducer, { styrkSaga } from './ad/edit/jobDetails/styrk/styrkReducer';
import useLoggNavigering from './useLoggNavigering';

Sentry.init({
    dsn: 'https://34e485d3fd9945e29d5f66f11a29f84e@sentry.gc.nav.no/43',
    environment: getMiljø(),
    enabled: getMiljø() === 'dev-fss' || getMiljø() === 'prod-fss',
    beforeSend: fjernPersonopplysninger,
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
        filterLocation: filterLocationReducer,
        locationCode: locationCodeReducer,
        locationArea: locationAreaReducer,
        myAds: myAdsReducer,
        reportee: reporteeReducer,
        savedAdAlertStripe: savedSearchAlertStripeReducer,
        search: searchReducer,
        styrk: styrkReducer,
        stillingsinfo: stillingsinfoReducer,
        stillingsinfoData: stillingsinfoDataReducer,
        featureToggles: featureTogglesReducer,
        navKontor: navKontorReducer,
    }),
    composeEnhancers(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(adSaga);
sagaMiddleware.run(validationSaga);
sagaMiddleware.run(employerSaga);
sagaMiddleware.run(locationCodeSaga);
sagaMiddleware.run(styrkSaga);
sagaMiddleware.run(reporteeSaga);
sagaMiddleware.run(searchSaga);
sagaMiddleware.run(filterLocationSaga);
sagaMiddleware.run(myAdsSaga);
sagaMiddleware.run(adDataSaga);
sagaMiddleware.run(locationAreaSaga);
sagaMiddleware.run(kandidatSaga);
sagaMiddleware.run(stillingsinfoSaga);
sagaMiddleware.run(featureTogglesSaga);

const Main = () => {
    const dispatch = useDispatch();
    useLoggNavigering();

    useEffect(() => {
        dispatch({ type: FETCH_FEATURE_TOGGLES });
        dispatch({ type: FETCH_REPORTEE });
    }, []);

    if (urlHasPath()) {
        redirectToUrlPath();
        return null;
    }

    return (
        <main>
            <Dekoratør />
            <Navigeringsmeny />
            <Switch>
                <Route exact path="/stillinger/minestillinger" component={MyAds} />
                <Route exact path="/stillinger/stilling" component={Ad} />
                <Route exact path="/stillinger/stilling/:uuid" component={Ad} />
                <Route exact path="/stillinger" component={SearchPage} />
            </Switch>
        </main>
    );
};

ReactDOM.render(
    <Sentry.ErrorBoundary>
        <Provider store={store}>
            <Router history={history}>
                <Main />
            </Router>
        </Provider>
    </Sentry.ErrorBoundary>,
    document.getElementById('app')
);
