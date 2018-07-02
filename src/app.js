import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { applyMiddleware, createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';

import './styles.less';
import './variables.less';
import stillingReducer, {stillingSaga} from "./stilling/stillingReducer";
import Stilling from "./stilling/Stilling";

const sagaMiddleware = createSagaMiddleware();

const store = createStore(combineReducers({
    stilling: stillingReducer
}), applyMiddleware(sagaMiddleware));

sagaMiddleware.run(stillingSaga);

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Stilling} />
                <Route exact path="/ad/:uuid" component={Stilling} />
            </Switch>
        </BrowserRouter>
    </Provider>,
    document.getElementById('app')
);
