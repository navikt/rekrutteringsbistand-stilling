import deepEqual from 'deep-equal';
import { put, select, takeLatest } from 'redux-saga/effects';
import { ApiError, fetchAd, fetchAds, fetchPut } from '../api/api';
import { AD_API } from '../fasitProperties';
import { getReportee } from '../reportee/reporteeReducer';
import {
    SET_AD_STATUS,
    SET_ADMIN_STATUS,
    SET_ADMIN_STATUS_AND_GET_NEXT_AD,
    SET_EMPLOYER,
    SET_EXPIRATION_DATE,
    SET_LOCATION_POSTAL_CODE,
    SET_PUBLISHED,
    SET_REPORTEE,
    SET_STYRK,
    SET_UPDATED_BY
} from './adDataReducer';
import AdminStatusEnum from './administration/adminStatus/AdminStatusEnum';
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
export const PUBLISH_AD_CHANGES = 'PUBLISH_AD_CHANGES';
export const SHOW_PUBLISH_ERROR_MODAL = 'SHOW_PUBLISH_ERROR_MODAL';
export const HIDE_PUBLISH_ERROR_MODAL = 'HIDE_PUBLISH_ERROR_MODAL';

export const REJECT_AD = 'REJECT_AD';
export const SHOW_REJECT_REASON_MODAL = 'SHOW_REJECT_REASON_MODAL';
export const HIDE_REJECT_REASON_MODAL = 'HIDE_REJECT_REASON_MODAL';

export const STOP_AD = 'STOP_AD';
export const SHOW_STOP_AD_MODAL = 'SHOW_STOP_AD_MODAL';
export const HIDE_STOP_AD_MODAL = 'HIDE_STOP_AD_MODAL';

export const SET_TO_RECEIVED = 'SET_TO_RECEIVED';
export const ASSIGN_TO_ME = 'ASSIGN_TO_ME';

export const SHOW_HAS_CHANGES_MODAL = 'SHOW_HAS_CHANGES_MODAL';
export const HIDE_HAS_CHANGES_MODAL = 'HIDE_HAS_CHANGES_MODAL';

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
    hasSavedChanges: false,
    showPublishErrorModal: false,
    showHasChangesModal: false,
    showRejectReasonModal: false,
    showIsInactiveModal: false,
    showStopAdModal: false
};

export default function adReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_AD_BEGIN:
        case FETCH_NEXT_AD_BEGIN:
            return {
                ...state,
                hasChanges: false,
                hasSavedChanges: false,
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
                hasSavedChanges: false,
                hasChanges: false
            };
        case SAVE_AD_SUCCESS:
            return {
                ...state,
                isSavingAd: false,
                hasSavedChanges: true,
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
        case SHOW_HAS_CHANGES_MODAL:
            return {
                ...state,
                showHasChangesModal: true
            };
        case HIDE_HAS_CHANGES_MODAL:
            return {
                ...state,
                showHasChangesModal: false
            };
        case SHOW_STOP_AD_MODAL:
            return {
                ...state,
                showStopAdModal: true
            };
        case HIDE_STOP_AD_MODAL:
            return {
                ...state,
                showStopAdModal: false
            };
        case SET_EMPLOYER:
        case SET_LOCATION_POSTAL_CODE:
        case SET_STYRK:
        case SET_PUBLISHED:
        case SET_EXPIRATION_DATE:
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
        const response = yield fetchAd(action.uuid);
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
    const state = yield select();
    if (state.ad.hasChanges) {
        yield put({ type: SHOW_HAS_CHANGES_MODAL });
    } else {
        yield put({ type: FETCH_NEXT_AD_BEGIN });
        const queryString = {
            ...state.ad.workPriority, size: 1, sort: 'created,asc', administrationStatus: AdminStatusEnum.RECEIVED
        };
        let shouldRetry = true;
        while (shouldRetry) {
            let ad;
            try {
                const responseList = yield fetchAds(queryString);
                if (responseList.content && responseList.content.length === 0) {
                    shouldRetry = false;
                    yield put({ type: SET_END_OF_LIST, endOfList: true });
                } else {
                    ad = responseList.content[0];
                }
            } catch (e) {
                if (e instanceof ApiError) {
                    yield put({ type: FETCH_NEXT_AD_FAILURE, error: e });
                }
                throw e;
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
                        },
                        updatedBy: 'nss-admin'
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
                    } else if (e instanceof ApiError) {
                        yield put({ type: FETCH_NEXT_AD_FAILURE, error: e });
                        shouldRetry = false;
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
}

function needClassify(originalAdData, adData) {
    return !deepEqual(originalAdData.categoryList, adData.categoryList);
}

function* save(autoAssign = true) {
    let state = yield select();
    yield put({ type: SAVE_AD_BEGIN });
    try {
        yield put({ type: SET_UPDATED_BY });

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
        }
        throw e;
    }
}

function* setAdminStatusAndGetNextAd(action) {
    yield put({ type: SET_ADMIN_STATUS, status: action.status });
    yield save();
    yield getNextAd();
}


function* publishAd(action) {
    const state = yield select();
    if (hasValidationErrors(state.adValidation.errors)) {
        yield put({ type: SHOW_PUBLISH_ERROR_MODAL });
    } else {
        yield put({ type: SET_ADMIN_STATUS, status: AdminStatusEnum.DONE });
        yield put({ type: SET_AD_STATUS, status: AdStatusEnum.ACTIVE });
        yield save();
        if (action.loadNext) {
            yield getNextAd();
        }
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

function* saveAd(action) {
    const state = yield select();
    if (state.adData.administration.status === AdminStatusEnum.RECEIVED) {
        yield put({ type: SET_ADMIN_STATUS, status: AdminStatusEnum.PENDING });
    }
    yield save();
    if (action.loadNext) {
        yield getNextAd();
    }
}

function* publishAdChanges(action) {
    const state = yield select();
    if (hasValidationErrors(state.adValidation.errors)) {
        yield put({ type: SHOW_PUBLISH_ERROR_MODAL });
    } else {
        yield put({ type: SET_ADMIN_STATUS, status: AdminStatusEnum.DONE });
        yield put({ type: SET_AD_STATUS, status: AdStatusEnum.ACTIVE });
        yield save();
        if (action.loadNext) {
            yield getNextAd();
        }
    }
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
    yield takeLatest(PUBLISH_AD_CHANGES, publishAdChanges);
};
