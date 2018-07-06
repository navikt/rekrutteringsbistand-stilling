import { put, takeLatest, select } from 'redux-saga/effects';
import { ApiError, fetchGet, fetchPut } from '../api/api';
import { lookUpStyrk } from './categorize/styrk/styrkReducer';
import { AD_API } from '../fasitProperties';
import AdminStatusEnum from './administration/AdminStatusEnum';

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

export const SET_AD_STATUS = 'SET_AD_STATUS';
export const SET_ADMIN_STATUS = 'SET_ADMIN_STATUS';
export const ADD_REMARK = 'ADD_REMARK';
export const REMOVE_REMARK = 'REMOVE_REMARK';


const uuidList = [
    '0f0fbd81-5096-4c52-9ca8-b0e21ca3147e',
    'ffdf0e08-e647-43a3-8730-28030dba27fd',
    'ded6cc02-492c-4f0b-844d-13d1644dfc66',
    'c1f74ef9-4189-4810-abde-7b4719678e70',
    '0d43163c-eb90-4f72-a654-f611a0ae8d1f',
    'c0242823-e08a-4cc7-a2c1-43b881fd61e6',
    '9d95b63d-537e-4cd3-ab97-9317f0928f89',
    '25a8efe3-a558-4df9-9493-9568755ebfd8',
    '8bdb649e-ff03-4c18-be6f-59b861fbb63c',
    '5d09f77d-4736-441e-b7b9-a5930d55fc60'
];

let uuidIndex = 0;

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

function* getNextAd(action) {
    yield put({ type: FETCH_AD_BEGIN });
    try {
        const uuid = uuidList[uuidIndex];
        uuidIndex += 1;

        let response = yield fetchGet(`${AD_API}ads/${uuid}`);
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
