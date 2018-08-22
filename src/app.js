import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { applyMiddleware, createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import employerReducer, { employerSaga } from './ad/administration/employer/employerReducer';
import locationCodeReducer, { locationSaga } from './ad/administration/location/locationCodeReducer';
import styrkReducer, { styrkSaga } from './ad/administration/styrk/styrkReducer';
import adReducer, { adSaga } from './ad/adReducer';
import searchReducer, { searchSaga } from './searchPage/searchReducer';
import Ad from './ad/Ad';
import TopMenu from './topmenu/TopMenu';
import { initShortcuts } from './common/shortcuts/Shortcuts';
import './styles.less';
import './variables.less';
import StartPage from './startPage/StartPage';
import SearchPage from './searchPage/SearchPage';
import reporteeReducer, { reporteeSaga } from './reportee/reporteeReducer';
import engagementTypeReducer from './ad/edit/engagementType/engagementTypeReducer';
import adDataReducer, { adDataSaga } from './ad/adDataReducer';
import adValidationReducer, { validationSaga } from './ad/adValidationReducer';
import modalReducer from './ad/administration/modals/modalReducer';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(combineReducers({
    ad: adReducer,
    adData: adDataReducer,
    adValidation: adValidationReducer,
    employer: employerReducer,
    location: locationCodeReducer,
    engagementType: engagementTypeReducer,
    styrk: styrkReducer,
    reportee: reporteeReducer,
    search: searchReducer,
    modal: modalReducer
}), applyMiddleware(sagaMiddleware));

sagaMiddleware.run(reporteeSaga);
sagaMiddleware.run(adSaga);
sagaMiddleware.run(validationSaga);
sagaMiddleware.run(employerSaga);
sagaMiddleware.run(locationSaga);
sagaMiddleware.run(styrkSaga);
sagaMiddleware.run(searchSaga);
sagaMiddleware.run(adDataSaga);

initShortcuts();

const Main = () => (
    <main>
        <Switch>
            <Route exact path="/" component={StartPage} />
            <Route exact path="/search" component={SearchPage} />
            <Route exact path="/ads" component={Ad} />
            <Route exact path="/ads/:uuid" component={Ad} />
            <Route exact path="*" component={StartPage} />
        </Switch>
    </main>
);

const App = () => (
    <div>
        <TopMenu />
        <Main />
    </div>
);


ReactDOM.render(
    <Provider store={store}>
        <div>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </div>
    </Provider>,
    document.getElementById('app')
);
