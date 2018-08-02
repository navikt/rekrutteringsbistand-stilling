import { put, takeLatest, select } from 'redux-saga/effects';
import { ApiError, fetchGet, fetchPut } from '../api/api';
import { lookUpStyrk } from './categorize/styrk/styrkReducer';
import { AD_API } from '../fasitProperties';
import AdminStatusEnum from './administration/AdminStatusEnum';
import { lookUpLocation } from "./preview/location/postalCodeReducer";

export const FETCH_AD = 'FETCH_AD';
export const FETCH_AD_BEGIN = 'FETCH_AD_BEGIN';
export const FETCH_AD_SUCCESS = 'FETCH_AD_SUCCESS';
export const FETCH_AD_FAILURE = 'FETCH_AD_FAILURE';

export const FETCH_NEXT_AD = 'FETCH_NEXT_AD';

export const SAVE_AD = 'FETCH';
export const SAVE_AD_BEGIN = 'SAVE_AD_BEGIN';
export const SAVE_AD_SUCCESS = 'SAVE_AD_SUCCESS';
export const SAVE_AD_FAILURE = 'SAVE_AD_FAILURE';

export const SET_COMMENT = 'SET_COMMENT';
export const ADD_STYRK = 'ADD_STYRK';
export const REMOVE_STYRK = 'REMOVE_STYRK';

export const SET_LOCATION_POSTAL_CODE = 'SET_LOCATION_POSTAL_CODE';
export const SET_LOCATION_ADDRESS = 'SET_LOCATION_ADDRESS';

export const SET_AD_STATUS = 'SET_AD_STATUS';
export const SET_ADMIN_STATUS = 'SET_ADMIN_STATUS';
export const ADD_REMARK = 'ADD_REMARK';
export const REMOVE_REMARK = 'REMOVE_REMARK';

const query = '?administrationStatus=RECEIVED&size=1';

const initialState = {
    data: undefined,
    error: undefined,
    isSavingAd: false,
    isFetchingStilling: false
};

export default function adReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_AD_BEGIN:
            return {
                ...state,
                data: undefined,
                isFetchingStilling: true,
                error: undefined
            };
        case FETCH_AD_SUCCESS:
            return {
                ...state,
                data: action.response,
                isFetchingStilling: false
            };
        case FETCH_AD_FAILURE:
            return {
                ...state,
                error: action.error,
                isFetchingStilling: false
            };
        case SAVE_AD_BEGIN:
            return {
                ...state,
                isSavingAd: true
            };
        case SAVE_AD_SUCCESS:
            return {
                ...state,
                data: action.response,
                isSavingAd: false
            };
        case SAVE_AD_FAILURE:
            return {
                ...state,
                isSavingAd: false,
                error: action.error
            };
        case SET_COMMENT: {
            return {
                ...state,
                data: {
                    ...state.data,
                    administration: {
                        ...state.data.administration,
                        comments: action.comment
                    }
                }
            };
        }
        case ADD_STYRK:
            if (state.data.categoryList.find((s) => (s.code === action.code))) {
                return state;
            }
            return {
                ...state,
                data: {
                    ...state.data,
                    categoryList: [...state.data.categoryList, lookUpStyrk(action.code)]
                }
            };
        case REMOVE_STYRK:
            return {
                ...state,
                data: {
                    ...state.data,
                    categoryList: state.data.categoryList.filter((c) => (c.code !== action.code))
                }
            };
        case SET_LOCATION_POSTAL_CODE:
            const found = lookUpLocation(action.postalCode);
            return {
                ...state,
                data: {
                    ...state.data,
                    location: {
                        ...state.data.location,
                        city: found.city,
                        county: found.county,
                        municipal: found.municipality,
                        municipalCode: found.municipalityCode,
                        postalCode: found.postalCode
                    }
                }
            };
        case SET_LOCATION_ADDRESS:
            return {
                ...state,
                data: {
                    ...state.data,
                    location: {
                        ...state.data.location,
                       address: action.address
                    }
                }
            };
        case SET_AD_STATUS:
            return {
                ...state,
                data: {
                    ...state.data,
                    status: action.status
                }
            };
        case SET_ADMIN_STATUS:
            return {
                ...state,
                data: {
                    ...state.data,
                    administration: {
                        ...state.data.administration,
                        status: action.status,
                        remarks: action.status === AdminStatusEnum.APPROVED ? [] : state.data.administration.remarks
                    }
                }
            };
        case ADD_REMARK:
            return {
                ...state,
                data: {
                    ...state.data,
                    administration: {
                        ...state.data.administration,
                        remarks: [...state.data.administration.remarks, action.remark]
                    }
                }
            };
        case REMOVE_REMARK:
            return {
                ...state,
                data: {
                    ...state.data,
                    administration: {
                        ...state.data.administration,
                        remarks: state.data.administration.remarks.filter((remark) => (remark !== action.remark))
                    }
                }
            };
        default:
            return state;
    }
}

function* getAd(action) {
    yield put({ type: FETCH_AD_BEGIN });
    try {
        let response = yield fetchGet(`${AD_API}ads/${action.uuid}`);
        if (!response.administration) { // TODO: Be backend om at administration dataene alltid er definert
            response = {
                ...response,
                administration: {
                    status: AdminStatusEnum.PENDING,
                    remarks: [],
                    comments: ''
                }
            };
        }
        yield put({ type: FETCH_AD_SUCCESS, response });
    } catch (e) {
        if (e instanceof ApiError) {
            yield put({ type: FETCH_AD_FAILURE, error: e });
        } else {
            throw e;
        }
    }
}

function* getNextAd() {
    yield put({ type: FETCH_AD_BEGIN });
    try {
        let response = yield fetchGet(`${AD_API}ads/${query}`);
        let nextAd = response.content[0];
        if (!nextAd.administration) { // TODO: Be backend om at administration dataene alltid er definert
            nextAd = {
                ...nextAd,
                administration: {
                    status: AdminStatusEnum.PENDING,
                    remarks: [],
                    comments: ''
                }
            };
        }
        yield put({ type: FETCH_AD_SUCCESS, response: nextAd });
        const status = AdminStatusEnum.PENDING;
        yield put({ type: SET_ADMIN_STATUS, status: status });
    } catch (e) {
        if (e instanceof ApiError) {
            yield put({ type: FETCH_AD_FAILURE, error: e });
        } else {
            throw e;
        }
    }
}

function* saveAd() {
    const state = yield select();
    yield put({ type: SAVE_AD_BEGIN });
    try {
        const response = yield fetchPut(`${AD_API}ads/${state.ad.data.uuid}`, state.ad.data);
        yield put({ type: SAVE_AD_SUCCESS, response });
    } catch (e) {
        if (e instanceof ApiError) {
            yield put({ type: SAVE_AD_FAILURE, error: e });
        } else {
            throw e;
        }
    }
}

export const adSaga = function* saga() {
    yield takeLatest(FETCH_AD, getAd);
    yield takeLatest(FETCH_NEXT_AD, getNextAd);
    yield takeLatest(SET_ADMIN_STATUS, saveAd);
};
