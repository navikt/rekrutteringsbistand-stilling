import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { applyMiddleware, createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import stillingReducer, {stillingSaga} from "./stilling/stillingReducer";
import adsReducer, {adsSaga} from "./ads/adsReducer";
import Stilling from "./stilling/Stilling";
import Ads from "./ads/Ads";
import './styles.less';
import './variables.less';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(combineReducers({
    stilling: stillingReducer,
    ads: adsReducer
}), applyMiddleware(sagaMiddleware));

sagaMiddleware.run(stillingSaga);
sagaMiddleware.run(adsSaga);

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Ads} />
                <Route exact path="/ads" component={Ads} />
                <Route exact path="/ads/:uuid" component={Stilling} />
            </Switch>
        </BrowserRouter>
    </Provider>,
    document.getElementById('app')
);
