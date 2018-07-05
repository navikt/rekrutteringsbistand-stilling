import { put, takeLatest, select } from 'redux-saga/effects';
import { fetchGet, ApiError } from '../api/api';
import { AD_API } from "../fasitProperties";

export const FETCH_ADS = 'FETCH_ADS';
export const FETCH_ADS_BEGIN = 'FETCH_ADS_BEGIN';
export const FETCH_ADS_SUCCESS = 'FETCH_ADS_SUCCESS';
export const FETCH_ADS_FAILURE = 'FETCH_ADS_FAILURE';

const initialState = {
    items: [],
    error: undefined,
    isSearching: false
};

export default function adsReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_ADS_BEGIN:
            return {
                ...state,
                isSearching: true,
                error: undefined
            };
        case FETCH_ADS_SUCCESS:
            return {
                ...state,
                items: action.response.content,
                isSearching: false
            };
        case FETCH_ADS_FAILURE:
            return {
                ...state,
                error: action.error,
                isSearching: false
            };
        default:
            return state;
    }
}

function* getAds() {
    try {
        yield put({ type: FETCH_ADS_BEGIN });
        const response = yield fetchGet(`${AD_API}ads/`);
        yield put({ type: FETCH_ADS_SUCCESS, response });
    } catch (e) {
        if (e instanceof ApiError) {
            yield put({ type: FETCH_ADS_FAILURE, error: e });
        } else {
            throw e;
        }
    }
}

export const adsSaga = function* saga() {
    yield takeLatest(FETCH_ADS, getAds);
};
