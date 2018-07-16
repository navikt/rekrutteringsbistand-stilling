
export const SET_SEARCHBOX_VALUE = 'SET_SEARCHBOX_VALUE';

const initialState = {
    value: ''
};

export default function searchBoxReducer(state = initialState, action) {
    switch (action.type) {
        case SET_SEARCHBOX_VALUE:
            return {
                ...state,
                value: action.value
            };
        default:
            return state;
    }
}
