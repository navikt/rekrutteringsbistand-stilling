import startOfDay from 'date-fns/startOfDay';
import {
    AdminStatus,
    Administration,
    Geografi,
    Kilde,
    Kontaktinfo,
    Privacy,
    Properties,
    Status,
    Stillingsinfo,
    StyrkCategory,
} from './Stilling';
import AdStatus from './stilling/administration/adStatus/AdStatus';

export type RekrutteringsbistandstillingOpenSearch = {
    stilling: StillingOpenSearch;
    stillingsinfo: Stillingsinfo | null;
};

export type StillingOpenSearch = {
    title: string;
    uuid: string;
    annonsenr: string | null;
    status: Status;
    privacy: Privacy | string;
    published: string | null;
    publishedByAdmin: string | null;
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

const utløperFørIdag = (expires: string | null) => {
    if (expires === null) {
        return false;
    }

    const startenAvDøgnet = startOfDay(new Date());
    return new Date(expires) <= startenAvDøgnet;
};

export const stillingErUtløpt = (stilling: StillingOpenSearch): boolean => {
    return (
        stilling.publishedByAdmin !== null &&
        stilling.status === Status.Inaktiv &&
        utløperFørIdag(stilling.expires) &&
        (stilling.administration?.status === AdminStatus.Done ?? true)
    );
};

export const stillingKommerTilÅBliPublisert = (stilling: StillingOpenSearch): boolean => {};
