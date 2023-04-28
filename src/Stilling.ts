import { Stillingskategori } from './opprett-ny-stilling/VelgStillingskategori';

export type Rekrutteringsbistandstilling = {
    stilling: Stilling;
    stillingsinfo: Stillingsinfo | null;
};

export type Stilling = {
    id: number;
    uuid: string;
    created: string;
    createdBy: System;
    updated: string;
    updatedBy: System;
    title: string;
    status: Status;
    privacy: Privacy | string;
    source: Kilde;
    medium: Medium | string;
    reference: string;
    published: string | null;
    expires: string | null;
    employer: Arbeidsgiver | null;
    administration: Administration | null;
    location: Geografi;
    locationList: Geografi[];
    properties: Properties & Record<string, any>;
    contactList: any;

    /** Når NSS-admin trykker på "publiser" */
    publishedByAdmin: string | null;
    businessName: string | null;
    deactivatedByExpiry: boolean | null;
    categoryList: StyrkCategory[];
    activationOnPublishingDate: boolean;
    firstPublished: boolean | null;
};

export enum System {
    Rekrutteringsbistand = 'pam-rekrutteringsbistand',
    NssAdmin = 'nss-admin',
}

export enum Status {
    Aktiv = 'ACTIVE',
    Inaktiv = 'INACTIVE',
    Stoppet = 'STOPPED',
    Avslått = 'REJECTED',
    Slettet = 'DELETED',
}

export enum Privacy {
    Intern = 'INTERNAL_NOT_SHOWN',
    Arbeidsplassen = 'SHOW_ALL',
}

export enum Medium {
    Ass = 'ASS',
    Dir = 'DIR',
}

export enum Kilde {
    Intern = 'DIR',
    Finn = 'FINN',
}

export type Stillingsinfo = {
    eierNavident: string | null;
    eierNavn: string | null;
    notat: string | null;
    stillingsid: string;
    stillingsinfoid: string;
    stillingskategori: Stillingskategori | null;
};

export type Arbeidsgiver = {
    name: string;
    publicName: string;
    orgnr: string | null;
    parentOrgnr: string | null;
    orgform: string;
    location: Geografi;
};

export type StyrkCategory = {
    styrkCode: string;
    name: string;
};

export type Geografi = {
    address: string | null;
    postalCode: string | null;
    county: string | null;
    country: string | null;
    municipal: string | null;
    latitude: string | null;
    longitude: string | null;
    city: string | null;
};

export enum AdminStatus {
    Received = 'RECEIVED',
    Pending = 'PENDING',
    Done = 'DONE',
}

export type Administration = {
    status: AdminStatus | null;
    reportee: string;
    navIdent: string;
    comments: string | null;
    remarks: string[] | null;
};

export type Properties = Partial<{
    adtext: string;
    author: string;
    employer: string;
    jobtitle: string;
    location: string;
    starttime: string;
    extent: Omfang;
    engagementtype: Ansettelsesform;
    positioncount: number;
    tags: string;
    workday: string;
    workhours: string;

    sourceurl: string;
    applicationurl: string;
    applicationemail: string;
    applicationdue: Søknadsfrist | string;
    jobarrangement: string;
    sector: string;
}>;

export enum Søknadsfrist {
    Snarest = 'Snarest',
}

export enum Ansettelsesform {
    Ingen = '',
    Fast = 'Fast',
    Vikariat = 'Vikariat',
    Engasjement = 'Engasjement',
    Prosjekt = 'Prosjekt',
    Sesong = 'Sesong',
    Feriejobb = 'Feriejobb',
    Trainee = 'Trainee',
    Lærling = 'Lærling',
    Åremål = 'Åremål',
    Selvstendig = 'Selvstendig næringsdrivende',
    Annet = 'Annet',
}

export enum Omfang {
    Heltid = 'Heltid',
    Deltid = 'Deltid',
}

export default Stilling;
