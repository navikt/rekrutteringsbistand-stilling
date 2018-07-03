import { call, put, takeLatest } from 'redux-saga/effects';
import { fetchLocationSuggestions, ApiError } from '../../api/api';

export const SET_LOCATION_VALUE = 'SET_LOCATION_VALUE';
export const ADD_LOCATION = 'ADD_LOCATION';
export const REMOVE_LOCATION = 'REMOVE_LOCATION';
export const FETCH_LOCATION_SUGGESTIONS = 'FETCH_LOCATION_SUGGESTIONS';
export const FETCH_LOCATION_SUGGESTIONS_SUCCESS = 'FETCH_LOCATION_SUGGESTIONS_SUCCESS';
export const FETCH_LOCATION_SUGGESTIONS_FAILURE = 'FETCH_LOCATION_SUGGESTIONS_FAILURE';

const initialState = {
    suggestions: [],
    value: '',
    locations: []
};

export default function locationReducer(state = initialState, action) {
    switch (action.type) {
        case SET_LOCATION_VALUE:
            return {
                ...state,
                value: action.value
            };
        case ADD_LOCATION:
            return {
                ...state,
                locations: [...state.locations, action.value]
            };
        case REMOVE_LOCATION:
            return {
                ...state,
                locations: state.locations.filter((l) => (l !== action.value))
            };
        case FETCH_LOCATION_SUGGESTIONS_SUCCESS:
            return {
                ...state,
                suggestions: action.response
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

function* getLocationSuggestions(action) {
    try {
        const response = yield call(fetchLocationSuggestions, action.value);
        yield put({ type: FETCH_LOCATION_SUGGESTIONS_SUCCESS, response });
    } catch (e) {
        if (e instanceof ApiError) {
            yield put({ type: FETCH_LOCATION_SUGGESTIONS_FAILURE, error: e });
        } else {
            throw e;
        }
    }
}

export const locationSaga = function* saga() {
    yield takeLatest(FETCH_LOCATION_SUGGESTIONS, getLocationSuggestions);
};
