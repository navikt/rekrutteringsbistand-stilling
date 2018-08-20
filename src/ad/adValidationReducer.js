import { put, select, takeLatest } from 'redux-saga/es/effects';
import { findLocationByPostalCode } from './administration/location/locationCodeReducer';
import {
    DISCARD_AD_CHANGES,
    FETCH_AD_SUCCESS, FETCH_NEXT_AD_SUCCESS,
    SAVE_AD_SUCCESS
} from './adReducer';
import { ADD_STYRK, REMOVE_STYRK, SET_EMPLOYER, SET_LOCATION_POSTAL_CODE } from './adDataReducer';

const ADD_VALIDATION_ERROR = 'ADD_VALIDATION_ERROR';
const REMOVE_VALIDATION_ERROR = 'REMOVE_VALIDATION_ERROR';

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

    if (categoryList === null || categoryList === undefined ||
        categoryList.length === 0) {
        yield put({ type: ADD_VALIDATION_ERROR, field: 'styrk', message: 'Yrke mangler' });
    } else {
        yield put({ type: REMOVE_VALIDATION_ERROR, field: 'styrk' });
    }
}


function* validateEmployer() {
    const state = yield select();
    const { employer } = state.adData;

    if (employer === null || employer === undefined ||
        employer.name === null || employer.name === undefined || employer.name.length === 0 ||
        employer.orgnr === null || employer.orgnr === undefined || employer.orgnr.length === 0) {
        yield put({ type: ADD_VALIDATION_ERROR, field: 'employer', message: 'Arbeidsgiver mangler' });
    } else {
        yield put({ type: REMOVE_VALIDATION_ERROR, field: 'employer' });
    }
}


function* validateAll() {
    const state = yield select();
    if (state.adData !== null) {
        yield validateStyrk();
        yield validateLocation();
        yield validateEmployer();
    }
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
    yield takeLatest([FETCH_AD_SUCCESS, SAVE_AD_SUCCESS, DISCARD_AD_CHANGES, FETCH_NEXT_AD_SUCCESS], validateAll);
    yield takeLatest([ADD_STYRK, REMOVE_STYRK], validateStyrk);
    yield takeLatest(SET_EMPLOYER, validateEmployer);
    yield takeLatest(SET_LOCATION_POSTAL_CODE, validateLocation);
};

