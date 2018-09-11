import { put, select, takeLatest } from 'redux-saga/es/effects';
import { findLocationByPostalCode } from './administration/location/locationCodeReducer';
import RemarksEnum from './administration/adStatus/RemarksEnum';
import { FETCH_AD_SUCCESS, FETCH_NEXT_AD_SUCCESS, SAVE_AD_SUCCESS } from './adReducer';
import { toDate } from '../utils';
import {erDatoEtterMinDato} from 'nav-datovelger/dist/datovelger/utils/datovalidering';

import {
    SET_STYRK,
    SET_EMPLOYER,
    SET_LOCATION_POSTAL_CODE,
    ADD_REMARK,
    REMOVE_REMARK,
    SET_COMMENT,
    SET_EXPIRATION_DATE
} from './adDataReducer';

const ADD_VALIDATION_ERROR = 'ADD_VALIDATION_ERROR';
const REMOVE_VALIDATION_ERROR = 'REMOVE_VALIDATION_ERROR';


const valueIsNotSet = (value) => (value === undefined || value === null || value.length === 0);

function* validateLocation() {
    const state = yield select();
    const { location } = state.adData;
    if (location &&
        location.postalCode &&
        location.postalCode.match('^[0-9]{4}$')) {
        const locationByPostalCode = yield findLocationByPostalCode(location.postalCode);
        if (locationByPostalCode === undefined) {
            yield put({
                type: ADD_VALIDATION_ERROR,
                field: 'location',
                message: 'Ukjent postnummer'
            });
        } else {
            yield put({ type: REMOVE_VALIDATION_ERROR, field: 'location' });
        }
    } else if (location &&
        location.postalCode &&
        !location.postalCode.match('^[0-9]{4}$')) {
        yield put({
            type: ADD_VALIDATION_ERROR,
            field: 'location',
            message: 'Ugyldig postnummer'
        });
    } else if (!location || !location.postalCode) {
        yield put({
            type: ADD_VALIDATION_ERROR,
            field: 'location',
            message: 'Arbeidssted mangler'
        });
    } else {
        yield put({ type: REMOVE_VALIDATION_ERROR, field: 'location' });
    }
}

function* validateStyrk() {
    const state = yield select();
    const { categoryList } = state.adData;

    if (valueIsNotSet(categoryList)) {
        yield put({ type: ADD_VALIDATION_ERROR, field: 'styrk', message: 'Yrke mangler' });
    } else {
        yield put({ type: REMOVE_VALIDATION_ERROR, field: 'styrk' });
    }
}


function* validateEmployer() {
    const state = yield select();
    const { employer } = state.adData;

    if (employer === null || employer === undefined ||
        valueIsNotSet(employer.name) ||
        valueIsNotSet(employer.orgnr)) {
        yield put({ type: ADD_VALIDATION_ERROR, field: 'employer', message: 'Navn på arbeidsgiver mangler' });
    } else {
        yield put({ type: REMOVE_VALIDATION_ERROR, field: 'employer' });
    }
}


function* validateExpireDate() {
    const state = yield select();
    const { expires } = state.adData;

    if (valueIsNotSet(expires)) {
        yield put({ type: ADD_VALIDATION_ERROR, field: 'expires', message: 'Utløpsdato mangler' });
    } else if (!erDatoEtterMinDato(toDate(expires), new Date(Date.now()))) {
        yield put({ type: ADD_VALIDATION_ERROR, field: 'expires', message: 'Utløpsdato kan ikke være før dagens dato' });
    } else {
        yield put({ type: REMOVE_VALIDATION_ERROR, field: 'expires' });
    }
}

export function* validateRejection() {
    const state = yield select();
    const { remarks, comments } = state.adData.administration;

    if (remarks.length === 0) {
        yield put({ type: ADD_VALIDATION_ERROR, field: 'remark', message: 'Årsak til avvising mangler' });
    } else {
        yield put({ type: REMOVE_VALIDATION_ERROR, field: 'remark' });
    }

    if (remarks.includes(RemarksEnum.UNKNOWN.value) && (valueIsNotSet(comments) || comments.length > 255)) {
        if (valueIsNotSet(comments)) {
            yield put({ type: ADD_VALIDATION_ERROR, field: 'comment', message: 'Beskrivelse av annen årsak mangler' });
        } else if (comments.length > 255) {
            yield put({ type: ADD_VALIDATION_ERROR, field: 'comment', message: 'Beskrivelse inneholder for mange tegn' });
        }
    } else {
        yield put({ type: REMOVE_VALIDATION_ERROR, field: 'comment' });
    }
}

function* validateAll() {
    const state = yield select();
    if (state.adData !== null) {
        yield validateStyrk();
        yield validateLocation();
        yield validateEmployer();
        yield validateExpireDate();
    }
}

export function hasValidationErrors(validation) {
    return validation.styrk !== undefined ||
           validation.location !== undefined ||
           validation.employer !== undefined ||
           validation.expires !== undefined;
}

export function hasRejectionErrors(validation) {
    return validation.comment !== undefined ||
        validation.remark !== undefined;
}

const initialState = {
    errors: {}
};

export default function adValidationReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_VALIDATION_ERROR:
            return {
                ...state,
                errors: {
                    ...state.errors,
                    [action.field]: action.message
                }
            };
        case REMOVE_VALIDATION_ERROR:
            return {
                errors: {
                    ...state.errors,
                    [action.field]: undefined
                }
            };
        default:
            return state;
    }
}

export const validationSaga = function* saga() {
    yield takeLatest([FETCH_AD_SUCCESS, SAVE_AD_SUCCESS, FETCH_NEXT_AD_SUCCESS], validateAll);
    yield takeLatest(SET_STYRK, validateStyrk);
    yield takeLatest(SET_EMPLOYER, validateEmployer);
    yield takeLatest(SET_EXPIRATION_DATE, validateExpireDate);
    yield takeLatest(SET_LOCATION_POSTAL_CODE, validateLocation);
    yield takeLatest([ADD_REMARK, REMOVE_REMARK, SET_COMMENT], validateRejection);
};

