import fetchMock from 'fetch-mock';
import { REKRUTTERINGSBISTAND_BASE_URL } from '../fasitProperties';

const baseUrl = REKRUTTERINGSBISTAND_BASE_URL;
const apiUrl = `${baseUrl}/rekrutteringsbistand/api/v1`;

const ads = require('./json/ads.json');
const adsReversed = require('./json/ads-reversed.json');
const postAds = require('./json/post-ads.json');
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

const adsUrl = `${apiUrl}/ads`;
const reporteeUrl = `${apiUrl}/reportee/`;
const mineStillingerUrl = `${apiUrl}/ads/rekrutteringsbistand/minestillinger`;
const stillingUrl = `${apiUrl}/stilling/`;
const countiesUrl = `${apiUrl}/geography/counties`;
const countriesUrl = `${apiUrl}/geography/countries`;
const municipalsUrl = `${apiUrl}/geography/municipals`;
const categoriesWithAltnamesUrl = `${apiUrl}/categories-with-altnames/`;
const postdataUrl = `${apiUrl}/postdata/`;
const searchApiUrl = `${apiUrl}/search-api/`;

const identUrl = `${baseUrl}/rekruttering/ident/`;
const featuresUrl = `${baseUrl}/features/`;

const med = begynnelseAvUrl => url => url.startsWith(begynnelseAvUrl);

fetchMock
    .get(med(adsUrl), adsReversed, { query: { sort: 'title,asc'} })
    .get(med(adsUrl), ads)
    .post(med(adsUrl), postAds)
    .delete(med(adsUrl), 204)
    .get(reporteeUrl, reportee)
    .get(med(identUrl), ident)
    .get(mineStillingerUrl, mineStillinger)
    .get(med(stillingUrl), stilling)
    .get(countiesUrl, counties)
    .get(countriesUrl, countries)
    .get(municipalsUrl, municipals)
    .get(categoriesWithAltnamesUrl, categoriesWithAltnames)
    .get(postdataUrl, postdata)
    .get(med(searchApiUrl), search)
    .get(med(featuresUrl), true);
