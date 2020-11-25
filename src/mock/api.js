import fetchMock from 'fetch-mock';
import { API_URL } from '../api/api';
import { KANDIDAT_API_URL } from '../ad/kandidatModal/kandidatApi';
import fnrsok from './data/fnrsok';
import kandidatliste from './data/kandidatliste';

const baseUrl = API_URL;
const apiUrl = `${baseUrl}/rekrutteringsbistand/api/v1`;

const ads = require('./data/ads.json');
const adsReversed = require('./data/ads-reversed.json');
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

const adsUrl = `${apiUrl}/ads`;
const reporteeUrl = `${apiUrl}/reportee/`;
const mineStillingerUrl = `${apiUrl}/ads/rekrutteringsbistand/minestillinger`;
const stillingUrl = `${apiUrl}/stilling/`;
const rekrutteringsbistandstillingUrl = `express:${baseUrl}/rekrutteringsbistandstilling/:stillingsId`;
const putRekrutteringsbistandstillingUrl = `express:${baseUrl}/rekrutteringsbistandstilling`;
const countiesUrl = `${apiUrl}/geography/counties`;
const countriesUrl = `${apiUrl}/geography/countries`;
const municipalsUrl = `${apiUrl}/geography/municipals`;
const categoriesWithAltnamesUrl = `${apiUrl}/categories-with-altnames/`;
const postdataUrl = `${apiUrl}/postdata/`;
const fnrsokUrl = `express:${KANDIDAT_API_URL}/kandidater/rest/veileder/kandidatsok/fnrsok`;
const kandidatlisteUrl = `express:${KANDIDAT_API_URL}/kandidater/rest/veileder/stilling/:stillingsId/kandidatliste`;
const leggKandidatIKandidatlisteUrl = `express:${KANDIDAT_API_URL}/kandidater/rest/veileder/kandidatlister/:kandidatlisteId/kandidater`;

const identUrl = `${baseUrl}/rekruttering/ident/`;
const featuresUrl = `${baseUrl}/features/`;
const searchApiUrl = `${baseUrl}/search-api/`;

const modiacontextholderApiUrl = '/modiacontextholder/api';
const modiacontextholderAktivEnhetUrl = `${modiacontextholderApiUrl}/context/aktivenhet`;
const modiacontextholderAktivBrukerUrl = `${modiacontextholderApiUrl}/context/aktivbruker`;
const modiacontextholderContextUrl = `${modiacontextholderApiUrl}/context`;
const modiacontextholderDecoratorUrl = `${modiacontextholderApiUrl}/decorator`;

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
    .get(med(adsUrl), adsReversed, { query: { sort: 'title,asc' } })
    .get(med(adsUrl), ads)
    .post(med(adsUrl), putPostAds)
    .put(med(adsUrl), putPostAds)
    .delete(med(adsUrl), 204)
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
