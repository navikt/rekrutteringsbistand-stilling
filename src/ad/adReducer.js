import deepEqual from 'deep-equal';
import { put, select, takeLatest } from 'redux-saga/effects';
import {
    ApiError, fetchAd, fetchPost, fetchPut
} from '../api/api';
import { AD_API } from '../fasitProperties';
import { getReportee } from '../reportee/reporteeReducer';
import {
    SET_AD_DATA,
    SET_AD_STATUS,
    SET_ADMIN_STATUS,
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
import { hasValidationErrors } from './adValidationReducer';

export const FETCH_AD = 'FETCH_AD';
export const FETCH_AD_BEGIN = 'FETCH_AD_BEGIN';
export const FETCH_AD_SUCCESS = 'FETCH_AD_SUCCESS';
export const FETCH_AD_FAILURE = 'FETCH_AD_FAILURE';

export const SAVE_AD = 'SAVE_AD';
export const SAVE_AD_BEGIN = 'SAVE_AD_BEGIN';
export const SAVE_AD_SUCCESS = 'SAVE_AD_SUCCESS';
export const SAVE_AD_FAILURE = 'SAVE_AD_FAILURE';

export const CREATE_AD = 'CREATE_AD';
export const CREATE_AD_BEGIN = 'CREATE_AD_BEGIN';
export const CREATE_AD_SUCCESS = 'CREATE_AD_SUCCESS';
export const CREATE_AD_FAILURE = 'CREATE_AD_FAILURE';

export const EDIT_AD = 'EDIT_AD';
export const PREVIEW_EDIT_AD = 'PREVIEW_EDIT_AD';

export const PUBLISH_AD = 'PUBLISH_AD';
export const PUBLISH_AD_CHANGES = 'PUBLISH_AD_CHANGES';
export const SHOW_PUBLISH_ERROR_MODAL = 'SHOW_PUBLISH_ERROR_MODAL';
export const HIDE_PUBLISH_ERROR_MODAL = 'HIDE_PUBLISH_ERROR_MODAL';

export const STOP_AD = 'STOP_AD';
export const SHOW_STOP_AD_MODAL = 'SHOW_STOP_AD_MODAL';
export const HIDE_STOP_AD_MODAL = 'HIDE_STOP_AD_MODAL';

export const SHOW_HAS_CHANGES_MODAL = 'SHOW_HAS_CHANGES_MODAL';
export const HIDE_HAS_CHANGES_MODAL = 'HIDE_HAS_CHANGES_MODAL';

const initialState = {
    error: undefined,
    isSavingAd: false,
    isFetchingStilling: false,
    isEditingAd: true,
    originalData: undefined,
    hasChanges: false,
    hasSavedChanges: false,
    showPublishErrorModal: false,
    showHasChangesModal: false,
    showStopAdModal: false
};

export default function adReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_AD_BEGIN:
            return {
                ...state,
                hasChanges: false,
                hasSavedChanges: false,
                isFetchingStilling: true,
                error: undefined,
                originalData: undefined
            };
        case FETCH_AD_SUCCESS:
            return {
                ...state,
                isFetchingStilling: false,
                isEditingAd: true,
                originalData: { ...action.response }
            };
        case FETCH_AD_FAILURE:
            return {
                ...state,
                error: action.error,
                isFetchingStilling: false
            };
        case CREATE_AD_BEGIN:
        case SAVE_AD_BEGIN:
            return {
                ...state,
                isSavingAd: true,
                hasSavedChanges: false,
                hasChanges: false
            };
        case CREATE_AD_SUCCESS:
        case SAVE_AD_SUCCESS:
            return {
                ...state,
                isSavingAd: false,
                hasSavedChanges: true,
                originalData: { ...action.response }
            };
        case CREATE_AD_FAILURE:
        case SAVE_AD_FAILURE:
            return {
                ...state,
                isSavingAd: false,
                error: action.error
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
        yield put({ type: FETCH_AD_SUCCESS, response });
    } catch (e) {
        if (e instanceof ApiError) {
            yield put({ type: FETCH_AD_FAILURE, error: e });
        } else {
            throw e;
        }
    }
}

function needClassify(originalAdData, adData) {
    return !deepEqual(originalAdData.categoryList, adData.categoryList);
}

function* createAd() {
    yield put({ type: CREATE_AD_BEGIN });
    try {
        yield put({ type: SET_UPDATED_BY });

        const reportee = yield getReportee();

        const postUrl = `${AD_API}ads?classify=true`;

        const response = yield fetchPost(postUrl, {
            title: 'Ny stilling',
            createdBy: 'pam-rekrutteringsbistand',
            source: 'DIR',
            privacy: 'INTERNAL_NOT_SHOWN',
            administration: {
                status: AdminStatusEnum.PENDING,
                reportee: `${reportee.displayName}[${reportee.userName}]`
            }
        });

        yield put({ type: SET_AD_DATA, data: response });
        yield put({ type: SET_REPORTEE, reportee: reportee.displayName });
        yield put({ type: CREATE_AD_SUCCESS, response });
    } catch (e) {
        if (e instanceof ApiError) {
            yield put({ type: CREATE_AD_FAILURE, error: e });
        }
        throw e;
    }
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

function* stopAd() {
    yield put({ type: SET_ADMIN_STATUS, status: AdminStatusEnum.DONE });
    yield put({ type: SET_AD_STATUS, status: AdStatusEnum.STOPPED });
    yield save();
}

function* saveAd() {
    yield save();
}

function* publishAdChanges() {
    const state = yield select();
    if (hasValidationErrors(state.adValidation.errors)) {
        yield put({ type: SHOW_PUBLISH_ERROR_MODAL });
    } else {
        yield put({ type: SET_ADMIN_STATUS, status: AdminStatusEnum.DONE });
        yield put({ type: SET_AD_STATUS, status: AdStatusEnum.ACTIVE });
        yield save();
    }
}

export const adSaga = function* saga() {
    yield takeLatest(PUBLISH_AD, publishAd);
    yield takeLatest(STOP_AD, stopAd);
    yield takeLatest(FETCH_AD, getAd);
    yield takeLatest(SAVE_AD, saveAd);
    yield takeLatest(CREATE_AD, createAd);
    yield takeLatest(PUBLISH_AD_CHANGES, publishAdChanges);
};
