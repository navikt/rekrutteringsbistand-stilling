import { put, takeLatest } from 'redux-saga/effects';
import { fetchGet } from '../../../api/api';
import { AD_API } from '../../../fasitProperties';
import { RESET_SEARCH } from '../../searchReducer';

/** *********************************************************
 * ACTIONS
 ********************************************************* */

export const FETCH_FILTER_LOCATIONS_BEGIN = 'FETCH_FILTER_LOCATIONS_BEGIN';
export const FETCH_FILTER_LOCATIONS = 'FETCH_FILTER_LOCATIONS';
export const FETCH_FILTER_LOCATIONS_FAILURE = 'FETCH_FILTER_LOCATIONS_FAILURE';
export const SET_FILTER_LOCATION_TYPE_AHEAD = 'SET_FILTER_LOCATION_TYPE_AHEAD';

/** *********************************************************
 * REDUCER
 ********************************************************* */
const initialState = {
    municipalsCache: undefined,
    municipals: [],
    typeaheadValue: '',
    countiesCache: undefined,
    counties: []
};

export default function filterLocationReducer(state = initialState, action) {
    switch (action.type) {
        case SET_FILTER_LOCATION_TYPE_AHEAD:
            return {
                ...state,
                typeaheadValue: action.value,
                municipals: (state.municipalsCache === undefined || action.value.length === 0)
                    ? [] : state.municipalsCache.filter(
                        (municipal) => municipal.name.toLowerCase().startsWith(action.value.toLowerCase())
                    ).slice(0, 5),
                counties: (state.countiesCache === undefined || action.value.length === 0)
                    ? [] : state.countiesCache.filter((county) => county.name.toLowerCase().startsWith(action.value.toLowerCase())).slice(0, 5)
            };
        case FETCH_FILTER_LOCATIONS:
            return {
                ...state,
                municipalsCache: action.response.municipals,
                countiesCache: action.response.counties
            };
        case FETCH_FILTER_LOCATIONS_FAILURE:
            return {
                ...state
            };
        case RESET_SEARCH:
            return {
                ...state,
                typeaheadValue: ''
            };
        default:
            return state;
    }
}

/** *********************************************************
 * ASYNC ACTIONS
 ********************************************************* */
function* fetchFilterLocations() {
    try {
        const municipals = yield fetchGet(`${AD_API}geography/municipals`);
        const counties = yield fetchGet(`${AD_API}geography/counties`);
        yield put({ type: FETCH_FILTER_LOCATIONS, response: { municipals, counties } });
    } catch (e) {
        yield put({ type: FETCH_FILTER_LOCATIONS_FAILURE });
    }
}

export const filterLocationSaga = function* () {
    yield takeLatest(FETCH_FILTER_LOCATIONS_BEGIN, fetchFilterLocations);
};
