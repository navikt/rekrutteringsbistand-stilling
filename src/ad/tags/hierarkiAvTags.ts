export enum Tag {
    Tilrettelegging = 'INKLUDERING',
    TilretteleggingArbeidstid = 'INKLUDERING__ARBEIDSTID',
    TilretteleggingFysisk = 'INKLUDERING__FYSISK',
    TilretteleggingArbeidshverdagen = 'INKLUDERING__ARBEIDSMILJØ',
    TilretteleggingGrunnleggende = 'INKLUDERING__GRUNNLEGGENDE',

    TiltakLønnstilskudd = 'TILTAK__LØNNSTILSKUDD',
    TiltakMentortilskudd = 'TILTAK__MENTORTILSKUDD',

    Målgruppe = 'MÅLGRUPPE',
    MålgruppeErUngeUnder30 = 'MÅLGRUPPE__ER_UNGE_UNDER_30',
    MålgruppeErSeniorerOver45 = 'MÅLGRUPPE__ER_SENIORER_OVER_45',
    MålgruppeKommerFraLandUtenforEØS = 'MÅLGRUPPE__KOMMER_FRA_LAND_UTENFOR_EØS',
    MålgruppeHullICVen = 'MÅLGRUPPE__HULL_I_CV_EN',
    MålgruppeLiteEllerIngenUtdanning = 'MÅLGRUPPE__LITE_ELLER_INGEN_UTDANNING',
    MålgruppeLiteEllerIngenArbeidserfaring = 'MÅLGRUPPE__LITE_ELLER_INGEN_ARBEIDSERFARING',

    StatligInkluderingsdugnad = 'STATLIG_INKLUDERINGSDUGNAD',
}

export enum MulighetForDirektemeldtStilling {
    Tilrettelegging,
    TiltakEllerVirkemiddel,
    PrioriterteMålgrupper,
}

export enum MulighetForEksternStilling {
    Tilrettelegging,
    StatligInkluderingsdugnad,
}

type GruppeMedTags = {
    hovedtag?: Tag;
    subtags?: Tag[];
};

export const hierarkiAvTagsForDirektemeldteStillinger: Record<
    MulighetForDirektemeldtStilling,
    GruppeMedTags
> = {
    [MulighetForDirektemeldtStilling.Tilrettelegging]: {
        hovedtag: Tag.Tilrettelegging,
        subtags: [
            Tag.TilretteleggingArbeidstid,
            Tag.TilretteleggingArbeidshverdagen,
            Tag.TilretteleggingFysisk,
            Tag.TilretteleggingGrunnleggende,
        ],
    },

    [MulighetForDirektemeldtStilling.TiltakEllerVirkemiddel]: {
        subtags: [Tag.TiltakLønnstilskudd, Tag.TiltakMentortilskudd],
    },

    [MulighetForDirektemeldtStilling.PrioriterteMålgrupper]: {
        hovedtag: Tag.Målgruppe,
        subtags: [
            Tag.MålgruppeErUngeUnder30,
            Tag.MålgruppeErSeniorerOver45,
            Tag.MålgruppeKommerFraLandUtenforEØS,
            Tag.MålgruppeHullICVen,
            Tag.MålgruppeLiteEllerIngenUtdanning,
            Tag.MålgruppeLiteEllerIngenArbeidserfaring,
        ],
    },
};

export const hierarkiAvTagsForEksterneStillinger: Record<
    MulighetForEksternStilling,
    GruppeMedTags
> = {
    [MulighetForEksternStilling.Tilrettelegging]: {
        hovedtag: Tag.Tilrettelegging,
        subtags: [
            Tag.TilretteleggingArbeidstid,
            Tag.TilretteleggingArbeidshverdagen,
            Tag.TilretteleggingFysisk,
            Tag.TilretteleggingGrunnleggende,
        ],
    },

    [MulighetForEksternStilling.StatligInkluderingsdugnad]: {
        hovedtag: Tag.StatligInkluderingsdugnad,
    },
};
