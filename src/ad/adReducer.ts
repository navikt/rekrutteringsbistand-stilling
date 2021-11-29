import { KanInkludere } from './edit/registrer-inkluderingsmuligheter/DirektemeldtStilling';
import deepEqual from 'deep-equal';
import { put, select, takeLatest } from 'redux-saga/effects';
import { hentRekrutteringsbistandstilling, kopierStilling, postStilling } from '../api/api';
import { stillingApi } from '../api/api';
import { getReportee } from '../reportee/reporteeReducer';
import {
    SET_AD_DATA,
    SET_AD_STATUS,
    SET_ADMIN_STATUS,
    SET_NAV_IDENT,
    SET_REPORTEE,
    SET_UPDATED_BY,
    SET_FIRST_PUBLISHED,
    REMOVE_AD_DATA,
    CHECK_TAG,
} from './adDataReducer';
import AdminStatusEnum from '../common/enums/AdminStatusEnum';
import AdStatusEnum from '../common/enums/AdStatusEnum';
import {
    hasValidationErrors,
    hasValidationErrorsOnSave,
    validateAll,
    validateBeforeSave,
} from './adValidationReducer';
import { showAlertStripe } from './alertstripe/SavedAdAlertStripeReducer';
import AdAlertStripeEnum from './alertstripe/AdAlertStripeEnum';
import { FETCH_MY_ADS } from '../myAds/myAdsReducer';
import { loginWithRedirectToCurrentLocation } from '../login';
import { OPPRETT_STILLINGSINFO, UPDATE_STILLINGSINFO } from '../stillingsinfo/stillingsinfoReducer';
import {
    SET_NAV_IDENT_STILLINGSINFO,
    SET_NOTAT,
    SET_STILLINGSINFO_DATA,
} from '../stillingsinfo/stillingsinfoDataReducer';
import { loggPubliseringAvStilling } from './adUtils';
import { tagsInneholderInkluderingsmuligheter } from './tags/utils';
import Stilling, {
    AdminStatus,
    Kilde,
    Privacy,
    Rekrutteringsbistandstilling,
    System,
} from '../Stilling';
import { ApiError, fetchDelete, fetchPut } from '../api/apiUtils';

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

export const DELETE_AD_BEGIN = 'DELETE_AD_BEGIN';
export const DELETE_AD_SUCCESS = 'DELETE_AD_SUCCESS';
export const DELETE_AD_FAILURE = 'DELETE_AD_FAILURE';
export const FORKAST_NY_STILLING = 'FORKAST_NY_STILLING';
export const FORKAST_NY_STILLING_SUCCESS = 'FORKAST_NY_STILLING_SUCCESS';
export const FORKAST_NY_STILLING_FAILURE = 'FORKAST_NY_STILLING_FAILURE';

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

export const SHOW_AD_PUBLISHED_MODAL = 'SHOW_AD_PUBLISHED_MODAL';
export const HIDE_AD_PUBLISHED_MODAL = 'HIDE_AD_PUBLISHED_MODAL';

export const SHOW_AD_SAVED_ERROR_MODAL = 'SHOW_AD_SAVED_ERROR_MODAL';
export const HIDE_AD_SAVED_ERROR_MODAL = 'HIDE_AD_SAVED_ERROR_MODAL';

export const SHOW_STOP_MODAL_MY_ADS = 'SHOW_STOP_MODAL_MY_ADS';
export const SHOW_DELETE_MODAL_MY_ADS = 'SHOW_DELETE_MODAL_MY_ADS';

export const ADD_COPIED_ADS = 'ADD_COPIED_ADS';
export const CLEAR_COPIED_ADS = 'CLEAR_COPIED_ADS';

export const DEFAULT_TITLE_NEW_AD = 'Ny stilling';

export const LEGG_TIL_I_MINE_STILLINGER = 'LEGG_TIL_I_MINE_STILLINGER';
export const MARKER_EKSTERN_STILLING_SOM_MIN = 'MARKER_EKSTERN_STILLING_SOM_MIN';
export const MARKER_INTERN_STILLING_SOM_MIN = 'MARKER_INTERN_STILLING_SOM_MIN';

export const SET_KAN_INKLUDERE = 'SET_KAN_INKLUDERE';

export enum NyStillingState {
    SkalBeholdes = 'skalBeholdes',
    Forkastes = 'forkastes',
    ErForkastet = 'erforkastet',
    Feil = 'feil',
}

export type AdState = {
    error: any;
    isSavingAd: boolean;
    isLoadingAd: boolean;
    isEditingAd: boolean;
    originalData?: Stilling;
    hasSavedChanges: boolean;
    hasChanges: boolean;
    copiedAds: any[];
    showPublishErrorModal: boolean;
    showStopAdModal: boolean;
    showDeleteAdModal: boolean;
    showAdPublishedModal: boolean;
    showAdSavedErrorModal: boolean;
    kanInkludere: KanInkludere;
    nyStillingState: NyStillingState;
};

const initialState: AdState = {
    error: undefined,
    isSavingAd: false,
    isLoadingAd: false,
    isEditingAd: false,
    originalData: undefined,
    hasSavedChanges: false,
    hasChanges: false,
    copiedAds: [],
    showPublishErrorModal: false,
    showStopAdModal: false,
    showDeleteAdModal: false,
    showAdPublishedModal: false,
    showAdSavedErrorModal: false,
    kanInkludere: KanInkludere.Ja,
    nyStillingState: NyStillingState.SkalBeholdes,
};

export default function adReducer(state = initialState, action: any) {
    switch (action.type) {
        case REMOVE_AD_DATA:
            return {
                ...initialState,
            };
        case FETCH_AD_BEGIN:
            return {
                ...state,
                hasSavedChanges: false,
                isLoadingAd: true,
                error: undefined,
                originalData: undefined,
                hasChanges: false,
            };
        case FETCH_AD_SUCCESS:
            return {
                ...state,
                isLoadingAd: false,
                isEditingAd: false,
                originalData: { ...action.response },
                kanInkludere: kanInkludere(action.response.properties.tags),
            };
        case FETCH_AD_FAILURE:
            return {
                ...state,
                error: action.error,
                isLoadingAd: false,
            };
        case SAVE_AD_BEGIN:
            return {
                ...state,
                isSavingAd: true,
                hasSavedChanges: false,
                hasChanges: false,
            };
        case CREATE_AD_BEGIN:
        case DELETE_AD_BEGIN:
            return {
                ...state,
                isLoadingAd: true,
                isSavingAd: true,
                hasSavedChanges: false,
                hasChanges: false,
                hasDeletedAd: false,
            };
        case DELETE_AD_SUCCESS:
            return {
                ...state,
                isSavingAd: false,
                isLoadingAd: false,
                hasDeletedAd: true,
            };
        case FORKAST_NY_STILLING:
            return {
                ...state,
                nyStillingState: NyStillingState.Forkastes,
            };
        case FORKAST_NY_STILLING_SUCCESS:
            return {
                ...state,
                nyStillingState: NyStillingState.ErForkastet,
            };
        case FORKAST_NY_STILLING_FAILURE:
            return {
                ...state,
                nyStillingState: NyStillingState.Feil,
            };
        case CREATE_AD_SUCCESS:
            return {
                ...state,
                isSavingAd: false,
                isLoadingAd: false,
                hasSavedChanges: true,
                isEditingAd: true,
                originalData: { ...action.response },
                hasChanges: true,
            };
        case SAVE_AD_SUCCESS:
            return {
                ...state,
                isSavingAd: false,
                hasSavedChanges: true,
                originalData: { ...action.response },
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
                showStopAdModal: false,
                showDeleteAdModal: false,
                showAdPublishedModal: false,
                showAdSavedErrorModal: false,
            };
        case EDIT_AD:
            return {
                ...state,
                isEditingAd: true,
                hasChanges: true,
            };
        case PREVIEW_EDIT_AD:
            return {
                ...state,
                isEditingAd: false,
            };
        case SHOW_PUBLISH_ERROR_MODAL:
            return {
                ...state,
                showPublishErrorModal: true,
            };
        case HIDE_PUBLISH_ERROR_MODAL:
            return {
                ...state,
                showPublishErrorModal: false,
            };
        case SHOW_STOP_AD_MODAL:
            return {
                ...state,
                showStopAdModal: true,
            };
        case HIDE_STOP_AD_MODAL:
            return {
                ...state,
                showStopAdModal: false,
            };
        case SHOW_DELETE_AD_MODAL:
            return {
                ...state,
                showDeleteAdModal: true,
            };
        case HIDE_DELETE_AD_MODAL:
            return {
                ...state,
                showDeleteAdModal: false,
            };
        case SHOW_AD_PUBLISHED_MODAL:
            return {
                ...state,
                showAdPublishedModal: true,
            };
        case HIDE_AD_PUBLISHED_MODAL:
            return {
                ...state,
                showAdPublishedModal: false,
            };
        case SHOW_AD_SAVED_ERROR_MODAL:
            return {
                ...state,
                showAdSavedErrorModal: true,
            };
        case HIDE_AD_SAVED_ERROR_MODAL:
            return {
                ...state,
                showAdSavedErrorModal: false,
            };
        case ADD_COPIED_ADS:
            return {
                ...state,
                copiedAds: [...state.copiedAds, action.adUuid],
            };
        case CLEAR_COPIED_ADS:
            return {
                ...state,
                copiedAds: [],
            };
        case SET_KAN_INKLUDERE:
            return {
                ...state,
                kanInkludere: action.kanInkludere,
            };
        case CHECK_TAG:
            return {
                ...state,
                kanInkludere: KanInkludere.Ja,
            };

        default:
            return state;
    }
}

function kanInkludere(tags) {
    if (tags == undefined) return null;
    return tagsInneholderInkluderingsmuligheter(tags) ? KanInkludere.Ja : KanInkludere.Nei;
}

function* getRekrutteringsbistandstilling(action) {
    yield put({ type: FETCH_AD_BEGIN });
    try {
        const response = yield hentRekrutteringsbistandstilling(action.uuid);
        yield put({ type: FETCH_AD_SUCCESS, response: response.stilling });
        const stillingsinfo = response.stillingsinfo || {
            eierNavident: undefined,
            eierNavn: undefined,
            notat: undefined,
            stillingsid: response.stilling.uuid,
        };

        const kommentarFraAd = response.stilling.administration?.comments;
        const stillingsinfoNotatfix = {
            ...stillingsinfo,
            notat: hentNotatFraRekrutteringsbistandEllerAd(stillingsinfo.notat, kommentarFraAd),
        };
        yield put({
            type: SET_STILLINGSINFO_DATA,
            data: stillingsinfoNotatfix,
        });
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

function hentNotatFraRekrutteringsbistandEllerAd(stillingsinfoNotat, kommentarFraAd) {
    // Notat undefined betyr at kommentar ikke er konvertert og skal hentes fra pam-ad. Om den er tom er den konvertert men slettet.
    return stillingsinfoNotat ?? kommentarFraAd;
}

function* showStopModalMyAds(action) {
    yield getRekrutteringsbistandstilling(action);
    yield put({ type: SHOW_STOP_AD_MODAL });
}

function needClassify(originalAdData, adData) {
    return !deepEqual(originalAdData.categoryList, adData.categoryList);
}

function* createAd(action) {
    yield put({ type: CREATE_AD_BEGIN });
    yield put({ type: SET_NOTAT, notat: undefined });

    try {
        const reportee = yield getReportee();

        const stillingDto = {
            title: DEFAULT_TITLE_NEW_AD,
            createdBy: System.Rekrutteringsbistand,
            updatedBy: System.Rekrutteringsbistand,
            source: Kilde.Intern,
            privacy: Privacy.Intern,
            administration: {
                status: AdminStatus.Pending,
                reportee: reportee.displayName,
                navIdent: reportee.navIdent,
            },
        };

        const response: Rekrutteringsbistandstilling = yield postStilling(
            stillingDto,
            action.kategori
        );

        yield put({ type: SET_AD_DATA, data: response.stilling });
        yield put({ type: SET_REPORTEE, reportee: reportee.displayName });
        yield put({ type: SET_NAV_IDENT, navIdent: reportee.navIdent });
        yield put({ type: CREATE_AD_SUCCESS, response: response.stilling });
    } catch (e) {
        if (e instanceof ApiError) {
            yield put({ type: CREATE_AD_FAILURE, error: e });
        }
        throw e;
    }
}

function* saveRekrutteringsbistandStilling(loggPublisering?: boolean) {
    let state = yield select();
    yield put({ type: SAVE_AD_BEGIN });
    try {
        yield put({ type: SET_UPDATED_BY });

        state = yield select();

        // Modified category list requires store/PUT with (re)classification
        let putUrl = `${stillingApi}/rekrutteringsbistandstilling`;
        if (
            typeof state.ad.originalData === 'undefined' ||
            needClassify(state.ad.originalData, state.adData)
        ) {
            putUrl += '?classify=true';
        }

        const data = {
            stilling: state.adData,
            stillingsinfoid: state.stillingsinfoData
                ? state.stillingsinfoData.stillingsinfoid
                : undefined,
            notat: state.stillingsinfoData !== undefined ? state.stillingsinfoData.notat : '',
        };

        const response = yield fetchPut(putUrl, data);

        yield put({ type: SAVE_AD_SUCCESS, response: response.stilling });

        if (loggPublisering) {
            loggPubliseringAvStilling(state.adData.uuid, state.adData.properties.tags);
        }
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
        yield saveRekrutteringsbistandStilling(true);
    }
}

function* stopAd() {
    yield put({ type: SET_ADMIN_STATUS, status: AdminStatusEnum.DONE });
    yield put({ type: SET_AD_STATUS, status: AdStatusEnum.STOPPED });
    yield saveRekrutteringsbistandStilling();
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
        yield saveRekrutteringsbistandStilling();
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
        yield saveRekrutteringsbistandStilling(true);
        state = yield select();
        if (
            state.adData.activationOnPublishingDate &&
            state.adData.status === AdStatusEnum.INACTIVE
        ) {
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
        const deleteUrl = `${stillingApi}/rekrutteringsbistand/api/v1/ads/${state.adData.uuid}`;

        const response = yield fetchDelete(deleteUrl);
        yield put({ type: DELETE_AD_SUCCESS, response });
    } catch (e) {
        if (e instanceof ApiError) {
            yield put({ type: DELETE_AD_FAILURE, error: e });
        }
        throw e;
    }
}

function* deleteAdFromMyAds() {
    yield deleteAd();
    // Update list with the new status
    yield put({ type: FETCH_MY_ADS });
}

function* forkastNyStilling() {
    try {
        yield put({ type: SET_UPDATED_BY });

        const state = yield select();
        const deleteUrl = `${stillingApi}/rekrutteringsbistand/api/v1/ads/${state.adData.uuid}`;

        const response = yield fetchDelete(deleteUrl);
        yield put({ type: FORKAST_NY_STILLING_SUCCESS, response });
    } catch (e) {
        if (e instanceof ApiError) {
            yield put({ type: FORKAST_NY_STILLING_FAILURE, error: e });
        }
        throw e;
    }
}

function* showDeleteModalMyAds(action) {
    yield getRekrutteringsbistandstilling(action);
    yield put({ type: SHOW_DELETE_AD_MODAL });
}

function* copyAdFromMyAds(action) {
    try {
        const response: Rekrutteringsbistandstilling = yield kopierStilling(action.uuid);

        // Mark copied ad in myAds
        yield put({ type: ADD_COPIED_ADS, adUuid: response.stilling.uuid });
        // Update list with the new ad
        yield put({ type: FETCH_MY_ADS });
    } catch (e) {
        if (e instanceof ApiError) {
            yield put({ type: CREATE_AD_FAILURE, error: e });
        }
        throw e;
    }
}

function* leggTilIMineStillinger(action) {
    let state = yield select();

    const { navIdent, displayName } = state.reportee.data;
    yield put({ type: SET_NAV_IDENT_STILLINGSINFO, navIdent, displayName });
    yield put({ type: OPPRETT_STILLINGSINFO, uuid: action.uuid });
}

function* markerEksternStillingSomMin(action) {
    let state = yield select();

    const { navIdent, displayName } = state.reportee.data;
    yield put({ type: SET_NAV_IDENT_STILLINGSINFO, navIdent, displayName });
    yield put({ type: UPDATE_STILLINGSINFO, uuid: action.uuid });
}

function* markerInternStillingSomMin(action) {
    let state = yield select();

    const { navIdent, displayName } = state.reportee.data;
    yield put({ type: SET_NAV_IDENT, navIdent });
    yield put({ type: SET_REPORTEE, reportee: displayName });

    yield saveRekrutteringsbistandStilling();
}

export const adSaga = function* saga() {
    yield takeLatest(PUBLISH_AD, publishAd);
    yield takeLatest(STOP_AD, stopAd);
    yield takeLatest(FETCH_AD, getRekrutteringsbistandstilling);
    yield takeLatest(SAVE_AD, saveAd);
    yield takeLatest(CREATE_AD, createAd);
    yield takeLatest(PUBLISH_AD_CHANGES, publishAdChanges);
    yield takeLatest(FORKAST_NY_STILLING, forkastNyStilling);
    yield takeLatest(SHOW_STOP_MODAL_MY_ADS, showStopModalMyAds);
    yield takeLatest(SHOW_DELETE_MODAL_MY_ADS, showDeleteModalMyAds);
    yield takeLatest(STOP_AD_FROM_MY_ADS, stopAdFromMyAds);
    yield takeLatest(DELETE_AD_FROM_MY_ADS, deleteAdFromMyAds);
    yield takeLatest(COPY_AD_FROM_MY_ADS, copyAdFromMyAds);
    yield takeLatest(LEGG_TIL_I_MINE_STILLINGER, leggTilIMineStillinger);
    yield takeLatest(MARKER_INTERN_STILLING_SOM_MIN, markerInternStillingSomMin);
    yield takeLatest(MARKER_EKSTERN_STILLING_SOM_MIN, markerEksternStillingSomMin);
};
