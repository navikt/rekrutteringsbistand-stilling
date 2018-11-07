export const EXPAND_COMMENT = 'EXPAND_COMMENT';
export const COLLAPSE_COMMENT = 'COLLAPSE_COMMENT';

const initialState = {
    isCommentExpanded: false
};

export default function expandCommentReducer(state = initialState, action) {
    switch (action.type) {
        case EXPAND_COMMENT: {
            return {
                ...state,
                isCommentExpanded: true
            };
        }

        case COLLAPSE_COMMENT: {
            return {
                ...state,
                isCommentExpanded: false
            };
        }
        default:
            return state;
    }
}
