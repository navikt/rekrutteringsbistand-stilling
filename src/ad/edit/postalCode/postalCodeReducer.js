import { put, takeLatest, select } from 'redux-saga/effects';
import { fetchGet } from '../../../api/api';
import { AD_API } from '../../../fasitProperties';
import { FETCH_AD_BEGIN } from '../../adReducer';

export const FETCH_LOCATIONS = 'FETCH_LOCATIONS';
export const FETCH_LOCATIONS_SUCCESS = 'FETCH_LOCATIONS_SUCCESS';
export const SET_LOCATION_TYPE_AHEAD_VALUE = 'SET_LOCATION_TYPE_AHEAD_VALUE';

const initialState = {
    suggestions: [],
    locations: undefined
};

export default function postalCodeReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_LOCATIONS_SUCCESS:
            return {
                ...state,
                locations: action.locations
            };
        case FETCH_AD_BEGIN:
            return {
                ...state,
                suggestions: []
            };
        case SET_LOCATION_TYPE_AHEAD_VALUE:
            return {
                ...state,
                suggestions: (state.locations === undefined || action.value.length === 0) ? [] :
                    state.locations.filter(((location) =>
                        location.city.toLowerCase().startsWith(action.value.toLowerCase()) ||
                        location.postalCode.startsWith(action.value)
                    )).slice(0, 10)
            };
        default:
            return state;
    }
}

export function* fetchLocations() {
    const state = yield select();
    if (!state.postalCode.locations) {
        const response = yield fetchGet(`${AD_API}postdata/`);
        const sorted = response.sort((a, b) => {
            if (a.city < b.city) return -1;
            if (a.city > b.city) return 1;
            if (a.postalCode < b.postalCode) return -1;
            if (a.postalCode > b.postalCode) return 1;
            return 0;
        });
        yield put({ type: FETCH_LOCATIONS_SUCCESS, locations: sorted });
    }
}

export function* findLocationByPostalCode(value) {
    let state = yield select();
    if (!state.postalCode.locations) {
        yield put({ type: FETCH_LOCATIONS });
    }
    state = yield select();
    if (state.postalCode.locations) {
        return state.postalCode.locations.find((location) => (location.postalCode === value));
    }
    return undefined;
}

export const postalCodeSaga = function* saga() {
    yield takeLatest(FETCH_LOCATIONS, fetchLocations);
};
