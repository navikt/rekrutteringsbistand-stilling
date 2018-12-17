import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Switch } from 'react-router-dom';
import { applyMiddleware, createStore, combineReducers } from 'redux';
import { Provider, connect } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import employerReducer, { employerSaga } from './ad/edit/employer/employerReducer';
import locationCodeReducer, { locationSaga } from './ad/edit/location/locationCodeReducer';
import styrkReducer, { styrkSaga } from './ad/edit/jobDetails/styrk/styrkReducer';
import adReducer, { adSaga } from './ad/adReducer';
import searchReducer, { RESET_SEARCH, searchSaga } from './searchPage/searchReducer';
import municipalReducer, { municipalSaga } from './searchPage/filter/municipal/municipalReducer';
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
import kandidatReducer, { kandidatSaga } from './ad/kandidatModal/kandidatReducer';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(combineReducers({
    ad: adReducer,
    adData: adDataReducer,
    adValidation: adValidationReducer,
    employer: employerReducer,
    kandidat: kandidatReducer,
    location: locationCodeReducer,
    municipal: municipalReducer,
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
sagaMiddleware.run(municipalSaga);
sagaMiddleware.run(myAdsSaga);
sagaMiddleware.run(adDataSaga);
sagaMiddleware.run(municipalOrCountrySaga);
sagaMiddleware.run(kandidatSaga);

class StillingssokWrapper extends React.Component {
    componentDidMount() {
        store.dispatch({ type: RESET_SEARCH });
    }

    render() {
        return this.props.children;
    }
}

const Main = () => (
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
            <StillingssokWrapper>
                <Route exact path="/stillinger" component={SearchPage} />
                <Route exact path="/stilling/:uuid" component={Ad} />
            </StillingssokWrapper>
            <Route exact path="*" component={StartPage} />
        </Switch>
    </main>
);

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
