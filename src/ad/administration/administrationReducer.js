export const TOGGLE_REMARKS_FORM = 'TOGGLE_REMARKS_FORM';

const initialState = {
    showRemarksForm: false
};

export default function administratorReducer(state = initialState, action) {
    switch (action.type) {
        case TOGGLE_REMARKS_FORM:
            return {
                ...state,
                showRemarksForm: !state.showRemarksForm
            };
        default:
            return state;
    }
}
