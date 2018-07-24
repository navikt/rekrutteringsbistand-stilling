import { put, takeLatest } from 'redux-saga/effects';
import { ApiError, fetchGet } from '../api/api';
import { AD_API } from '../fasitProperties';

export const FETCH_REPORTEE = 'FETCH_REPORTEE';
export const FETCH_REPORTEE_BEGIN = 'FETCH_REPORTEE_BEGIN';
export const FETCH_REPORTEE_SUCCESS = 'FETCH_REPORTEE_SUCCESS';
export const FETCH_REPORTEE_FAILURE = 'FETCH_REPORTEE_FAILURE';

const initialState = {
    data: undefined,
    error: undefined,
    isFetchingReportee: false
};

function* getReportee() {
    yield put({ type: FETCH_REPORTEE_BEGIN });
    try {
        let response = yield fetchGet(`${AD_API}reportee/`);
        yield put({ type: FETCH_REPORTEE_SUCCESS, response });
    } catch (e) {
            if (e instanceof ApiError) {
                yield put({ type: FETCH_REPORTEE_FAILURE, error: e });
            } else {
                throw e;
            }
        }
}
export default function reporteeReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_REPORTEE_BEGIN:
            return {
                ...state,
                data: undefined,
                isFetchingReportee: true,
                error: undefined
            };
        case FETCH_REPORTEE:
            return {
                ...state,
                isFetchingReportee: true,
                error: undefined
            };
        case FETCH_REPORTEE_SUCCESS:
            return {
                ...state,
                data: action.response.content,
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

export const reporteeSaga = function* saga() {
    yield takeLatest(FETCH_REPORTEE, getReportee);
};
