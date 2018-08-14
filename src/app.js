import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { applyMiddleware, createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import employerReducer, { employerSaga } from './ad/edit/employer/employerReducer';
import postalCodeReducer, { postalCodeSaga } from './ad/edit/postalCode/postalCodeReducer';
import styrkReducer, { styrkSaga } from './ad/edit/styrk/styrkReducer';
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

const sagaMiddleware = createSagaMiddleware();

const store = createStore(combineReducers({
    ad: adReducer,
    employer: employerReducer,
    postalCode: postalCodeReducer,
    styrk: styrkReducer,
    reportee: reporteeReducer,
    search: searchReducer
}), applyMiddleware(sagaMiddleware));

sagaMiddleware.run(reporteeSaga);
sagaMiddleware.run(adSaga);
sagaMiddleware.run(employerSaga);
sagaMiddleware.run(postalCodeSaga);
sagaMiddleware.run(styrkSaga);
sagaMiddleware.run(searchSaga);

initShortcuts();

const Main = () => (
    <main>
        <Switch>
            <Route exact path="/" component={StartPage} />
            <Route exact path="/search" component={SearchPage} />
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
