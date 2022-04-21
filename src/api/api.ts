import { queryObjectToUrl } from '../common/urlUtils';
import { HentMineStillingerQuery } from '../mine-stillinger/mineStillingerSagas';
import { Arbeidsgiverforslag } from '../opprett-ny-stilling/VelgArbeidsgiver';
import { Stillingskategori } from '../opprett-ny-stilling/VelgStillingskategori';
import Stilling, { AdminStatus, Rekrutteringsbistandstilling, Stillingsinfo } from '../Stilling';
import { fetchGet, fetchPost, fetchPut } from './apiUtils';

export const stillingApi = '/stilling-api';

// Bruk mock-api hvis app kjører via "npm run mock"
if (process.env.REACT_APP_MOCK) {
    require('../mock/api.ts');
}

export type Side<T> = {
    content: T[];
    totalElements: number;
    totalPages: number;
};

export const postStilling = async (
    stilling: Partial<Stilling>,
    kategori: Stillingskategori
): Promise<Rekrutteringsbistandstilling> => {
    const postUrl = `${stillingApi}/rekrutteringsbistandstilling`;

    return await fetchPost(postUrl, {
        stilling,
        kategori,
    });
};

export const hentRekrutteringsbistandstilling = async (
    uuid: string
): Promise<Rekrutteringsbistandstilling> => {
    const rekrutteringsbistandstilling: Rekrutteringsbistandstilling = await fetchGet(
        `${stillingApi}/rekrutteringsbistandstilling/${uuid}`
    );

    if (rekrutteringsbistandstilling.stilling.administration === null) {
        return {
            ...rekrutteringsbistandstilling,
            stilling: fixMissingAdministration(rekrutteringsbistandstilling.stilling),
        };
    }

    return rekrutteringsbistandstilling;
};

export const hentMineStillinger = async (
    query: HentMineStillingerQuery
): Promise<Side<Rekrutteringsbistandstilling>> => {
    const baseUrl = `${stillingApi}/mine-stillinger`;
    const queryParametre = queryObjectToUrl(query);
    const result = await fetchGet(`${baseUrl}${queryParametre}`);

    return {
        ...result,
        content: result.content.map((stilling: Stilling) => {
            if (stilling.administration === null) {
                return fixMissingAdministration(stilling);
            }

            return stilling;
        }),
    };
};

export const hentStillingsinfoForStillingerSomEiesAvVeileder = async (
    navIdent: string
): Promise<Stillingsinfo[]> => fetchGet(`${stillingApi}/stillingsinfo/ident/${navIdent}`);

export const kopierStilling = async (
    stillingsId: string
): Promise<Rekrutteringsbistandstilling> => {
    return await fetchPost(`${stillingApi}/rekrutteringsbistandstilling/kopier/${stillingsId}`);
};

export type OpprettKandidatlisteForEksternStillingDto = {
    stillingsid: string;
    eierNavident: string;
    eierNavn: string;
};

export const opprettKandidatlisteForEksternStilling = async (
    dto: OpprettKandidatlisteForEksternStillingDto
): Promise<Stillingsinfo> => await fetchPut(`${stillingApi}/stillingsinfo`, dto);

const employerNameCompletionQueryTemplate = (match: string) => ({
    query: {
        match_phrase: {
            navn_ngram_completion: {
                query: match,
                slop: 5,
            },
        },
    },
    size: 50,
});

export const fetchEmployerNameCompletionHits = async (
    input: string
): Promise<Arbeidsgiverforslag[]> => {
    const result = await fetchPost(
        `${stillingApi}/search-api/underenhet/_search`,
        employerNameCompletionQueryTemplate(input)
    );

    return [
        ...result.hits.hits.map((employer: any) => ({
            name: employer._source.navn,
            orgnr: employer._source.organisasjonsnummer,
            location: employer._source.adresse
                ? {
                      address: employer._source.adresse.adresse,
                      postalCode: employer._source.adresse.postnummer,
                      city: employer._source.adresse.poststed,
                  }
                : undefined,
        })),
    ];
};

export const fetchOrgnrSuggestions = async (orgnummer: string): Promise<Arbeidsgiverforslag[]> => {
    const utenMellomrom = orgnummer.replace(/\s/g, '');
    const result = await fetchGet(
        `${stillingApi}/search-api/underenhet/_search?q=organisasjonsnummer:${utenMellomrom}*`
    );

    return [
        ...result.hits.hits
            .map((employer: any) => ({
                name: employer._source.navn,
                orgnr: employer._source.organisasjonsnummer,
                location: employer._source.adresse
                    ? {
                          address: employer._source.adresse.adresse,
                          postalCode: employer._source.adresse.postnummer,
                          city: employer._source.adresse.poststed,
                      }
                    : undefined,
            }))
            .sort(),
    ];
};

/**
 * TODO: Dette er en workaround, fordi det finnes annonser med ad.administration=null i databasen.
 * Når databasen er migrert og ikke inneholder administration=null kan denne workarounden fjernes.
 */
const fixMissingAdministration = (ad: Stilling): Stilling => ({
    ...ad,
    administration: {
        comments: '',
        status: AdminStatus.Received,
        reportee: '',
        navIdent: '',
        remarks: [],
    },
});
