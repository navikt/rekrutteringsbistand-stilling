export const SET_PROCESSING_STATUS = 'SET_PROCESSING_STATUS';

const initialState = {
    processingStatus: undefined,
    error: undefined
};

export default function processingReducer(state = initialState, action) {
    switch (action.type) {
        case SET_PROCESSING_STATUS:
            return {
                ...state,
                processingStatus: action.status
            };
        default:
            return state;
    }
}

export const processingSaga = function* saga() {
};
