import { put, select, takeLatest } from 'redux-saga/effects';
import { ApiError, fetchAds } from '../api/api';
import {FETCH_REPORTEE} from '../reportee/reporteeReducer';
import { getReportee } from '../reportee/reporteeReducer';

export const FETCH_MY_ADS = 'FETCH_MY_ADS';
export const FETCH_ADS_BEGIN = 'FETCH_ADS_BEGIN';
export const FETCH_ADS_SUCCESS = 'FETCH_ADS_SUCCESS';
export const FETCH_ADS_FAILURE = 'FETCH_ADS_FAILURE';
export const CHANGE_PAGE = 'CHANGE_PAGE';
export const RESET_PAGE = 'RESET_PAGE';
export const CHANGE_STATUS_FILTER = 'CHANGE_STATUS_FILTER';
export const CHANGE_SOURCE_FILTER = 'CHANGE_SOURCE_FILTER';

export const Fields = {
    EMPLOYER_NAME: 'employerName',
    TITLE: 'title',
    ID: 'id'
};

const initialState = {
    items: [],
    error: undefined,
    isSearching: false,
    totalElements: 0,
    totalPages: 0,
    page: 0,
    status: undefined,
    reportee: ''
};

export default function myAdsReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_ADS_BEGIN:
            return {
                ...state,
                isSearching: true,
                error: undefined
            };
        case FETCH_ADS_SUCCESS:
            return {
                ...state,
                items: action.response.content,
                isSearching: false,
                totalElements: action.response.totalElements,
                totalPages: action.response.totalPages
            };
        case FETCH_ADS_FAILURE:
            return {
                ...state,
                error: action.error,
                isSearching: false
            };
        case CHANGE_STATUS_FILTER:
            return {
                ...state,
                status: action.value
            };
        case CHANGE_PAGE:
            return {
                ...state,
                page: action.page
            };
        case RESET_PAGE:
            return {
                ...state,
                page: 0
            };
        default:
            return state;
    }
}

export function toQuery(search) {
    const {
        reportee, status, page,
    } = search;


    return {
        page,
        status,
        reportee
    };
}

function* getMyAds(action) {
    try {
        if (action.type !== CHANGE_PAGE) {
            yield put({ type: RESET_PAGE });
        }
        yield put({ type: FETCH_ADS_BEGIN });
        const reportee = yield getReportee();

        const state = yield select();

        let search = {...state.myAds,
            reportee: reportee.displayName
        };

        const query = toQuery(search);
        const response = yield fetchAds(query);
        yield put({ type: FETCH_ADS_SUCCESS, response });
    } catch (e) {
        if (e instanceof ApiError) {
            yield put({ type: FETCH_ADS_FAILURE, error: e });
        } else {
            throw e;
        }
    }
}


export const myAdsSaga = function* saga() {
    yield takeLatest(FETCH_MY_ADS, getMyAds);
};
