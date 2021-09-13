import { put, select, takeLatest } from 'redux-saga/effects';
import { stillingApi } from '../api/api';
import { ApiError, fetchPost, fetchPut } from '../api/apiUtils';

import { SET_STILLINGSINFO_DATA } from './stillingsinfoDataReducer';
export const FETCH_STILLINGSINFO = 'FETCH_STILLINGSINFO';
export const FETCH_STILLINGSINFO_BEGIN = 'FETCH_STILLINGSINFO_BEGIN';
export const FETCH_STILLINGSINFO_SUCCESS = 'FETCH_STILLINGSINFO_SUCCESS';
export const FETCH_STILLINGSINFO_FAILURE = 'FETCH_STILLINGSINFO_FAILURE';

export const SAVE_STILLINGSINFO = 'SAVE_STILLINGSINFO';
export const SAVE_STILLINGSINFO_BEGIN = 'SAVE_STILLINGSINFO_BEGIN';
export const SAVE_STILLINGSINFO_SUCCESS = 'SAVE_STILLINGSINFO_SUCCESS';
export const SAVE_STILLINGSINFO_FAILURE = 'SAVE_STILLINGSINFO_FAILURE';

export const UPDATE_STILLINGSINFO = 'UPDATE__STILLINGSINFO';
export const UPDATE_STILLINGSINFO_BEGIN = 'UPDATE__STILLINGSINFO_BEGIN';
export const UPDATE_STILLINGSINFO_SUCCESS = 'UPDATE__STILLINGSINFO_SUCCESS';
export const UPDATE_STILLINGSINFO_FAILURE = 'UPDATE__STILLINGSINFO_FAILURE';

export const CLOSE_TRANSFERRED_ALERT = 'CLOSE_TRANSFERRED_ALERT';

const initialState = {
    isSavingStillingsinfo: false,
    hasSavedStillingsinfo: false,
    isLoadingStillingsinfo: false,
    showAdTransferredAlert: false,
    showAdMarkedAlert: false,
};

export default function stillingsinfoReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_STILLINGSINFO_BEGIN:
            return {
                ...state,
                hasSavedStillingsinfo: false,
                isLoadingStillingsinfo: true,
            };
        case FETCH_STILLINGSINFO_SUCCESS:
            return {
                ...state,
                isLoadingStillingsinfo: false,
            };
        case FETCH_STILLINGSINFO_FAILURE:
            return {
                ...state,
                error: action.error,
                isLoadingStillingsinfo: false,
            };
        case SAVE_STILLINGSINFO_BEGIN:
        case UPDATE_STILLINGSINFO_BEGIN:
            return {
                ...state,
                isSavingStillingsinfo: true,
                hasSavedStillingsinfo: false,
            };
        case SAVE_STILLINGSINFO_FAILURE:
        case UPDATE_STILLINGSINFO_FAILURE:
            return {
                ...state,
                isSavingStillingsinfo: false,
                error: action.error,
                hasSavedStillingsinfo: false,
            };
        case SAVE_STILLINGSINFO_SUCCESS:
            return {
                ...state,
                isSavingStillingsinfo: false,
                hasSavedStillingsinfo: true,
                showAdTransferredAlert: true,
                showAdMarkedAlert: false,
            };
        case UPDATE_STILLINGSINFO_SUCCESS:
            return {
                ...state,
                isSavingStillingsinfo: false,
                hasSavedStillingsinfo: true,
                showAdTransferredAlert: false,
                showAdMarkedAlert: true,
            };
        case CLOSE_TRANSFERRED_ALERT:
            return {
                ...state,
                showAdTransferredAlert: false,
                showAdMarkedAlert: false,
            };
        default:
            return state;
    }
}

function* getStillingsinfo(action) {
    yield put({ type: FETCH_STILLINGSINFO_BEGIN });
    try {
        const response = action.stillingsinfo;
        const saveResponse =
            response !== null
                ? response
                : {
                      eierNavident: undefined,
                      eierNavn: undefined,
                      stillingsid: action.uuid,
                  };

        yield put({ type: FETCH_STILLINGSINFO_SUCCESS });
        yield put({ type: SET_STILLINGSINFO_DATA, data: saveResponse });
    } catch (e) {
        if (e instanceof ApiError) {
            yield put({ type: FETCH_STILLINGSINFO_FAILURE, error: e });
        } else {
            throw e;
        }
    }
}

function* saveStillingsinfo() {
    let state = yield select();
    yield put({ type: SAVE_STILLINGSINFO_BEGIN });
    if (state.stillingsinfoData.stillingsinfoid) {
        throw new Error('Kan ikke opprette stillingsinfo når den allerede finnes');
    }
    try {
        state = yield select(); // Hvorfor yield select to ganger?

        console.log('saveStillingsinfo stillingsinfo finnes ikke');
        const response = yield fetchPost(
            `${stillingApi}/rekruttering/kandidatliste`,
            state.stillingsinfoData
        );

        yield put({ type: SAVE_STILLINGSINFO_SUCCESS, response });
    } catch (e) {
        if (e instanceof ApiError) {
            yield put({ type: SAVE_STILLINGSINFO_FAILURE, error: e });
        } else {
            throw e;
        }
    }
}

function* updateStillingsinfo() {
    let state = yield select();
    yield put({ type: UPDATE_STILLINGSINFO_BEGIN });
    try {
        state = yield select();

        if (!state.stillingsinfoData.stillingsinfoid) {
            throw new Error('oppdaterer uten å ha id');
        }
        console.log('updateStillingsinfo stillingsinfo finnes');
        const response = yield fetchPut(`${stillingApi}/rekruttering`, state.stillingsinfoData);
        yield put({ type: UPDATE_STILLINGSINFO_SUCCESS, response });
    } catch (e) {
        if (e instanceof ApiError) {
            yield put({ type: UPDATE_STILLINGSINFO_FAILURE, error: e });
        } else {
            throw e;
        }
    }
}

export const stillingsinfoSaga = function* saga() {
    yield takeLatest(FETCH_STILLINGSINFO, getStillingsinfo);
    yield takeLatest(SAVE_STILLINGSINFO, saveStillingsinfo);
    yield takeLatest(UPDATE_STILLINGSINFO, updateStillingsinfo);
};
