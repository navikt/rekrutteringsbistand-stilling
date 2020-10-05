export enum Tag {
    Tilrettelegging = 'INKLUDERING',
    TilretteleggingArbeidstid = 'INKLUDERING__ARBEIDSTID',
    TilretteleggingFysisk = 'INKLUDERING__FYSISK',
    TilretteleggingArbeidshverdagen = 'INKLUDERING__ARBEIDSMILJØ',
    TilretteleggingGrunnleggende = 'INKLUDERING__GRUNNLEGGENDE',

    Tiltak = 'TILTAK',
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

export enum InkluderingsmulighetForDirektemeldtStilling {
    Tilrettelegging,
    TiltakEllerVirkemiddel,
    PrioriterteMålgrupper,
}

export enum InkluderingsmulighetForEksternStilling {
    Tilrettelegging,
    StatligInkluderingsdugnad,
}

export enum AlleInkluderingsmuligheter {
    Tilrettelegging,
    TiltakEllerVirkemiddel,
    PrioriterteMålgrupper,
    StatligInkluderingsdugnad,
}

type GruppeMedTags = {
    hovedtag?: Tag;
    subtags: Tag[];
};

export const hierarkiAvTagsForDirektemeldteStillinger: Record<
    InkluderingsmulighetForDirektemeldtStilling,
    GruppeMedTags
> = {
    [InkluderingsmulighetForDirektemeldtStilling.Tilrettelegging]: {
        hovedtag: Tag.Tilrettelegging,
        subtags: [
            Tag.TilretteleggingArbeidstid,
            Tag.TilretteleggingArbeidshverdagen,
            Tag.TilretteleggingFysisk,
            Tag.TilretteleggingGrunnleggende,
        ],
    },

    [InkluderingsmulighetForDirektemeldtStilling.TiltakEllerVirkemiddel]: {
        subtags: [Tag.TiltakLønnstilskudd, Tag.TiltakMentortilskudd],
    },

    [InkluderingsmulighetForDirektemeldtStilling.PrioriterteMålgrupper]: {
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
    InkluderingsmulighetForEksternStilling,
    GruppeMedTags
> = {
    [InkluderingsmulighetForEksternStilling.Tilrettelegging]: {
        hovedtag: Tag.Tilrettelegging,
        subtags: [
            Tag.TilretteleggingArbeidstid,
            Tag.TilretteleggingArbeidshverdagen,
            Tag.TilretteleggingFysisk,
            Tag.TilretteleggingGrunnleggende,
        ],
    },

    [InkluderingsmulighetForEksternStilling.StatligInkluderingsdugnad]: {
        subtags: [Tag.StatligInkluderingsdugnad],
    },
};

export const hierarkiAvTagsForFilter: Record<AlleInkluderingsmuligheter, GruppeMedTags> = {
    [AlleInkluderingsmuligheter.Tilrettelegging]: {
        hovedtag: Tag.Tilrettelegging,
        subtags: [
            Tag.TilretteleggingArbeidstid,
            Tag.TilretteleggingArbeidshverdagen,
            Tag.TilretteleggingFysisk,
            Tag.TilretteleggingGrunnleggende,
        ],
    },

    [AlleInkluderingsmuligheter.TiltakEllerVirkemiddel]: {
        hovedtag: Tag.Tiltak,
        subtags: [Tag.TiltakLønnstilskudd, Tag.TiltakMentortilskudd],
    },

    [AlleInkluderingsmuligheter.PrioriterteMålgrupper]: {
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

    [AlleInkluderingsmuligheter.StatligInkluderingsdugnad]: {
        subtags: [Tag.StatligInkluderingsdugnad],
    },
};

export const hentSubtagsForMulighetForDirektemeldtStilling = (
    inkluderingsmulighet: InkluderingsmulighetForDirektemeldtStilling
) => hierarkiAvTagsForDirektemeldteStillinger[inkluderingsmulighet].subtags;

export const hentSubtagsForMulighetForEksternStilling = (
    inkluderingsmulighet: InkluderingsmulighetForEksternStilling
) => hierarkiAvTagsForEksterneStillinger[inkluderingsmulighet].subtags;

export const hentSubtagsForMulighetForFilter = (inkluderingsmulighet: AlleInkluderingsmuligheter) =>
    hierarkiAvTagsForFilter[inkluderingsmulighet].subtags;
