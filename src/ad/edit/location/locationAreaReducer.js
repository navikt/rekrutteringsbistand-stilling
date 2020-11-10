import { put, takeLatest } from 'redux-saga/effects';
import { fetchGet } from '../../../api/api';
import { AD_API } from '../../../fasitProperties';
import { ADD_LOCATION_AREA } from '../../adDataReducer';

/** *********************************************************
 * ACTIONS
 ********************************************************* */

export const FETCH_LOCATION_AREA_BEGIN = 'FETCH_LOCATION_AREA_BEGIN';
export const FETCH_LOCATION_AREA_SUCCESS = 'FETCH_LOCATION_AREA_SUCCESS';
export const FETCH_LOCATION_AREA_FAILURE = 'FETCH_LOCATION_AREA_FAILURE';

export const SET_LOCATION_AREA_TYPEAHEAD = 'SET_LOCATION_AREA_TYPEAHEAD';

/** *********************************************************
 * REDUCER
 ********************************************************* */
const initialState = {
    municipalsCountiesCache: undefined,
    municipalsCounties: [],
    countriesCache: undefined,
    countries: [],
    typeaheadValue: '',
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case ADD_LOCATION_AREA:
            return {
                ...state,
                municipalsCounties: [],
                countries: [],
                typeaheadValue: '',
            };
        case SET_LOCATION_AREA_TYPEAHEAD:
            return {
                ...state,
                typeaheadValue: action.value,
                municipalsCounties:
                    state.municipalsCountiesCache === undefined || action.value.length === 0
                        ? []
                        : state.municipalsCountiesCache
                              .filter((mc) =>
                                  mc.name.toLowerCase().startsWith(action.value.toLowerCase())
                              )
                              .slice(0, 5),
                countries:
                    state.countriesCache === undefined || action.value.length === 0
                        ? []
                        : state.countriesCache
                              .filter((country) =>
                                  country.name.toLowerCase().startsWith(action.value.toLowerCase())
                              )
                              .slice(0, 5),
            };
        case FETCH_LOCATION_AREA_SUCCESS: {
            // Skal ikke være mulig å velge Norge, så fjerner Norge fra listen
            const countries = action.response.countries.filter((l) => l.code !== 'NO');

            // Fjerner fylker som også er i kommuner: Jan Mayen (22) + Oslo (03)
            const municipalsCounties = action.response.municipalsCounties.filter(
                (c) => c.code !== '22' && c.code !== '03'
            );

            return {
                ...state,
                municipalsCountiesCache: municipalsCounties,
                countriesCache: countries,
            };
        }
        case FETCH_LOCATION_AREA_FAILURE:
            return {
                ...state,
            };
        default:
            return state;
    }
}

/** *********************************************************
 * ASYNC ACTIONS
 ********************************************************* */
function* fetchLocationArea() {
    try {
        const municipals = yield fetchGet(`${AD_API}/geography/municipals`);
        const countries = yield fetchGet(`${AD_API}/geography/countries`);
        const counties = yield fetchGet(`${AD_API}/geography/counties`);
        const municipalsCounties = municipals.concat(counties);

        const sortedMunicipalsCounties = municipalsCounties.sort((a, b) => {
            if (a.name < b.name) return -1;
            if (a.name > b.name) return 1;
            return 0;
        });

        const sortedCountries = countries.sort((a, b) => {
            if (a.name < b.name) return -1;
            if (a.name > b.name) return 1;
            return 0;
        });

        yield put({
            type: FETCH_LOCATION_AREA_SUCCESS,
            response: { countries: sortedCountries, municipalsCounties: sortedMunicipalsCounties },
        });
    } catch (e) {
        yield put({ type: FETCH_LOCATION_AREA_FAILURE });
    }
}

export const locationAreaSaga = function* () {
    yield takeLatest(FETCH_LOCATION_AREA_BEGIN, fetchLocationArea);
};
