import { call, put } from 'redux-saga/effects';
import { SAVE_AD_FAILURE } from '../adReducer';
import AdAlertStripeEnum from './AdAlertStripeEnum';

export const SHOW_SAVED_AD_ALERT_STRIPE = 'SHOW_SAVED_AD_ALERT_STRIPE';
export const HIDE_SAVED_AD_ALERT_STRIPE = 'HIDE_SAVED_AD_ALERT_STRIPE';


const initialState = {
    showAlertStripe: false,
    alertStripeMode: AdAlertStripeEnum.SAVED
};

export default function savedSearchAlertStripeReducer(state = initialState, action) {
    switch (action.type) {
        case SHOW_SAVED_AD_ALERT_STRIPE:
            return {
                ...state,
                showAlertStripe: true,
                alertStripeMode: action.mode
            };
        case HIDE_SAVED_AD_ALERT_STRIPE:
            return initialState;
        case SAVE_AD_FAILURE:
            return initialState;
        default:
            return state;
    }
}

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export function* showAlertStripe(mode) {
    yield put({ type: SHOW_SAVED_AD_ALERT_STRIPE, mode });
    yield call(delay, 3000);
    yield put({ type: HIDE_SAVED_AD_ALERT_STRIPE });
}
