import { put, select, takeLatest } from 'redux-saga/effects';
import { ApiError, fetchAds } from '../api/api';
import AdminStatusEnum from '../common/enums/AdminStatusEnum';

export const FETCH_ADS = 'FETCH_ADS';
export const FETCH_ADS_BEGIN = 'FETCH_ADS_BEGIN';
export const FETCH_ADS_SUCCESS = 'FETCH_ADS_SUCCESS';
export const FETCH_ADS_FAILURE = 'FETCH_ADS_FAILURE';
export const CHANGE_SORTING = 'CHANGE_SORTING';
export const CHANGE_PAGE = 'CHANGE_PAGE';
export const RESET_PAGE = 'RESET_PAGE';
export const SET_SEARCH_VALUE = 'SET_SEARCH_VALUE';
export const SET_SEARCH_FIELD = 'SET_SEARCH_FIELD';
export const CHANGE_PRIVACY_FILTER = 'CHANGE_PRIVACY_FILTER';
export const CHANGE_STATUS_FILTER = 'CHANGE_STATUS_FILTER';
export const CHANGE_SOURCE_FILTER = 'CHANGE_SOURCE_FILTER';
export const CHANGE_LOCATION_FILTER = 'CHANGE_LOCATION_FILTER';
export const RESET_SEARCH = 'RESET_SEARCH';
export const RESTORE_SEARCH = 'RESTORE_SEARCH';
export const SET_SEARCH = 'SET_SEARCH';

export const Fields = {
    EMPLOYER_NAME: 'employerName',
    TITLE: 'title',
    ID: 'id'
};

const ACTIVE = 'ACTIVE';

const LOCAL_STORAGE_SEARCH_KEY = 'last_search';

const initialState = {
    items: [],
    error: undefined,
    isSearching: false,
    sortField: 'created',
    sortDir: 'desc',
    totalElements: 0,
    totalPages: 0,
    page: 0,
    value: '',
    administrationStatus: AdminStatusEnum.DONE,
    field: undefined,
    suggestions: [],
    privacy: undefined,
    status: ACTIVE,
    deactivatedByExpiry: undefined,
    source: undefined,
    locationName: undefined
};

export default function searchReducer(state = initialState, action) {
    switch (action.type) {
        case SET_SEARCH_VALUE: {
            // only allow spaces and numbers for search on 'annonsenummer'
            const isNumbersOnly = action.value.match(/^[ 0-9]+$/) !== null;
            const suggestions = [];
            if (action.value.length > 0) {
                suggestions.push({ label: `Søk på "${action.value}" i annonseoverskrift`, value: Fields.TITLE });
                suggestions.push({ label: `Søk på "${action.value}" i arbeidsgiver`, value: Fields.EMPLOYER_NAME });
                if (isNumbersOnly) {
                    suggestions.push({ label: `Søk på "${action.value}" i annonsenummer`, value: Fields.ID });
                }
            }
            return {
                ...state,
                value: action.value,
                suggestions
            };
        }
        case RESET_SEARCH:
            return initialState;
        case SET_SEARCH_FIELD:
            return {
                ...state,
                field: action.field
            };
        case CHANGE_PRIVACY_FILTER:
            return {
                ...state,
                privacy: action.value
            };
        case CHANGE_STATUS_FILTER:
            return {
                ...state,
                status: action.status,
                deactivatedByExpiry: action.deactivatedByExpiry
            };
        case CHANGE_SOURCE_FILTER:
            return {
                ...state,
                source: action.value
            };
        case CHANGE_LOCATION_FILTER:
            return {
                ...state,
                locationName: action.location
            };
        case FETCH_ADS_BEGIN:
            return {
                ...state,
                isSearching: true,
                error: undefined
            };
        case FETCH_ADS_SUCCESS:
            return {
                ...state,
                items: action.response.content,
                isSearching: false,
                totalElements: action.response.totalElements,
                totalPages: action.response.totalPages
            };
        case FETCH_ADS_FAILURE:
            return {
                ...state,
                error: action.error,
                isSearching: false
            };
        case CHANGE_SORTING:
            return {
                ...state,
                sortField: action.field,
                sortDir: action.dir
            };
        case CHANGE_PAGE:
            return {
                ...state,
                page: action.page
            };
        case RESET_PAGE:
            return {
                ...state,
                page: 0
            };
        case SET_SEARCH:
            return {
                ...action.search
            };
        default:
            return state;
    }
}


function combineStatusQuery(status) {
    if (status === undefined) {
        return {
            status: '!REJECTED,DELETED'
        };
    }
    return { status };
}

export function toQuery(search) {
    const {
        sortField, sortDir, page, privacy, status, source, administrationStatus, locationName, deactivatedByExpiry
    } = search;

    const query = {
        sort: `${sortField},${sortDir}`,
        page,
        administrationStatus,
        source,
        privacy,
        locationName,
        deactivatedByExpiry,
        ...combineStatusQuery(status)
    };

    query[search.field] = search.value;
    return query;
}

function* saveSearchToLocalStorage() {
    const search = yield select((state) => state.search);
    const searchTerm = { ...search, items: [] };
    try {
        localStorage.setItem(LOCAL_STORAGE_SEARCH_KEY, JSON.stringify(searchTerm));
    } catch (error) {
        // Klarte ikke lagre søk til localStorage.
    }
}

function* getAds(action) {
    try {
        if (action.type !== CHANGE_PAGE) {
            yield put({ type: RESET_PAGE });
        }
        yield put({ type: FETCH_ADS_BEGIN });

        const state = yield select();
        const query = toQuery(state.search);
        const response = yield fetchAds(query);

        yield put({ type: FETCH_ADS_SUCCESS, response });
        yield saveSearchToLocalStorage();
    } catch (e) {
        if (e instanceof ApiError) {
            yield put({ type: FETCH_ADS_FAILURE, error: e });
        } else {
            throw e;
        }
    }
}

function* restoreSearchFromLocalStorage() {
    try {
        const search = JSON.parse(localStorage.getItem(LOCAL_STORAGE_SEARCH_KEY));
        if (search) {
            yield put({ type: SET_SEARCH, search });
        }
    } catch (error) {
        if (error instanceof SyntaxError) {
            // Data i localStorage er korrupt/ikke gyldig json. Fjerner data.
            localStorage.removeItem(LOCAL_STORAGE_SEARCH_KEY);
        }
    }
}

export const searchSaga = function* saga() {
    yield takeLatest(RESTORE_SEARCH, restoreSearchFromLocalStorage);
    yield takeLatest([
        RESET_SEARCH,
        CHANGE_STATUS_FILTER,
        CHANGE_SOURCE_FILTER,
        CHANGE_PRIVACY_FILTER,
        CHANGE_LOCATION_FILTER,
        SET_SEARCH_FIELD,
        CHANGE_SORTING,
        CHANGE_PAGE,
        FETCH_ADS
    ], getAds);
};
