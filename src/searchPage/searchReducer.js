import { put, takeLatest, select } from 'redux-saga/effects';
import { fetchGet, ApiError } from '../api/api';
import { AD_API } from '../fasitProperties';
import AdminStatusEnum from '../ad/administration/AdminStatusEnum';

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
    administrationStatus: AdminStatusEnum.RECEIVED
};

export default function searchReducer(state = initialState, action) {
    switch (action.type) {
        case SET_SEARCH_VALUE:
            return {
                ...state,
                value: action.value,
                suggestions: action.value.length === 0 ? [] : [
                    { label: `Søk på "${action.value}" i arbeidsgiver`, value: Fields.EMPLOYER_NAME },
                    { label: `Søk på "${action.value}" i annonseoverskrift`, value: Fields.TITLE },
                    { label: `Søk på "${action.value}" i ID`, value: Fields.ID }
                ]
            };
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

/**
 * Takes an object representing the url query and transform it into a string
 * @param query: f.ex: {q: "Java", fruits: ["Apple", "Banana"], count: 10}
 * @returns {string} f.ex: q=Java&names=Apple_Banana&count=10
 */
export const toUrl = (query) => {
    let result = {};

    Object.keys(query).forEach((key) => {
        if (query[key] !== undefined) {
            if (query[key] !== '') {
                result = {
                    ...result,
                    [key]: query[key]
                };
            }
        }
    });

    const urlQuery = Object.keys(result)
        .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(result[key])}`)
        .join('&')
        .replace(/%20/g, '+')
        .replace(/%2C/g, ',');


    return urlQuery && urlQuery.length > 0 ? `?${urlQuery}` : '';
};

export function toQuery(search) {
    const {
        sortField, sortDir, page, source, status, administrationStatus
    } = search;
    const query = {
        source,
        status,
        sort: `${sortField},${sortDir}`,
        page,
        administrationStatus
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
        SET_SEARCH_FIELD,
        CHANGE_SORTING,
        CHANGE_PAGE,
        FETCH_ADS
    ], getAds);
};
