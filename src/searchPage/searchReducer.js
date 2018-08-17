import { put, takeLatest, select, call } from 'redux-saga/effects';
import { fetchGet, ApiError } from '../api/api';
import { AD_API } from '../fasitProperties';
import { getReportee } from '../reportee/reporteeReducer';
import toUrl from '../common/toUrl';

export const FETCH_ADS = 'FETCH_ADS';
export const FETCH_ADS_BEGIN = 'FETCH_ADS_BEGIN';
export const FETCH_ADS_SUCCESS = 'FETCH_ADS_SUCCESS';
export const FETCH_ADS_FAILURE = 'FETCH_ADS_FAILURE';
export const CHANGE_SORTING = 'CHANGE_SORTING';
export const CHANGE_PAGE = 'CHANGE_PAGE';
export const RESET_PAGE = 'RESET_PAGE';
export const SET_SEARCH_VALUE = 'SET_SEARCH_VALUE';
export const SET_SEARCH_FIELD = 'SET_SEARCH_FIELD';
export const CHANGE_SOURCE_FILTER = 'CHANGE_SOURCE_FILTER';
export const CHANGE_STATUS_FILTER = 'CHANGE_STATUS_FILTER';
export const CHANGE_ADMINISTRATION_STATUS_FILTER = 'CHANGE_ADMINISTRATION_STATUS_FILTER';
export const CHANGE_REPORTEE_FILTER = 'CHANGE_REPORTEE_FILTER';

export const Fields = {
    EMPLOYER_NAME: 'employerName',
    TITLE: 'title',
    ID: 'id'
};

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
    field: undefined,
    suggestions: [],
    source: undefined,
    status: undefined,
    administrationStatus: undefined,
    reportee: undefined
};

export default function searchReducer(state = initialState, action) {
    switch (action.type) {
        case SET_SEARCH_VALUE: {
            // only allow spaces and numbers for search on 'stillingsnummer'
            const isNumbersOnly = action.value.match(/^[ 0-9]+$/) !== null;
            const suggestions = [];
            if (action.value.length > 0) {
                suggestions.push({ label: `Søk på "${action.value}" i arbeidsgiver`, value: Fields.EMPLOYER_NAME });
                suggestions.push({ label: `Søk på "${action.value}" i annonseoverskrift`, value: Fields.TITLE });
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
        case SET_SEARCH_FIELD:
            return {
                ...state,
                field: action.field
            };
        case CHANGE_SOURCE_FILTER:
            return {
                ...state,
                source: action.value
            };
        case CHANGE_STATUS_FILTER:
            return {
                ...state,
                status: action.value
            };
        case CHANGE_ADMINISTRATION_STATUS_FILTER:
            return {
                ...state,
                administrationStatus: action.value
            };
        case CHANGE_REPORTEE_FILTER:
            return {
                ...state,
                reportee: action.value
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

export function toQuery(search) {
    const {
        sortField, sortDir, page, source, status, administrationStatus, reportee
    } = search;
    const query = {
        source,
        status,
        sort: `${sortField},${sortDir}`,
        page,
        administrationStatus,
        reportee
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

        let state = yield select();
        if (state.search.reportee === 'mine') {
            const reportee = yield call(getReportee);
            state = {
                ...state,
                search: {
                    ...state.search,
                    reportee: reportee.displayName
                }
            };
        }

        const query = toQuery(state.search);
        const searchUrl = toUrl(query);
        const url = `${AD_API}ads/${searchUrl}`;

        const response = yield fetchGet(url);
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
        CHANGE_SOURCE_FILTER,
        CHANGE_STATUS_FILTER,
        CHANGE_ADMINISTRATION_STATUS_FILTER,
        CHANGE_REPORTEE_FILTER,
        SET_SEARCH_FIELD,
        CHANGE_SORTING,
        CHANGE_PAGE,
        FETCH_ADS
    ], getAds);
};
