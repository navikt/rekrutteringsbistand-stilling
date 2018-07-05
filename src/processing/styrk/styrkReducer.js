import { call, put, takeLatest } from 'redux-saga/effects';
import { fetchStyrkSuggestions, ApiError } from '../../api/api';

import styrk from '../../api/styrk';
const styrkThree = styrk.filter(f => (f.level === '1')).map((m) => ({
    ...m,
    expanded: false,
    children: styrk.filter(f1 => (f1.parentCode === m.code)).map((m1) => ({
        ...m1,
        expanded: false,
        children: styrk.filter(f2 => (f2.parentCode === m1.code)).map((m2) => ({
            ...m2,
            expanded: false,
            children: styrk.filter(f3 => (f3.parentCode === m2.code)).map((m3) => ({
                ...m3
            }))
        }))
    }))
}));

export const SET_STYRK_TYPEAHEAD_VALUE = 'SET_STYRK_TYPEAHEAD_VALUE';
export const ADD_STYRK = 'ADD_STYRK';
export const REMOVE_STYRK = 'REMOVE_STYRK';
export const FETCH_STYRK_SUGGESTIONS = 'FETCH_STYRK_SUGGESTIONS';
export const FETCH_STYRK_SUGGESTIONS_SUCCESS = 'FETCH_STYRK_SUGGESTIONS_SUCCESS';
export const FETCH_STYRK_SUGGESTIONS_FAILURE = 'FETCH_STYRK_SUGGESTIONS_FAILURE';
export const EXPAND_STYRK_BRANCH = 'EXPAND_STYRK_BRANCH';
export const COLLAPSE_STYRK_BRANCH = 'COLLAPSE_STYRK_BRANCH';
export const TOGGLE_STYRK_MODAL = 'TOGGLE_STYRK_MODAL';

const initialState = {
    typeAheadSuggestions: [],
    typeAheadValue: '',
    addedStyrkItems: [],
    styrkThree: [...styrkThree],
    showStyrkModal: false
};

export default function styrkReducer(state = initialState, action) {
    switch (action.type) {
        case SET_STYRK_TYPEAHEAD_VALUE:
            return {
                ...state,
                typeAheadValue: action.value
            };
        case ADD_STYRK:
            if (state.addedStyrkItems.find(s => (s.code === action.code))) {
                return {
                    ...state,
                    showStyrkModal: false
                }
            }
            return {
                ...state,
                addedStyrkItems: [...state.addedStyrkItems, lookUp(state.styrkThree, action.code)],
                showStyrkModal: false
            };
        case REMOVE_STYRK:
            return {
                ...state,
                addedStyrkItems: state.addedStyrkItems.filter((added) => (added.code !== action.code))
            };
        case FETCH_STYRK_SUGGESTIONS_SUCCESS:
            return {
                ...state,
                typeAheadSuggestions: action.response.map((styrk) => ({
                    value: styrk.code,
                    label: `${styrk.code}: ${styrk.name}`
                }))
            };
        case FETCH_STYRK_SUGGESTIONS_FAILURE:
            return {
                ...state,
                typeAheadSuggestions: []
            };
        case EXPAND_STYRK_BRANCH:
            return {
                ...state,
                styrkThree: expand(state.styrkThree, action.code)
            };
        case COLLAPSE_STYRK_BRANCH:
            return {
                ...state,
                styrkThree: collapse(state.styrkThree, action.code)
            };
        case TOGGLE_STYRK_MODAL:
            return {
                ...state,
                showStyrkModal: !state.showStyrkModal
            };
        default:
            return state;
    }
}

function collapse(levels, code) {
    return levels.map((level) => {
        if (code.startsWith(level.code)) {
            return {
                ...level,
                expanded: !level.code.startsWith(code),
                children: level.children ? collapse(level.children, code) : undefined
            }
        }
        return level;
    })
}

function expand(levels, code) {
    return levels.map((level) => {
        if (code.startsWith(level.code)) {
            return {
                ...level,
                expanded: level.children && code.startsWith(level.code),
                children: level.children ? expand(level.children, code) : undefined
            }
        }
        return level;
    })
}

function lookUp(levels, code) {
    let found = undefined;
    for(let i = 0; i < levels.length && !found; i++) {
        const level = levels[i];
        if (code.startsWith(level.code) && level.children) {
            found = lookUp(level.children, code)
        } else if (code.startsWith(level.code) && !level.children) {
            found = level
        }
    }
    return found;
}

function* getStyrkSuggestions(action) {
    try {
        if(action.value && action.value.length > 0) {
            const response = yield call(fetchStyrkSuggestions, action.value);
            yield put({ type: FETCH_STYRK_SUGGESTIONS_SUCCESS, response });
        } else {
            yield put({ type: FETCH_STYRK_SUGGESTIONS_SUCCESS, response: [] });
        }
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
