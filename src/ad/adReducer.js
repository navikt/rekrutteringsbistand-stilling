import deepEqual from 'deep-equal';
import { put, select, takeLatest } from 'redux-saga/effects';
import {
    ApiError, fetchAd, fetchDelete, fetchPost, fetchPut
} from '../api/api';
import { AD_API } from '../fasitProperties';
import { getReportee } from '../reportee/reporteeReducer';
import {
    SET_AD_DATA,
    SET_AD_STATUS,
    SET_ADMIN_STATUS,
    SET_NAV_IDENT,
    SET_REPORTEE,
    SET_UPDATED_BY,
    SET_FIRST_PUBLISHED,
    REMOVE_AD_DATA
} from './adDataReducer';
import AdminStatusEnum from '../common/enums/AdminStatusEnum';
import AdStatusEnum from '../common/enums/AdStatusEnum';
import {
    hasValidationErrors,
    hasValidationErrorsOnSave,
    validateAll,
    validateBeforeSave
} from './adValidationReducer';
import PrivacyStatusEnum from '../common/enums/PrivacyStatusEnum';
import { showAlertStripe } from './alertstripe/SavedAdAlertStripeReducer';
import AdAlertStripeEnum from './alertstripe/AdAlertStripeEnum';
import { FETCH_MY_ADS } from '../myAds/myAdsReducer';
import { loginWithRedirectToCurrentLocation } from '../login';

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

export const DELETE_AD = 'DELETE_AD';
export const DELETE_AD_BEGIN = 'DELETE_AD_BEGIN';
export const DELETE_AD_SUCCESS = 'DELETE_AD_SUCCESS';
export const DELETE_AD_FAILURE = 'DELETE_AD_FAILURE';

export const DELETE_AD_AND_REDIRECT = 'DELETE_AD_AND_REDIRECT';
export const DELETE_AD_FROM_MY_ADS = 'DELETE_AD_FROM_MY_ADS';
export const SHOW_DELETE_AD_MODAL = 'SHOW_DELETE_AD_MODAL';
export const HIDE_DELETE_AD_MODAL = 'HIDE_DELETE_AD_MODAL';

export const EDIT_AD = 'EDIT_AD';
export const PREVIEW_EDIT_AD = 'PREVIEW_EDIT_AD';

export const PUBLISH_AD = 'PUBLISH_AD';
export const PUBLISH_AD_CHANGES = 'PUBLISH_AD_CHANGES';
export const SHOW_PUBLISH_ERROR_MODAL = 'SHOW_PUBLISH_ERROR_MODAL';
export const HIDE_PUBLISH_ERROR_MODAL = 'HIDE_PUBLISH_ERROR_MODAL';

export const STOP_AD = 'STOP_AD';
export const STOP_AD_FROM_MY_ADS = 'STOP_AD_FROM_MY_ADS';
export const SHOW_STOP_AD_MODAL = 'SHOW_STOP_AD_MODAL';
export const HIDE_STOP_AD_MODAL = 'HIDE_STOP_AD_MODAL';

export const COPY_AD_FROM_MY_ADS = 'COPY_AD_FROM_MY_ADS';

export const SHOW_HAS_CHANGES_MODAL = 'SHOW_HAS_CHANGES_MODAL';
export const HIDE_HAS_CHANGES_MODAL = 'HIDE_HAS_CHANGES_MODAL';
export const LEAVE_PAGE_TRIGGER = 'LEAVE_PAGE_TRIGGER';

export const SHOW_AD_PUBLISHED_MODAL = 'SHOW_AD_PUBLISHED_MODAL';
export const HIDE_AD_PUBLISHED_MODAL = 'HIDE_AD_PUBLISHED_MODAL';

export const SHOW_AD_SAVED_ERROR_MODAL = 'SHOW_AD_SAVED_ERROR_MODAL';
export const HIDE_AD_SAVED_ERROR_MODAL = 'HIDE_AD_SAVED_ERROR_MODAL';

export const SHOW_STOP_MODAL_MY_ADS = 'SHOW_STOP_MODAL_MY_ADS';
export const SHOW_DELETE_MODAL_MY_ADS = 'SHOW_DELETE_MODAL_MY_ADS';

export const ADD_COPIED_ADS = 'ADD_COPIED_ADS';
export const CLEAR_COPIED_ADS = 'CLEAR_COPIED_ADS';

export const DEFAULT_TITLE_NEW_AD = 'Ny stilling';

const initialState = {
    error: undefined,
    isSavingAd: false,
    isLoadingAd: false,
    isEditingAd: false,
    originalData: undefined,
    hasSavedChanges: false,
    hasChanges: false,
    copiedAds: [],
    showPublishErrorModal: false,
    showHasChangesModal: false,
    showStopAdModal: false,
    showDeleteAdModal: false,
    showAdPublishedModal: false,
    showAdSavedErrorModal: false,
    hasChangesLeaveUrl: undefined,
    leavePageTrigger: false
};

export default function adReducer(state = initialState, action) {
    switch (action.type) {
        case REMOVE_AD_DATA:
            return {
                ...initialState
            };
        case FETCH_AD_BEGIN:
            return {
                ...state,
                hasSavedChanges: false,
                isLoadingAd: true,
                error: undefined,
                originalData: undefined,
                hasChanges: false
            };
        case FETCH_AD_SUCCESS:
            return {
                ...state,
                isLoadingAd: false,
                isEditingAd: false,
                originalData: { ...action.response }
            };
        case FETCH_AD_FAILURE:
            return {
                ...state,
                error: action.error,
                isLoadingAd: false
            };
        case SAVE_AD_BEGIN:
            return {
                ...state,
                isSavingAd: true,
                hasSavedChanges: false,
                hasChanges: false
            };
        case CREATE_AD_BEGIN:
        case DELETE_AD_BEGIN:
            return {
                ...state,
                isLoadingAd: true,
                isSavingAd: true,
                hasSavedChanges: false,
                hasChanges: false
            };
        case DELETE_AD_SUCCESS:
            return {
                ...state,
                isSavingAd: false,
                isLoadingAd: false
            };
        case CREATE_AD_SUCCESS:
            return {
                ...state,
                isSavingAd: false,
                isLoadingAd: false,
                hasSavedChanges: true,
                isEditingAd: true,
                originalData: { ...action.response },
                hasChanges: true
            };
        case SAVE_AD_SUCCESS:
            return {
                ...state,
                isSavingAd: false,
                hasSavedChanges: true,
                originalData: { ...action.response }
            };
        case CREATE_AD_FAILURE:
        case SAVE_AD_FAILURE:
        case DELETE_AD_FAILURE:
            return {
                ...state,
                isSavingAd: false,
                isLoadingAd: false,
                error: action.error,
                showPublishErrorModal: false,
                showHasChangesModal: false,
                showStopAdModal: false,
                showDeleteAdModal: false,
                showAdPublishedModal: false,
                showAdSavedErrorModal: false
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
                showHasChangesModal: true,
                hasChangesLeaveUrl: action.leaveUrl
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
        case SHOW_DELETE_AD_MODAL:
            return {
                ...state,
                showDeleteAdModal: true
            };
        case HIDE_DELETE_AD_MODAL:
            return {
                ...state,
                showDeleteAdModal: false
            };
        case SHOW_AD_PUBLISHED_MODAL:
            return {
                ...state,
                showAdPublishedModal: true
            };
        case HIDE_AD_PUBLISHED_MODAL:
            return {
                ...state,
                showAdPublishedModal: false
            };
        case SHOW_AD_SAVED_ERROR_MODAL:
            return {
                ...state,
                showAdSavedErrorModal: true
            };
        case HIDE_AD_SAVED_ERROR_MODAL:
            return {
                ...state,
                showAdSavedErrorModal: false
            };
        case ADD_COPIED_ADS:
            return {
                ...state,
                copiedAds: [
                    ...state.copiedAds,
                    action.adUuid
                ]
            };
        case CLEAR_COPIED_ADS:
            return {
                ...state,
                copiedAds: []
            };
        case LEAVE_PAGE_TRIGGER:
            return {
                ...state,
                leavePageTrigger: true
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

        if (action.edit) {
            yield put({ type: EDIT_AD });
        }
    } catch (e) {
        if (e instanceof ApiError) {
            yield put({ type: FETCH_AD_FAILURE, error: e });
        } else {
            throw e;
        }
    }
}

function* showStopModalMyAds(action) {
    yield getAd(action);
    yield put({ type: SHOW_STOP_AD_MODAL });
}

function needClassify(originalAdData, adData) {
    return !deepEqual(originalAdData.categoryList, adData.categoryList);
}

function* createAd() {
    yield put({ type: CREATE_AD_BEGIN });
    try {
        const reportee = yield getReportee();

        const postUrl = `${AD_API}ads?classify=true`;

        const response = yield fetchPost(postUrl, {
            title: DEFAULT_TITLE_NEW_AD,
            createdBy: 'pam-rekrutteringsbistand',
            updatedBy: 'pam-rekrutteringsbistand',
            source: 'DIR',
            privacy: PrivacyStatusEnum.INTERNAL_NOT_SHOWN,
            administration: {
                status: AdminStatusEnum.PENDING,
                reportee: reportee.displayName,
                navIdent: reportee.navIdent
            }
        });
        
        yield put({ type: SET_AD_DATA, data: response });
        yield put({ type: SET_REPORTEE, reportee: reportee.displayName });
        yield put({ type: SET_NAV_IDENT, navIdent: reportee.navIdent });
        yield put({ type: CREATE_AD_SUCCESS, response });
    } catch (e) {
        if (e instanceof ApiError) {
            yield put({ type: CREATE_AD_FAILURE, error: e });
        }
        throw e;
    }
}

function* save() {
    let state = yield select();
    yield put({ type: SAVE_AD_BEGIN });
    try {
        yield put({ type: SET_UPDATED_BY });

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

function* publishAd() {
    yield validateAll();
    const state = yield select();
    if (hasValidationErrors(state.adValidation.errors)) {
        yield put({ type: SHOW_PUBLISH_ERROR_MODAL });
    } else {
        yield put({ type: SET_ADMIN_STATUS, status: AdminStatusEnum.DONE });
        yield put({ type: SET_AD_STATUS, status: AdStatusEnum.ACTIVE });
        if (state.adData.firstPublished === false) {
            yield put({ type: SET_FIRST_PUBLISHED });
        }
        yield put({ type: SHOW_AD_PUBLISHED_MODAL });
        yield save();
    }
}

function* stopAd() {
    yield put({ type: SET_ADMIN_STATUS, status: AdminStatusEnum.DONE });
    yield put({ type: SET_AD_STATUS, status: AdStatusEnum.STOPPED });
    yield save();
}

function* stopAdFromMyAds() {
    yield stopAd();
    // Update list with the new status
    yield put({ type: FETCH_MY_ADS });
}

function* saveAd(action) {
    yield validateBeforeSave();
    const state = yield select();
    if (hasValidationErrorsOnSave(state.adValidation.errors)) {
        yield put({ type: SHOW_AD_SAVED_ERROR_MODAL });
    } else {
        yield save();
        if (action.login) {
            loginWithRedirectToCurrentLocation();
        }
        if (action.showModal) {
            yield showAlertStripe(AdAlertStripeEnum.SAVED);
        }
    }
}

function* publishAdChanges() {
    yield validateAll();
    let state = yield select();
    if (hasValidationErrors(state.adValidation.errors)) {
        yield put({ type: SHOW_PUBLISH_ERROR_MODAL });
    } else {
        yield put({ type: SET_ADMIN_STATUS, status: AdminStatusEnum.DONE });
        yield put({ type: SET_AD_STATUS, status: AdStatusEnum.ACTIVE });
        yield save();
        state = yield select();
        if (state.adData.activationOnPublishingDate && state.adData.status === AdStatusEnum.INACTIVE) {
            yield showAlertStripe(AdAlertStripeEnum.WILL_PUBLISH_CHANGES);
        } else {
            yield showAlertStripe(AdAlertStripeEnum.PUBLISHED_CHANGES);
        }
    }
}

function* deleteAd() {
    yield put({ type: DELETE_AD_BEGIN });
    try {
        yield put({ type: SET_UPDATED_BY });

        const state = yield select();
        const deleteUrl = `${AD_API}ads/${state.adData.uuid}`;

        const response = yield fetchDelete(deleteUrl);
        yield put({ type: DELETE_AD_SUCCESS, response });
    } catch (e) {
        if (e instanceof ApiError) {
            yield put({ type: DELETE_AD_FAILURE, error: e });
        }
        throw e;
    }
}

function* deleteAdAndRedirect() {
    yield deleteAd();
    yield put({ type: LEAVE_PAGE_TRIGGER });
}

function* deleteAdFromMyAds() {
    yield deleteAd();
    // Update list with the new status
    yield put({ type: FETCH_MY_ADS });
}

function* showDeleteModalMyAds(action) {
    yield getAd(action);
    yield put({ type: SHOW_DELETE_AD_MODAL });
}

function* copyAdFromMyAds(action) {
    try {
        const adToCopy = yield fetchAd(action.uuid);
        const reportee = yield getReportee();

        const postUrl = `${AD_API}ads?classify=true`;

        const response = yield fetchPost(postUrl, {
            ...adToCopy,
            title: `Kopi - ${adToCopy.title}`,
            createdBy: 'pam-rekrutteringsbistand',
            updatedBy: 'pam-rekrutteringsbistand',
            source: 'DIR',
            privacy: PrivacyStatusEnum.INTERNAL_NOT_SHOWN,
            administration: {
                status: AdminStatusEnum.PENDING,
                reportee: reportee.displayName,
                navIdent: reportee.navIdent
            },
            created: undefined,
            expires: undefined,
            id: undefined,
            uuid: undefined,
            updated: undefined,
            status: undefined,
            published: undefined,
            publishedByAdmin: undefined,
            reference: undefined
        });

        // Mark copied ad in myAds
        yield put({ type: ADD_COPIED_ADS, adUuid: response.uuid });
        // Update list with the new ad
        yield put({ type: FETCH_MY_ADS });
    } catch (e) {
        if (e instanceof ApiError) {
            yield put({ type: CREATE_AD_FAILURE, error: e });
        }
        throw e;
    }
}


export const adSaga = function* saga() {
    yield takeLatest(PUBLISH_AD, publishAd);
    yield takeLatest(STOP_AD, stopAd);
    yield takeLatest(FETCH_AD, getAd);
    yield takeLatest(SAVE_AD, saveAd);
    yield takeLatest(CREATE_AD, createAd);
    yield takeLatest(PUBLISH_AD_CHANGES, publishAdChanges);
    yield takeLatest(DELETE_AD, deleteAd);
    yield takeLatest(DELETE_AD_AND_REDIRECT, deleteAdAndRedirect);
    yield takeLatest(SHOW_STOP_MODAL_MY_ADS, showStopModalMyAds);
    yield takeLatest(SHOW_DELETE_MODAL_MY_ADS, showDeleteModalMyAds);
    yield takeLatest(STOP_AD_FROM_MY_ADS, stopAdFromMyAds);
    yield takeLatest(DELETE_AD_FROM_MY_ADS, deleteAdFromMyAds);
    yield takeLatest(COPY_AD_FROM_MY_ADS, copyAdFromMyAds);
};
