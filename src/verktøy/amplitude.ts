import amplitudeJs, { AmplitudeClient } from 'amplitude-js';
import { getMiljø, Miljø } from './sentry';

const getApiKey = () => {
    return getMiljø() === Miljø.ProdGcp
        ? '3a6fe32c3457e77ce81c356bb14ca886'
        : '55477baea93c5227d8c0f6b813653615';
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
