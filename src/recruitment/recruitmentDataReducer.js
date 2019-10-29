import { put, take, takeLatest, select } from 'redux-saga/es/effects';

export const SET_NAV_IDENT_REKRUTTERING = 'SET_NAV_IDENT_REKRUTTERING';
export const SET_REKRUTTERING_DATA = 'SET_REKRUTTERING_DATA';


const initialState = {
    overfoertTil: undefined,
    stillingUuid: undefined
}

export default function recruitmentDataReducer(state = initialState, action) {
    switch (action.type) {
        case SET_REKRUTTERING_DATA:
                console.log('SET_REKRUTTERING_DATA', action)
                return action.data;
        case SET_NAV_IDENT_REKRUTTERING:
            return {
                ...state,
                overfoertTil: action.navIdent 
            };
        default:
                return state 
        }
        
    }




