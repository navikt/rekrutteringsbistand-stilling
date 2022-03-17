import { put, takeLatest, delay } from 'redux-saga/effects';
import { sendEvent } from '../../amplitude';
import {
    fetchKandidatliste,
    fetchKandidatMedFnr,
    KandidatSokError,
    postKandidatTilKandidatliste,
    putKandidatliste,
} from './kandidatApi';

export const KandidatAlertStripeMode = {
    SAVED: 'SAVED',
    INACTIVE: 'INACTIVE',
    FAILURE: 'FAILURE',
};

const initialState = {
    showAlertStripe: false,
    alertStripeMode: KandidatAlertStripeMode.INACTIVE,
};

const SHOW_SAVED_KANDIDAT_ALERT_STRIPE = 'SHOW_SAVED_KANDIDAT_ALERT_STRIPE';
const HIDE_SAVED_KANDIDAT_ALERT_STRIPE = 'HIDE_SAVED_KANDIDAT_ALERT_STRIPE';

export default function kandidatReducer(state = initialState, action) {
    switch (action.type) {
        case SHOW_SAVED_KANDIDAT_ALERT_STRIPE:
            return {
                ...state,
                showAlertStripe: true,
                alertStripeMode: action.mode,
            };
        case HIDE_SAVED_KANDIDAT_ALERT_STRIPE:
            return {
                ...state,
                showAlertStripe: false,
                alertStripeMode: KandidatAlertStripeMode.INACTIVE,
            };
        default:
            return state;
    }
}

/*
function* hentKandidatliste({ stillingsnummer }) {
    try {
        const kandidatliste = yield fetchKandidatliste(stillingsnummer);
        yield put({ type: HENT_KANDIDATLISTE_SUCCESS, kandidatliste });
    } catch (e) {
        if (e instanceof KandidatSokError) {
            if (e.status === 404) {
                yield opprettKandidatlisteForStilling(stillingsnummer, e);
            } else {
                yield put({ type: HENT_KANDIDATLISTE_FAILURE, error: e });
            }
        }
    }
}

function* hentKandidatMedFnr({ fodselsnummer }) {
    try {
        const response = yield fetchKandidatMedFnr(fodselsnummer);
        yield put({ type: HENT_KANDIDAT_MED_FNR_SUCCESS, kandidat: response });
    } catch (e) {
        if (e instanceof KandidatSokError) {
            if (e.status === 404) {
                sendEvent('fødselsnummersøk', 'fant-ingen-kandidat', {
                    kontekst: 'stilling',
                });

                yield put({ type: HENT_KANDIDAT_MED_FNR_NOT_FOUND });
            } else {
                yield put({ type: HENT_KANDIDAT_MED_FNR_FAILURE, error: e });
            }
        }
    }
}

function* leggTilKandidat({ kandidatlisteId, kandidat }) {
    try {
        const response = yield postKandidatTilKandidatliste(kandidatlisteId, kandidat);
        yield put({ type: LEGG_TIL_KANDIDAT_SUCCESS, kandidatliste: response });
        yield showAlertStripe(KandidatAlertStripeMode.SAVED);
    } catch (e) {
        if (e instanceof KandidatSokError) {
            yield put({ type: LEGG_TIL_KANDIDAT_FAILURE, error: e });
        }
        yield showAlertStripe(KandidatAlertStripeMode.FAILURE);
    }
}
function* opprettKandidatlisteForStilling(stillingsnummer, error) {
    try {
        yield putKandidatliste(stillingsnummer);
        const kandidatliste = yield fetchKandidatliste(stillingsnummer);
        yield put({ type: HENT_KANDIDATLISTE_SUCCESS, kandidatliste });
    } catch (e) {
        if (e instanceof KandidatSokError) {
            yield put({ type: HENT_KANDIDATLISTE_FAILURE, error });
        }
    }
}

*/

/*
function* sjekkError({ error }) {
    yield put({ type: KANDIDAT_ERROR, error });
}
*/
export function* showAlertStripe(mode) {
    yield put({ type: SHOW_SAVED_KANDIDAT_ALERT_STRIPE, mode });
    yield delay(3000);
    yield put({ type: HIDE_SAVED_KANDIDAT_ALERT_STRIPE });
}

export function* kandidatSaga() {
    // yield takeLatest(HENT_KANDIDATLISTE, hentKandidatliste);
    // yield takeLatest(HENT_KANDIDAT_MED_FNR, hentKandidatMedFnr);
    // yield takeLatest(LEGG_TIL_KANDIDAT, leggTilKandidat);
    // yield takeLatest(
    //     [HENT_KANDIDAT_MED_FNR_FAILURE, HENT_KANDIDATLISTE_FAILURE, LEGG_TIL_KANDIDAT_FAILURE],
    //     sjekkError
    // );
}
