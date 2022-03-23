import fetchMock from 'fetch-mock';
import { KANDIDAT_API } from '../ad/legg-til-kandidat-modal/kandidatApi';
import { stillingApi } from '../api/api';
import fnrsok from './data/fnrsok';
import kandidatliste from './data/kandidatliste';

import rekrutteringsbistandStilling from './data/post-ads.json';
import reportee from './data/reportee.json';
import ident from './data/ident.json';
import mineStillinger from './data/minestillinger.json';
import eksternStilling from './data/ekstern-stilling.json';
import internStilling from './data/intern-stilling.json';
import counties from './data/counties.json';
import countries from './data/countries.json';
import municipals from './data/municipals.json';
import categoriesWithAltnames from './data/categories-with-altnames.json';
import postdata from './data/postdata.json';
import search from './data/search.json';
import aktivEnhet from './data/dekoratør/aktivenhet.json';
import aktivBruker from './data/dekoratør/aktivbruker.json';
import decorator from './data/dekoratør/decorator.json';

const adsUrl = `express:${stillingApi}/rekrutteringsbistand/api/v1/ads`;
const slettStillingUrl = `express:${stillingApi}/rekrutteringsbistand/api/v1/ads/:stillingsId`;
const reporteeUrl = `${stillingApi}/rekrutteringsbistand/api/v1/reportee/`;
const mineStillingerUrl = `express:${stillingApi}/mine-stillinger`;
const rekrutteringsbistandstillingUrl = `express:${stillingApi}/rekrutteringsbistandstilling/:stillingsId`;
const opprettStillingUrl = `express:${stillingApi}/rekrutteringsbistandstilling`;
const kopierStillingUrl = `express:${stillingApi}/rekrutteringsbistandstilling/kopier/:stillingsId`;
const putRekrutteringsbistandstillingUrl = `express:${stillingApi}/rekrutteringsbistandstilling`;
const countiesUrl = `${stillingApi}/rekrutteringsbistand/api/v1/geography/counties`;
const countriesUrl = `${stillingApi}/rekrutteringsbistand/api/v1/geography/countries`;
const municipalsUrl = `${stillingApi}/rekrutteringsbistand/api/v1/geography/municipals`;
const categoriesWithAltnamesUrl = `${stillingApi}/rekrutteringsbistand/api/v1/categories-with-altnames/?taxonomy=STYRK08NAV`;
const postdataUrl = `${stillingApi}/rekrutteringsbistand/api/v1/postdata/`;
const fnrsokUrl = `express:${KANDIDAT_API}/veileder/kandidatsok/fnrsok`;
const kandidatlisteUrl = `express:${KANDIDAT_API}/veileder/stilling/:stillingsId/kandidatliste`;
const leggKandidatIKandidatlisteUrl = `express:${KANDIDAT_API}/veileder/kandidatlister/:kandidatlisteId/kandidater`;

const identUrl = `express:${stillingApi}/stillingsinfo/ident/:ident`;
const searchApiUrl = `express:${stillingApi}/search-api/underenhet/_search`;

const modiacontextholderApiUrl = '/modiacontextholder/api';
const modiacontextholderAktivEnhetUrl = `${modiacontextholderApiUrl}/context/aktivenhet`;
const modiacontextholderAktivBrukerUrl = `${modiacontextholderApiUrl}/context/aktivbruker`;
const modiacontextholderContextUrl = `${modiacontextholderApiUrl}/context`;
const modiacontextholderDecoratorUrl = `${modiacontextholderApiUrl}/decorator`;

fetchMock.config.fallbackToNetwork = true;

const getStilling = (url: string) => {
    const stillingId = url.split('/').pop();
    if (stillingId === eksternStilling.stilling.uuid) return eksternStilling;
    else {
        return internStilling;
    }
};

fetchMock
    .get(mineStillingerUrl, mineStillinger)
    .post(opprettStillingUrl, rekrutteringsbistandStilling)
    .post(kopierStillingUrl, rekrutteringsbistandStilling)
    .put(adsUrl, rekrutteringsbistandStilling)
    .delete(slettStillingUrl, rekrutteringsbistandStilling)
    .get(reporteeUrl, reportee)
    .get(identUrl, ident)
    .get(rekrutteringsbistandstillingUrl, getStilling)
    .put(putRekrutteringsbistandstillingUrl, eksternStilling)
    .get(countiesUrl, counties)
    .get(countriesUrl, countries)
    .get(municipalsUrl, municipals)
    .get(categoriesWithAltnamesUrl, categoriesWithAltnames)
    .get(postdataUrl, postdata)
    .get(searchApiUrl, search)
    .post(searchApiUrl, search)
    .get(modiacontextholderAktivEnhetUrl, aktivEnhet)
    .get(modiacontextholderAktivBrukerUrl, aktivBruker)
    .get(modiacontextholderDecoratorUrl, decorator)
    .post(modiacontextholderContextUrl, 200)
    .post(fnrsokUrl, fnrsok)
    .get(kandidatlisteUrl, kandidatliste, {
        delay: 500,
    })
    .post(leggKandidatIKandidatlisteUrl, kandidatliste);
