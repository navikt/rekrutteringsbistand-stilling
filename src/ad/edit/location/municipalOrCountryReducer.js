import { put, takeLatest } from 'redux-saga/effects';
import { fetchGet } from '../../../api/api';
import { AD_API } from '../../../fasitProperties';

/** *********************************************************
 * ACTIONS
 ********************************************************* */

export const FETCH_MUNICIPAL_OR_COUNTRY_BEGIN = 'FETCH_MUNUCIPAL_OR_COUNTRY_BEGIN';
export const FETCH_MUNICIPAL_OR_COUNTRY = 'FETCH_MUNUCIPAL_OR_COUNTRY';
export const FETCH_MUNICIPAL_OR_COUNTRY_FAILURE = 'FETCH_MUNUCIPAL_OR_COUNTRY_FAILURE';

export const SET_MUNICIPAL_OR_COUNTRY_TYPE_AHEAD = 'SET_MUNICIPAL_OR_COUNTRY_TYPE_AHEAD';

/** *********************************************************
 * REDUCER
 ********************************************************* */
const initialState = {
    municipalsCache: undefined,
    municipals: [],
    countriesCache: undefined,
    countries: [],
    municipalOrCountry: ''
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case SET_MUNICIPAL_OR_COUNTRY_TYPE_AHEAD:
            return {
                ...state,
                municipalOrCountry: action.value,
                municipals: (state.municipalsCache === undefined || action.value.length === 0)
                    ? [] : state.municipalsCache.filter((municipal) => municipal.name.toLowerCase().startsWith(action.value.toLowerCase())).slice(0, 5),
                countries: (state.countriesCache === undefined || action.value.length === 0)
                    ? [] : state.countriesCache.filter((country) => country.name.toLowerCase().startsWith(action.value.toLowerCase())).slice(0, 5)
            };
        case FETCH_MUNICIPAL_OR_COUNTRY:
            // Skal ikke være mulig å velge Norge, så fjerner Norge fra listen
            const countries = action.response.countries.filter((l) => l.code !== 'NO');
            return {
                ...state,
                municipalsCache: action.response.municipals,
                countriesCache: countries
            };
        case FETCH_MUNICIPAL_OR_COUNTRY_FAILURE:
            return {
                ...state
            };
        default:
            return state;
    }
}

/** *********************************************************
 * ASYNC ACTIONS
 ********************************************************* */
function* fetchMunicipalOrCountry() {
    try {
        const municipals = yield fetchGet(`${AD_API}`);
        const countries = yield fetchGet(`${AD_API}`);
        yield put({ type: FETCH_MUNICIPAL_OR_COUNTRY, response: { countries, municipals } });
    } catch (e) {
        yield put({ type: FETCH_MUNICIPAL_OR_COUNTRY_FAILURE });
    }
}

export const municipalOrCountrySaga = function* () {
    yield takeLatest(FETCH_MUNICIPAL_OR_COUNTRY_BEGIN, fetchMunicipalOrCountry);
};
