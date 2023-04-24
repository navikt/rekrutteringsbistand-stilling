import fetchMock, { MockRequest, MockResponse, MockResponseFunction } from 'fetch-mock';
import { KANDIDAT_API } from '../stilling/legg-til-kandidat-modal/kandidatApi';
import { stillingApi } from '../api/api';
import { Rekrutteringsbistandstilling } from '../Stilling';
import fnrsok from './data/fnrsok';
import kandidatliste from './data/kandidatliste';

import rekrutteringsbistandStilling from './data/post-ads.json';
import reportee from './data/reportee.json';
import ident from './data/ident.json';
import mineStillinger from './data/minestillinger.json';
import eksternStilling from './data/ekstern-stilling.json';
import eksternStillingMedKandidatliste from './data/ekstern-stilling-med-kandidatliste.json';
import internStilling from './data/intern-stilling.json';
import annensInterneStilling from './data/annens-interne-stilling.json';
import counties from './data/counties.json';
import countries from './data/countries.json';
import municipals from './data/municipals.json';
import categoriesWithAltnames from './data/categories-with-altnames.json';
import postdata from './data/postdata.json';
import search from './data/search.json';
import aktivEnhet from './data/dekoratør/aktivenhet.json';
import aktivBruker from './data/dekoratør/aktivbruker.json';
import decorator from './data/dekoratør/decorator.json';

const reporteeUrl = `${stillingApi}/rekrutteringsbistand/api/v1/reportee`;
const mineStillingerUrl = `express:${stillingApi}/mine-stillinger`;
const opprettStillingUrl = `express:${stillingApi}/rekrutteringsbistandstilling`;
const kopierStillingUrl = `express:${stillingApi}/rekrutteringsbistandstilling/kopier/:stillingsId`;
const slettStillingUrl = `express:${stillingApi}/rekrutteringsbistandstilling/:stillingsId`;

const getStillingUrl = `express:${stillingApi}/rekrutteringsbistandstilling/:stillingsId`;
const putStillingUrl = `express:${stillingApi}/rekrutteringsbistandstilling`;
const putStillingsinfoUrl = `express:${stillingApi}/stillingsinfo`;
const kandidatlisteUrl = `express:${KANDIDAT_API}/veileder/stilling/:stillingsId/kandidatliste`;

const countiesUrl = `${stillingApi}/rekrutteringsbistand/api/v1/geography/counties`;
const countriesUrl = `${stillingApi}/rekrutteringsbistand/api/v1/geography/countries`;
const municipalsUrl = `${stillingApi}/rekrutteringsbistand/api/v1/geography/municipals`;
const categoriesWithAltnamesUrl = `${stillingApi}/rekrutteringsbistand/api/v1/categories-with-altnames?taxonomy=STYRK08NAV`;
const postdataUrl = `${stillingApi}/rekrutteringsbistand/api/v1/postdata`;
const fnrsokUrl = `express:${KANDIDAT_API}/veileder/kandidatsok/fnrsok`;
const leggKandidatIKandidatlisteUrl = `express:${KANDIDAT_API}/veileder/kandidatlister/:kandidatlisteId/kandidater`;

const identUrl = `express:${stillingApi}/stillingsinfo/ident/:ident`;
const searchApiUrl = `express:${stillingApi}/search-api/underenhet/_search`;

const modiacontextholderApiUrl = '/modiacontextholder/api';
const modiacontextholderAktivEnhetUrl = `${modiacontextholderApiUrl}/context/aktivenhet`;
const modiacontextholderAktivBrukerUrl = `${modiacontextholderApiUrl}/context/aktivbruker`;
const modiacontextholderContextUrl = `${modiacontextholderApiUrl}/context`;
const modiacontextholderDecoratorUrl = `${modiacontextholderApiUrl}/decorator`;

fetchMock.config.fallbackToNetwork = true;

const hentStillingPåUuid = (uuid: string): Rekrutteringsbistandstilling => {
    switch (uuid) {
        case eksternStilling.stilling.uuid:
            return eksternStilling as unknown as Rekrutteringsbistandstilling;
        case eksternStillingMedKandidatliste.stilling.uuid:
            return eksternStillingMedKandidatliste as unknown as Rekrutteringsbistandstilling;
        case annensInterneStilling.stilling.uuid:
            return annensInterneStilling as unknown as Rekrutteringsbistandstilling;
        default:
            return internStilling as unknown as Rekrutteringsbistandstilling;
    }
};

const getStilling = (url: string) => {
    const stillingsId = url.split('/').pop()!;

    return hentStillingPåUuid(stillingsId);
};

const putStillingsinfo = (url: string, options: MockRequest) => {
    const body = JSON.parse(options.body as string);

    return {
        stillingsinfoid: '19caad45-dbd5-4168-94e2-b432050a7aaa',
        ...body,
    };
};

const putStilling = (_: string, options: MockRequest): Rekrutteringsbistandstilling => {
    const body = JSON.parse(options.body as string);
    const stillingsId = body.stilling.uuid;
    const stilling = hentStillingPåUuid(stillingsId);

    return {
        ...stilling,
        stilling: {
            ...stilling.stilling,
            ...body.stilling,
        },
    };
};

fetchMock
    .get(mineStillingerUrl, log(mineStillinger))
    .post(opprettStillingUrl, log(rekrutteringsbistandStilling))
    .post(kopierStillingUrl, log(rekrutteringsbistandStilling))
    .get(reporteeUrl, log(reportee))
    .get(identUrl, log(ident))

    .get(getStillingUrl, log(getStilling))
    .put(putStillingUrl, log(putStilling))
    .delete(slettStillingUrl, log(getStilling))
    .put(putStillingsinfoUrl, log(putStillingsinfo))

    .get(countiesUrl, log(counties))
    .get(countriesUrl, log(countries))
    .get(municipalsUrl, log(municipals))
    .get(categoriesWithAltnamesUrl, log(categoriesWithAltnames))
    .get(postdataUrl, log(postdata))
    .get(searchApiUrl, log(search))
    .post(searchApiUrl, log(search))
    .get(modiacontextholderAktivEnhetUrl, log(aktivEnhet))
    .get(modiacontextholderAktivBrukerUrl, log(aktivBruker))
    .get(modiacontextholderDecoratorUrl, log(decorator))
    .post(modiacontextholderContextUrl, log(200))
    .post(fnrsokUrl, log(fnrsok))
    .post(leggKandidatIKandidatlisteUrl, log(kandidatliste))
    .get(kandidatlisteUrl, log(kandidatliste), {
        delay: 500,
    });

function log(response: MockResponse | MockResponseFunction) {
    return (url: string, options: MockRequest) => {
        console.log('%cMOCK %s %s', 'color: lightgray;', options.method || 'GET', url, {
            ...(options.body
                ? {
                      body: JSON.parse(options.body as string),
                  }
                : {}),
            response: typeof response === 'function' ? response(url, options) : response,
        });

        return response;
    };
}
