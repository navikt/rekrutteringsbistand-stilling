import { put, throttle, select, call } from 'redux-saga/effects';
import { fetchEmployerNameCompletionHits, fetchOrgnrSuggestions } from '../../../api/api';
import { ApiError } from '../../../api/apiUtils';
import {
    CREATE_AD_BEGIN,
    CREATE_AD_SUCCESS,
    FETCH_AD_BEGIN,
    FETCH_AD_SUCCESS,
    SAVE_AD_BEGIN,
    SAVE_AD_SUCCESS,
} from '../../adReducer';
import capitalizeEmployerName from './capitalizeEmployerName';

export const FETCH_EMPLOYER_SUGGESTIONS = 'FETCH_EMPLOYER_SUGGESTIONS';
export const FETCH_EMPLOYER_SUGGESTIONS_SUCCESS = 'FETCH_EMPLOYER_SUGGESTIONS_SUCCESS';
export const FETCH_EMPLOYER_SUGGESTIONS_FAILURE = 'FETCH_EMPLOYER_SUGGESTIONS_FAILURE';
export const SET_EMPLOYER_TYPEAHEAD_VALUE = 'SET_EMPLOYER_TYPEAHEAD_VALUE';

const initialState = {
    suggestions: [],
    typeAheadValue: '',
};

export default function employerReducer(state = initialState, action) {
    switch (action.type) {
        case CREATE_AD_BEGIN:
        case FETCH_AD_BEGIN:
        case SAVE_AD_BEGIN:
            return {
                ...state,
                suggestions: [],
            };
        case CREATE_AD_SUCCESS:
        case SAVE_AD_SUCCESS:
        case FETCH_AD_SUCCESS:
            return {
                ...state,
                typeAheadValue:
                    action.response.employer && action.response.employer.name
                        ? capitalizeEmployerName(action.response.employer.name)
                        : '',
            };
        case FETCH_EMPLOYER_SUGGESTIONS_SUCCESS:
            return {
                ...state,
                suggestions: action.suggestions,
            };
        case FETCH_EMPLOYER_SUGGESTIONS_FAILURE:
            return {
                ...state,
                suggestions: [],
            };
        case SET_EMPLOYER_TYPEAHEAD_VALUE:
            return {
                ...state,
                typeAheadValue: action.value,
            };
        default:
            return state;
    }
}

const getTypeAheadValue = (state) => state.employer.typeAheadValue;

function* getEmployerSuggestions() {
    const value = yield select(getTypeAheadValue);
    if (value.length > 2) {
        try {
            let response;
            // If only numbers and whitespace (and not solely whitespace), search for orgnr
            if (value.match(/^\s*[0-9][0-9\s]*$/) !== null) {
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
    yield throttle(500, FETCH_EMPLOYER_SUGGESTIONS, getEmployerSuggestions);
};
