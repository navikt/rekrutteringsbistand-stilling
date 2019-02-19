import { put, select, takeLatest } from 'redux-saga/effects';
import { ApiError, fetchAds } from '../api/api';
import { getReportee } from '../reportee/reporteeReducer';

export const FETCH_MY_ADS = 'FETCH_MY_ADS';
export const FETCH_MY_ADS_BEGIN = 'FETCH_MY_ADS_BEGIN';
export const FETCH_MY_ADS_SUCCESS = 'FETCH_MY_ADS_SUCCESS';
export const FETCH_MY_ADS_FAILURE = 'FETCH_MY_ADS_FAILURE';
export const CHANGE_MY_ADS_PAGE = 'CHANGE_MY_ADS_PAGE';
export const RESET_MY_ADS_PAGE = 'RESET_MY_ADS_PAGE';
export const CHANGE_STATUS_FILTER = 'CHANGE_STATUS_FILTER';

const INACTIVE = 'INACTIVE';
const EXPIRED = 'EXPIRED';
const DONE = 'DONE';

const initialState = {
    items: [],
    error: undefined,
    isSearching: false,
    totalElements: 0,
    totalPages: 0,
    page: 0,
    source: 'DIR',
    status: undefined,
    reportee: ''
};

export default function myAdsReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_MY_ADS_BEGIN:
            return {
                ...state,
                isSearching: true,
                error: undefined
            };
        case FETCH_MY_ADS_SUCCESS:
            return {
                ...state,
                items: action.response.content,
                isSearching: false,
                totalElements: action.response.totalElements,
                totalPages: action.response.totalPages
            };
        case FETCH_MY_ADS_FAILURE:
            return {
                ...state,
                error: action.error,
                isSearching: false
            };
        case CHANGE_STATUS_FILTER:
            return {
                ...state,
                status: action.status,
                deactivatedByExpiry: action.deactivatedByExpiry
            };
        case CHANGE_MY_ADS_PAGE:
            return {
                ...state,
                page: action.page
            };
        case RESET_MY_ADS_PAGE:
            return {
                ...state,
                page: 0
            };
        default:
            return state;
    }
}


function combineStatusQuery(status) {
    if (status === undefined) {
        return {
            status: '!REJECTED,DELETED'
        };
    }
    return { status };
}

export function toQuery(search) {
    const {
        reportee, status, page, source, deactivatedByExpiry
    } = search;

    const query = {
        sort: 'updated,desc',
        page,
        source,
        reportee,
        deactivatedByExpiry,
        ...combineStatusQuery(status)
    };

    return query;
}

function* getMyAds(action) {
    try {
        if (action.type !== CHANGE_MY_ADS_PAGE) {
            yield put({ type: RESET_MY_ADS_PAGE });
        }
        yield put({ type: FETCH_MY_ADS_BEGIN });
        const reportee = yield getReportee();

        const state = yield select();

        let search = {...state.myAds,
            reportee: reportee.displayName
        };

        const query = toQuery(search);
        const response = yield fetchAds(query);
        yield put({ type: FETCH_MY_ADS_SUCCESS, response });
    } catch (e) {
        if (e instanceof ApiError) {
            yield put({ type: FETCH_MY_ADS_FAILURE, error: e });
        } else {
            throw e;
        }
    }
}


export const myAdsSaga = function* saga() {
    yield takeLatest([
        CHANGE_STATUS_FILTER,
        CHANGE_MY_ADS_PAGE,
        FETCH_MY_ADS
    ], getMyAds);
};
