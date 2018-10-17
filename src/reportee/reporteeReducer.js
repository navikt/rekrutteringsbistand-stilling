import { put, select, takeLatest, throttle } from 'redux-saga/effects';
import AdminStatusEnum from '../ad/administration/adminStatus/AdminStatusEnum';
import { SAVE_AD_SUCCESS } from '../ad/adReducer';
import { ApiError, fetchAds, fetchGet } from '../api/api';
import { AD_API } from '../fasitProperties';
import {
    ASSIGN_TO_ME_SEARCH_RESULT_ITEM_SUCCESS,
    UN_ASSIGN_SEARCH_RESULT_ITEM_SUCCESS
} from '../searchPage/searchReducer';

export const FETCH_REPORTEE = 'FETCH_REPORTEE';
export const FETCH_REPORTEE_BEGIN = 'FETCH_REPORTEE_BEGIN';
export const FETCH_REPORTEE_SUCCESS = 'FETCH_REPORTEE_SUCCESS';
export const FETCH_REPORTEE_FAILURE = 'FETCH_REPORTEE_FAILURE';
export const FETCH_NUMBER_OF_PENDING_ADS = 'FETCH_NUMBER_OF_PENDING_ADS';
export const FETCH_NUMBER_OF_PENDING_ADS_SUCCESS = 'FETCH_NUMBER_OF_PENDING_ADS_SUCCESS';

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
        case FETCH_NUMBER_OF_PENDING_ADS_SUCCESS:
            return {
                ...state,
                numberOfPendingAds: action.numberOfPendingAds
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

export function* getNumberOfPendingAds() {
    let state = yield select();
    if (!state.reportee.data) {
        yield getReportee();
        state = yield select();
    }
    try {
        const searchUrl = {
            reportee: state.reportee.data.displayName,
            administrationStatus: AdminStatusEnum.PENDING
        };
        const response = yield fetchAds(searchUrl);
        yield put({ type: FETCH_NUMBER_OF_PENDING_ADS_SUCCESS, numberOfPendingAds: response.totalElements });
    } catch (e) {
        if (e instanceof ApiError) {
            // Ignore
        } else {
            throw e;
        }
    }
}

export const reporteeSaga = function* saga() {
    yield takeLatest(FETCH_NUMBER_OF_PENDING_ADS, getNumberOfPendingAds);
    yield throttle(3000, [
        SAVE_AD_SUCCESS,
        UN_ASSIGN_SEARCH_RESULT_ITEM_SUCCESS,
        ASSIGN_TO_ME_SEARCH_RESULT_ITEM_SUCCESS
    ], getNumberOfPendingAds);
};
