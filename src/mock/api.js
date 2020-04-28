import fetchMock from 'fetch-mock';
import { REKRUTTERINGSBISTAND_BASE_URL } from '../fasitProperties';

const baseUrl = REKRUTTERINGSBISTAND_BASE_URL;
const apiUrl = `${baseUrl}/rekrutteringsbistand/api/v1`;

const ads = require('./json/ads.json');
const adsReversed = require('./json/ads-reversed.json');
const putPostAds = require('./json/post-ads.json');
const reportee = require('./json/reportee.json');
const ident = require('./json/ident.json');
const mineStillinger = require('./json/minestillinger.json');
const stilling = require('./json/stilling.json');
const counties = require('./json/counties.json');
const countries = require('./json/countries.json');
const municipals = require('./json/municipals.json');
const categoriesWithAltnames = require('./json/categories-with-altnames.json');
const postdata = require('./json/postdata.json');
const search = require('./json/search.json');
const aktivEnhet = require('./json/dekoratør/aktivenhet.json');
const aktivBruker = require('./json/dekoratør/aktivbruker.json');
const decorator = require('./json/dekoratør/decorator.json');

const adsUrl = `${apiUrl}/ads`;
const reporteeUrl = `${apiUrl}/reportee/`;
const mineStillingerUrl = `${apiUrl}/ads/rekrutteringsbistand/minestillinger`;
const stillingUrl = `${apiUrl}/stilling/`;
const countiesUrl = `${apiUrl}/geography/counties`;
const countriesUrl = `${apiUrl}/geography/countries`;
const municipalsUrl = `${apiUrl}/geography/municipals`;
const categoriesWithAltnamesUrl = `${apiUrl}/categories-with-altnames/`;
const postdataUrl = `${apiUrl}/postdata/`;

const identUrl = `${baseUrl}/rekruttering/ident/`;
const featuresUrl = `${baseUrl}/features/`;
const searchApiUrl = `${baseUrl}/search-api/`;

const modiacontextholderApiUrl = '/modiacontextholder/api';
const modiacontextholderAktivEnhetUrl = `${modiacontextholderApiUrl}/context/aktivenhet`;
const modiacontextholderAktivBrukerUrl = `${modiacontextholderApiUrl}/context/aktivbruker`;
const modiacontextholderContextUrl = `${modiacontextholderApiUrl}/context`;
const modiacontextholderDecoratorUrl = `${modiacontextholderApiUrl}/decorator`;

const med = (begynnelseAvUrl) => (url) => url.startsWith(begynnelseAvUrl);

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
    .post(modiacontextholderContextUrl, 200);
