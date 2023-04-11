import { Breadcrumb, Event } from '@sentry/types';
import * as Sentry from '@sentry/react';

export enum Miljø {
    DevGcp = 'dev-gcp',
    ProdGcp = 'prod-gcp',
    LabsGcp = 'labs-gcp',
    Lokalt = 'local',
}

export const getMiljø = (): string => {
    const { hostname } = window.location;

    if (hostname.includes('intern.dev.nav.no')) {
        return Miljø.DevGcp;
    } else if (hostname.includes('intern.nav.no')) {
        return Miljø.ProdGcp;
    } else if (hostname.includes('labs.nais.io')) {
        return Miljø.LabsGcp;
    } else {
        return Miljø.Lokalt;
    }
};

const maskeringsregler = [
    {
        regex: /[A-Z]{2}[0-9]{6}/g,
        erstatning: '<kandidatnr>',
    },
    {
        regex: /PAM0[a-z0-9]{8}/g,
        erstatning: '<kandidatnr>',
    },
    {
        regex: /[0-9]{11}/g,
        erstatning: '<fnr>',
    },
];

const maskerPersonopplysninger = (tekst?: string) => {
    if (!tekst) return undefined;

    let maskert = tekst;
    maskeringsregler.forEach(({ regex, erstatning }) => {
        maskert = maskert.replace(regex, erstatning);
    });

    return maskert;
};

const fjernPersonopplysninger = (event: Event): Event => {
    const url = event.request?.url ? maskerPersonopplysninger(event.request.url) : '';

    return {
        ...event,
        request: {
            ...event.request,
            url,
            headers: {
                Referer: maskerPersonopplysninger(event.request?.headers?.Referer) || '',
            },
        },
        breadcrumbs: (event.breadcrumbs || []).map((breadcrumb: Breadcrumb) => ({
            ...breadcrumb,
            message: maskerPersonopplysninger(breadcrumb.message),
            data: {
                ...breadcrumb.data,
                url: maskerPersonopplysninger(breadcrumb.data?.url),
                from: maskerPersonopplysninger(breadcrumb.data?.from),
                to: maskerPersonopplysninger(breadcrumb.data?.to),
            },
        })),
    };
};

export const startSentry = () => {
    Sentry.init({
        dsn: 'https://34e485d3fd9945e29d5f66f11a29f84e@sentry.gc.nav.no/43',
        environment: getMiljø(),
        release: process.env.REACT_APP_SENTRY_RELEASE || 'unknown',
        enabled: getMiljø() === Miljø.DevGcp || getMiljø() === Miljø.ProdGcp,
        beforeSend: fjernPersonopplysninger,
        autoSessionTracking: false,
    });
};
