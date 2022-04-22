import { Stillingskategori } from './opprett-ny-stilling/VelgStillingskategori';

export type Rekrutteringsbistandstilling = {
    stilling: Stilling;
    stillingsinfo: Stillingsinfo | null;
};

export type Stilling = {
    id: string;
    uuid: string;
    created: string;
    createdBy: System;
    updated: string;
    updatedBy: System;
    title: string;
    status: Status | string;
    privacy: Privacy | string;
    source: Kilde | string;
    medium: Medium | string;
    reference: string;
    published: string | null;
    expires: string | null;
    employer: Arbeidsgiver | null;
    administration: Administration | null;
    location: Geografi;
    locationList: Geografi[];
    properties: Properties & Record<string, any>;

    /** Når NSS-admin trykker på "publiser" */
    publishedByAdmin: string | null;
    businessName: string | null;
    deactivatedByExpiry?: boolean;
    categoryList: StyrkCategory[];
    activationOnPublishingDate: boolean;
};

export enum System {
    Rekrutteringsbistand = 'pam-rekrutteringsbistand',
    NssAdmin = 'nss-admin',
}

export enum Status {
    Aktiv = 'ACTIVE',
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
    location: Location;
};

export type Location = {
    address: string;
    postalCode: string;
    city?: string;
    municipal?: string;
    country?: string;
};

export type StyrkCategory = {
    styrkCode: string;
    name: string;
};

export type Geografi = {
    address: string | null;
    postalCode: string | null;
    county: string | null;
    municipal: string | null;
    latitue: string | null;
    longitude: string | null;
};

export enum AdminStatus {
    Received = 'RECEIVED',
    Pending = 'PENDING',
    Done = 'DONE',
}

export type Administration = {
    status: AdminStatus;
    reportee: string;
    navIdent: string;
    comments?: string;
    remarks?: string[];
};

export type Properties = Partial<{
    adtext: string;
    author: string;
    employer: string;
    jobtitle: string;
    location: string;
    starttime: string;
    applicationdue: Søknadsfrist | string;
    extent: Omfang;
    engagementtype: Ansettelsesform;
    positioncount: number;
    tags: Array<string>;
    workday: string;
    workhours: string;
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
