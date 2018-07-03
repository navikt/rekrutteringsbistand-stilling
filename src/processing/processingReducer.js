export const SET_PROCESSING_STATUS = 'SET_PROCESSING_STATUS';
export const CHECK_REJECT = 'CHECK_REJECT';
export const UNCHECK_REJECT = 'UNCHECK_REJECT';

const initialState = {
    processingStatus: undefined,
    error: undefined,
    checkedReject: []
};

export default function processingReducer(state = initialState, action) {
    switch (action.type) {
        case SET_PROCESSING_STATUS:
            return {
                ...state,
                processingStatus: action.status
            };
        case CHECK_REJECT:
            return {
                ...state,
                checkedReject: [
                    ...state.checkedReject,
                    action.value
                ]
            };
        case UNCHECK_REJECT:
            return {
                ...state,
                checkedReject: state.checkedReject.filter((m) => (m !== action.value))
            };
        default:
            return state;
    }
}

export const processingSaga = function* saga() {
};
