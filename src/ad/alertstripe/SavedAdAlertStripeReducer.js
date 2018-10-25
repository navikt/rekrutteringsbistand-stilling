import { takeLatest, call, put } from 'redux-saga/effects';
import { SAVE_AD_FAILURE, SAVE_AD_SUCCESS } from '../adReducer';

export const SHOW_SAVED_SEARCH_ALERT_STRIPE = 'SHOW_SAVED_SEARCH_ALERT_STRIPE';
export const HIDE_SAVED_SEARCH_ALERT_STRIPE = 'HIDE_SAVED_SEARCH_ALERT_STRIPE';

const initialState = {
    showAlertStripe: false
};

export default function savedSearchAlertStripeReducer(state = initialState, action) {
    switch (action.type) {
        case SHOW_SAVED_SEARCH_ALERT_STRIPE:
            return {
                ...state,
                showAlertStripe: true
            };
        case HIDE_SAVED_SEARCH_ALERT_STRIPE:
            return {
                ...state,
                showAlertStripe: false
            };
        case SAVE_AD_FAILURE:
            return {
                ...state,
                showAlertStripe: false
            };
        default:
            return state;
    }
}

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function* showAlertStripe() {
    yield put({ type: SHOW_SAVED_SEARCH_ALERT_STRIPE });
    yield call(delay, 5000);
    yield put({ type: HIDE_SAVED_SEARCH_ALERT_STRIPE });
}

export const savedSearchAlertStripeSaga = function* saga() {
    yield takeLatest([
        SAVE_AD_SUCCESS
    ], showAlertStripe);
};
