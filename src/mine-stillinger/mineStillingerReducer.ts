import { feil, ikkeLastet, lasterInn, Nettressurs, suksess } from '../api/Nettressurs';
import AdStatusEnum from '../common/enums/AdStatusEnum';
import { Rekrutteringsbistandstilling } from '../Stilling';
import { MineStillingerAction, MineStillingerActionType } from './MineStillingerAction';

export type MineStillingerResultat = {
    content: Rekrutteringsbistandstilling[];
    totalElements: number;
    totalPages: number;
};

export type MineStillingerState = {
    resultat: Nettressurs<MineStillingerResultat>;
    page: number;
    sortField: string;
    sortDir: string;
    deactivatedByExpiry: boolean;
    stillingerVeilederHarOvertatt?: string;
    filter: {
        status: string[];
    };
};

const initialState = {
    resultat: ikkeLastet(),
    page: 0,
    sortField: 'updated',
    sortDir: 'desc',
    deactivatedByExpiry: false,
    filter: {
        status: [AdStatusEnum.ACTIVE, AdStatusEnum.INACTIVE],
    },
};

export default function mineStillingerReducer(
    state: MineStillingerState = initialState,
    action: MineStillingerAction
): MineStillingerState {
    switch (action.type) {
        case MineStillingerActionType.FetchMyAdsBegin:
            return {
                ...state,
                resultat: lasterInn(),
            };
        case MineStillingerActionType.FetchMyAdsSuccess:
            return {
                ...state,
                resultat: suksess(action.response),
            };
        case MineStillingerActionType.FetchMyAdsFailure:
            return {
                ...state,
                resultat: feil(action.error),
            };
        case MineStillingerActionType.ChangeMyAdsStatusFilter:
            const deactivatedByExpiry =
                action.status.length > 0 ? false : state.deactivatedByExpiry;

            return {
                ...state,
                page: 0,
                filter: {
                    status: action.status,
                },
                deactivatedByExpiry,
            };
        case MineStillingerActionType.ChangeMyAdsDeactivatedFilter:
            const status = action.deactivatedByExpiry ? [] : state.filter.status;

            return {
                ...state,
                page: 0,
                filter: {
                    status,
                },
                deactivatedByExpiry: action.deactivatedByExpiry,
            };
        case MineStillingerActionType.ChangeMyAdsPage:
            return {
                ...state,
                page: action.page,
            };
        case MineStillingerActionType.ResetMyAdsPage:
            return {
                ...state,
                page: 0,
            };
        case MineStillingerActionType.ChangeMyAdsSorting:
            return {
                ...state,
                page: 0,
                sortField: action.field,
                sortDir: action.dir,
            };
        case MineStillingerActionType.SetStillingerVeilederHarOvertatt:
            return {
                ...state,
                stillingerVeilederHarOvertatt: action.stillingerVeilederHarOvertatt,
            };

        default:
            return state;
    }
}
