import { call, put, takeLatest } from 'redux-saga/effects';
import { fetchStyrkSuggestions, ApiError } from '../../api/api';

export const SET_STYRK_VALUE = 'SET_STYRK_VALUE';
export const ADD_STYRK = 'ADD_STYRK';
export const REMOVE_STYRK = 'REMOVE_STYRK';
export const FETCH_STYRK_SUGGESTIONS = 'FETCH_STYRK_SUGGESTIONS';
export const FETCH_STYRK_SUGGESTIONS_SUCCESS = 'FETCH_STYRK_SUGGESTIONS_SUCCESS';
export const FETCH_STYRK_SUGGESTIONS_FAILURE = 'FETCH_STYRK_SUGGESTIONS_FAILURE';

const initialState = {
    suggestions: [],
    value: '',
    styrkList: []
};

export default function styrkReducer(state = initialState, action) {
    switch (action.type) {
        case SET_STYRK_VALUE:
            return {
                ...state,
                value: action.value
            };
        case ADD_STYRK:
            return {
                ...state,
                styrkList: [...state.styrkList, action.value]
            };
        case REMOVE_STYRK:
            return {
                ...state,
                styrkList: state.styrkList.filter((l) => (l !== action.value))
            };
        case FETCH_STYRK_SUGGESTIONS_SUCCESS:
            return {
                ...state,
                suggestions: action.response
            };
        case FETCH_STYRK_SUGGESTIONS_FAILURE:
            return {
                ...state,
                suggestions: []
            };
        default:
            return state;
    }
}

function* getStyrkSuggestions(action) {
    try {
        const response = yield call(fetchStyrkSuggestions, action.value);
        yield put({ type: FETCH_STYRK_SUGGESTIONS_SUCCESS, response });
    } catch (e) {
        if (e instanceof ApiError) {
            yield put({ type: FETCH_STYRK_SUGGESTIONS_FAILURE, error: e });
        } else {
            throw e;
        }
    }
}

export const styrkSaga = function* saga() {
    yield takeLatest(FETCH_STYRK_SUGGESTIONS, getStyrkSuggestions);
};
