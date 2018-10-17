import { put, select } from 'redux-saga/effects';
import { ApiError, fetchGet } from '../api/api';
import { AD_API } from '../fasitProperties';

export const FETCH_REPORTEE = 'FETCH_REPORTEE';
export const FETCH_REPORTEE_BEGIN = 'FETCH_REPORTEE_BEGIN';
export const FETCH_REPORTEE_SUCCESS = 'FETCH_REPORTEE_SUCCESS';
export const FETCH_REPORTEE_FAILURE = 'FETCH_REPORTEE_FAILURE';

const initialState = {
    data: undefined,
    error: undefined,
    isFetchingReportee: false,
    numberOfPendingAds: undefined
};

export default function reporteeReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_REPORTEE_BEGIN:
            return {
                ...state,
                data: undefined,
                isFetchingReportee: true,
                error: undefined
            };
        case FETCH_REPORTEE_SUCCESS:
            return {
                ...state,
                data: action.response,
                isFetchingReportee: false
            };
        case FETCH_REPORTEE_FAILURE:
            return {
                ...state,
                error: action.error,
                isFetchingReportee: false
            };
        default:
            return state;
    }
}

export function* getReportee() {
    let state = yield select();
    if (!state.reportee.data) {
        yield put({ type: FETCH_REPORTEE_BEGIN });
        try {
            const response = yield fetchGet(`${AD_API}reportee/`);
            yield put({ type: FETCH_REPORTEE_SUCCESS, response });
            state = yield select();
        } catch (e) {
            if (e instanceof ApiError) {
                yield put({ type: FETCH_REPORTEE_FAILURE, error: e });
            } else {
                throw e;
            }
        }
    }
    return state.reportee.data;
}
