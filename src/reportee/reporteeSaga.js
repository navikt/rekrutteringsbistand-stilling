import { put, takeLatest } from 'redux-saga/effects';
import { ApiError, fetchGet } from '../api/api';
import { AD_API } from '../fasitProperties';

export const FETCH_REPORTEE = 'FETCH_REPORTEE'
export const FETCH_REPORTEE_SUCCESS = 'FETCH_REPORTEE_SUCCESS';
export const FETCH_REPORTEE_FAILURE = 'FETCH_REPORTEE_FAILURE';

function* getReportee() {
    try {
        const response = yield fetchGet(`${AD_API}reportee/`);
        reportee = response;
        yield put({ type: FETCH_REPORTEE_SUCCESS, response: reportee });
    } catch (e) {
            if (e instanceof ApiError) {
                yield put({ type: FETCH_REPORTEE_FAILURE, error: e });
            } else {
                throw e;
            }
        }
}

export default function* reporteeSaga() {
    yield takeLatest(FETCH_REPORTEE, getReportee());
};
