export const SET_NAV_IDENT_REKRUTTERING = 'SET_NAV_IDENT_REKRUTTERING';
export const SET_REKRUTTERING_DATA = 'SET_REKRUTTERING_DATA';
export const SET_COMMENT = 'SET_COMMENT';

const initialState = {
    eierNavident: undefined,
    eierNavn: undefined,
    stillingsid: undefined,
};

export default function recruitmentDataReducer(state = initialState, action) {
    switch (action.type) {
        case SET_REKRUTTERING_DATA:
            return action.data;
        case SET_NAV_IDENT_REKRUTTERING:
            return {
                ...state,
                eierNavident: action.navIdent,
                eierNavn: action.displayName,
            };
        case SET_COMMENT:
            return {
                ...state,
                notat: action.comment,
            };
        default:
            return state;
    }
}
