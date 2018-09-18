import { put, takeLatest, select, call } from 'redux-saga/effects';
import capitalizeEmployerName from '../ad/administration/employer/capitalizeEmployerName';
import capitalizeLocation from '../ad/administration/location/capitalizeLocation';
import { fetchGet, ApiError } from '../api/api';
import { AD_API } from '../fasitProperties';
import toUrl from '../common/toUrl';

export const FETCH_CURRENT = 'FETCH_CURRENT';
export const FETCH_CURRENT_BEGIN = 'FETCH_CURRENT_BEGIN';
export const FETCH_CURRENT_SUCCESS = 'FETCH_CURRENT_SUCCESS';
export const FETCH_CURRENT_FAILURE = 'FETCH_CURRENT_FAILURE';

export const FETCH_OTHER = 'FETCH_OTHER';
export const FETCH_OTHER_BEGIN = 'FETCH_OTHER_BEGIN';
export const FETCH_OTHER_SUCCESS = 'FETCH_OTHER_SUCCESS';
export const FETCH_OTHER_FAILURE = 'FETCH_OTHER_FAILURE';

export const SEARCH_FOR_DUPLICATES = 'SEARCH_FOR_DUPLICATES';
export const SEARCH_FOR_DUPLICATES_BEGIN = 'SEARCH_FOR_DUPLICATES_BEGIN';
export const SEARCH_FOR_DUPLICATES_SUCCESS = 'SEARCH_FOR_DUPLICATES_SUCCESS';
export const SEARCH_FOR_DUPLICATES_FAILURE = 'SEARCH_FOR_DUPLICATES_FAILURE';

export const SET_QUERY_TITLE = 'SET_QUERY_TITLE';
export const SET_QUERY_EMPLOYER = 'SET_QUERY_EMPLOYER';
export const SET_QUERY_LOCATION = 'SET_QUERY_LOCATION';

export const SHOW_DUPLICATES_MODAL = 'SHOW_DUPLICATES_MODAL';
export const HIDE_DUPLICATES_MODAL = 'HIDE_DUPLICATES_MODAL';

export const COLLAPSE_COMPARE_PANEL = 'COLLAPSE_COMPARE_PANEL';
export const EXPAND_COMPARE_PANEL = 'EXPAND_COMPARE_PANEL';

const initialState = {
    possibleDuplicates: [],
    error: undefined,
    isSearching: false,
    current: undefined,
    other: undefined,
    query: {
        title: '',
        employerName: '',
        location: '',
        sort: 'created,asc',
        size: 50
    },
    showDuplicatesModal: false,
    showComparePanel: false,
    isLoadingOther: false
};

export default function searchReducer(state = initialState, action) {
    switch (action.type) {
        case SEARCH_FOR_DUPLICATES_BEGIN:
            return {
                ...state,
                other: undefined,
                isSearching: true,
                error: undefined
            };
        case SEARCH_FOR_DUPLICATES_SUCCESS:
            return {
                ...state,
                possibleDuplicates: action.response,
                isSearching: false
            };
        case SEARCH_FOR_DUPLICATES_FAILURE:
            return {
                ...state,
                error: action.error,
                isSearching: false
            };
        case FETCH_CURRENT_SUCCESS:
            return {
                ...state,
                current: action.response
            };
        case FETCH_OTHER:
            return {
                ...state,
                isLoadingOther: true
            };
        case FETCH_OTHER_SUCCESS:
            return {
                ...state,
                isLoadingOther: false,
                other: action.response
            };
        case SET_QUERY_TITLE:
            return {
                ...state,
                query: {
                    ...state.query,
                    title: action.title
                }
            };
        case SET_QUERY_EMPLOYER:
            return {
                ...state,
                query: {
                    ...state.query,
                    employerName: action.employerName
                }
            };
        case SET_QUERY_LOCATION:
            return {
                ...state,
                query: {
                    ...state.query,
                    location: action.location
                }
            };
        case SHOW_DUPLICATES_MODAL:
            return {
                ...state,
                showDuplicatesModal: true
            };
        case HIDE_DUPLICATES_MODAL:
            return {
                ...state,
                showDuplicatesModal: false
            };
        case COLLAPSE_COMPARE_PANEL: {
            return {
                ...state,
                showComparePanel: false
            };
        }
        case EXPAND_COMPARE_PANEL: {
            return {
                ...state,
                showComparePanel: true
            };
        }
        default:
            return state;
    }
}

function* searchForDuplicates() {
    yield put({ type: COLLAPSE_COMPARE_PANEL });
    try {
        yield put({ type: SEARCH_FOR_DUPLICATES_BEGIN });
        const state = yield select();
        const searchUrl = toUrl(state.duplicates.query);
        const url = `${AD_API}ads/${searchUrl}`;
        const response = yield fetchGet(url);

        const withoutCurrent = response.content.filter((ad) => (ad.uuid !== state.adData.uuid));

        yield put({ type: SEARCH_FOR_DUPLICATES_SUCCESS, response: withoutCurrent });
    } catch (e) {
        if (e instanceof ApiError) {
            yield put({ type: SEARCH_FOR_DUPLICATES_FAILURE, error: e });
        } else {
            throw e;
        }
    }
}

function* initialSearchForDuplicates() {
    const state = yield select();
    yield put({
        type: SET_QUERY_TITLE,
        title: state.adData.title
    });
    yield put({
        type: SET_QUERY_EMPLOYER,
        employerName: state.adData.employer && state.adData.employer.name ?
            capitalizeEmployerName(state.adData.employer.name) : ''
    });
    yield put({
        type: SET_QUERY_LOCATION,
        location: state.adData.location && state.adData.location.city ?
            capitalizeLocation(state.adData.location.city) : ''
    });
    yield searchForDuplicates();
}

function* fetchCurrent(action) {
    yield put({ type: FETCH_CURRENT_BEGIN });
    try {
        const response = yield fetchGet(`${AD_API}ads/${action.uuid}`);
        yield put({ type: FETCH_CURRENT_SUCCESS, response });
    } catch (e) {
        if (e instanceof ApiError) {
            yield put({ type: FETCH_CURRENT_FAILURE, error: e });
        } else {
            throw e;
        }
    }
}

function* fetchOther(action) {
    yield put({ type: EXPAND_COMPARE_PANEL });
    yield put({ type: FETCH_OTHER_BEGIN });
    try {
        const response = yield fetchGet(`${AD_API}ads/${action.uuid}`);
        yield put({ type: FETCH_OTHER_SUCCESS, response });
    } catch (e) {
        if (e instanceof ApiError) {
            yield put({ type: FETCH_OTHER_FAILURE, error: e });
        } else {
            throw e;
        }
    }
}

export const duplicatesSaga = function* saga() {
    yield takeLatest(SHOW_DUPLICATES_MODAL, initialSearchForDuplicates);
    yield takeLatest(SEARCH_FOR_DUPLICATES, searchForDuplicates);
    yield takeLatest(FETCH_CURRENT, fetchCurrent);
    yield takeLatest(FETCH_OTHER, fetchOther);
};
