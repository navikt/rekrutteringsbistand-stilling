import { call, put, select, takeLatest, takeEvery, throttle } from 'redux-saga/effects';
import AdminStatusEnum from '../ad/administration/adminStatus/AdminStatusEnum';
import AdStatusEnum from '../ad/administration/adStatus/AdStatusEnum';
import { ApiError, fetchAds, fetchPut } from '../api/api';
import { AD_API } from '../fasitProperties';
import { getReportee } from '../reportee/reporteeReducer';

export const FETCH_ADS = 'FETCH_ADS';
export const FETCH_ADS_BEGIN = 'FETCH_ADS_BEGIN';
export const FETCH_ADS_SUCCESS = 'FETCH_ADS_SUCCESS';
export const FETCH_ADS_FAILURE = 'FETCH_ADS_FAILURE';
export const CHANGE_SORTING = 'CHANGE_SORTING';
export const CHANGE_PAGE = 'CHANGE_PAGE';
export const RESET_PAGE = 'RESET_PAGE';
export const SET_SEARCH_VALUE = 'SET_SEARCH_VALUE';
export const SET_SEARCH_FIELD = 'SET_SEARCH_FIELD';
export const CHANGE_SOURCE_FILTER = 'CHANGE_SOURCE_FILTER';
export const CHANGE_STATUS_FILTER = 'CHANGE_STATUS_FILTER';
export const CHANGE_ADMINISTRATION_STATUS_FILTER = 'CHANGE_ADMINISTRATION_STATUS_FILTER';
export const CHANGE_REPORTEE_FILTER = 'CHANGE_REPORTEE_FILTER';
export const SET_REPORTEE_VALUE = 'SET_REPORTEE_VALUE';
export const RESET_SEARCH = 'RESET_SEARCH';

export const ASSIGN_TO_ME_SEARCH_RESULT_ITEM = 'ASSIGN_TO_ME_SEARCH_RESULT_ITEM';
export const ASSIGN_TO_ME_SEARCH_RESULT_ITEM_BEGIN = 'ASSIGN_TO_ME_SEARCH_RESULT_ITEM_BEGIN';
export const ASSIGN_TO_ME_SEARCH_RESULT_ITEM_SUCCESS = 'ASSIGN_TO_ME_SEARCH_RESULT_ITEM_SUCCESS';
export const ASSIGN_TO_ME_SEARCH_RESULT_ITEM_FAILURE = 'ASSIGN_TO_ME_SEARCH_RESULT_ITEM_FAILURE';
export const UN_ASSIGN_SEARCH_RESULT_ITEM = 'UN_ASSIGN_SEARCH_RESULT_ITEM';
export const UN_ASSIGN_SEARCH_RESULT_ITEM_BEGIN = 'UN_ASSIGN_SEARCH_RESULT_ITEM_BEGIN';
export const UN_ASSIGN_SEARCH_RESULT_ITEM_SUCCESS = 'UN_ASSIGN_SEARCH_RESULT_ITEM_SUCCESS';
export const UN_ASSIGN_SEARCH_RESULT_ITEM_FAILURE = 'UN_ASSIGN_SEARCH_RESULT_ITEM_FAILURE';

export const Fields = {
    EMPLOYER_NAME: 'employerName',
    TITLE: 'title',
    ID: 'id'
};

const initialState = {
    items: [],
    error: undefined,
    isSearching: false,
    sortField: 'created',
    sortDir: 'asc',
    totalElements: 0,
    totalPages: 0,
    page: 0,
    value: '',
    field: undefined,
    suggestions: [],
    source: undefined,
    status: AdStatusEnum.INACTIVE,
    administrationStatus: AdminStatusEnum.RECEIVED,
    reportee: 'all',
    reporteeValue: '',
    adsBeingSaved: []
};

export default function searchReducer(state = initialState, action) {
    switch (action.type) {
        case SET_SEARCH_VALUE: {
            // only allow spaces and numbers for search on 'stillingsnummer'
            const isNumbersOnly = action.value.match(/^[ 0-9]+$/) !== null;
            const suggestions = [];
            if (action.value.length > 0) {
                suggestions.push({ label: `Søk på "${action.value}" i arbeidsgiver`, value: Fields.EMPLOYER_NAME });
                suggestions.push({ label: `Søk på "${action.value}" i annonseoverskrift`, value: Fields.TITLE });
                if (isNumbersOnly) {
                    suggestions.push({ label: `Søk på "${action.value}" i stillingsnummer`, value: Fields.ID });
                }
            }
            return {
                ...state,
                value: action.value,
                suggestions
            };
        }
        case RESET_SEARCH:
            return initialState;
        case SET_SEARCH_FIELD:
            return {
                ...state,
                field: action.field
            };
        case CHANGE_SOURCE_FILTER:
            return {
                ...state,
                source: action.value
            };
        case CHANGE_STATUS_FILTER:
            return {
                ...state,
                status: action.value
            };
        case CHANGE_ADMINISTRATION_STATUS_FILTER:
            return {
                ...state,
                administrationStatus: action.value
            };
        case CHANGE_REPORTEE_FILTER:
            return {
                ...state,
                reportee: action.value
            };
        case SET_REPORTEE_VALUE:
            return {
                ...state,
                reporteeValue: action.value
            };
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
        case CHANGE_SORTING:
            return {
                ...state,
                sortField: action.field,
                sortDir: action.dir
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
        case ASSIGN_TO_ME_SEARCH_RESULT_ITEM_BEGIN:
        case UN_ASSIGN_SEARCH_RESULT_ITEM_BEGIN:
            return {
                ...state,
                adsBeingSaved: [...state.adsBeingSaved, action.uuid]
            };
        case ASSIGN_TO_ME_SEARCH_RESULT_ITEM_SUCCESS:
        case UN_ASSIGN_SEARCH_RESULT_ITEM_SUCCESS:
            return {
                ...state,
                adsBeingSaved: state.adsBeingSaved.filter((uuid) => (uuid !== action.ad.uuid)),
                items: state.items.map((item) => {
                    if (item.uuid === action.ad.uuid) {
                        return action.ad;
                    }
                    return item;
                })
            };
        case ASSIGN_TO_ME_SEARCH_RESULT_ITEM_FAILURE:
        case UN_ASSIGN_SEARCH_RESULT_ITEM_FAILURE:
            return {
                ...state,
                adsBeingSaved: state.adsBeingSaved.filter((uuid) => (uuid !== action.uuid)),
                error: action.error
            };
        default:
            return state;
    }
}

export function toQuery(search) {
    const {
        sortField, sortDir, page, source, status, administrationStatus, reportee
    } = search;
    const query = {
        source,
        status,
        sort: `${sortField},${sortDir}`,
        page,
        administrationStatus,
        reportee
    };
    query[search.field] = search.value;
    return query;
}

function* getAds(action) {
    try {
        if (action.type !== CHANGE_PAGE) {
            yield put({ type: RESET_PAGE });
        }
        yield put({ type: FETCH_ADS_BEGIN });

        let state = yield select();
        if (state.search.reportee === 'mine') {
            const reportee = yield call(getReportee);
            state = {
                ...state,
                search: {
                    ...state.search,
                    reportee: reportee.displayName
                }
            };
        } else if (state.search.reportee === 'all') {
            state = {
                ...state,
                search: {
                    ...state.search,
                    reportee: undefined
                }
            };
        } else if (state.search.reportee === 'define') {
            state = {
                ...state,
                search: {
                    ...state.search,
                    reportee: state.search.reporteeValue
                }
            };
        }


        const query = toQuery(state.search);
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

function* assignToMe(action) {
    try {
        yield put({ type: ASSIGN_TO_ME_SEARCH_RESULT_ITEM_BEGIN, uuid: action.ad.uuid });
        const reportee = yield getReportee();
        const ad = {
            ...action.ad,
            administration: {
                ...action.ad.administration,
                reportee: reportee.displayName,
                status: AdminStatusEnum.PENDING
            }
        };
        const response = yield fetchPut(`${AD_API}ads/${action.ad.uuid}`, ad);
        yield put({ type: ASSIGN_TO_ME_SEARCH_RESULT_ITEM_SUCCESS, ad: response });
    } catch (e) {
        if (e instanceof ApiError) {
            yield put({ type: ASSIGN_TO_ME_SEARCH_RESULT_ITEM_FAILURE, uuid: action.ad.uuid, error: e });
        } else {
            throw e;
        }
    }
}

function* unAssign(action) {
    try {
        yield put({ type: UN_ASSIGN_SEARCH_RESULT_ITEM_BEGIN, uuid: action.ad.uuid });
        const ad = {
            ...action.ad,
            administration: {
                ...action.ad.administration,
                reportee: '',
                status: AdminStatusEnum.RECEIVED
            }
        };
        const response = yield fetchPut(`${AD_API}ads/${action.ad.uuid}`, ad);
        yield put({ type: UN_ASSIGN_SEARCH_RESULT_ITEM_SUCCESS, ad: response });
    } catch (e) {
        if (e instanceof ApiError) {
            yield put({ type: UN_ASSIGN_SEARCH_RESULT_ITEM_FAILURE, uuid: action.ad.uuid, error: e });
        } else {
            throw e;
        }
    }
}

function* changeReporteeFilter(action) {
    if (action.value === 'define') {
        yield put({ type: SET_REPORTEE_VALUE, value: '' });
    } else {
        yield getAds(action);
    }
}


export const searchSaga = function* saga() {
    yield takeLatest([
        RESET_SEARCH,
        CHANGE_SOURCE_FILTER,
        CHANGE_STATUS_FILTER,
        CHANGE_ADMINISTRATION_STATUS_FILTER,
        SET_SEARCH_FIELD,
        CHANGE_SORTING,
        CHANGE_PAGE,
        FETCH_ADS
    ], getAds);
    yield takeLatest([
        CHANGE_REPORTEE_FILTER
    ], changeReporteeFilter);
    yield takeEvery(ASSIGN_TO_ME_SEARCH_RESULT_ITEM, assignToMe);
    yield takeEvery(UN_ASSIGN_SEARCH_RESULT_ITEM, unAssign);
};
