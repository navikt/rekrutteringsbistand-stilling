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
    ADD_STYRK,
    REMOVE_STYRK,
    SET_AD_STATUS,
    SET_LOCATION_POSTAL_CODE
} from './adDataReducer';
import { getReportee } from '../reportee/reporteeReducer';

import deepEqual from 'deep-equal';
import AdStatusEnum from './administration/adStatus/AdStatusEnum';
import { hasRejectionErrors, hasValidationErrors, validateRejection } from './adValidationReducer';

export const FETCH_AD = 'FETCH_AD';
export const FETCH_AD_BEGIN = 'FETCH_AD_BEGIN';
export const FETCH_AD_SUCCESS = 'FETCH_AD_SUCCESS';
export const FETCH_AD_FAILURE = 'FETCH_AD_FAILURE';

export const SAVE_AD = 'SAVE_AD';
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

export const PUBLISH_AD = 'PUBLISH_AD';
export const SHOW_PUBLISH_ERROR_MODAL = 'SHOW_PUBLISH_ERROR_MODAL';
export const HIDE_PUBLISH_ERROR_MODAL = 'HIDE_PUBLISH_ERROR_MODAL';

export const REJECT_AD = 'REJECT_AD';
export const SHOW_REJECT_REASON_MODAL = 'SHOW_REJECT_REASON_MODAL';
export const HIDE_REJECT_REASON_MODAL = 'HIDE_REJECT_REASON_MODAL';

export const STOP_AD = 'STOP_AD';
export const SET_TO_RECEIVED = 'SET_TO_RECEIVED';
export const ASSIGN_TO_ME = 'ASSIGN_TO_ME';

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
    hasChanges: false,
    showPublishErrorModal: false,
    showRejectReasonModal: false
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
                isSavingAd: true,
                hasChanges: false
            };
        case SAVE_AD_SUCCESS:
            return {
                ...state,
                isSavingAd: false,
                isEditingAd: false,
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
        case SHOW_PUBLISH_ERROR_MODAL:

            return {
                ...state,
                showPublishErrorModal: true
            };
        case HIDE_PUBLISH_ERROR_MODAL:
            return {
                ...state,
                showPublishErrorModal: false
            };
        case SHOW_REJECT_REASON_MODAL:
            return {
                ...state,
                showRejectReasonModal: true
            };
        case HIDE_REJECT_REASON_MODAL:
            return {
                ...state,
                showRejectReasonModal: false
            };
        case SET_EMPLOYER:
        case SET_LOCATION_POSTAL_CODE:
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
                yield put({
                    type: FETCH_NEXT_AD_SUCCESS,
                    response: responsePut,
                    previousAdminStatus: ad.administration.status
                });
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

function* save(autoAssign = true) {
    let state = yield select();
    yield put({ type: SAVE_AD_BEGIN });
    try {
        if (autoAssign) {
            const reportee = yield getReportee();
            yield put({ type: SET_REPORTEE, reportee: reportee.displayName });
        }
        state = yield select();

        // Modified category list requires store/PUT with (re)classification
        let putUrl = `${AD_API}ads/${state.adData.uuid}`;
        if (typeof state.ad.originalData === 'undefined' || needClassify(state.ad.originalData, state.adData)) {
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
    yield save();
    yield getNextAd();
}


function* publishAd() {
    const state = yield select();
    if (hasValidationErrors(state.adValidation.errors)) {
        yield put({ type: SHOW_PUBLISH_ERROR_MODAL });
    } else {
        yield put({ type: SET_ADMIN_STATUS, status: AdminStatusEnum.DONE });
        yield put({ type: SET_AD_STATUS, status: AdStatusEnum.ACTIVE });
        yield save();
    }
}

function* rejectAd() {
    yield validateRejection();
    const state = yield select();
    if (!hasRejectionErrors(state.adValidation.errors)) {
        yield put({ type: HIDE_REJECT_REASON_MODAL });
        yield put({ type: SET_ADMIN_STATUS, status: AdminStatusEnum.DONE });
        yield put({ type: SET_AD_STATUS, status: AdStatusEnum.REJECTED });
        yield save();
    }
}

function* stopAd() {
    yield put({ type: SET_ADMIN_STATUS, status: AdminStatusEnum.DONE });
    yield put({ type: SET_AD_STATUS, status: AdStatusEnum.STOPPED });
    yield save();
}

function* setToReceived() {
    yield put({ type: SET_REPORTEE, reportee: null });
    yield put({ type: SET_ADMIN_STATUS, status: AdminStatusEnum.RECEIVED });
    yield save(false);
}

function* assignToMe() {
    yield put({ type: SET_ADMIN_STATUS, status: AdminStatusEnum.PENDING });
    yield save();
}

function* saveAd() {
    yield save();
}

export const adSaga = function* saga() {
    yield takeLatest(PUBLISH_AD, publishAd);
    yield takeLatest(REJECT_AD, rejectAd);
    yield takeLatest(STOP_AD, stopAd);
    yield takeLatest(FETCH_AD, getAd);
    yield takeLatest(FETCH_NEXT_AD, getNextAd);
    yield takeLatest(SAVE_AD, saveAd);
    yield takeLatest(SET_TO_RECEIVED, setToReceived);
    yield takeLatest(ASSIGN_TO_ME, assignToMe);
    yield takeLatest(SET_ADMIN_STATUS_AND_GET_NEXT_AD, setAdminStatusAndGetNextAd);
};
