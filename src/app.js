import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { applyMiddleware, createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import employerReducer, { employerSaga } from './ad/categorize/employer/employerReducer';
import locationReducer, { locationSaga } from './ad/categorize/location/locationReducer';
import styrkReducer, { styrkSaga } from './ad/categorize/styrk/styrkReducer';
import adsReducer, { adsSaga } from './ads/adsReducer';
import adReducer, { adSaga } from './ad/adReducer';
import processingReducer, {processingSaga} from "./ad/administration/processingReducer";
import Ad from './ad/Ad';
import Ads from './ads/Ads';
import TopMenu from './topmenu/TopMenu';
import './styles.less';
import './variables.less';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(combineReducers({
    ad: adReducer,
    ads: adsReducer,
    employer: employerReducer,
    location: locationReducer,
    styrk: styrkReducer,
    processing: processingReducer
}), applyMiddleware(sagaMiddleware));

sagaMiddleware.run(adSaga);
sagaMiddleware.run(adsSaga);
sagaMiddleware.run(employerSaga);
sagaMiddleware.run(locationSaga);
sagaMiddleware.run(styrkSaga);
sagaMiddleware.run(processingSaga);

ReactDOM.render(
    <Provider store={store}>
        <div>
            <TopMenu />
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={Ads}/>
                    <Route exact path="/ads" component={Ads}/>
                    <Route exact path="/ads/:uuid" component={Ad}/>
                </Switch>
            </BrowserRouter>
        </div>
    </Provider>,
    document.getElementById('app')
);
