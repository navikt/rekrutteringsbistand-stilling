import { put, select, takeLatest } from 'redux-saga/effects';
import capitalizeEmployerName from '../ad/administration/employer/capitalizeEmployerName';
import capitalizeLocation from '../ad/administration/location/capitalizeLocation';
import { fetchLocations } from '../ad/administration/location/locationCodeReducer';
import { ApiError, fetchAd, fetchGet } from '../api/api';
import toUrl from '../common/toUrl';
import { AD_API } from '../fasitProperties';

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

export const SET_INITIAL_QUERY = 'SET_INITIAL_QUERY';
export const SET_QUERY_TITLE = 'SET_QUERY_TITLE';
export const SET_QUERY_JOB_TITLE = 'SET_QUERY_JOB_TITLE';
export const SET_QUERY_EMPLOYER = 'SET_QUERY_EMPLOYER';
export const SET_QUERY_MUNICIPAL = 'SET_QUERY_MUNICIPAL';

export const SHOW_DUPLICATES_MODAL = 'SHOW_DUPLICATES_MODAL';
export const HIDE_DUPLICATES_MODAL = 'HIDE_DUPLICATES_MODAL';

export const COLLAPSE_COMPARE_PANEL = 'COLLAPSE_COMPARE_PANEL';
export const EXPAND_COMPARE_PANEL = 'EXPAND_COMPARE_PANEL';

export const FETCH_MUNICIPALS_SUGGESTIONS = 'FETCH_MUNICIPALS_SUGGESTIONS';
export const SET_MUNICIPALS_SUGGESTIONS = 'SET_MUNICIPALS_SUGGESTIONS';

const initialState = {
    possibleDuplicates: [],
    error: undefined,
    isSearching: false,
    current: undefined,
    other: undefined,
    query: {
        title: '',
        jobtitle: '',
        employerName: '',
        municipal: '',
        sort: 'created,asc',
        size: 100
    },
    showDuplicatesModal: false,
    showComparePanel: true,
    isLoadingOther: false,
    municipalSuggestions: [],
    totalElements: 0
};

export default function searchReducer(state = initialState, action) {
    switch (action.type) {
        case SEARCH_FOR_DUPLICATES_BEGIN:
            return {
                ...state,
                other: undefined,
                possibleDuplicates: [],
                isSearching: true,
                error: undefined
            };
        case SEARCH_FOR_DUPLICATES_SUCCESS:
            return {
                ...state,
                possibleDuplicates: action.response,
                totalElements: action.totalElements,
                isSearching: false
            };
        case FETCH_OTHER_FAILURE:
        case FETCH_CURRENT_FAILURE:
        case SEARCH_FOR_DUPLICATES_FAILURE:
            return {
                ...state,
                error: action.error,
                isSearching: false
            };
        case FETCH_CURRENT_BEGIN:
            return {
                ...state,
                error: undefined
            };
        case FETCH_CURRENT_SUCCESS:
            return {
                ...state,
                current: action.response
            };
        case FETCH_OTHER_BEGIN:
            return {
                ...state,
                error: undefined,
                showComparePanel: true
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
        case SET_INITIAL_QUERY: {
            return {
                ...state,
                query: {
                    ...state.query,
                    title: action.title,
                    jobtitle: action.jobtitle,
                    employerName: action.employerName,
                    municipal: action.municipal
                }
            };
        }
        case SET_QUERY_TITLE:
            return {
                ...state,
                query: {
                    ...state.query,
                    title: action.title
                }
            };
        case SET_QUERY_JOB_TITLE:
            return {
                ...state,
                query: {
                    ...state.query,
                    jobtitle: action.jobtitle
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
        case SET_QUERY_MUNICIPAL:
            return {
                ...state,
                query: {
                    ...state.query,
                    municipal: action.value
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
        case SET_MUNICIPALS_SUGGESTIONS:
            return {
                ...state,
                municipalSuggestions: action.municipalSuggestions
            };
        default:
            return state;
    }
}

function* searchForDuplicates() {
    try {
        yield put({ type: SEARCH_FOR_DUPLICATES_BEGIN });
        const state = yield select();
        const searchUrl = toUrl(state.duplicates.query);
        const url = `${AD_API}ads/${searchUrl}`;
        const response = yield fetchGet(url);

        const withoutCurrent = response.content.filter((ad) => (ad.uuid !== state.adData.uuid));

        if (withoutCurrent.length > 0) {
            yield put({ type: FETCH_OTHER_BEGIN });
            try {
                const response2 = yield fetchAd(withoutCurrent[0].uuid);
                yield put({ type: FETCH_OTHER_SUCCESS, response: response2 });
            } catch (e) {
                if (e instanceof ApiError) {
                    yield put({ type: FETCH_OTHER_FAILURE, error: e });
                }
            }
        }

        yield put({ type: SEARCH_FOR_DUPLICATES_SUCCESS, response: withoutCurrent, totalElements: response.totalElements - 1 });
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
        type: SET_INITIAL_QUERY,
        title: state.adData.title,
        jobtitle: state.adData.properties.jobtitle ? state.adData.properties.jobtitle : '',
        employerName: state.adData.employer && state.adData.employer.name ?
            capitalizeEmployerName(state.adData.employer.name) : '',
        municipal: state.adData.location && state.adData.location.municipal ?
            capitalizeLocation(state.adData.location.municipal) : ''
    });
    yield searchForDuplicates();
}

function* fetchCurrent(action) {
    yield put({ type: FETCH_CURRENT_BEGIN });
    try {
        const response = yield fetchAd(action.uuid);
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
    yield put({ type: FETCH_OTHER_BEGIN });
    try {
        const response = yield fetchAd(action.uuid);
        yield put({ type: FETCH_OTHER_SUCCESS, response });
    } catch (e) {
        if (e instanceof ApiError) {
            yield put({ type: FETCH_OTHER_FAILURE, error: e });
        } else {
            throw e;
        }
    }
}

function* fetchMunicipalSuggestions() {
    yield fetchLocations();
}

function* filterMunicipalSuggestions(action) {
    const state = yield select();
    if (action.value.trim().length === 0) {
        yield put({ type: SET_MUNICIPALS_SUGGESTIONS, municipalSuggestions: [] });
    } else {
        const filtered = state.location.locations.filter(((location) =>
            location.city.toLowerCase().startsWith(action.value.toLowerCase()) ||
                location.municipality.name.toLowerCase().startsWith(action.value.toLowerCase()) ||
                location.postalCode.startsWith(action.value)
        )).slice(0, 10);
        yield put({ type: SET_MUNICIPALS_SUGGESTIONS, municipalSuggestions: filtered });
    }
}


export const duplicatesSaga = function* saga() {
    yield takeLatest(SHOW_DUPLICATES_MODAL, initialSearchForDuplicates);
    yield takeLatest(SEARCH_FOR_DUPLICATES, searchForDuplicates);
    yield takeLatest(FETCH_CURRENT, fetchCurrent);
    yield takeLatest(FETCH_OTHER, fetchOther);
    yield takeLatest(FETCH_MUNICIPALS_SUGGESTIONS, fetchMunicipalSuggestions);
    yield takeLatest(SET_QUERY_MUNICIPAL, filterMunicipalSuggestions);
};
