import { fetchGet } from '../api/api';
import { REKRUTTERING_API } from '../fasitProperties';
import { takeEvery, put } from 'redux-saga/effects';

const FEATURE_OPPRETT_KANDIDATLISTE_KNAPP = 'rekrutteringsbistand.opprett-kandidatliste-knapp';

export const FETCH_FEATURE_TOGGLES = 'FETCH_FEATURE_TOGGLES';
const FETCH_FEATURE_TOGGLES_COMPLETE = 'FETCH_FEATURE_TOGGLES_COMPLETE';

const initialState = {
    opprettKandidatlisteKnapp: false,
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
    const baseUrl = REKRUTTERING_API.substring(0, 46);

    const opprettKandidatlisteKnapp = yield fetchGet(
        `${baseUrl}/features/${FEATURE_OPPRETT_KANDIDATLISTE_KNAPP}`
    );

    const featureToggles = {
        opprettKandidatlisteKnapp,
    };

    yield put({ type: FETCH_FEATURE_TOGGLES_COMPLETE, featureToggles });
}

export function* featureTogglesSaga() {
    yield takeEvery(FETCH_FEATURE_TOGGLES, hentFeatureToggles);
}

export default featureTogglesReducer;
