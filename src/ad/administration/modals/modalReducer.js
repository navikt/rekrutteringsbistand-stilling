export const OPEN_MODAL = 'OPEN_MODAL';
export const CLOSE_MODAL = 'CLOSE_MODAL';


const initialState = {
    modalOpen: false
};

export default function modalReducer(state = initialState, action) {
    switch(action.type) {
        case OPEN_MODAL:
            return {
                ...state,
                modalOpen: true
            };
        case CLOSE_MODAL:
            return {
                ...state,
                modalOpen: false
            };
        default:
            return state;
    }
}
