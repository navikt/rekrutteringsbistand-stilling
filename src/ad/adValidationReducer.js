import { put, select, takeLatest } from 'redux-saga/es/effects';
import { findLocationByPostalCode } from './edit/location/locationCodeReducer';
import { toDate } from '../utils';
import { erDatoEtterMinDato } from 'nav-datovelger/dist/datovelger/utils/datovalidering';

import {
    SET_STYRK,
    SET_EMPLOYER,
    SET_LOCATION_POSTAL_CODE,
    SET_EXPIRATION_DATE,
    SET_PUBLISHED,
    SET_AD_TEXT,
    SET_AD_TITLE,
    SET_LOCATION
} from './adDataReducer';

const ADD_VALIDATION_ERROR = 'ADD_VALIDATION_ERROR';
const REMOVE_VALIDATION_ERROR = 'REMOVE_VALIDATION_ERROR';
export const VALIDATE_ALL = 'VALIDATE_ALL';

const valueIsNotSet = (value) => (value === undefined || value === null || value.length === 0);

const locationIsCountryOrMunicipal = (location) => {
    return location && (location.country || location.municipal) &&
        !location.postalCode;
};

function* validateLocation() {
    const state = yield select();
    const { location } = state.adData;
    if (!location || (!location.postalCode && !locationIsCountryOrMunicipal(location))) {
        yield put({
            type: ADD_VALIDATION_ERROR,
            field: 'location',
            message: 'Arbeidssted mangler'
        });
    } else {
        yield put({ type: REMOVE_VALIDATION_ERROR, field: 'location' });
    }
}

function* validatePostalCode() {
    const state = yield select();
    const { location } = state.adData;
    if (location && location.postalCode && location.postalCode.match('^[0-9]{4}$')) {
        const locationByPostalCode = yield findLocationByPostalCode(location.postalCode);
        if (locationByPostalCode === undefined) {
            yield put({
                type: ADD_VALIDATION_ERROR,
                field: 'postalCode',
                message: 'Ukjent postnummer'
            });
        } else {
            yield put({ type: REMOVE_VALIDATION_ERROR, field: 'postalCode' });
        }
    } else if (location && location.postalCode && !location.postalCode.match('^[0-9]{4}$')) {
        yield put({
            type: ADD_VALIDATION_ERROR,
            field: 'postalCode',
            message: 'Ugyldig postnummer'
        });
    } else {
        yield put({ type: REMOVE_VALIDATION_ERROR, field: 'postalCode' });
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

function* validateTitle() {
    const adTitle = yield select((state) => state.adData.title );
    if (valueIsNotSet(adTitle)) {
        yield put({ type: ADD_VALIDATION_ERROR, field: 'title', message: 'Overskrift på annonsen mangler' });
    } else {
        yield put({ type: REMOVE_VALIDATION_ERROR, field: 'title' });
    }
}

function* validateAdtext() {
    const adText = yield select((state) => state.adData.properties.adtext );
    if (valueIsNotSet(adText)) {
        yield put({ type: ADD_VALIDATION_ERROR, field: 'adText', message: 'Annonsetekst mangler' });
    } else {
        yield put({ type: REMOVE_VALIDATION_ERROR, field: 'adText' });
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

export function* validateAll() {
    const state = yield select();
    if (state.adData !== null) {
        yield validateLocation();
        yield validateEmployer();
        yield validateExpireDate();
        yield validatePublishDate();
        yield validateTitle();
        yield validateStyrk();
        yield validateAdtext();
        yield validatePostalCode();
    }
}

export function hasValidationErrors(validation) {
    return validation.styrk !== undefined ||
           validation.location !== undefined ||
           validation.employer !== undefined ||
           validation.expires !== undefined ||
           validation.title !== undefined ||
           validation.adText !== undefined ||
           validation.publish !== undefined ||
           validation.postalCode !== undefined;
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
    yield takeLatest(VALIDATE_ALL, validateAll);
    yield takeLatest(SET_STYRK, validateStyrk);
    yield takeLatest(SET_EMPLOYER, validateEmployer);
    yield takeLatest(SET_EXPIRATION_DATE, validateExpireDate);
    yield takeLatest(SET_PUBLISHED, validatePublishDate);
    yield takeLatest(SET_LOCATION_POSTAL_CODE, validatePostalCode);
    yield takeLatest([SET_LOCATION_POSTAL_CODE, SET_LOCATION], validateLocation);
    yield takeLatest(SET_AD_TEXT, validateAdtext);
    yield takeLatest(SET_AD_TITLE, validateTitle);
};

