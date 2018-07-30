import { put, takeLatest, select } from 'redux-saga/effects';
import { fetchGet, ApiError } from '../api/api';
import { AD_API } from '../fasitProperties';
import {
    CHANGE_SEARCH_TITLE, CHANGE_SEARCH_EMPLOYER, CHANGE_SOURCE_FILTER,
    CHANGE_STATUS_FILTER, CHANGE_SEARCH_ID
} from './filter/filterReducer';

export const FETCH_ADS = 'FETCH_ADS';
export const FETCH_ADS_BEGIN = 'FETCH_ADS_BEGIN';
export const FETCH_ADS_SUCCESS = 'FETCH_ADS_SUCCESS';
export const FETCH_ADS_FAILURE = 'FETCH_ADS_FAILURE';

const initialState = {
    items: [],
    error: undefined,
    isSearching: false
};

export default function searchReducer(state = initialState, action) {
    switch (action.type) {
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
                isSearching: false
            };
        case FETCH_ADS_FAILURE:
            return {
                ...state,
                error: action.error,
                isSearching: false
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
const toUrl = (query) => {
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
        .replace(/%20/g, '+');


    return urlQuery && urlQuery.length > 0 ? `?${urlQuery}` : '';
};

function* getAds() {
    try {
        yield put({ type: FETCH_ADS_BEGIN });

        const state = yield select();

        const { filter } = state;

        const searchUrl = toUrl(filter);

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
    yield takeLatest([CHANGE_SOURCE_FILTER,
        CHANGE_STATUS_FILTER,
        CHANGE_SEARCH_EMPLOYER,
        CHANGE_SEARCH_TITLE,
        CHANGE_SEARCH_ID,
        FETCH_ADS], getAds);
};
