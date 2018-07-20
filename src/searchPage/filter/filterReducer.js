
export const CHANGE_SOURCE_FILTER = 'CHANGE_SOURCE_FILTER';
export const CHANGE_STATUS_FILTER = 'CHANGE_STATUS_FILTER';
export const CHANGE_SEARCH_EMPLOYER = 'CHANGE_SEARCH_EMPLOYER';
export const CHANGE_SEARCH_TITLE = 'CHANGE_SEARCH_TITLE';

const initialState = {
    source: undefined,
    administrationStatus: undefined,
    employerName: undefined,
    title: undefined
};

export default function filterReducer(state = initialState, action) {
    switch (action.type) {
        case CHANGE_SOURCE_FILTER:
            return {
                ...state,
                source: action.value
            };
        case CHANGE_STATUS_FILTER:
            return {
                ...state,
                administrationStatus: action.value
            };
        case CHANGE_SEARCH_EMPLOYER:
            return {
                ...state,
                title: undefined,
                employerName: action.employer
            };
        case CHANGE_SEARCH_TITLE:
            return {
                ...state,
                title: action.title,
                employerName: undefined
            };
        default:
            return state;
    }
}
