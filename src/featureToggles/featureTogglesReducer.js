import { takeEvery, put } from 'redux-saga/effects';
import { stillingApi } from '../api/api';
import { fetchGet } from '../api/apiUtils';

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
        [].map((feature) => fetchGet(`${stillingApi}/features/${feature}`))
    );

    const featureToggles = {};

    yield put({ type: FETCH_FEATURE_TOGGLES_COMPLETE, featureToggles });
}

export function* featureTogglesSaga() {
    yield takeEvery(FETCH_FEATURE_TOGGLES, hentFeatureToggles);
}

export default featureTogglesReducer;
