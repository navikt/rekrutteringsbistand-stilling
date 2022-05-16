import { PreloadedState } from 'redux';
import { store } from '../App';
import { State } from './store';

export const lagreStateILocalStorage = () => {
    const state = store.getState();
    localStorage.setItem('state', JSON.stringify(state));
};

export const hentStateFraLocalStorage = (): PreloadedState<State> | undefined => {
    const appState = localStorage.getItem('state');
    if (appState === null) {
        console.warn('Fant ingen state i local storage');
        return undefined;
    }

    localStorage.removeItem('state');
    const stateFraLocalStorage = JSON.parse(appState);

    console.warn('Henter state fra local storage', stateFraLocalStorage);

    return stateFraLocalStorage;
};
