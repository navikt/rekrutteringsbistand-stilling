import { put, takeLatest, select } from 'redux-saga/effects';
import { ApiError, fetchGet, fetchPut } from '../api/api';
import { lookUpStyrk } from './categorize/styrk/styrkReducer';
import { AD_API } from '../fasitProperties';
import AdminStatusEnum from './administration/AdminStatusEnum';
import { lookUpPostalCodes } from './edit/postalCode/postalCodeReducer';
import { hasExcludingWordsInTitle } from './preview/markWords';

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

export const SHOW_AD_FORM = 'SHOW_AD_FORM';
export const HIDE_AD_FORM = 'HIDE_AD_FORM';
export const DISCARD_AD_CHANGES = 'DISCARD_AD_CHANGES';
export const SET_AD_TITLE = 'SET_AD_TITLE';

const query = '?administrationStatus=RECEIVED&size=1';

const initialState = {
    shouldShowAdForm: false,
    data: undefined,
    error: undefined,
    isSavingAd: false,
    isFetchingStilling: false,
    validation: {
        title: undefined
    }
};

function validateTitle(title, employer) {
    return hasExcludingWordsInTitle(title, employer) ? 'Tittel inneholder ord som ikke er tillatt' : undefined;
}

function validateLocation(location) {
    if (location === null || location === undefined ||
        location.postalCode === null || location.postalCode === undefined) {
        return 'Postnummer mangler';
    }
    return undefined;
}


function validateAll(data) {
    return {
        title: validateTitle(data.title, data.properties.employer),
        location: validateLocation(data.location)
    };
}

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
                originalData: { ...action.response },
                isFetchingStilling: false,
                shouldShowAdForm: false,
                validation: validateAll(action.response)
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
                originalData: { ...action.response },
                isSavingAd: false,
                shouldShowAdForm: false
            };
        case SAVE_AD_FAILURE:
            return {
                ...state,
                isSavingAd: false,
                error: action.error
            };
        case SHOW_AD_FORM:
            return {
                ...state,
                shouldShowAdForm: true
            };
        case HIDE_AD_FORM:
            return {
                ...state,
                shouldShowAdForm: false
            };
        case DISCARD_AD_CHANGES:
            return {
                ...state,
                data: { ...state.originalData },
                validation: validateAll(state.originalData),
                shouldShowAdForm: false
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
        case SET_AD_TITLE: {
            return {
                ...state,
                data: {
                    ...state.data,
                    title: action.title
                },
                validation: {
                    ...state.validation,
                    title: validateTitle(action.title, state.data.properties.employer)
                }
            };
        }
        case SET_LOCATION_POSTAL_CODE:
            const found = lookUpPostalCodes(action.postalCode);
            if (found) {
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
                    },
                    validation: {
                        ...state.validation,
                        location: undefined
                    }
                };
            }
            return {
                ...state,
                data: {
                    ...state.data,
                    location: {
                        ...state.data.location,
                        city: null,
                        county: null,
                        municipal: null,
                        municipalCode: null,
                        postalCode: action.postalCode
                    }
                },
                validation: {
                    ...state.validation,
                    location: 'Ugyldig postnummer'
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
        const response = yield fetchGet(`${AD_API}ads/${query}`);
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
        yield put({ type: SET_ADMIN_STATUS, status });
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
    yield takeLatest(SAVE_AD, saveAd);
};
