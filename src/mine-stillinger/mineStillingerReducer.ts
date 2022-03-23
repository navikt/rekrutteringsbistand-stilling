import { ApiError } from '../api/apiUtils';
import AdStatusEnum from '../common/enums/AdStatusEnum';
import { Rekrutteringsbistandstilling } from '../Stilling';
import { MineStillingerAction, MineStillingerActionType } from './MineStillingerAction';

export type MineStillingerResultat = {
    content: Rekrutteringsbistandstilling[];
    totalElements: number;
    totalPages: number;
};

export type MineStillingerState = {
    error?: ApiError;
    isSearching: boolean;
    page: number;
    deactivatedByExpiry: boolean;
    sortField: string;
    sortDir: string;
    filter: {
        status: string[];
    };

    items: Rekrutteringsbistandstilling[];
    totalElements: number;
    totalPages: number;
};

const initialState = {
    items: [],
    error: undefined,
    isSearching: false,
    totalElements: 0,
    totalPages: 0,
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
                isSearching: true,
                error: undefined,
            };
        case MineStillingerActionType.FetchMyAdsSuccess:
            return {
                ...state,
                items: action.response.content,
                isSearching: false,
                totalElements: action.response.totalElements,
                totalPages: action.response.totalPages,
            };
        case MineStillingerActionType.FetchMyAdsFailure:
            return {
                ...state,
                error: action.error,
                isSearching: false,
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
        default:
            return state;
    }
}
