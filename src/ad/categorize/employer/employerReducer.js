import { call, put, takeLatest } from 'redux-saga/effects';
import { fetchEmployerSuggestions, ApiError } from '../../../api/api';

export const SET_EMPLOYER = 'SET_EMPLOYER';
export const FETCH_EMPLOYER_SUGGESTIONS = 'FETCH_EMPLOYER_SUGGESTIONS';
export const FETCH_EMPLOYER_SUGGESTIONS_SUCCESS = 'FETCH_EMPLOYER_SUGGESTIONS_SUCCESS';
export const FETCH_EMPLOYER_SUGGESTIONS_FAILURE = 'FETCH_EMPLOYER_SUGGESTIONS_FAILURE';

const initialState = {
    suggestions: [],
    value: ''
};

export default function employerReducer(state = initialState, action) {
    switch (action.type) {
        case SET_EMPLOYER:
            return {
                ...state,
                value: action.value
            };
        case FETCH_EMPLOYER_SUGGESTIONS_SUCCESS:
            return {
                ...state,
                suggestions: action.response
            };
        case FETCH_EMPLOYER_SUGGESTIONS_FAILURE:
            return {
                ...state,
                suggestions: []
            };
        default:
            return state;
    }
}

function* getEmployerSuggestions(action) {
    try {
        const response = yield call(fetchEmployerSuggestions, action.value);
        yield put({ type: FETCH_EMPLOYER_SUGGESTIONS_SUCCESS, response });
    } catch (e) {
        if (e instanceof ApiError) {
            yield put({ type: FETCH_EMPLOYER_SUGGESTIONS_FAILURE, error: e });
        } else {
            throw e;
        }
    }
}

export const employerSaga = function* saga() {
    yield takeLatest(FETCH_EMPLOYER_SUGGESTIONS, getEmployerSuggestions);
};
