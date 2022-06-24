import amplitudeJs, { AmplitudeClient } from 'amplitude-js';
import { getMiljø, Miljø } from './sentry';

const getApiKey = () => {
    return getMiljø() === Miljø.ProdGcp
        ? 'a8243d37808422b4c768d31c88a22ef4'
        : '6ed1f00aabc6ced4fd6fcb7fcdc01b30';
};

const client: AmplitudeClient = amplitudeJs.getInstance();

client.init(getApiKey(), '', {
    apiEndpoint: 'amplitude.nav.no/collect',
    saveEvents: false,
    includeUtm: true,
    batchEvents: false,
    includeReferrer: false,
});

export const setNavKontorIAmplitude = (navKontor: string) => {
    client.setUserProperties({
        navKontor,
    });
};

export const sendEvent = (område: string, hendelse: string, data?: Object): void => {
    client.logEvent(['#rekrutteringsbistand', område, hendelse].join('-'), data);
};

export const sendGenerellEvent = (event: string, data?: object) => {
    client.logEvent(event, {
        app: 'rekrutteringsbistand',
        ...data,
    });
};
