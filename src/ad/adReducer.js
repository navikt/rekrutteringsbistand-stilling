import { put, takeLatest, select } from 'redux-saga/effects';
import { ApiError, fetchGet, fetchPut } from '../api/api';
import { AD_API } from '../fasitProperties';
import AdminStatusEnum from './administration/adminStatus/AdminStatusEnum';
import toUrl from '../common/toUrl';
import {
    SET_REPORTEE,
    SET_ADMIN_STATUS,
    SET_ADMIN_STATUS_AND_GET_NEXT_AD,
    SET_EMPLOYER,
    SET_LOCATION,
    ADD_STYRK,
    REMOVE_STYRK,
    SET_COMMENT,
    ADD_REMARK,
    REMOVE_REMARK, SET_AD_STATUS
} from './adDataReducer';
import { getReportee } from '../reportee/reporteeReducer';

import deepEqual from 'deep-equal';

export const FETCH_AD = 'FETCH_AD';
export const FETCH_AD_BEGIN = 'FETCH_AD_BEGIN';
export const FETCH_AD_SUCCESS = 'FETCH_AD_SUCCESS';
export const FETCH_AD_FAILURE = 'FETCH_AD_FAILURE';

export const SAVE_AD = 'FETCH';
export const SAVE_AD_BEGIN = 'SAVE_AD_BEGIN';
export const SAVE_AD_SUCCESS = 'SAVE_AD_SUCCESS';
export const SAVE_AD_FAILURE = 'SAVE_AD_FAILURE';

export const EDIT_AD = 'EDIT_AD';
export const PREVIEW_EDIT_AD = 'PREVIEW_EDIT_AD';

export const SET_WORK_PRIORITY = 'SET_WORK_PRIORITY';
export const RESET_WORK_PRIORITY = 'RESET_WORK_PRIORITY';
export const FETCH_NEXT_AD = 'FETCH_NEXT_AD';
export const FETCH_NEXT_AD_BEGIN = 'FETCH_NEXT_AD_BEGIN';
export const FETCH_NEXT_AD_SUCCESS = 'FETCH_NEXT_AD_SUCCESS';
export const FETCH_NEXT_AD_FAILURE = 'FETCH_NEXT_AD_FAILURE';
export const SET_END_OF_LIST = 'SET_END_OF_LIST';

const initialState = {
    error: undefined,
    isSavingAd: false,
    isFetchingStilling: false,
    isEditingAd: false,
    endOfList: false,
    originalData: undefined,
    workPriority: {
        sort: 'created,asc'
    },
    hasChanges: false
};

export default function adReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_AD_BEGIN:
        case FETCH_NEXT_AD_BEGIN:
            return {
                ...state,
                hasChanges: false,
                isFetchingStilling: true,
                error: undefined,
                endOfList: false,
                originalData: undefined
            };
        case FETCH_AD_SUCCESS:
        case FETCH_NEXT_AD_SUCCESS:
            return {
                ...state,
                isFetchingStilling: false,
                isEditingAd: false,
                originalData: { ...action.response }
            };
        case FETCH_AD_FAILURE:
        case FETCH_NEXT_AD_FAILURE:
            return {
                ...state,
                error: action.error,
                isFetchingStilling: false
            };
        case SAVE_AD_BEGIN:
            return {
                ...state,
                isSavingAd: true
            };
        case SAVE_AD_SUCCESS:
            return {
                ...state,
                isSavingAd: false,
                isEditingAd: false,
                hasChanges: false,
                originalData: { ...action.response }
            };
        case SAVE_AD_FAILURE:
            return {
                ...state,
                isSavingAd: false,
                error: action.error
            };
        case SET_END_OF_LIST:
            return {
                ...state,
                endOfList: true
            };
        case EDIT_AD:
            return {
                ...state,
                isEditingAd: true,
                hasChanges: true
            };
        case PREVIEW_EDIT_AD:
            return {
                ...state,
                isEditingAd: false
            };
        case SET_WORK_PRIORITY:
            return {
                ...state,
                workPriority: action.workPriority
            };
        case RESET_WORK_PRIORITY:
            return {
                ...state,
                workPriority: initialState.workPriority
            };
        case SET_AD_STATUS:
        case SET_EMPLOYER:
        case SET_COMMENT:
        case ADD_REMARK:
        case REMOVE_REMARK:
        case SET_LOCATION:
        case ADD_STYRK:
        case REMOVE_STYRK:
            return {
                ...state,
                hasChanges: true
            };
        default:
            return state;
    }
}

function* getAd(action) {
    yield put({ type: FETCH_AD_BEGIN });
    try {
        const response = yield fetchGet(`${AD_API}ads/${action.uuid}`);
        yield put({ type: FETCH_AD_SUCCESS, response, previousAdminStatus: response.administration.status });
    } catch (e) {
        if (e instanceof ApiError) {
            yield put({ type: FETCH_AD_FAILURE, error: e });
        } else {
            throw e;
        }
    }
}

function* getNextAd() {
    yield put({ type: FETCH_NEXT_AD_BEGIN });
    const state = yield select();
    const queryString = toUrl({
        ...state.ad.workPriority, size: 1, sort: 'created,asc', administrationStatus: AdminStatusEnum.RECEIVED
    });
    let shouldRetry = true;
    while (shouldRetry) {
        let ad;
        try {
            const responseList = yield fetchGet(`${AD_API}ads/${queryString}`);
            if (responseList.content && responseList.content.length === 0) {
                shouldRetry = false;
                yield put({ type: SET_END_OF_LIST, endOfList: true });
            } else {
                ad = responseList.content[0];
            }
        } catch (e) {
            if (e instanceof ApiError) {
                yield put({ type: FETCH_NEXT_AD_FAILURE, error: e });
            } else {
                throw e;
            }
        }
        if (ad) {
            const reportee = yield getReportee();
            try {
                const responsePut = yield fetchPut(`${AD_API}ads/${ad.uuid}`, {
                    ...ad,
                    administration: {
                        ...ad.administration,
                        status: AdminStatusEnum.PENDING,
                        reportee: reportee.displayName
                    }
                });
                shouldRetry = false;
                yield put({ type: FETCH_NEXT_AD_SUCCESS, response: responsePut, previousAdminStatus: ad.administration.status });
            } catch (e) {
                if (e instanceof ApiError && e.statusCode === 412) {
                    shouldRetry = true;
                } else {
                    shouldRetry = false;
                    throw e;
                }
            }
        } else {
            shouldRetry = false;
        }
    }
}

function needClassify(originalAdData, adData) {
    return !deepEqual(originalAdData.categoryList, adData.categoryList);
}

function* saveAd() {
    let state = yield select();
    yield put({ type: SAVE_AD_BEGIN });
    try {
        if (state.adData.administration.status === AdminStatusEnum.RECEIVED) {
            yield put({ type: SET_REPORTEE, reportee: null });
        } else {
            const reportee = yield getReportee();
            yield put({ type: SET_REPORTEE, reportee: reportee.displayName });
        }
        state = yield select();

        // Modified category list requires store/PUT with (re)classification
        let putUrl = `${AD_API}ads/${state.adData.uuid}`;
        if (typeof state.ad.originalData == 'undefined' || needClassify(state.ad.originalData, state.adData)) {
            putUrl += '?classify=true';
        }

        const response = yield fetchPut(putUrl, state.adData);
        yield put({ type: SAVE_AD_SUCCESS, response });
    } catch (e) {
        if (e instanceof ApiError) {
            yield put({ type: SAVE_AD_FAILURE, error: e });
        } else {
            throw e;
        }
    }
}

function* setAdminStatusAndGetNextAd(action) {
    yield put({ type: SET_ADMIN_STATUS, status: action.status });
    yield saveAd();
    yield getNextAd();
}

export const adSaga = function* saga() {
    yield takeLatest(FETCH_AD, getAd);
    yield takeLatest(FETCH_NEXT_AD, getNextAd);
    yield takeLatest(SAVE_AD, saveAd);
    yield takeLatest(SET_ADMIN_STATUS_AND_GET_NEXT_AD, setAdminStatusAndGetNextAd);
};
