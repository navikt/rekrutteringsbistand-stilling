import {
    Administration,
    Arbeidsgiver,
    Geografi,
    Kilde,
    Kontaktinfo,
    Privacy,
    Properties,
    Stillingsinfo,
    StyrkCategory,
} from './Stilling';

export type RekrutteringsbistandstillingOpenSearch = {
    stilling: StillingOpenSearch;
    stillingsinfo: Stillingsinfo | null;
};

export type StillingOpenSearch = {
    title: string;
    uuid: string;
    annonsenr: string | null;
    status: string;
    privacy: Privacy | string;
    published: string | null;
    expires: string | null;
    created: string;
    updated: string;
    employer: ArbeidsgiverOpenSearch | null;
    categories: StyrkCategory[];
    source: Kilde | string;
    medium: string;
    businessName: string | null;
    locations: Geografi[];
    contacts: Kontaktinfo[];
    reference: string;
    administration: Administration | null;
    properties: Properties & Record<string, any>;
};

export type ArbeidsgiverOpenSearch = {
    name: string;
    publicName: string;
    orgnr: string | null;
    parentOrgnr: string | null;
    orgform: string;
};