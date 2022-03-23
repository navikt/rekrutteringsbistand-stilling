import { put, select, takeLatest } from 'redux-saga/effects';
import { hentStillingsinfoForStillingerSomEiesAvVeileder, hentMineStillinger } from '../api/api';
import { ApiError } from '../api/apiUtils';
import { getReportee } from '../reportee/reporteeReducer';
import { Stillingsinfo } from '../Stilling';
import {
    FETCH_MY_ADS_BEGIN,
    FETCH_MY_ADS_SUCCESS,
    FETCH_MY_ADS_FAILURE,
    RESET_MY_ADS_PAGE,
    CHANGE_MY_ADS_STATUS_FILTER,
    CHANGE_MY_ADS_DEACTIVATED_FILTER,
    CHANGE_MY_ADS_PAGE,
    FETCH_MY_ADS,
    CHANGE_MY_ADS_SORTING,
} from './mineStillingerReducer';

const INGEN_AVVISTE_ELLER_SLETTEDE = '!REJECTED,DELETED';

function* getMyAds() {
    try {
        yield put({ type: FETCH_MY_ADS_BEGIN });

        const reportee = yield getReportee();
        const state = yield select();

        const stillingsinfoForStillingerVeilederHarOvertatt: Stillingsinfo[] =
            yield hentStillingsinfoForStillingerSomEiesAvVeileder(reportee.navIdent);

        const stillingerVeilederHarOvertatt = stillingsinfoForStillingerVeilederHarOvertatt
            .map((info) => info.stillingsid)
            .join(',');

        const search = {
            ...state.mineStillinger,
            navIdent: (reportee.navIdent || '').toLowerCase(),
            reportee: reportee.displayName,
            uuid: stillingerVeilederHarOvertatt,
        };

        const query = toQuery(search);
        const response = yield hentMineStillinger(query);

        yield put({ type: FETCH_MY_ADS_SUCCESS, response });
    } catch (e) {
        if (e instanceof ApiError) {
            yield put({ type: FETCH_MY_ADS_FAILURE, error: e });
        } else {
            throw e;
        }
    }
}

export function toQuery(search: any) {
    const { navIdent, reportee, filter, page, deactivatedByExpiry, sortField, sortDir, uuid } =
        search;
    const { status } = filter;

    const query = {
        sort: `${sortField},${sortDir}`,
        page,
        navIdent,
        reportee,
        deactivatedByExpiry,
        uuid,
        // Hvis ingen annen status er valgt, utelat avviste og slettede stillinger
        status: status.length === 0 ? INGEN_AVVISTE_ELLER_SLETTEDE : status,
    };

    return query;
}

function* resetMyAdsPage() {
    yield put({ type: RESET_MY_ADS_PAGE });
}

export const mineStillingerSaga = function* saga() {
    yield takeLatest(
        [
            CHANGE_MY_ADS_STATUS_FILTER,
            CHANGE_MY_ADS_DEACTIVATED_FILTER,
            CHANGE_MY_ADS_PAGE,
            FETCH_MY_ADS,
            CHANGE_MY_ADS_SORTING,
        ],
        getMyAds
    );
    yield takeLatest([CHANGE_MY_ADS_STATUS_FILTER, CHANGE_MY_ADS_SORTING], resetMyAdsPage);
};
