
export const SET_SEARCHBOX_TERM = 'SET_SEARCHBOX_TERM';
export const SET_SEARCHBOX_TYPE = 'SET_SEARCHBOX_TYPE';

const initialState = {
    searchTerm: '',
    searchType: 'employer'
};

export default function searchBoxReducer(state = initialState, action) {
    switch (action.type) {
        case SET_SEARCHBOX_TERM:
            return {
                ...state,
                searchTerm: action.searchTerm,
            };
        case SET_SEARCHBOX_TYPE:
            return {
                ...state,
                searchType: action.searchType
            };
        default:
            return state;
    }
}
