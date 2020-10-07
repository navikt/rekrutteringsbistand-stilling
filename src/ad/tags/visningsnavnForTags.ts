import { Tag } from './hierarkiAvTags';

export const visningsnavnForRegistrering: Partial<Record<Tag, string>> = {
    [Tag.TilretteleggingArbeidstid]: 'arbeidstid',
    [Tag.TilretteleggingFysisk]: 'fysisk tilrettelegging',
    [Tag.TilretteleggingArbeidshverdagen]: 'arbeidshverdagen',
    [Tag.TilretteleggingGrunnleggende]: 'utfordringer med norsk',
    [Tag.VirkemiddelLønnstilskudd]: 'lønnstilskudd',
    [Tag.VirkemiddelMentortilskudd]: 'mentor (tilskudd)',
    [Tag.MålgruppeErUngeUnder30]: 'er unge under 30 år',
    [Tag.MålgruppeErSeniorerOver45]: 'er seniorer 45+',
    [Tag.MålgruppeKommerFraLandUtenforEØS]: 'kommer fra land utenfor EØS',
    [Tag.MålgruppeHullICVen]: 'har hull i CV-en',
    [Tag.MålgruppeLiteEllerIngenUtdanning]: 'har lite eller ingen utdanning',
    [Tag.MålgruppeLiteEllerIngenArbeidserfaring]: 'har lite eller ingen arbeidserfaring',
    [Tag.StatligInkluderingsdugnad]: 'den statlige inkluderingsdugnaden',
};

export const visningsnavnForFilter: Record<Tag, string> = {
    [Tag.Tilrettelegging]: 'Alle muligheter',
    [Tag.TilretteleggingArbeidstid]: 'Arbeidstid',
    [Tag.TilretteleggingFysisk]: 'Fysisk tilrettelegging',
    [Tag.TilretteleggingArbeidshverdagen]: 'Arbeidshverdagen',
    [Tag.TilretteleggingGrunnleggende]: 'Utfordringer med norsk',

    [Tag.TiltakEllerVirkemiddel]: 'Alle virkemidler',
    [Tag.VirkemiddelLønnstilskudd]: 'Lønnstilskudd',
    [Tag.VirkemiddelMentortilskudd]: 'Mentor (tilskudd)',

    [Tag.PrioritertMålgruppe]: 'Alle målgrupper',
    [Tag.MålgruppeErUngeUnder30]: 'Unge under 30 år',
    [Tag.MålgruppeErSeniorerOver45]: 'Seniorer 45+',
    [Tag.MålgruppeKommerFraLandUtenforEØS]: 'Borgere fra land utenfor EØS',
    [Tag.MålgruppeHullICVen]: 'Hull i CV-en',
    [Tag.MålgruppeLiteEllerIngenUtdanning]: 'Lite eller ingen utdanning',
    [Tag.MålgruppeLiteEllerIngenArbeidserfaring]: 'Lite eller ingen arbeidserfaring',

    [Tag.StatligInkluderingsdugnad]: 'Den statlige inkluderingsdugnaden',
};
