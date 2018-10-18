import { put, select, takeLatest } from 'redux-saga/es/effects';
import { findLocationByPostalCode } from './administration/location/locationCodeReducer';
import { FETCH_AD_SUCCESS, SAVE_AD_SUCCESS } from './adReducer';
import { toDate } from '../utils';
import {erDatoEtterMinDato} from 'nav-datovelger/dist/datovelger/utils/datovalidering';

import {
    SET_STYRK,
    SET_EMPLOYER,
    SET_LOCATION_POSTAL_CODE,
    SET_EXPIRATION_DATE, SET_PUBLISHED
} from './adDataReducer';

const ADD_VALIDATION_ERROR = 'ADD_VALIDATION_ERROR';
const REMOVE_VALIDATION_ERROR = 'REMOVE_VALIDATION_ERROR';


const valueIsNotSet = (value) => (value === undefined || value === null || value.length === 0);

const locationIsCountryOrMunicipal = (location, medium) => {
    // Returnerer true for annonser fra Adreg som ikke har postnummer, men land eller kommune istedet.
    // Disse skal ikke gi validation-error
    return medium === 'Stillingsregistrering' && location && (location.country || location.municipal) &&
        !location.postalCode;
};

function* validateLocation() {
    const state = yield select();
    const { location, medium } = state.adData;
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
    } else if (!location || (!location.postalCode && !locationIsCountryOrMunicipal(location, medium))) {
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
        yield put({ type: ADD_VALIDATION_ERROR, field: 'expires', message: 'Siste visningsdag mangler' });
    } else if (!erDatoEtterMinDato(toDate(expires), new Date(Date.now()))) {
        yield put({ type: ADD_VALIDATION_ERROR, field: 'expires', message: 'Siste visningsdag kan ikke være før dagens dato' });
    } else {
        yield put({ type: REMOVE_VALIDATION_ERROR, field: 'expires' });
    }
}

function* validatePublishDate() {
    const state = yield select();
    const { published } = state.adData;

    if (valueIsNotSet(published)) {
        yield put({ type: ADD_VALIDATION_ERROR, field: 'published', message: 'Publiseringsdato mangler' });
    } else {
        yield put({ type: REMOVE_VALIDATION_ERROR, field: 'published' });
    }
}

function* validateAll() {
    const state = yield select();
    if (state.adData !== null) {
        yield validateStyrk();
        yield validateLocation();
        yield validateEmployer();
        yield validateExpireDate();
        yield validatePublishDate();
    }
}

export function hasValidationErrors(validation) {
    return validation.styrk !== undefined ||
           validation.location !== undefined ||
           validation.employer !== undefined ||
           validation.expires !== undefined;
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
    yield takeLatest([FETCH_AD_SUCCESS, SAVE_AD_SUCCESS], validateAll);
    yield takeLatest(SET_STYRK, validateStyrk);
    yield takeLatest(SET_EMPLOYER, validateEmployer);
    yield takeLatest(SET_EXPIRATION_DATE, validateExpireDate);
    yield takeLatest(SET_PUBLISHED, validatePublishDate);
    yield takeLatest(SET_LOCATION_POSTAL_CODE, validateLocation);
};

