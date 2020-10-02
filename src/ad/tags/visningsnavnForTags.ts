import { Tag } from './hierarkiAvTags';

export const visningsnavnForRegistrering: Partial<Record<Tag, string>> = {
    [Tag.TilretteleggingArbeidstid]: 'arbeidstid',
    [Tag.TilretteleggingFysisk]: 'fysisk tilrettelegging',
    [Tag.TilretteleggingArbeidshverdagen]: 'arbeidshverdagen',
    [Tag.TilretteleggingGrunnleggende]: 'utfordringer med norsk',
    [Tag.TiltakLønnstilskudd]: 'lønnstilskudd',
    [Tag.TiltakMentortilskudd]: 'mentor (tilskudd)',
    [Tag.MålgruppeErUngeUnder30]: 'er unge under 30 år',
    [Tag.MålgruppeErSeniorerOver45]: 'er seniorer 45+',
    [Tag.MålgruppeKommerFraLandUtenforEØS]: 'kommer fra land utenfor EØS',
    [Tag.MålgruppeHullICVen]: 'har hull i CV-en',
    [Tag.MålgruppeLiteEllerIngenUtdanning]: 'har lite eller ingen utdanning',
    [Tag.MålgruppeLiteEllerIngenArbeidserfaring]: 'har lite eller ingen arbeidserfaring',
    [Tag.StatligInkluderingsdugnad]: 'den statlige inkluderingsdugnaden',
};
