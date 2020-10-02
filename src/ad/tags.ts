export const TAG_HIERARCHY_SPACER = '__';

export enum Tag {
    Inkludering = 'INKLUDERING',
    InkluderingArbeidstid = 'INKLUDERING__ARBEIDSTID',
    InkluderingFysisk = 'INKLUDERING__FYSISK',
    InkluderingArbeidshverdagen = 'INKLUDERING__ARBEIDSMILJØ',
    InkluderingGrunnleggende = 'INKLUDERING__GRUNNLEGGENDE',
    StatligInkluderingsdugnad = 'STATLIG_INKLUDERINGSDUGNAD',
}

const visningsnavnForTags: Record<Tag, string> = {
    [Tag.Inkludering]: 'Arbeidsgiver ønsker å tilrettelegge',
    [Tag.InkluderingArbeidstid]: 'Tilrettelegging av arbeidstid',
    [Tag.InkluderingFysisk]: 'Fysisk tilrettelegging på arbeidsplassen',
    [Tag.InkluderingArbeidshverdagen]: 'Tilpasninger i arbeidshverdagen',
    [Tag.InkluderingGrunnleggende]: 'Utfordringer med norsk',
    [Tag.StatligInkluderingsdugnad]: 'Statlig inkluderingsdugnad',
};

type Oversettelse = {
    tag: Tag;
    navn: string;
};

export type GruppeMedTags = Oversettelse &
    (
        | {
              harSubtags: false;
          }
        | {
              harSubtags: true;
              tittelTilSubtags: string;
              subtags: Oversettelse[];
          }
    );

const medOversettelse = (tag: Tag) => ({
    tag: tag,
    navn: visningsnavnForTags[tag],
});

export const grupperMedTagsForDirektemeldteStillinger: GruppeMedTags[] = [
    {
        ...medOversettelse(Tag.Inkludering),
        harSubtags: true,
        tittelTilSubtags: 'Muligheter for tilrettelegging',
        subtags: [
            medOversettelse(Tag.InkluderingArbeidstid),
            medOversettelse(Tag.InkluderingArbeidshverdagen),
            medOversettelse(Tag.InkluderingFysisk),
            medOversettelse(Tag.InkluderingGrunnleggende),
        ],
    },
];

export const grupperMedTagsForEksterneStillinger: GruppeMedTags[] = [
    ...grupperMedTagsForDirektemeldteStillinger,
    {
        ...medOversettelse(Tag.StatligInkluderingsdugnad),
        harSubtags: false,
    },
];

export const hentGrupperMedTags = (direktemeldt: boolean = false): GruppeMedTags[] =>
    direktemeldt ? grupperMedTagsForDirektemeldteStillinger : grupperMedTagsForEksterneStillinger;

export const checkInkluderingstag = (tags: string[], nyTag: string): string[] => {
    const nyTagErSubtag = nyTag.includes(TAG_HIERARCHY_SPACER);

    if (nyTagErSubtag) {
        const inkluderingsmulighet = nyTag.split(TAG_HIERARCHY_SPACER)[0];

        if (!tags.includes(inkluderingsmulighet)) {
            tags.push(inkluderingsmulighet);
        }
    }

    return [...tags, nyTag];
};

export const uncheckInkluderingstag = (tags: string[], tagSomSkalFjernes: string): string[] => {
    const inkluderingsmulighet = tagSomSkalFjernes.split(TAG_HIERARCHY_SPACER)[0];
    const erEnesteSubtagForInkluderingsmulighet =
        tags.filter((tag) => tag.startsWith(`${inkluderingsmulighet}${TAG_HIERARCHY_SPACER}`))
            .length === 1;

    if (erEnesteSubtagForInkluderingsmulighet) {
        const tagsUtenomInkluderingsmulighet = tags.filter((tag) => tag !== inkluderingsmulighet);
        const tagsUtenomTagSomSkalFjernes = tagsUtenomInkluderingsmulighet.filter(
            (tag) => tag !== tagSomSkalFjernes
        );

        return tagsUtenomTagSomSkalFjernes;
    }

    const tagsUtenomTagSomSkalFjernes = tags.filter((tag) => tag !== tagSomSkalFjernes);
    return tagsUtenomTagSomSkalFjernes;
};
