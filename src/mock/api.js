import fetchMock from 'fetch-mock';
import { stillingApi } from '../api/api';
import { kandidatApi } from '../ad/kandidatModal/kandidatApi';
import fnrsok from './data/fnrsok';
import kandidatliste from './data/kandidatliste';

const putPostAds = require('./data/post-ads.json');
const reportee = require('./data/reportee.json');
const ident = require('./data/ident.json');
const mineStillinger = require('./data/minestillinger.json');
const stilling = require('./data/stilling.json');
const eksternStilling = require('./data/ekstern-stilling.json');
const internStilling = require('./data/intern-stilling.json');
const counties = require('./data/counties.json');
const countries = require('./data/countries.json');
const municipals = require('./data/municipals.json');
const categoriesWithAltnames = require('./data/categories-with-altnames.json');
const postdata = require('./data/postdata.json');
const search = require('./data/search.json');
const aktivEnhet = require('./data/dekoratør/aktivenhet.json');
const aktivBruker = require('./data/dekoratør/aktivbruker.json');
const decorator = require('./data/dekoratør/decorator.json');

const adsUrl = `${stillingApi}/rekrutteringsbistand/api/v1/ads`;
const reporteeUrl = `${stillingApi}/rekrutteringsbistand/api/v1/reportee/`;
const mineStillingerUrl = `${stillingApi}/rekrutteringsbistand/api/v1/ads/rekrutteringsbistand/minestillinger`;
const stillingUrl = `${stillingApi}/rekrutteringsbistand/api/v1/stilling/`;
const rekrutteringsbistandstillingUrl = `express:${stillingApi}/rekrutteringsbistandstilling/:stillingsId`;
const putRekrutteringsbistandstillingUrl = `express:${stillingApi}/rekrutteringsbistandstilling`;
const countiesUrl = `${stillingApi}/rekrutteringsbistand/api/v1/geography/counties`;
const countriesUrl = `${stillingApi}/rekrutteringsbistand/api/v1/geography/countries`;
const municipalsUrl = `${stillingApi}/rekrutteringsbistand/api/v1/geography/municipals`;
const categoriesWithAltnamesUrl = `${stillingApi}/rekrutteringsbistand/api/v1/categories-with-altnames/`;
const postdataUrl = `${stillingApi}/rekrutteringsbistand/api/v1/postdata/`;
const fnrsokUrl = `express:${kandidatApi}/veileder/kandidatsok/fnrsok`;
const kandidatlisteUrl = `express:${kandidatApi}/veileder/stilling/:stillingsId/kandidatliste`;
const leggKandidatIKandidatlisteUrl = `express:${kandidatApi}/veileder/kandidatlister/:kandidatlisteId/kandidater`;

const identUrl = `${stillingApi}/rekruttering/ident/`;
const featuresUrl = `${stillingApi}/features/`;
const searchApiUrl = `${stillingApi}/search-api/`;

const modiacontextholderApiUrl = '/modiacontextholder/api';
const modiacontextholderAktivEnhetUrl = `${modiacontextholderApiUrl}/context/aktivenhet`;
const modiacontextholderAktivBrukerUrl = `${modiacontextholderApiUrl}/context/aktivbruker`;
const modiacontextholderContextUrl = `${modiacontextholderApiUrl}/context`;
const modiacontextholderDecoratorUrl = `${modiacontextholderApiUrl}/decorator`;

fetchMock.config.fallbackToNetwork = true;

const med = (begynnelseAvUrl) => (url) => url.startsWith(begynnelseAvUrl);

const getStilling = (url) => {
    const stillingId = url.split('/').pop();
    if (stillingId === eksternStilling.stilling.uuid) return eksternStilling;
    else {
        return internStilling;
    }
};

fetchMock
    .get(med(mineStillingerUrl), mineStillinger)
    .post(med(adsUrl), putPostAds)
    .put(med(adsUrl), putPostAds)
    .delete(med(adsUrl), putPostAds)
    .get(reporteeUrl, reportee)
    .get(med(identUrl), ident)
    .get(med(stillingUrl), stilling)
    .get(rekrutteringsbistandstillingUrl, getStilling)
    .put(putRekrutteringsbistandstillingUrl, eksternStilling)
    .get(countiesUrl, counties)
    .get(countriesUrl, countries)
    .get(municipalsUrl, municipals)
    .get(categoriesWithAltnamesUrl, categoriesWithAltnames)
    .get(postdataUrl, postdata)
    .get(med(searchApiUrl), search)
    .post(med(searchApiUrl), search)
    .get(med(featuresUrl), () => true)
    .get(modiacontextholderAktivEnhetUrl, aktivEnhet)
    .get(modiacontextholderAktivBrukerUrl, aktivBruker)
    .get(modiacontextholderDecoratorUrl, decorator)
    .post(modiacontextholderContextUrl, 200)
    .post(fnrsokUrl, fnrsok)
    .get(kandidatlisteUrl, kandidatliste)
    .post(leggKandidatIKandidatlisteUrl, kandidatliste);
