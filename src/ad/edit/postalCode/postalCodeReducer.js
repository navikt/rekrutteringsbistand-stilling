import { put, takeLatest } from 'redux-saga/effects';
import { ApiError, fetchGet } from '../../../api/api';
import { AD_API } from '../../../fasitProperties';
import { FETCH_AD_BEGIN } from '../../adReducer';

export const SET_POSTAL_CODE_VALUE = 'SET_POSTAL_CODE_VALUE';
export const FETCH_POSTAL_CODES_SUGGESTIONS = 'FETCH_POSTAL_CODES_SUGGESTIONS';
export const FETCH_POSTAL_CODES_SUGGESTIONS_SUCCESS = 'FETCH_POSTAL_CODES_SUGGESTIONS_SUCCESS';
export const FETCH_POSTAL_CODES_SUGGESTIONS_FAILURE = 'FETCH_POSTAL_CODES_SUGGESTIONS_FAILURE';

const initialState = {
    suggestions: []
};

let cached;

function filterPostalCodes(postalCodes, value) {
    return postalCodes.filter(((postalCode) =>
        postalCode.city.toLowerCase().startsWith(value.toLowerCase()) ||
            postalCode.postalCode.startsWith(value)
    )).slice(0, 10);
}

function sortPostalCodes(postalCodes) {
    return postalCodes.sort((a, b) => {
        if (a.city < b.city) return -1;
        if (a.city > b.city) return 1;
        if (a.postalCode < b.postalCode) return -1;
        if (a.postalCode > b.postalCode) return 1;
        return 0;
    });
}

export function lookUpPostalCodes(value) {
    return cached.find((postalCode) => (postalCode.postalCode === value));
}

export default function postalCodeReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_AD_BEGIN:
            return {
                ...state,
                suggestions: []
            };
        case SET_POSTAL_CODE_VALUE:
            return {
                ...state,
                suggestions: action.value.length > 1 ? filterPostalCodes(cached, action.value) : []
            };
        case FETCH_POSTAL_CODES_SUGGESTIONS_SUCCESS:
            return {
                ...state,
                suggestions: []
            };
        case FETCH_POSTAL_CODES_SUGGESTIONS_FAILURE:
            return {
                ...state,
                suggestions: []
            };
        default:
            return state;
    }
}

function* getPostalCodesSuggestions() {
    if (!cached) {
        try {
            const response = yield fetchGet(`${AD_API}postdata/`);
            cached = sortPostalCodes(response);
            yield put({ type: FETCH_POSTAL_CODES_SUGGESTIONS_SUCCESS, response: cached });
        } catch (e) {
            if (e instanceof ApiError) {
                yield put({ type: FETCH_POSTAL_CODES_SUGGESTIONS_FAILURE, error: e });
            } else {
                throw e;
            }
        }
    }
}

export const postalCodeSaga = function* saga() {
    yield takeLatest(FETCH_POSTAL_CODES_SUGGESTIONS, getPostalCodesSuggestions);
};
