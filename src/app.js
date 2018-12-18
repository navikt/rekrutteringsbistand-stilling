import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Switch } from 'react-router-dom';
import { applyMiddleware, createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import employerReducer, { employerSaga } from './ad/edit/employer/employerReducer';
import locationCodeReducer, { locationSaga } from './ad/edit/location/locationCodeReducer';
import styrkReducer, { styrkSaga } from './ad/edit/jobDetails/styrk/styrkReducer';
import adReducer, { adSaga } from './ad/adReducer';
import searchReducer, { searchSaga } from './searchPage/searchReducer';
import filterLocationReducer, { filterLocationSaga } from './searchPage/filter/location/filterLocationReducer';
import municipalOrCountryReducer, { municipalOrCountrySaga } from './ad/edit/location/municipalOrCountryReducer';
import Ad from './ad/Ad';
import { MinestillingerHeader, Rekrutteringsbisstand, StillingssokHeader } from './topmenu/TopMenu';
import './styles.less';
import './variables.less';
import StartPage from './startPage/StartPage';
import SearchPage from './searchPage/SearchPage';
import MyAds from './myAds/MyAds';
import reporteeReducer, { reporteeSaga } from './reportee/reporteeReducer';
import adDataReducer, { adDataSaga } from './ad/adDataReducer';
import adValidationReducer, { validationSaga } from './ad/adValidationReducer';
import savedSearchAlertStripeReducer from './ad/alertstripe/SavedAdAlertStripeReducer';
import myAdsReducer, { myAdsSaga } from './myAds/myAdsReducer';
import history from './history';
import { hasContextParameter, redirectToContext } from './login';
import kandidatReducer, { kandidatSaga } from './ad/kandidatModal/kandidatReducer';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(combineReducers({
    ad: adReducer,
    adData: adDataReducer,
    adValidation: adValidationReducer,
    employer: employerReducer,
    kandidat: kandidatReducer,
    location: locationCodeReducer,
    filterLocation: filterLocationReducer,
    municipalOrCountry: municipalOrCountryReducer,
    myAds: myAdsReducer,
    reportee: reporteeReducer,
    savedAdAlertStripe: savedSearchAlertStripeReducer,
    search: searchReducer,
    styrk: styrkReducer
}), applyMiddleware(sagaMiddleware));

sagaMiddleware.run(adSaga);
sagaMiddleware.run(validationSaga);
sagaMiddleware.run(employerSaga);
sagaMiddleware.run(locationSaga);
sagaMiddleware.run(styrkSaga);
sagaMiddleware.run(reporteeSaga);
sagaMiddleware.run(searchSaga);
sagaMiddleware.run(filterLocationSaga);
sagaMiddleware.run(myAdsSaga);
sagaMiddleware.run(adDataSaga);
sagaMiddleware.run(municipalOrCountrySaga);
sagaMiddleware.run(kandidatSaga);

const Main = () => {
    if (hasContextParameter()) {
        redirectToContext();
        return;
    }

    return (
        <main>
            <Switch>
                <Route path="/minestillinger" component={MinestillingerHeader} />
                <Route path="/stillinger" component={StillingssokHeader} />
                <Route path="/" component={Rekrutteringsbisstand} />
            </Switch>
            <Switch>
                <Route exact path="/" component={StartPage} />
                <Route exact path="/minestillinger" component={MyAds} />
                <Route exact path="/stilling" component={Ad} />

                <Route exact path="/stillinger" component={SearchPage} />
                <Route exact path="/stilling/:uuid" component={Ad} />
                <Route exact path="*" component={StartPage} />
            </Switch>
        </main>
    )
};

ReactDOM.render(
    <Provider store={store}>
        <div>
            <Router history={history}>
                <Main />
            </Router>
        </div>
    </Provider>,
    document.getElementById('app')
);
