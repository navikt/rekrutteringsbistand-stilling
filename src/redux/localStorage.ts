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
        return undefined;
    }

    localStorage.removeItem('state');
    const stateFraLocalStorage = JSON.parse(appState);

    return stateFraLocalStorage;
};

const hentKeyForStillingsendring = (stillingsId: string) => `stillingsendringer.${stillingsId}`;

export const lagreStillingsendringerILocalStorage = () => {
    const state = store.getState();

    const stillingsendringer = {
        stilling: state.adData,
        stillingsinfo: state.stillingsinfoData,
    };

    localStorage.setItem(
        hentKeyForStillingsendring(state.adData.uuid),
        JSON.stringify(stillingsendringer)
    );
};

export const gjenopprettStillingsendringerFraLocalStorage = () => {
    const state = store.getState();
    const stillingsId = state.adData.uuid;
    const stillingsendringer = localStorage.getItem(hentKeyForStillingsendring(stillingsId));

    if (stillingsendringer === null) {
        return undefined;
    }

    slettStillingsendringerFraLocalStorage();

    const stillingsendringerData = JSON.parse(stillingsendringer);
    return stillingsendringerData;
};

export const slettStillingsendringerFraLocalStorage = () => {
    const state = store.getState();
    const stillingsId = state.adData.uuid;

    localStorage.removeItem(hentKeyForStillingsendring(stillingsId));
};
