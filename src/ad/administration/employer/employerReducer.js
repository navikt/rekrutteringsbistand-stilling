import { put, takeLatest, select, call } from 'redux-saga/effects';
import { ApiError, fetchEmployerNameCompletionHits, fetchOrgnrSuggestions } from '../../../api/api';
import { FETCH_AD_BEGIN } from '../../adReducer';

export const FETCH_EMPLOYER_SUGGESTIONS = 'FETCH_EMPLOYER_SUGGESTIONS';
export const FETCH_EMPLOYER_SUGGESTIONS_SUCCESS = 'FETCH_EMPLOYER_SUGGESTIONS_SUCCESS';
export const FETCH_EMPLOYER_SUGGESTIONS_FAILURE = 'FETCH_EMPLOYER_SUGGESTIONS_FAILURE';

const initialState = {
    suggestions: []
};

export default function employerReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_AD_BEGIN:
            return {
                ...state,
                suggestions: []
            };
        case FETCH_EMPLOYER_SUGGESTIONS_SUCCESS:
            return {
                ...state,
                suggestions: action.suggestions
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

const getEmployer = (state) => state.adData.employer;

function* getEmployerSuggestions() {
    const employer = yield select(getEmployer);
    const value = employer && employer.name ? employer.name : '';
    if (value.length > 2) {
        try {
            let response;
            if (value.match(/^[0-9]+$/) !== null) {
                // If only numbers, search for orgnr
                response = yield call(fetchOrgnrSuggestions, value);
            } else {
                response = yield call(fetchEmployerNameCompletionHits, value);
            }

            yield put({ type: FETCH_EMPLOYER_SUGGESTIONS_SUCCESS, suggestions: response.result });
        } catch (e) {
            if (e instanceof ApiError) {
                yield put({ type: FETCH_EMPLOYER_SUGGESTIONS_FAILURE, error: e });
            } else {
                throw e;
            }
        }
    } else {
        yield put({ type: FETCH_EMPLOYER_SUGGESTIONS_SUCCESS, suggestions: [] });
    }
}

export const employerSaga = function* saga() {
    yield takeLatest(FETCH_EMPLOYER_SUGGESTIONS, getEmployerSuggestions);
};
