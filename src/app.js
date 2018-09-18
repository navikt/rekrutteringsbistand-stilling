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
import Duplicates from './duplicates/Duplicates';
import searchReducer, { searchSaga } from './searchPage/searchReducer';
import statisticsReducer, { statisticsSaga } from './statistics/statisticsReducer';
import duplicatesReducer, { duplicatesSaga } from './duplicates/duplicatesReducer';
import Ad from './ad/Ad';
import TopMenu from './topmenu/TopMenu';
import { initShortcuts } from './common/shortcuts/Shortcuts';
import './styles.less';
import './variables.less';
import StartPage from './startPage/StartPage';
import SearchPage from './searchPage/SearchPage';
import Statistics from './statistics/Statistics';
import reporteeReducer, { reporteeSaga } from './reportee/reporteeReducer';
import adDataReducer, { adDataSaga } from './ad/adDataReducer';
import adValidationReducer, { validationSaga } from './ad/adValidationReducer';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(combineReducers({
    ad: adReducer,
    adData: adDataReducer,
    adValidation: adValidationReducer,
    employer: employerReducer,
    location: locationCodeReducer,
    styrk: styrkReducer,
    reportee: reporteeReducer,
    search: searchReducer,
    statistics: statisticsReducer,
    duplicates: duplicatesReducer
}), applyMiddleware(sagaMiddleware));

sagaMiddleware.run(reporteeSaga);
sagaMiddleware.run(adSaga);
sagaMiddleware.run(validationSaga);
sagaMiddleware.run(employerSaga);
sagaMiddleware.run(locationSaga);
sagaMiddleware.run(styrkSaga);
sagaMiddleware.run(searchSaga);
sagaMiddleware.run(adDataSaga);
sagaMiddleware.run(statisticsSaga);
sagaMiddleware.run(duplicatesSaga);

initShortcuts();

const Main = () => (
    <main>
        <Switch>
            <Route exact path="/" component={StartPage} />
            <Route exact path="/statistics" component={Statistics} />
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
