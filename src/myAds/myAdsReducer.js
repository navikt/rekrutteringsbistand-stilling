import { put, select, takeLatest } from 'redux-saga/effects';
import { ApiError, fetchMyAds, fetchRecruitmentsForVeileder } from '../api/api';
import { getReportee } from '../reportee/reporteeReducer';
import AdStatusEnum from '../common/enums/AdStatusEnum';

export const FETCH_MY_ADS = 'FETCH_MY_ADS';
export const FETCH_MY_ADS_BEGIN = 'FETCH_MY_ADS_BEGIN';
export const FETCH_MY_ADS_SUCCESS = 'FETCH_MY_ADS_SUCCESS';
export const FETCH_MY_ADS_FAILURE = 'FETCH_MY_ADS_FAILURE';
export const CHANGE_MY_ADS_PAGE = 'CHANGE_MY_ADS_PAGE';
export const RESET_MY_ADS_PAGE = 'RESET_MY_ADS_PAGE';
export const CHANGE_MY_ADS_STATUS_FILTER = 'CHANGE_MY_ADS_STATUS_FILTER';
export const CHANGE_MY_ADS_DEACTIVATED_FILTER = 'CHANGE_MY_ADS_DEACTIVATED_FILTER';
export const CHANGE_MY_ADS_SORTING = 'CHANGE_MY_ADS_SORTING';

const FALLBACK_STATUS = '!REJECTED,DELETED';

const initialState = {
    items: [],
    error: undefined,
    isSearching: false,
    totalElements: 0,
    totalPages: 0,
    page: 0,
    source: 'DIR',
    reportee: '',
    sortField: 'updated',
    sortDir: 'desc',
    filter: {
        status: [AdStatusEnum.ACTIVE, AdStatusEnum.INACTIVE],
    },
    deactivatedByExpiry: false,
};

export default function myAdsReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_MY_ADS_BEGIN:
            return {
                ...state,
                isSearching: true,
                error: undefined,
            };
        case FETCH_MY_ADS_SUCCESS:
            return {
                ...state,
                items: action.response.content,
                isSearching: false,
                totalElements: action.response.totalElements,
                totalPages: action.response.totalPages,
            };
        case FETCH_MY_ADS_FAILURE:
            return {
                ...state,
                error: action.error,
                isSearching: false,
            };
        case CHANGE_MY_ADS_STATUS_FILTER:
            const deactivatedByExpiry =
                action.status.length > 0 ? false : state.deactivatedByExpiry;

            return {
                ...state,
                filter: {
                    status: action.status,
                },
                deactivatedByExpiry,
            };
        case CHANGE_MY_ADS_DEACTIVATED_FILTER:
            const status = action.deactivatedByExpiry ? [] : state.filter.status;

            return {
                ...state,
                filter: {
                    status,
                },
                deactivatedByExpiry: action.deactivatedByExpiry,
            };
        case CHANGE_MY_ADS_PAGE:
            return {
                ...state,
                page: action.page,
            };
        case RESET_MY_ADS_PAGE:
            return {
                ...state,
                page: 0,
            };
        case CHANGE_MY_ADS_SORTING:
            return {
                ...state,
                page: 0,
                sortField: action.field,
                sortDir: action.dir,
            };
        default:
            return state;
    }
}

export function toQuery(search) {
    const { reportee, filter, page, deactivatedByExpiry, sortField, sortDir, uuid } = search;
    const { status } = filter;

    const query = {
        sort: `${sortField},${sortDir}`,
        page,
        reportee,
        deactivatedByExpiry,
        uuid,
        // Hvis ingen annen status er valgt, utelat avviste og slettede stillinger
        status: status.length === 0 ? FALLBACK_STATUS : status,
    };

    return query;
}

function* getMyAds() {
    try {
        yield put({ type: FETCH_MY_ADS_BEGIN });
        const reportee = yield getReportee();

        const state = yield select();

        const recruitmentResponse = yield fetchRecruitmentsForVeileder(reportee.navIdent);

        const stillingsids = recruitmentResponse.map(r => r.stillingsid).join(',');

        const search = {
            ...state.myAds,
            reportee: reportee.displayName,
            uuid: stillingsids,
        };

        const query = toQuery(search);
        const response = yield fetchMyAds(query);

        yield put({ type: FETCH_MY_ADS_SUCCESS, response });
    } catch (e) {
        if (e instanceof ApiError) {
            yield put({ type: FETCH_MY_ADS_FAILURE, error: e });
        } else {
            throw e;
        }
    }
}

function* resetMyAdsPage() {
    yield put({ type: RESET_MY_ADS_PAGE });
}

export const myAdsSaga = function* saga() {
    yield takeLatest(
        [
            CHANGE_MY_ADS_STATUS_FILTER,
            CHANGE_MY_ADS_DEACTIVATED_FILTER,
            CHANGE_MY_ADS_PAGE,
            FETCH_MY_ADS,
            CHANGE_MY_ADS_SORTING,
        ],
        getMyAds
    );
    yield takeLatest([CHANGE_MY_ADS_STATUS_FILTER, CHANGE_MY_ADS_SORTING], resetMyAdsPage);
};
