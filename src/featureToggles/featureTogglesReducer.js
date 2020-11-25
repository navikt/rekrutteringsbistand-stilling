import { takeEvery, put } from 'redux-saga/effects';
import { API_URL, fetchGet } from '../api/api';

export const FETCH_FEATURE_TOGGLES = 'FETCH_FEATURE_TOGGLES';
const FETCH_FEATURE_TOGGLES_COMPLETE = 'FETCH_FEATURE_TOGGLES_COMPLETE';

const initialState = {};

const featureTogglesReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_FEATURE_TOGGLES_COMPLETE: {
            return action.featureToggles;
        }

        default:
            return state;
    }
};

function* hentFeatureToggles() {
    // eslint-disable-next-line
    const alleFeatures = yield Promise.all(
        [].map((feature) => fetchGet(`${API_URL}/features/${feature}`))
    );

    const featureToggles = {};

    yield put({ type: FETCH_FEATURE_TOGGLES_COMPLETE, featureToggles });
}

export function* featureTogglesSaga() {
    yield takeEvery(FETCH_FEATURE_TOGGLES, hentFeatureToggles);
}

export default featureTogglesReducer;
