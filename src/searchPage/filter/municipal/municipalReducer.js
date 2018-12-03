import { put, takeLatest } from 'redux-saga/effects';
import { fetchGet } from '../../../api/api';
import { AD_API } from '../../../fasitProperties';
import { RESET_SEARCH } from '../../searchReducer'
/** *********************************************************
 * ACTIONS
 ********************************************************* */

export const FETCH_MUNICIPALS_BEGIN = 'FETCH_MUNUCIPALS_BEGIN';
export const FETCH_MUNICIPALS = 'FETCH_MUNICIPALS';
export const FETCH_MUNICIPALS_FAILURE = 'FETCH_MUNICIPALS_FAILURE';
export const SET_MUNICIPAL_TYPE_AHEAD = 'SET_MUNICIPAL_TYPE_AHEAD';

/** *********************************************************
 * REDUCER
 ********************************************************* */
const initialState = {
    municipalsCache: undefined,
    municipals: [],
    municipal: ''
};

export default function municipalReducer(state = initialState, action) {
    switch (action.type) {
        case SET_MUNICIPAL_TYPE_AHEAD:
            return {
                ...state,
                municipal: action.value,
                municipals: (state.municipalsCache === undefined || action.value.length === 0)
                    ? [] : state.municipalsCache.filter(
                        (municipal) => municipal.name.toLowerCase().startsWith(action.value.toLowerCase())
                    ).slice(0, 5)
            };
        case FETCH_MUNICIPALS:
            return {
                ...state,
                municipalsCache: action.response.municipals
            };
        case FETCH_MUNICIPALS_FAILURE:
            return {
                ...state
            };
        case RESET_SEARCH:
            return {
                ...state,
                municipal: ''
            };
        default:
            return state;
    }
}

/** *********************************************************
 * ASYNC ACTIONS
 ********************************************************* */
function* fetchMunicipals() {
    try {
        const municipals = yield fetchGet(`${AD_API}geography/municipals`);
        yield put({ type: FETCH_MUNICIPALS, response: { municipals } });
    } catch (e) {
        yield put({ type: FETCH_MUNICIPALS_FAILURE });
    }
}

export const municipalSaga = function* () {
    yield takeLatest(FETCH_MUNICIPALS_BEGIN, fetchMunicipals);
};
