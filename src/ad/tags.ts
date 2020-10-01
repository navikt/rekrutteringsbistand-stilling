export const TAG_HIERARCHY_SPACER = '__';

export enum Tag {
    Inkludering = 'INKLUDERING',
    InkluderingArbeidstid = 'INKLUDERING__ARBEIDSTID',
    InkluderingFysisk = 'INKLUDERING__FYSISK',
    InkluderingArbeidshverdagen = 'INKLUDERING__ARBEIDSMILJØ',
    InkluderingGrunnleggende = 'INKLUDERING__GRUNNLEGGENDE',
    StatligInkluderingsdugnad = 'STATLIG_INKLUDERINGSDUGNAD',
}

export const oversettelserAvTags: Record<Tag, string> = {
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
    navn: oversettelserAvTags[tag],
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

export const checkInkluderingstag = (currentTags: string[], newTag: string) => {
    if (newTag.includes(TAG_HIERARCHY_SPACER)) {
        const baseTag = newTag.split(TAG_HIERARCHY_SPACER)[0];

        if (!currentTags.includes(baseTag)) {
            currentTags.push(baseTag);
        }
    }

    return [...currentTags, newTag];
};

export const uncheckInkluderingstag = (currentTags: string[], tagToRemove: string) => {
    const newTags = currentTags.filter((tag) => tag !== tagToRemove);
    const otherSubtags = `${tagToRemove}${TAG_HIERARCHY_SPACER}`;

    return newTags.filter((tag) => !tag.startsWith(otherSubtags));
};
