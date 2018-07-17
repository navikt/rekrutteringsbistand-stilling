
export const CHANGE_SOURCE_FILTER = 'CHANGE_SOURCE_FILTER';
export const CHANGE_STATUS_FILTER = 'CHANGE_STATUS_FILTER';

const initialState = {
    source: '',
    administrationStatus: ''
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
        default:
            return state;
    }
}
