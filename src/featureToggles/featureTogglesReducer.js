import { fetchGet } from '../api/api';
import { REKRUTTERINGSBISTAND_BASE_URL } from '../fasitProperties';
import { takeEvery, put } from 'redux-saga/effects';

const FEATURE_OPPRETT_KANDIDATLISTE_KNAPP = 'rekrutteringsbistand.opprett-kandidatliste-knapp';
const FEATURE_VIS_NYHETER = 'rekrutteringsbistand.vis-nyheter';
const FEATURE_NY_DEKORATØR = 'rekrutteringsbistand.ny-dekorator';

export const FETCH_FEATURE_TOGGLES = 'FETCH_FEATURE_TOGGLES';
const FETCH_FEATURE_TOGGLES_COMPLETE = 'FETCH_FEATURE_TOGGLES_COMPLETE';

const initialState = {
    opprettKandidatlisteKnapp: false,
    nyDekoratør: false,
};

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
    const alleFeatures = yield Promise.all(
        [
            FEATURE_OPPRETT_KANDIDATLISTE_KNAPP,
            FEATURE_VIS_NYHETER,
            FEATURE_NY_DEKORATØR,
        ].map((feature) => fetchGet(`${REKRUTTERINGSBISTAND_BASE_URL}/features/${feature}`))
    );

    const featureToggles = {
        opprettKandidatlisteKnapp: alleFeatures[0],
        visNyheter: alleFeatures[1],
        nyDekoratør: alleFeatures[2],
    };

    yield put({ type: FETCH_FEATURE_TOGGLES_COMPLETE, featureToggles });
}

export function* featureTogglesSaga() {
    yield takeEvery(FETCH_FEATURE_TOGGLES, hentFeatureToggles);
}

export default featureTogglesReducer;
