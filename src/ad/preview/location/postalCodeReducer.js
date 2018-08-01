import { put, takeLatest } from 'redux-saga/effects';
import { ApiError, fetchGet } from '../../../api/api';
import { AD_API } from "../../../fasitProperties";
import { FETCH_AD_BEGIN, SAVE_AD_SUCCESS } from "../../adReducer";

export const SET_LOCATION_VALUE = 'SET_LOCATION_VALUE';
export const FETCH_LOCATION_SUGGESTIONS = 'FETCH_LOCATION_SUGGESTIONS';
export const FETCH_LOCATION_SUGGESTIONS_SUCCESS = 'FETCH_LOCATION_SUGGESTIONS_SUCCESS';
export const FETCH_LOCATION_SUGGESTIONS_FAILURE = 'FETCH_LOCATION_SUGGESTIONS_FAILURE';

const initialState = {
    suggestions: []
};

let cached;

function filterLocations(locations, value) {
    return locations.filter(((l) =>
        l.city.toLowerCase().startsWith(value.toLowerCase()) ||
        l.postalCode.startsWith(value)
    )).slice(0, 10);
}

function sortLocations(locations) {
    return locations.sort(function(a, b){
        if(a.city < b.city) return -1;
        if(a.city > b.city) return 1;
        if(a.postalCode < b.postalCode) return -1;
        if(a.postalCode > b.postalCode) return 1;
        return 0;
    })
}

export function lookUpLocation(postalCode) {
    return cached.find(location => (location.postalCode === postalCode))
}

export default function postalCodeReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_AD_BEGIN:
        case SAVE_AD_SUCCESS:
            return {
                ...state,
                value: undefined,
                suggestions: []
            };
        case SET_LOCATION_VALUE:
            return {
                ...state,
                value: action.value,
                suggestions: action.value.length > 1 ? filterLocations(cached, action.value) : []
            };
        case FETCH_LOCATION_SUGGESTIONS_SUCCESS:
            return {
                ...state,
                suggestions: []
            };
        case FETCH_LOCATION_SUGGESTIONS_FAILURE:
            return {
                ...state,
                suggestions: []
            };
        default:
            return state;
    }
}

function* getLocationSuggestions() {
    if (!cached) {
        try {
            const response = yield fetchGet(`${AD_API}postdata/`);
            cached = sortLocations(response);
            yield put({ type: FETCH_LOCATION_SUGGESTIONS_SUCCESS, response: cached });
        } catch (e) {
            if (e instanceof ApiError) {
                yield put({ type: FETCH_LOCATION_SUGGESTIONS_FAILURE, error: e });
            } else {
                throw e;
            }
        }
    }
}

export const postalCodeSaga = function* saga() {
    yield takeLatest(FETCH_LOCATION_SUGGESTIONS, getLocationSuggestions);
};
