import { call, put, takeLatest } from 'redux-saga/effects';
import { fetchStyrk, ApiError } from '../../api/api';

export const SET_STYRK_TYPEAHEAD_VALUE = 'SET_STYRK_TYPEAHEAD_VALUE';
export const FETCH_STYRK = 'FETCH_STYRK';
export const FETCH_STYRK_SUCCESS = 'FETCH_STYRK_SUCCESS';
export const FETCH_STYRK_FAILURE = 'FETCH_STYRK_FAILURE';
export const EXPAND_STYRK_BRANCH = 'EXPAND_STYRK_BRANCH';
export const COLLAPSE_STYRK_BRANCH = 'COLLAPSE_STYRK_BRANCH';
export const TOGGLE_STYRK_MODAL = 'TOGGLE_STYRK_MODAL';

export let cachedStyrk = undefined;
let cachedFlatStyrk = [];

const initialState = {
    typeAheadSuggestions: [],
    typeAheadValue: '',
    addedStyrkItems: [],
    styrkThree: [],
    showStyrkModal: false
};

export default function styrkReducer(state = initialState, action) {
    switch (action.type) {
        case SET_STYRK_TYPEAHEAD_VALUE:
            return {
                ...state,
                typeAheadValue: action.value,
                typeAheadSuggestions: action.value.length > 2 ? filterSiblings(cachedFlatStyrk, action.value).map((styrk) => ({
                    value: styrk.code,
                    label: `${styrk.code}: ${styrk.name}`
                })) : []
            };
        case FETCH_STYRK_SUCCESS:
            return {
                ...state,
                styrkThree: action.response
            };
        case FETCH_STYRK_FAILURE:
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

function mapStyrkThree(categories, parentId = null) {
    return categories.filter(category => (category.parentId === parentId)).map((c) => {
        const children = mapStyrkThree(categories, c.id);
        if (children.length > 0) {
            return {
                ...c,
                expanded: false,
                children
            }
        }
        return {
            ...c,
            expanded: false
        }
    });
}

function collapse(categories, code) {
    return categories.map((category) => {
        if (code.startsWith(category.code)) {
            return {
                ...category,
                expanded: !category.code.startsWith(code),
                children: category.children ? collapse(category.children, code) : undefined
            }
        }
        return category;
    })
}

function expand(categories, code) {
    return categories.map((category) => {
        if (code.startsWith(category.code)) {
            return {
                ...category,
                expanded: category.children && code.startsWith(category.code),
                children: category.children ? expand(category.children, code) : undefined
            }
        }
        return category;
    })
}

function filterSiblings(categories, value) {
    return categories.filter((s =>
        s.code.length >= 6 && (
            s.name.toLowerCase().indexOf(value.toLowerCase()) !== -1 ||
            s.code.startsWith(value) ||
            s.code.split('.').join('').startsWith(value)
        )
    ));
}

export function lookUpStyrk(code, levels = cachedStyrk) {
    let found = undefined;
    for (let i = 0; i < levels.length && !found; i++) {
        const level = levels[i];
        if (code.startsWith(level.code) && level.children) {
            found = lookUpStyrk(code, level.children)
        } else if (code.startsWith(level.code) && !level.children) {
            found = level
        }
    }
    return found;
}

function* getStyrk() {
    if (!cachedStyrk) {
        try {
            const response = yield call(fetchStyrk);
            cachedFlatStyrk = response;
            cachedStyrk = mapStyrkThree(response);
            yield put({ type: FETCH_STYRK_SUCCESS, response: cachedStyrk });
        } catch (e) {
            if (e instanceof ApiError) {
                yield put({ type: FETCH_STYRK_FAILURE, error: e });
            } else {
                throw e;
            }
        }
    }
}

export const styrkSaga = function* saga() {
    yield takeLatest(FETCH_STYRK, getStyrk);
};
