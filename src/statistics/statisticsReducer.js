import { put, takeLatest } from 'redux-saga/effects';
import { ApiError, fetchGet } from '../api/api';
import { AD_API } from '../fasitProperties';

export const FETCH_STATS = 'FETCH_STATS';
export const FETCH_STATS_BEGIN = 'FETCH_STATS_BEGIN';
export const FETCH_STATS_SUCCESS = 'FETCH_STATS_SUCCESS';
export const FETCH_STATS_FAILURE = 'FETCH_STATS_FAILURE';

const initialState = {
    error: undefined,
    isFetching: false,
    stats: undefined
};

export default function statisticsReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_STATS_BEGIN:
            return {
                ...state,
                isFetching: true,
                error: undefined
            };
        case FETCH_STATS_SUCCESS:
            return {
                ...state,
                isFetching: false,
                stats: action.response
            };
        default:
            return state;
    }
}

function* getStatistics() {
    yield put({ type: FETCH_STATS_BEGIN });
    try {
        const response = yield fetchGet(`${AD_API}ad-source-stats/`);
        yield put({ type: FETCH_STATS_SUCCESS, response });
    } catch (e) {
        if (e instanceof ApiError) {
            yield put({ type: FETCH_STATS_FAILURE, error: e });
        } else {
            throw e;
        }
    }
}

export const statisticsSaga = function* saga() {
    yield takeLatest(FETCH_STATS, getStatistics);
};
