import { put, takeLatest } from 'redux-saga/es/effects';
import { lookUpStyrk } from './administration/styrk/styrkReducer';
import { findLocationByPostalCode } from './administration/location/locationCodeReducer';
import { FETCH_AD_BEGIN, FETCH_AD_SUCCESS, FETCH_NEXT_AD_SUCCESS, SAVE_AD_SUCCESS } from "./adReducer";

export const SET_AD_DATA = 'SET_AD_DATA';
export const REMOVE_AD_DATA = 'REMOVE_AD_DATA';

export const SET_COMMENT = 'SET_COMMENT';
export const ADD_STYRK = 'ADD_STYRK';
export const REMOVE_STYRK = 'REMOVE_STYRK';
export const SET_LOCATION_POSTAL_CODE = 'SET_LOCATION_POSTAL_CODE';
export const SET_LOCATION = 'SET_LOCATION';
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
export const SET_EMPLOYER_NAME = 'SET_EMPLOYER_NAME';
export const SET_EMPLOYER_ADDRESS = 'SET_EMPLOYER_ADDRESS';
export const SET_EMPLOYER_HOMEPAGE = 'SET_EMPLOYER_HOMEPAGE';
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
export const SET_ADMIN_STATUS_AND_GET_NEXT_AD = 'SET_ADMIN_STATUS_AND_GET_NEXT_AD';
export const ADD_REMARK = 'ADD_REMARK';
export const REMOVE_REMARK = 'REMOVE_REMARK';
export const SET_AD_TITLE = 'SET_AD_TITLE';
export const SET_REPORTEE = 'SET_REPORTEE';

const initialState = null;

export default function adDataReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_AD_BEGIN:
            return initialState;
        case FETCH_AD_SUCCESS:
        case FETCH_NEXT_AD_SUCCESS:
        case SAVE_AD_SUCCESS:
            return action.response;
        case SET_AD_DATA:
            return action.data;
        case SET_COMMENT: {
            return {
                ...state,
                administration: {
                    ...state.administration,
                    comments: action.comment
                }
            };
        }
        case ADD_STYRK:
            if (state.categoryList.find((s) => (s.code === action.code))) {
                return state;
            }
            return {
                ...state,
                categoryList: [...state.categoryList, lookUpStyrk(action.code)]
            };
        case REMOVE_STYRK:
            return {
                ...state,
                categoryList: state.categoryList.filter((c) => (c.code !== action.code))
            };
        case SET_AD_TITLE: {
            return {
                ...state,
                title: action.title
            };
        }
        case SET_LOCATION_POSTAL_CODE:
            return {
                ...state,
                location: {
                    city: null,
                    county: null,
                    municipal: null,
                    municipalCode: null,
                    postalCode: action.postalCode
                }
            };
        case SET_LOCATION:
            return {
                ...state,
                location: action.location
            };
        case SET_LOCATION_ADDRESS:
            return {
                ...state,
                location: {
                    ...state.location,
                    address: action.address
                }
            };
        case SET_EMPLOYMENT_JOBTITLE:
            return {
                ...state,
                properties: {
                    ...state.properties,
                    jobtitle: action.jobtitle
                }
            };
        case SET_EMPLOYMENT_LOCATION:
            return {
                ...state,
                properties: {
                    ...state.properties,
                    location: action.location
                }
            };
        case SET_EMPLOYMENT_ENGAGEMENTTYPE:
            return {
                ...state,
                properties: {
                    ...state.properties,
                    engagementtype: action.engagementType
                }
            };
        case SET_EMPLOYMENT_EXTENT:
            return {
                ...state,
                properties: {
                    ...state.properties,
                    extent: action.extent
                }
            };
        case SET_EMPLOYMENT_POSITIONCOUNT:
            return {
                ...state,
                properties: {
                    ...state.properties,
                    positioncount: action.positioncount
                }
            };
        case SET_EMPLOYMENT_SECTOR:
            return {
                ...state,
                properties: {
                    ...state.properties,
                    sector: action.sector
                }
            };
        case SET_EMPLOYMENT_WORKDAY:
            return {
                ...state,
                properties: {
                    ...state.properties,
                    workday: action.workday
                }
            };
        case SET_EMPLOYMENT_WORKHOURS:
            return {
                ...state,
                properties: {
                    ...state.properties,
                    workhours: action.workhours
                }
            };
        case SET_EMPLOYMENT_JOBARRANGEMENT:
            return {
                ...state,
                properties: {
                    ...state.properties,
                    jobarrangement: action.jobarrangement
                }
            };
        case SET_EMPLOYMENT_STARTTIME:
            return {
                ...state,
                properties: {
                    ...state.properties,
                    starttime: action.starttime
                }
            };
        case SET_APPLICATIONDUE:
            return {
                ...state,
                properties: {
                    ...state.properties,
                    applicationdue: action.applicationdue
                }
            };
        case SET_APPLICATIONEMAIL:
            return {
                ...state,
                properties: {
                    ...state.properties,
                    applicationemail: action.applicationemail
                }
            };
        case SET_APPLICATIONURL:
            return {
                ...state,
                properties: {
                    ...state.properties,
                    applicationurl: action.applicationurl
                }
            };
        case SET_SOURCEURL:
            return {
                ...state,
                properties: {
                    ...state.properties,
                    sourceurl: action.sourceurl
                }
            };
        case SET_EMPLOYER:
            if (action.employer) {
                return {
                    ...state,
                    employer: {
                        ...state.employer,
                        name: action.employer.name,
                        orgnr: action.employer.orgnr,
                        location: action.employer.location
                    }
                };
            }
            return {
                ...state,
                employer: null
            };
        case SET_EMPLOYERDESCRIPTION:
            return {
                ...state,
                properties: {
                    ...state.properties,
                    employerdescription: action.employerdescription
                }
            };
        case SET_EMPLOYER_NAME:
            return {
                ...state,
                properties: {
                    ...state.properties,
                    employer: action.employername
                }
            };
        case SET_EMPLOYER_ADDRESS:
            return {
                ...state,
                properties: {
                    ...state.properties,
                    address: action.employeraddress
                }
            };
        case SET_EMPLOYER_HOMEPAGE:
            return {
                ...state,
                properties: {
                    ...state.properties,
                    employerhomepage: action.employerhomepage
                }
            };
        case SET_LAST_UPDATED:
            return {
                ...state,
                updated: action.updated
            };
        case SET_PUBLISHED:
            return {
                ...state,
                published: action.published
            };
        case SET_MEDIUM:
            return {
                ...state,
                medium: action.medium
            };
        case SET_ID:
            return {
                ...state,
                id: action.id
            };
        case SET_REFERENCE:
            return {
                ...state,
                reference: action.reference
            };
        case SET_EXPIRATION_DATE:
            return {
                ...state,
                expires: action.expires
            };
        case SET_AD_TEXT:
            return {
                ...state,
                properties: {
                    ...state.properties,
                    adtext: action.adtext
                }
            };
        case SET_AD_STATUS:
            return {
                ...state,
                status: action.status
            };
        case SET_ADMIN_STATUS:
            return {
                ...state,
                administration: {
                    ...state.administration,
                    status: action.status
                }
            };
        case ADD_REMARK:
            return {
                ...state,
                administration: {
                    ...state.administration,
                    remarks: [...state.administration.remarks, action.remark]
                }
            };
        case REMOVE_REMARK:
            return {
                ...state,
                administration: {
                    ...state.administration,
                    remarks: state.administration.remarks.filter((remark) => (remark !== action.remark))
                }
            };
        case SET_REPORTEE:
            return {
                ...state,
                administration: {
                    ...state.administration,
                    reportee: action.reportee
                }
            };
        case REMOVE_AD_DATA:
            return initialState;
        default:
            return state;
    }
}

function* lookUpLocation(action) {
    const location = yield findLocationByPostalCode(action.postalCode);
    if (location !== undefined) {
        yield put({
            type: SET_LOCATION,
            location: {
                city: location.city,
                county: location.county,
                municipal: location.municipality,
                municipalCode: location.municipalityCode,
                postalCode: location.postalCode
            }
        });
    }
}

export const adDataSaga = function* saga() {
    yield takeLatest(SET_LOCATION_POSTAL_CODE, lookUpLocation);
};
