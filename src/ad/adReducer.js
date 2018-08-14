import { put, takeLatest, select } from 'redux-saga/effects';
import { ApiError, fetchGet, fetchPut } from '../api/api';
import { lookUpStyrk } from './edit/styrk/styrkReducer';
import { AD_API } from '../fasitProperties';
import AdminStatusEnum from './administration/AdminStatusEnum';
import { lookUpPostalCodes } from './edit/postalCode/postalCodeReducer';
import { hasExcludingWordsInTitle } from './preview/markWords';
import { toQuery, toUrl } from "../searchPage/searchReducer";

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

export const SET_EMPLOYMENT_JOBTITLE = 'SET_EMPLOYMENT_JOBTITLE';
export const SET_EMPLOYMENT_LOCATION = 'SET_EMPLOYMENT_LOCATION';
export const SET_EMPLOYMENT_ENGAGEMENTTYPE = 'SET_EMPLOYMENT_ENGAGEMENTTYPE';
export const SET_EMPLOYMENT_EXTENT = 'SET_EMPLOYMENT_EXTENT';
export const SET_EMPLOYMENT_POSITIONCOUNT = 'SET_EMPLOYMENT_POSITIONCOUNT';
export const SET_EMPLOYMENT_SECTOR = 'SET_EMPLOYMENT_SECTOR';
export const SET_EMPLOYMENT_WORKDAY = 'SET_EMPLOYMENT_WORKDAY';
export const SET_EMPLOYMENT_WORKHOURS = 'SET_EMPLOYMENT_WORKHOURS';
export const SET_EMPLOYMENT_JOBARRANGEMENT = 'SET_EMPLOYMENT_JOBARRANGEMENT';
export const SET_EMPLOYMENT_STARTTIME = 'SET_EMPLOYMENT_STARTTIME';

export const SET_APPLICATIONDUE = 'SET_APPLICATIONDUE';
export const SET_APPLICATIONEMAIL = 'SET_APPLICATIONEMAIL';
export const SET_APPLICATIONURL = 'SET_APPLICATIONURL';
export const SET_SOURCEURL = 'SET_SOURCEURL';

export const SET_EMPLOYER = 'SET_EMPLOYER';
export const SET_EMPLOYERDESCRIPTION = 'SET_EMPLOYERDESCRIPTION';

export const SET_PUBLISHED = 'SET_PUBLISHED';
export const SET_LAST_UPDATED = 'SET_LAST_UPDATED';
export const SET_MEDIUM = 'SET_MEDIUM';
export const SET_ID = 'SET_ID';
export const SET_REFERENCE = 'SET_REFERENCE';
export const SET_EXPIRATION_DATE = 'SET_EXPIRATION_DATE';

export const SET_AD_TEXT = 'SET_AD_TEXT';

export const SET_AD_STATUS = 'SET_AD_STATUS';
export const SET_ADMIN_STATUS = 'SET_ADMIN_STATUS';
export const ADD_REMARK = 'ADD_REMARK';
export const REMOVE_REMARK = 'REMOVE_REMARK';

export const EDIT_AD = 'EDIT_AD';
export const DISCARD_AD_CHANGES = 'DISCARD_AD_CHANGES';
export const SET_AD_TITLE = 'SET_AD_TITLE';

export const SET_WORK_PRIORITY = 'SET_WORK_PRIORITY';
export const RESET_WORK_PRIORITY = 'RESET_WORK_PRIORITY';


const initialState = {
    data: undefined,
    error: undefined,
    isSavingAd: false,
    isFetchingStilling: false,
    validation: {},
    isEditingAd: true,
    workPriority: {
        administrationStatus: AdminStatusEnum.RECEIVED
    }
};

function validateTitle(title, employer) {
    return hasExcludingWordsInTitle(title, employer) ? 'Tittel inneholder ord som ikke er tillatt' : undefined;
}

function validateLocation(location) {
    if (location === null ||
        location === undefined ||
        location.postalCode === null ||
        location.postalCode === undefined ||
        location.postalCode.length === 0) {
        return 'Geografisk plassering av stillingen mangler';
    }
    if (location.postalCode.length !== 4) {
        return 'Geografisk plassering har ugyldig postnummer';
    }
    return undefined;
}

function validateStyrk(categoryList) {
    if (categoryList === null || categoryList === undefined ||
        categoryList.length === 0) {
        return 'STYRK mangler';
    }
    return undefined;
}


function validateAll(data) {
    return {
        styrk: validateStyrk(data.categoryList),
        location: validateLocation(data.location),
        title: validateTitle(data.title, data.properties.employer)
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
                isEditingAd: false,
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
                isEditingAd: false,
                validation: validateAll(action.response)
            };
        case SAVE_AD_FAILURE:
            return {
                ...state,
                isSavingAd: false,
                error: action.error
            };
        case EDIT_AD:
            return {
                ...state,
                isEditingAd: true
            };
        case DISCARD_AD_CHANGES:
            return {
                ...state,
                data: { ...state.originalData },
                validation: validateAll(state.originalData),
                isEditingAd: false
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
            const categoryListAdd = [...state.data.categoryList, lookUpStyrk(action.code)];
            return {
                ...state,
                data: {
                    ...state.data,
                    categoryList: categoryListAdd
                },
                validation: {
                    ...state.validation,
                    styrk: validateStyrk(categoryListAdd)
                }
            };
        case REMOVE_STYRK:
            const categoryListRemove = state.data.categoryList.filter((c) => (c.code !== action.code));
            return {
                ...state,
                data: {
                    ...state.data,
                    categoryList: categoryListRemove
                },
                validation: {
                    ...state.validation,
                    styrk: validateStyrk(categoryListRemove)
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
                    location: 'Geografisk plassering har ugyldig postnummer'
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
        case SET_EMPLOYMENT_JOBTITLE:
            return {
                ...state,
                data: {
                    ...state.data,
                    properties: {
                        ...state.data.properties,
                        jobtitle: action.jobtitle
                    }
                }
            };
        case SET_EMPLOYMENT_LOCATION:
            return {
                ...state,
                data: {
                    ...state.data,
                    properties: {
                        ...state.data.properties,
                        location: action.location
                    }
                }
            };
        case SET_EMPLOYMENT_ENGAGEMENTTYPE:
            return {
                ...state,
                data: {
                    ...state.data,
                    properties: {
                        ...state.data.properties,
                        engagementtype: action.engagementType
                    }
                }
            };
        case SET_EMPLOYMENT_EXTENT:
            return {
                ...state,
                data: {
                    ...state.data,
                    properties: {
                        ...state.data.properties,
                        extent: action.extent
                    }
                }
            };
        case SET_EMPLOYMENT_POSITIONCOUNT:
            return {
                ...state,
                data: {
                    ...state.data,
                    properties: {
                        ...state.data.properties,
                        positioncount: action.positioncount
                    }
                }
            };
        case SET_EMPLOYMENT_SECTOR:
            return {
                ...state,
                data: {
                    ...state.data,
                    properties: {
                        ...state.data.properties,
                        sector: action.sector
                    }
                }
            };
        case SET_EMPLOYMENT_WORKDAY:
            return {
                ...state,
                data: {
                    ...state.data,
                    properties: {
                        ...state.data.properties,
                        workday: action.workday
                    }
                }
            };
        case SET_EMPLOYMENT_WORKHOURS:
            return {
                ...state,
                data: {
                    ...state.data,
                    properties: {
                        ...state.data.properties,
                        workhours: action.workhours
                    }
                }
            };
        case SET_EMPLOYMENT_JOBARRANGEMENT:
            return {
                ...state,
                data: {
                    ...state.data,
                    properties: {
                        ...state.data.properties,
                        jobarrangement: action.jobarrangement
                    }
                }
            };
        case SET_EMPLOYMENT_STARTTIME:
            return {
                ...state,
                data: {
                    ...state.data,
                    properties: {
                        ...state.data.properties,
                        starttime: action.starttime
                    }
                }
            };
        case SET_APPLICATIONDUE:
            return {
                ...state,
                data: {
                    ...state.data,
                    properties: {
                        ...state.data.properties,
                        applicationdue: action.applicationdue
                    }
                }
            };
        case SET_APPLICATIONEMAIL:
            return {
                ...state,
                data: {
                    ...state.data,
                    properties: {
                        ...state.data.properties,
                        applicationemail: action.applicationemail
                    }
                }
            };
        case SET_APPLICATIONURL:
            return {
                ...state,
                data: {
                    ...state.data,
                    properties: {
                        ...state.data.properties,
                        applicationurl: action.applicationurl
                    }
                }
            };
        case SET_SOURCEURL:
            return {
                ...state,
                data: {
                    ...state.data,
                    properties: {
                        ...state.data.properties,
                        sourceurl: action.sourceurl
                    }
                }
            };
        case SET_EMPLOYER:
            return {
                ...state,
                data: {
                    ...state.data,
                    properties: {
                        ...state.data.properties,
                        employer: action.employer
                    }
                }
            };
        case SET_EMPLOYERDESCRIPTION:
            return {
                ...state,
                data: {
                    ...state.data,
                    properties: {
                        ...state.data.properties,
                        employerdescription: action.employerdescription
                    }
                }
            };
        case SET_LAST_UPDATED:
            return {
                ...state,
                data: {
                    ...state.data,
                    updated: action.updated
                }
            };
        case SET_PUBLISHED:
            return {
                ...state,
                data: {
                    ...state.data,
                    published: action.published
                }
            };
        case SET_MEDIUM:
            return {
                ...state,
                data: {
                    ...state.data,
                    medium: action.medium
                }
            };
        case SET_ID:
            return {
                ...state,
                data: {
                    ...state.data,
                    id: action.id
                }
            };
        case SET_REFERENCE:
            return {
                ...state,
                data: {
                    ...state.data,
                    reference: action.reference
                }
            };
        case SET_EXPIRATION_DATE:
            return {
                ...state,
                data: {
                    ...state.data,
                    expires: action.expires
                }
            };
        case SET_AD_TEXT:
            return {
                ...state,
                data: {
                    ...state.data,
                    properties: {
                        ...state.data.properties,
                        adtext: action.adtext
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
        case SET_WORK_PRIORITY:
            return {
                ...state,
                workPriority: action.workPriority
            };
        case RESET_WORK_PRIORITY:
            return {
                ...state,
                workPriority: initialState.workPriority
            };
        default:
            return state;
    }
}

function* getAd(action) {
    yield put({ type: FETCH_AD_BEGIN });
    try {
        const response = yield fetchGet(`${AD_API}ads/${action.uuid}`);
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
    const state = yield select();
    const queryString = toUrl({ ...state.ad.workPriority, size: 1, sort: 'created,asc', administrationStatus: AdminStatusEnum.RECEIVED });
    let wasAbleToAssign = false;
    let ad;
    while (!wasAbleToAssign) {
        try {
            const responseList = yield fetchGet(`${AD_API}ads/${queryString}`);
            ad = responseList.content[0];
        } catch (e) {
            if (e instanceof ApiError) {
                yield put({ type: FETCH_AD_FAILURE, error: e });
            } else {
                throw e;
            }
        }
        try {
            const responsePut = yield fetchPut(`${AD_API}ads/${ad.uuid}`, {
                ...ad,
                administration: {
                    ...ad.administration,
                    status: AdminStatusEnum.PENDING
                }
            });
            wasAbleToAssign = true;
            yield put({ type: FETCH_AD_SUCCESS, response: responsePut });
        } catch (e) {
            if (e instanceof ApiError && e.statusCode === 412) {
                wasAbleToAssign = false;
            } else {
                throw e;
            }
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
    yield takeLatest(SAVE_AD, saveAd);
};
