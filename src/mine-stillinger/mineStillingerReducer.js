import AdStatusEnum from '../common/enums/AdStatusEnum';

export const FETCH_MY_ADS = 'FETCH_MY_ADS';
export const FETCH_MY_ADS_BEGIN = 'FETCH_MY_ADS_BEGIN';
export const FETCH_MY_ADS_SUCCESS = 'FETCH_MY_ADS_SUCCESS';
export const FETCH_MY_ADS_FAILURE = 'FETCH_MY_ADS_FAILURE';
export const CHANGE_MY_ADS_PAGE = 'CHANGE_MY_ADS_PAGE';
export const RESET_MY_ADS_PAGE = 'RESET_MY_ADS_PAGE';
export const CHANGE_MY_ADS_STATUS_FILTER = 'CHANGE_MY_ADS_STATUS_FILTER';
export const CHANGE_MY_ADS_DEACTIVATED_FILTER = 'CHANGE_MY_ADS_DEACTIVATED_FILTER';
export const CHANGE_MY_ADS_SORTING = 'CHANGE_MY_ADS_SORTING';

const initialState = {
    items: [],
    error: undefined,
    isSearching: false,
    totalElements: 0,
    totalPages: 0,
    page: 0,
    source: 'DIR',
    reportee: '',
    sortField: 'updated',
    sortDir: 'desc',
    filter: {
        status: [AdStatusEnum.ACTIVE, AdStatusEnum.INACTIVE],
    },
    deactivatedByExpiry: false,
};

export default function mineStillingerReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_MY_ADS_BEGIN:
            return {
                ...state,
                isSearching: true,
                error: undefined,
            };
        case FETCH_MY_ADS_SUCCESS:
            return {
                ...state,
                items: action.response.content,
                isSearching: false,
                totalElements: action.response.totalElements,
                totalPages: action.response.totalPages,
            };
        case FETCH_MY_ADS_FAILURE:
            return {
                ...state,
                error: action.error,
                isSearching: false,
            };
        case CHANGE_MY_ADS_STATUS_FILTER:
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
        case CHANGE_MY_ADS_DEACTIVATED_FILTER:
            const status = action.deactivatedByExpiry ? [] : state.filter.status;

            return {
                ...state,
                page: 0,
                filter: {
                    status,
                },
                deactivatedByExpiry: action.deactivatedByExpiry,
            };
        case CHANGE_MY_ADS_PAGE:
            return {
                ...state,
                page: action.page,
            };
        case RESET_MY_ADS_PAGE:
            return {
                ...state,
                page: 0,
            };
        case CHANGE_MY_ADS_SORTING:
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
