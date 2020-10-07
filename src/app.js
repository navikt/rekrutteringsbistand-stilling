import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Switch } from 'react-router-dom';
import { applyMiddleware, createStore, combineReducers, compose } from 'redux';
import { Provider, useDispatch, useSelector } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import employerReducer, { employerSaga } from './ad/edit/employer/employerReducer';
import locationCodeReducer, { locationCodeSaga } from './ad/edit/location/locationCodeReducer';
import styrkReducer, { styrkSaga } from './ad/edit/jobDetails/styrk/styrkReducer';
import adReducer, { adSaga } from './ad/adReducer';
import searchReducer, { searchSaga } from './searchPage/searchReducer';
import filterLocationReducer, {
    filterLocationSaga,
} from './searchPage/filter/location/filterLocationReducer';
import locationAreaReducer, { locationAreaSaga } from './ad/edit/location/locationAreaReducer';
import Ad from './ad/Ad';
import Navigeringsmeny from './navigeringsmeny/Navigeringsmeny.tsx';
import './styles.less';
import './variables.less';
import StartPage from './startPage/StartPage';
import SearchPage from './searchPage/SearchPage';
import MyAds from './myAds/MyAds';
import reporteeReducer, { FETCH_REPORTEE, reporteeSaga } from './reportee/reporteeReducer';
import adDataReducer, { adDataSaga } from './ad/adDataReducer';
import adValidationReducer, { validationSaga } from './ad/adValidationReducer.ts';
import savedSearchAlertStripeReducer from './ad/alertstripe/SavedAdAlertStripeReducer';
import myAdsReducer, { myAdsSaga } from './myAds/myAdsReducer';
import history from './history';
import { urlHasPath, redirectToUrlPath } from './login';
import kandidatReducer, { kandidatSaga } from './ad/kandidatModal/kandidatReducer';
import stillingsinfoDataReducer from './stillingsinfo/stillingsinfoDataReducer';
import stillingsinfoReducer, { stillingsinfoSaga } from './stillingsinfo/stillingsinfoReducer';
import featureTogglesReducer, {
    featureTogglesSaga,
    FETCH_FEATURE_TOGGLES,
} from './featureToggles/featureTogglesReducer';
import navKontorReducer from './navKontor/navKontorReducer.ts';
import Dekoratør from './dekoratør/Dekoratør.tsx';
import useLoggNavigering from './useLoggNavigering';

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
                <Route exact path="/" component={StartPage} />
                <Route exact path="/minestillinger" component={MyAds} />
                <Route exact path="/stilling" component={Ad} />

                <Route exact path="/stillinger" component={SearchPage} />
                <Route exact path="/stilling/:uuid" component={Ad} />
                <Route exact path="*" component={StartPage} />
            </Switch>
        </main>
    );
};

ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <Main />
        </Router>
    </Provider>,
    document.getElementById('app')
);
