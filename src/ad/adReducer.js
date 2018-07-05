import { call, put, takeLatest, select } from 'redux-saga/effects';
import { fetchStilling, ApiError } from '../api/api';
import { lookUpStyrk } from "../processing/styrk/styrkReducer";

export const FETCH_STILLING_BEGIN = 'FETCH_STILLING_BEGIN';
export const FETCH_STILLING_SUCCESS = 'FETCH_STILLING_SUCCESS';
export const FETCH_STILLING_FAILURE = 'FETCH_STILLING_FAILURE';
export const SET_COMMENT = 'SET_COMMENT';
export const ADD_STYRK = 'ADD_STYRK';
export const REMOVE_STYRK = 'REMOVE_STYRK';

const initialState = {
    stilling: undefined,
    error: undefined
};

export default function stillingReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_STILLING_BEGIN:
            return {
                ...state,
                stilling: undefined,
                isFetchingStilling: true,
                error: undefined
            };
        case FETCH_STILLING_SUCCESS:
            return {
                ...state,
                stilling: action.response,
                isFetchingStilling: false
            };
        case FETCH_STILLING_FAILURE:
            return {
                ...state,
                error: action.error,
                isFetchingStilling: false
            };
        case SET_COMMENT: {
            return {
                ...state,
                stilling: {
                    ...state.stilling,
                    comment: action.comment
                }
            };
        }
        case ADD_STYRK:
            if (state.stilling.categoryList.find(s => (s.code === action.code))) {
                return state;
            }
            return {
                ...state,
                stilling: {
                    ...state.stilling,
                    categoryList: [...state.stilling.categoryList, lookUpStyrk(action.code)]
                }
            };
        case REMOVE_STYRK:
            return {
                ...state,
                stilling: {
                    ...state.stilling,
                    categoryList: state.stilling.categoryList.filter((c) => (c.code !== action.code))
                }
            };
        default:
            return state;
    }
}

function* getStilling(action) {
    try {
        const response = yield call(fetchStilling, action.uuid);
        yield put({ type: FETCH_STILLING_SUCCESS, response });
    } catch (e) {
        if (e instanceof ApiError) {
            yield put({ type: FETCH_STILLING_FAILURE, error: e });
        } else {
            throw e;
        }
    }
}

export const adSaga = function* saga() {
    yield takeLatest(FETCH_STILLING_BEGIN, getStilling);
};
