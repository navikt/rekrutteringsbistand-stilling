type Stilling = {
    administration: Administration;
    properties: Properties;
    status: string;
    privacy: string;

    // Nye props
    id: Nullable<number>;
    uuid: Nullable<string>;
    created: Nullable<string>;
    createdBy: Nullable<string>;
    updated: Nullable<string>;
    updatedBy: Nullable<string>;
    mediaList: Media[];
    contactList: Contact[];
    title: Nullable<string>;
    source: Nullable<string>;
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

type Administration = {
    id: Nullable<number>;
    status: Nullable<string>;
    comments: Nullable<string>;
    reportee: Nullable<string>;
    remarks: string[];
    navIdent: Nullable<string>;
};

type Arbeidsgiver = {
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

type Geografi = {
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

type Kategori = {
    id: Nullable<number>;
    code: Nullable<string>;
    categoryType: Nullable<string>;
    name: Nullable<string>;
    description: Nullable<string>;
    parentId: Nullable<number>;
};

type Contact = {
    name: Nullable<string>;
    email: Nullable<string>;
    phone: Nullable<string>;
    role: Nullable<string>;
    title: Nullable<string>;
};

type Media = {
    mediaLink: Nullable<string>;
    filename: Nullable<string>;
};

type Properties = Partial<{
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

type Nullable<T> = T | null;

export default Stilling;
