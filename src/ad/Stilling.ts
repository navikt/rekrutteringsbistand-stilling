export type Stilling = {
    uuid: string;
    title: string;
    created: string;
    createdBy: string;
    updated: string;
    updatedBy: string;
    mediaList: Media[];
    contactList: Contact[];
    status: Status;
    privacy: Privacy;
    source: Source;

    administration: Administration;
    properties: Properties;
    medium: Nullable<string>;
    reference: Nullable<string>;
    published: Nullable<string>;
    expires: Nullable<string>;
    employer: Nullable<Arbeidsgiver>;
    location: Nullable<Geografi>;
    locationList: Geografi[];
    categoryList: Kategori[];
    publishedByAdmin: Nullable<string>;
    businessName: Nullable<string>;
    firstPublished: Nullable<Boolean>;
    deactivatedByExpiry: Nullable<Boolean>;
    activationOnPublishingDate: Nullable<Boolean>;
};

export enum Status {
    Active = 'ACTIVE',
    Inactive = 'INACTIVE',
    Stopped = 'STOPPED',
    Rejected = 'REJECTED',
    Deleted = 'DELETED',
}

export enum Privacy {
    InternalNotShown = 'INTERNAL_NOT_SHOWN',
    ShowAll = 'SHOW_ALL',
}

export enum Source {
    Dir = 'DIR',
}

export type NyStilling = {
    createdBy: string;
    updatedBy?: string;
    title: string;
    source: string;
    medium?: string;
    uuid?: string;
    reference?: string;
    privacy?: string;
    expires?: string;
    published?: string;
    administration?: Administration;
};

export type Administration = {
    status?: AdminStatus;
    comments?: Nullable<string>;
    reportee?: Nullable<string>;
    remarks?: string[];
    navIdent?: Nullable<string>;
};

export enum AdminStatus {
    Received = 'RECEIVED',
    Pending = 'PENDING',
    Done = 'DONE',
}

export type Arbeidsgiver = {
    id: Nullable<number>;
    uuid: Nullable<string>;
    created: Nullable<string>;
    createdBy: Nullable<string>;
    updated: Nullable<string>;
    updatedBy: Nullable<string>;
    mediaList: Media[];
    contactList: Contact[];
    location: Nullable<Geografi>;
    locationList: Geografi[];
    properties: Record<string, string>;
    name: Nullable<string>;
    orgnr: Nullable<string>;
    status: Nullable<string>;
    parentOrgnr: Nullable<string>;
    publicName: Nullable<string>;
    deactivated: Nullable<string>;
    orgform: Nullable<string>;
    employees: Nullable<number>;
};

export type Geografi = {
    address: Nullable<string>;
    postalCode: Nullable<string>;
    county: Nullable<string>;
    municipal: Nullable<string>;
    municipalCode: Nullable<string>;
    city: Nullable<string>;
    country: Nullable<string>;
    latitude: Nullable<string>;
    longitude: Nullable<string>;
};

export type Kategori = {
    id: Nullable<number>;
    code: Nullable<string>;
    categoryType: Nullable<string>;
    name: Nullable<string>;
    description: Nullable<string>;
    parentId: Nullable<number>;
};

export type Contact = {
    name: Nullable<string>;
    email: Nullable<string>;
    phone: Nullable<string>;
    role: Nullable<string>;
    title: Nullable<string>;
};

export type Media = {
    mediaLink: Nullable<string>;
    filename: Nullable<string>;
};

export type Properties = Partial<{
    adtext: string;
    sourceurl: string;
    applicationdue: string;
    applicationemail: string;
    applicationmail: string;
    applicationlabel: string;
    applicationurl: string;
    employerdescription: string;
    employerhomepage: string;
    engagementtype: string;
    extent: string;
    occupation: string;
    positioncount: string;
    salary: string;
    starttime: string;
    role: string;
    sector: string;
    location: string;
    externalref: string;
    jobtitle: string;
    keywords: string;
    sourcecreated: string;
    sourceupdated: string;
    logomain: string;
    logolisting: string;
    author: string;
    address: string;
    industry: string;
    nace2: string;
    searchtags: string;
    classification_styrk08_score: string;
    classification_input_source: string;
    categories: string;
    euresflagg: string;

    // Fra stillingsregistreringen
    tags: string;
    ontologyJobtitle: string;
    workhours: string;
    workday: string;
    facebookpage: string;
    contactperson: string;
    contactpersontitle: string;
    contactpersonemail: string;
    contactpersonphone: string;
    linkedinpage: string;
    jobpercentage: string;
    jobarrangement: string;
    twitteraddress: string;

    // Fra stillingsolr
    education: string;
    certificate: string;
    expertise: string;
    practice: string;

    // Markert som deprecated i pam-ad
    employer: string;
    hardrequirements: string;
    softrequirements: string;
    personalattributes: string;
}>;

export type Nullable<T> = T | null;

export default Stilling;
