import { tagsInneholderInkluderingsmuligheter } from './tags/utils';
import { put, select, takeLatest } from 'redux-saga/es/effects';
import { erDatoEtterMinDato } from 'nav-datovelger/dist/datovelger/utils/datovalidering';
import { toDate } from '../utils';
import { DEFAULT_TITLE_NEW_AD, SET_KAN_INKLUDERE } from './adReducer';
import IsJson from './edit/practicalInformation/IsJson';

import {
    SET_STYRK,
    SET_EMPLOYER,
    ADD_POSTAL_CODE,
    ADD_POSTAL_CODE_BEGIN,
    REMOVE_POSTAL_CODE,
    ADD_LOCATION_AREA,
    REMOVE_COUNTRY,
    REMOVE_MUNICIPAL,
    REMOVE_COUNTY,
    SET_EXPIRATION_DATE,
    SET_PUBLISHED,
    SET_AD_TEXT,
    SET_AD_TITLE,
    SET_APPLICATIONDUE,
    SET_EMPLOYMENT_ENGAGEMENTTYPE,
    SET_EMPLOYMENT_POSITIONCOUNT,
    SET_EMPLOYMENT_EXTENT,
    SET_EMPLOYMENT_SECTOR,
    CHECK_EMPLOYMENT_WORKDAY,
    UNCHECK_EMPLOYMENT_WORKDAY,
    CHECK_EMPLOYMENT_WORKHOURS,
    UNCHECK_EMPLOYMENT_WORKHOURS,
    findLocationByPostalCode,
    REMOVE_LOCATION_AREAS,
    CHECK_TAG,
    UNCHECK_TAG,
} from './adDataReducer';

import { SET_NOTAT } from '../stillingsinfo/stillingsinfoDataReducer';
import isJson from './edit/practicalInformation/IsJson';
import State from '../State';
import { KanInkludere } from './edit/registrer-inkluderingsmuligheter/DirektemeldtStilling';

const ADD_VALIDATION_ERROR = 'ADD_VALIDATION_ERROR';
const REMOVE_VALIDATION_ERROR = 'REMOVE_VALIDATION_ERROR';
export const VALIDATE_ALL = 'VALIDATE_ALL';
export const VALIDATE_APPLICATION_EMAIL = 'VALIDATE_APPLICATION_EMAIL';
export const VALIDATE_CONTACTPERSON_EMAIL = 'VALIDATE_CONTACTPERSON_EMAIL';
export const VALIDATE_CONTACTPERSON_PHONE = 'VALIDATE_CONTACTPERSON_PHONE';
export const VALIDATE_LOCATION_AREA = 'VALIDATE_LOCATION_AREA';
export const RESET_VALIDATION_ERROR = 'RESET_VALIDATION_ERROR';

export const MAX_LENGTH_NOTAT = 500;

const valueIsNotSet = (value) => value === undefined || value === null || value.length === 0;

function* validateLocation() {
    const state = yield select();
    const { locationList } = state.adData;

    if (valueIsNotSet(locationList)) {
        yield put({
            type: ADD_VALIDATION_ERROR,
            field: 'location',
            message: 'Arbeidssted mangler',
        });
    } else {
        yield put({ type: REMOVE_VALIDATION_ERROR, field: 'location' });
    }
}

function* validatePostalCode() {
    const state = yield select();
    const { typeAheadValue } = state.locationCode;
    if (typeAheadValue && typeAheadValue.match('^[0-9]{4}$')) {
        const locationByPostalCode = yield findLocationByPostalCode(typeAheadValue);
        if (locationByPostalCode === undefined) {
            yield put({
                type: ADD_VALIDATION_ERROR,
                field: 'postalCode',
                message: 'Ukjent postnummer',
            });
        } else {
            yield put({ type: REMOVE_VALIDATION_ERROR, field: 'postalCode' });
        }
    } else if (typeAheadValue && !typeAheadValue.match('^[0-9]{4}$')) {
        yield put({
            type: ADD_VALIDATION_ERROR,
            field: 'postalCode',
            message: 'Ugyldig postnummer',
        });
    } else {
        yield put({ type: REMOVE_VALIDATION_ERROR, field: 'postalCode' });
    }
}

function* validateLocationArea() {
    const state = yield select();
    const { typeaheadValue } = state.locationArea;

    if (typeaheadValue) {
        yield put({
            type: ADD_VALIDATION_ERROR,
            field: 'locationArea',
            message: 'Må være kommune, fylke eller land utenfor Norge',
        });
    } else {
        yield put({ type: REMOVE_VALIDATION_ERROR, field: 'locationArea' });
    }
}

export function* validateStyrk() {
    const state = yield select();
    const { categoryList } = state.adData;

    if (valueIsNotSet(categoryList)) {
        yield put({ type: ADD_VALIDATION_ERROR, field: 'styrk', message: 'STYRK mangler' });
    } else {
        yield put({ type: REMOVE_VALIDATION_ERROR, field: 'styrk' });
    }
}

export function* validateTitle() {
    const adTitle = yield select((state) => state.adData.title);
    if (valueIsNotSet(adTitle) || adTitle === DEFAULT_TITLE_NEW_AD) {
        yield put({
            type: ADD_VALIDATION_ERROR,
            field: 'title',
            message: 'Overskrift på stillingen mangler',
        });
    } else {
        yield put({ type: REMOVE_VALIDATION_ERROR, field: 'title' });
    }
}

function* validateAdtext() {
    const adText = yield select((state) => state.adData.properties.adtext);
    if (valueIsNotSet(adText)) {
        yield put({
            type: ADD_VALIDATION_ERROR,
            field: 'adText',
            message: 'Stillingstekst mangler',
        });
    } else {
        yield put({ type: REMOVE_VALIDATION_ERROR, field: 'adText' });
    }
}

function* validateEmployer() {
    const state = yield select();
    const { employer } = state.adData;

    if (
        employer === null ||
        employer === undefined ||
        valueIsNotSet(employer.name) ||
        valueIsNotSet(employer.orgnr)
    ) {
        yield put({
            type: ADD_VALIDATION_ERROR,
            field: 'employer',
            message: 'Bedriftens navn mangler',
        });
    } else {
        yield put({ type: REMOVE_VALIDATION_ERROR, field: 'employer' });
    }
}

function* validateExpireDate() {
    const state = yield select();
    const { expires } = state.adData;

    if (valueIsNotSet(expires)) {
        yield put({
            type: ADD_VALIDATION_ERROR,
            field: 'expires',
            message: 'Siste visningsdato mangler',
        });
    } else if (!erDatoEtterMinDato(toDate(expires), new Date(Date.now()))) {
        yield put({
            type: ADD_VALIDATION_ERROR,
            field: 'expires',
            message: 'Siste visningsdato kan ikke være før dagens dato',
        });
    } else {
        yield put({ type: REMOVE_VALIDATION_ERROR, field: 'expires' });
    }
}

function* validatePublishDate() {
    const state = yield select();
    const { published } = state.adData;

    if (valueIsNotSet(published)) {
        yield put({
            type: ADD_VALIDATION_ERROR,
            field: 'published',
            message: 'Publiseringsdato mangler',
        });
    } else {
        yield put({ type: REMOVE_VALIDATION_ERROR, field: 'published' });
    }
}

function* validateApplicationEmail() {
    const email = yield select((state) => state.adData.properties.applicationemail);

    // E-postadressen må inneholde en '@' for å være gyldig
    const error = email && email.length > 0 && email.indexOf('@') === -1;

    if (error) {
        yield put({
            type: ADD_VALIDATION_ERROR,
            field: 'applicationEmail',
            message: 'E-postadressen er ugyldig. Den må minimum inneholde en «@»',
        });
    } else {
        yield put({ type: REMOVE_VALIDATION_ERROR, field: 'applicationEmail' });
    }
}

function* validateContactpersonEmail() {
    const contactperson = yield select((state) => state.adData.contactList[0]);

    // E-postadressen må inneholde en '@' for å være gyldig
    const error =
        contactperson &&
        contactperson.email &&
        contactperson.email.length > 0 &&
        contactperson.email.indexOf('@') === -1;

    if (error) {
        yield put({
            type: ADD_VALIDATION_ERROR,
            field: 'contactpersonEmail',
            message: 'E-postadressen er ugyldig. Den må minimum inneholde en «@»',
        });
    } else {
        yield put({ type: REMOVE_VALIDATION_ERROR, field: 'contactpersonEmail' });
    }
}

function* validateContactpersonPhone() {
    const contactperson = yield select((state) => state.adData.contactList[0]);

    const error =
        contactperson &&
        contactperson.phone &&
        contactperson.phone.length > 0 &&
        !contactperson.phone.match(/^(\(?\+?[0-9]*\)?)?[0-9_\- \(\)]*$/);

    if (error) {
        yield put({
            type: ADD_VALIDATION_ERROR,
            field: 'contactpersonPhone',
            message: 'Ugyldig telefonnummer',
        });
    } else {
        yield put({ type: REMOVE_VALIDATION_ERROR, field: 'contactpersonPhone' });
    }
}

export function* validateNotat() {
    const notat = yield select((state) => state.stillingsinfoData.notat);

    if (notat && notat.length > MAX_LENGTH_NOTAT) {
        yield put({
            type: ADD_VALIDATION_ERROR,
            field: 'notat',
            message: 'Kommentaren inneholder for mange tegn',
        });
    } else {
        yield put({ type: REMOVE_VALIDATION_ERROR, field: 'notat' });
    }
}

function* validateApplicationdueDate() {
    const state = yield select();
    const { applicationdue } = state.adData.properties;

    if (valueIsNotSet(applicationdue)) {
        yield put({
            type: ADD_VALIDATION_ERROR,
            field: 'applicationdue',
            message: 'Søknadsfrist mangler',
        });
    } else {
        yield put({ type: REMOVE_VALIDATION_ERROR, field: 'applicationdue' });
    }
}

function* validateEngagementType() {
    const state = yield select();
    const { engagementtype } = state.adData.properties;

    if (valueIsNotSet(engagementtype)) {
        yield put({
            type: ADD_VALIDATION_ERROR,
            field: 'engagementtype',
            message: 'Ansettelsesform mangler',
        });
    } else {
        yield put({ type: REMOVE_VALIDATION_ERROR, field: 'engagementtype' });
    }
}

function* validatePositionCount() {
    const state = yield select();
    const { positioncount } = state.adData.properties;

    const error = positioncount && !positioncount.match(/^[1-9]\d*$/);

    if (valueIsNotSet(positioncount) || error) {
        yield put({
            type: ADD_VALIDATION_ERROR,
            field: 'positioncount',
            message: 'Antall stillinger mangler',
        });
    } else {
        yield put({ type: REMOVE_VALIDATION_ERROR, field: 'positioncount' });
    }
}

function* validateExtent() {
    const state = yield select();
    const { extent } = state.adData.properties;

    if (valueIsNotSet(extent)) {
        yield put({ type: ADD_VALIDATION_ERROR, field: 'extent', message: 'Omfang mangler' });
    } else {
        yield put({ type: REMOVE_VALIDATION_ERROR, field: 'extent' });
    }
}

function* validateSector() {
    const state = yield select();
    const { sector } = state.adData.properties;

    if (valueIsNotSet(sector)) {
        yield put({ type: ADD_VALIDATION_ERROR, field: 'sector', message: 'Sektor mangler' });
    } else {
        yield put({ type: REMOVE_VALIDATION_ERROR, field: 'sector' });
    }
}

function* validateWorkday() {
    const state = yield select();
    const { workday } = state.adData.properties;

    if (valueIsNotSet(workday) || !IsJson(workday) || valueIsNotSet(JSON.parse(workday))) {
        yield put({
            type: ADD_VALIDATION_ERROR,
            field: 'workday',
            message: 'Arbeidsdager mangler',
        });
    } else {
        yield put({ type: REMOVE_VALIDATION_ERROR, field: 'workday' });
    }
}

function* validateWorkhours() {
    const state: State = yield select();
    const { workhours } = state.adData.properties;

    if (valueIsNotSet(workhours) || !IsJson(workhours) || valueIsNotSet(JSON.parse(workhours))) {
        yield put({
            type: ADD_VALIDATION_ERROR,
            field: 'workhours',
            message: 'Arbeidstid mangler',
        });
    } else {
        yield put({ type: REMOVE_VALIDATION_ERROR, field: 'workhours' });
    }
}

function* validateInkluderingsmuligheter() {
    const state: State = yield select();
    const { kanInkludere } = state.ad;
    const { tags } = state.adData.properties;

    if (kanInkludere === KanInkludere.Nei || tagsInneholderInkluderingsmuligheter(tags)) {
        yield put({ type: REMOVE_VALIDATION_ERROR, field: 'inkluderingsmuligheter' });
    } else {
        yield put({
            type: ADD_VALIDATION_ERROR,
            field: 'inkluderingsmuligheter',
            message: 'Mulighet for inkludering mangler – velg én eller flere',
        });
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
        yield validateApplicationEmail();
        yield validateContactpersonEmail();
        yield validatePostalCode();
        yield validateNotat();
        yield validateApplicationdueDate();
        yield validateEngagementType();
        yield validatePositionCount();
        yield validateExtent();
        yield validateSector();
        yield validateWorkday();
        yield validateWorkhours();
        yield validateInkluderingsmuligheter();
    }
}

export function hasValidationErrors(validation) {
    return (
        validation.styrk !== undefined ||
        validation.location !== undefined ||
        validation.employer !== undefined ||
        validation.expires !== undefined ||
        validation.title !== undefined ||
        validation.adText !== undefined ||
        validation.applicationEmail !== undefined ||
        validation.contactpersonEmail !== undefined ||
        validation.publish !== undefined ||
        validation.postalCode !== undefined ||
        validation.notat !== undefined ||
        validation.applicationdue !== undefined ||
        validation.engagementtype !== undefined ||
        validation.positioncount !== undefined ||
        validation.extent !== undefined ||
        validation.sector !== undefined ||
        validation.workday !== undefined ||
        validation.workhours !== undefined ||
        validation.inkluderingsmuligheter !== undefined
    );
}

export function* validateBeforeSave() {
    const state = yield select();
    if (state.adData !== null) {
        yield validateTitle();
        yield validateStyrk();
        yield validateApplicationEmail();
        yield validateContactpersonEmail();
        yield validateNotat();
        yield validatePostalCode();
        yield validateContactpersonPhone();
    }
}

export function hasValidationErrorsOnSave(validation) {
    return (
        validation.styrk !== undefined ||
        validation.title !== undefined ||
        validation.applicationEmail !== undefined ||
        validation.contactpersonEmail !== undefined ||
        validation.contactpersonPhone !== undefined ||
        validation.postalCode !== undefined ||
        validation.notat !== undefined
    );
}

export type AdValidationState = {
    errors: Record<string, string | undefined>;
};

const initialState = {
    errors: {},
};

export default function adValidationReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_VALIDATION_ERROR:
            return {
                ...state,
                errors: {
                    ...state.errors,
                    [action.field]: action.message,
                },
            };
        case REMOVE_VALIDATION_ERROR:
            return {
                errors: {
                    ...state.errors,
                    [action.field]: undefined,
                },
            };
        case RESET_VALIDATION_ERROR:
            return initialState;
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
    yield takeLatest(ADD_POSTAL_CODE_BEGIN, validatePostalCode);
    yield takeLatest(VALIDATE_LOCATION_AREA, validateLocationArea);
    yield takeLatest(
        [
            ADD_POSTAL_CODE,
            REMOVE_POSTAL_CODE,
            ADD_LOCATION_AREA,
            REMOVE_MUNICIPAL,
            REMOVE_COUNTY,
            REMOVE_COUNTRY,
            REMOVE_LOCATION_AREAS,
        ],
        validateLocation
    );
    yield takeLatest(SET_AD_TEXT, validateAdtext);
    yield takeLatest(SET_AD_TITLE, validateTitle);
    yield takeLatest(VALIDATE_APPLICATION_EMAIL, validateApplicationEmail);
    yield takeLatest(VALIDATE_CONTACTPERSON_EMAIL, validateContactpersonEmail);
    yield takeLatest(VALIDATE_CONTACTPERSON_PHONE, validateContactpersonPhone);
    yield takeLatest(SET_NOTAT, validateNotat);
    yield takeLatest(SET_APPLICATIONDUE, validateApplicationdueDate);
    yield takeLatest(SET_EMPLOYMENT_ENGAGEMENTTYPE, validateEngagementType);
    yield takeLatest(SET_EMPLOYMENT_POSITIONCOUNT, validatePositionCount);
    yield takeLatest(SET_EMPLOYMENT_EXTENT, validateExtent);
    yield takeLatest(SET_EMPLOYMENT_SECTOR, validateSector);
    yield takeLatest(CHECK_EMPLOYMENT_WORKDAY, validateWorkday);
    yield takeLatest(UNCHECK_EMPLOYMENT_WORKDAY, validateWorkday);
    yield takeLatest(CHECK_EMPLOYMENT_WORKHOURS, validateWorkhours);
    yield takeLatest(UNCHECK_EMPLOYMENT_WORKHOURS, validateWorkhours);
    yield takeLatest([CHECK_TAG, UNCHECK_TAG, SET_KAN_INKLUDERE], validateInkluderingsmuligheter);
};
