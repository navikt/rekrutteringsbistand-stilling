import { put, select, takeLatest } from 'redux-saga/effects';
import { ApiError, fetchAds } from '../api/api';
import AdminStatusEnum from '../ad/administration/adminStatus/AdminStatusEnum';

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
export const CHANGE_MUNICIPAL_FILTER = 'CHANGE_MUNICIPAL_FILTER';
export const RESET_SEARCH = 'RESET_SEARCH';

export const Fields = {
    EMPLOYER_NAME: 'employerName',
    TITLE: 'title',
    ID: 'id'
};

const ACTIVE = 'ACTIVE';
const INACTIVE = 'INACTIVE';
const EXPIRED = 'EXPIRED';

const initialState = {
    items: [],
    error: undefined,
    isSearching: false,
    sortField: 'created',
    sortDir: 'asc',
    totalElements: 0,
    totalPages: 0,
    page: 0,
    value: '',
    administrationStatus: AdminStatusEnum.DONE,
    field: undefined,
    suggestions: [],
    privacy: undefined,
    status: ACTIVE,
    source: undefined,
    municipal: undefined
};

export default function searchReducer(state = initialState, action) {
    switch (action.type) {
        case SET_SEARCH_VALUE: {
            // only allow spaces and numbers for search on 'stillingsnummer'
            const isNumbersOnly = action.value.match(/^[ 0-9]+$/) !== null;
            const suggestions = [];
            if (action.value.length > 0) {
                suggestions.push({ label: `Søk på "${action.value}" i arbeidsgiver`, value: Fields.EMPLOYER_NAME });
                suggestions.push({ label: `Søk på "${action.value}" i stillingsoverskrift`, value: Fields.TITLE });
                if (isNumbersOnly) {
                    suggestions.push({ label: `Søk på "${action.value}" i stillingsnummer`, value: Fields.ID });
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
                status: action.value
            };
        case CHANGE_SOURCE_FILTER:
            return {
                ...state,
                source: action.value
            };
        case CHANGE_MUNICIPAL_FILTER:
            return {
                ...state,
                municipal: action.municipal
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
        default:
            return state;
    }
}


function combineStatusQuery(status) {
    if (status === undefined) {
        return {
            status: '!REJECTED,DELETED'
        };
    } else if (status === INACTIVE) {
        return {
            status,
            published: '(today,*]'
        };
    } else if (status === EXPIRED) {
        return {
            status: INACTIVE,
            expires: '[*,today)'
        };
    }
    return { status };
}

export function toQuery(search, municipal) {
    const {
        sortField, sortDir, page, privacy, status, source, administrationStatus
    } = search;

    const query = {
        sort: `${sortField},${sortDir}`,
        page,
        administrationStatus,
        source,
        privacy,
        municipal,
        ...combineStatusQuery(status)
    };

    query[search.field] = search.value;
    return query;
}

function* getAds(action) {
    try {
        if (action.type !== CHANGE_PAGE) {
            yield put({ type: RESET_PAGE });
        }
        yield put({ type: FETCH_ADS_BEGIN });

        const state = yield select();

        const query = toQuery(state.search, state.municipal.municipal);
        const response = yield fetchAds(query);
        yield put({ type: FETCH_ADS_SUCCESS, response });
    } catch (e) {
        if (e instanceof ApiError) {
            yield put({ type: FETCH_ADS_FAILURE, error: e });
        } else {
            throw e;
        }
    }
}

export const searchSaga = function* saga() {
    yield takeLatest([
        RESET_SEARCH,
        CHANGE_STATUS_FILTER,
        CHANGE_SOURCE_FILTER,
        CHANGE_PRIVACY_FILTER,
        CHANGE_MUNICIPAL_FILTER,
        SET_SEARCH_FIELD,
        CHANGE_SORTING,
        CHANGE_PAGE,
        FETCH_ADS
    ], getAds);
};
