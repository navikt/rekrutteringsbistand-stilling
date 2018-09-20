import { put, takeEvery, select } from 'redux-saga/effects';
import { ApiError, fetchGet } from '../../../api/api';
import { AD_API } from '../../../fasitProperties';
import { FETCH_AD_BEGIN, FETCH_NEXT_AD_BEGIN } from '../../adReducer';

export const FETCH_LOCATIONS = 'FETCH_LOCATIONS';
export const FETCH_LOCATIONS_BEGIN = 'FETCH_LOCATIONS_BEGIN';
export const FETCH_LOCATIONS_SUCCESS = 'FETCH_LOCATIONS_SUCCESS';
export const FETCH_LOCATIONS_FAILURE = 'FETCH_LOCATIONS_FAILURE';
export const SET_LOCATION_TYPE_AHEAD_VALUE = 'SET_LOCATION_TYPE_AHEAD_VALUE';

const initialState = {
    suggestions: [],
    locations: undefined,
    hasFetchedLocations: false
};

export default function locationlCodeReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_LOCATIONS_BEGIN:
            return {
                ...state,
                hasFetchedLocations: true
            };
        case FETCH_LOCATIONS_SUCCESS:
            return {
                ...state,
                locations: action.locations
            };
        case FETCH_LOCATIONS_FAILURE:
            return {
                ...state,
                hasFetchedLocations: false
            };
        case FETCH_AD_BEGIN:
        case FETCH_NEXT_AD_BEGIN:
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
                    ))
            };
        default:
            return state;
    }
}

export function* fetchLocations() {
    const state = yield select();
    try {
        if (!state.location.hasFetchedLocations) {
            yield put({ type: FETCH_LOCATIONS_BEGIN });
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
    } catch (e) {
        if (e instanceof ApiError) {
            yield put({ type: FETCH_LOCATIONS_FAILURE, error: e });
        } else {
            throw e;
        }
    }
}

export function* findLocationByPostalCode(value) {
    let state = yield select();
    if (!state.location.locations) {
        yield put({ type: FETCH_LOCATIONS });
        yield fetchLocations();
    }
    state = yield select();
    if (state.location.locations) {
        return state.location.locations.find((location) => (location.postalCode === value));
    }
    return undefined;
}

export const locationSaga = function* saga() {
    yield takeEvery(FETCH_LOCATIONS, fetchLocations);
};
