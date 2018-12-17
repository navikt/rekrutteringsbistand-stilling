import { put, takeLatest } from 'redux-saga/effects';
import {
    fetchKandidatliste,
    fetchKandidatMedFnr,
    postKandidatTilKandidatliste,
    putKandidatliste
} from './kandidatApi';
import { ApiError } from '../../api/api';

export const Hentestatus = {
    IKKE_HENTET: 'IKKE_HENTET',
    FINNES_IKKE: 'FINNES_IKKE',
    LOADING: 'LOADING',
    SUCCESS: 'SUCCESS',
    FAILURE: 'FAILURE'
};

export const Lagrestatus = {
    LOADING: 'LOADING',
    UNSAVED: 'UNSAVED',
    SUCCESS: 'SUCCESS'
};

const initialState = {
    detaljer: {
        fetching: false,
        kandidatliste: undefined
    },
    error: undefined,
    fodselsnummer: undefined,
    kandidatStatus: Hentestatus.IKKE_HENTET,
    kandidatlisteStatus: Hentestatus.IKKE_HENTET,
    kandidat: {
        arenaKandidatnr: undefined,
        fornavn: undefined,
        etternavn: undefined,
        mestRelevanteYrkesErfaring: {
            styrkKodeStillingstittel: undefined,
            yrkeserfaringManeder: undefined
        }
    },
    lagreStatus: Lagrestatus.UNSAVED
};

export const HENT_KANDIDAT_MED_FNR = 'HENT_KANDIDAT_MED_FNR';
export const HENT_KANDIDAT_MED_FNR_FAILURE = 'HENT_KANDIDAT_MED_FNR_FAILURE';
export const HENT_KANDIDAT_MED_FNR_NOT_FOUND = 'HENT_KANDIDAT_MED_FNR_NOT_FOUND';
export const HENT_KANDIDAT_MED_FNR_RESET = 'HENT_KANDIDAT_MED_FNR_RESET';
export const HENT_KANDIDAT_MED_FNR_SUCCESS = 'HENT_KANDIDAT_MED_FNR_SUCCESS';
export const HENT_KANDIDATLISTE = 'HENT_KANDIDATLISTE';
export const HENT_KANDIDATLISTE_FAILURE = 'HENT_KANDIDATLISTE_FAILURE';
export const HENT_KANDIDATLISTE_NOT_FOUND = 'HENT_KANDIDATLISTE_NOT_FOUND';
export const HENT_KANDIDATLISTE_SUCCESS = 'HENT_KANDIDATLISTE_SUCCESS';
export const KANDIDAT_ERROR = 'KANDIDAT_ERROR';
export const LEGG_TIL_KANDIDAT = 'LEGG_TIL_KANDIDAT';
export const LEGG_TIL_KANDIDAT_FAILURE = 'LEGG_TIL_KANDIDAT_FAILURE';
export const LEGG_TIL_KANDIDAT_SUCCESS = 'LEGG_TIL_KANDIDAT_SUCCESS';
export const SET_FODSELSNUMMER = 'SET_FODSELSNUMMER';

export default function kandidatReducer(state = initialState, action) {
    switch (action.type) {
        case HENT_KANDIDAT_MED_FNR:
            return {
                ...state,
                henteStatus: Hentestatus.LOADING
            };
        case HENT_KANDIDAT_MED_FNR_RESET:
            return {
                ...state,
                kandidatStatus: Hentestatus.IKKE_HENTET,
                kandidat: initialState.kandidat
            };
        case HENT_KANDIDAT_MED_FNR_SUCCESS:
            return {
                ...state,
                kandidatStatus: Hentestatus.SUCCESS,
                kandidat: action.kandidat
            };
        case HENT_KANDIDAT_MED_FNR_NOT_FOUND:
            return {
                ...state,
                kandidatStatus: Hentestatus.FINNES_IKKE
            };
        case HENT_KANDIDAT_MED_FNR_FAILURE:
            return {
                ...state,
                kandidatStatus: Hentestatus.FAILURE
            };
        case HENT_KANDIDATLISTE:
            return {
                ...state,
                detaljer: {
                    ...state.detaljer,
                    fetching: true
                }
            };
        case HENT_KANDIDATLISTE_FAILURE:
            return {
                ...state,
                kandidatlisteStatus: Hentestatus.FAILURE,
                detaljer: {
                    ...state.detaljer,
                    fetching: false
                }
            };
        case HENT_KANDIDATLISTE_NOT_FOUND:
            return {
                ...state,
                kandidatlisteStatus: Hentestatus.FINNES_IKKE
            };
        case HENT_KANDIDATLISTE_SUCCESS:
            return {
                ...state,
                kandidatlisteStatus: Hentestatus.SUCCESS,
                detaljer: {
                    ...state.detaljer,
                    kandidatliste: action.kandidatliste,
                    fetching: false
                }
            };
        case KANDIDAT_ERROR:
            return {
                ...state,
                error: action.error
            };
        case LEGG_TIL_KANDIDAT:
            return {
                ...state,
                lagreStatus: Lagrestatus.LOADING
            };
        case LEGG_TIL_KANDIDAT_SUCCESS:
            return {
                ...state,
                lagreStatus: Lagrestatus.SUCCESS
            };
        case LEGG_TIL_KANDIDAT_FAILURE:
            return {
                ...state,
                lagreStatus: Lagrestatus.FAILURE
            };
        case SET_FODSELSNUMMER:
            return {
                ...state,
                fodselsnummer: action.fodselsnummer
            };
        default:
            return state;
    }
};

function* hentKandidatliste({ stillingsnummer }) {
    try {
        const kandidatliste = yield fetchKandidatliste(stillingsnummer);
        yield put({ type: HENT_KANDIDATLISTE_SUCCESS, kandidatliste });
    } catch (e) {
        if (e instanceof ApiError) {
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
        if (e instanceof ApiError) {
            if (e.status === 404) {
                yield put({ type: HENT_KANDIDAT_MED_FNR_NOT_FOUND });
            } else {
                yield put({ type: HENT_KANDIDAT_MED_FNR_FAILURE, error: e });
            }
        }
    }
}

function* leggTilKandidat({ id, kandidat }) {
    try {
        const response = yield postKandidatTilKandidatliste(id, kandidat);
        yield put({ type: LEGG_TIL_KANDIDAT_SUCCESS, kandidatliste: response });
    } catch (e) {
        if (e instanceof ApiError) {
            yield put({ type: LEGG_TIL_KANDIDAT_FAILURE, error: e});
        }
    }
}

function* opprettKandidatlisteForStilling(stillingsnummer, error) {
    try {
        yield putKandidatliste(stillingsnummer);
        const kandidatliste = yield fetchKandidatliste(stillingsnummer);
        yield put({ type: HENT_KANDIDATLISTE_SUCCESS, kandidatliste });
    } catch (e) {
        if (e instanceof ApiError) {
            yield put({ type: HENT_KANDIDATLISTE_FAILURE, error });
        }
    }
}

function* sjekkError({ error }) {
    yield put({ type: KANDIDAT_ERROR, error });
}

export function* kandidatSaga() {
    yield takeLatest(HENT_KANDIDATLISTE, hentKandidatliste);
    yield takeLatest(HENT_KANDIDAT_MED_FNR, hentKandidatMedFnr);
    yield takeLatest(LEGG_TIL_KANDIDAT, leggTilKandidat);
    yield takeLatest([
        HENT_KANDIDAT_MED_FNR_FAILURE,
        HENT_KANDIDATLISTE_FAILURE,
        LEGG_TIL_KANDIDAT_FAILURE
    ], sjekkError);
}
