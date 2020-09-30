export const TAG_HIERARCHY_SPACER = '__';

export enum Tag {
    Inkludering = 'INKLUDERING',
    InkluderingArbeidstid = 'INKLUDERING__ARBEIDSTID',
    InkluderingFysisk = 'INKLUDERING__FYSISK',
    InkluderingArbeidsmiljø = 'INKLUDERING__ARBEIDSMILJØ',
    InkluderingGrunnleggende = 'INKLUDERING__GRUNNLEGGENDE',
    StatligInkluderingsdugnad = 'STATLIG_INKLUDERINGSDUGNAD',
}

export const oversettelserAvTags: Record<Tag, string> = {
    [Tag.Inkludering]: 'Arbeidsgiver ønsker å tilrettelegge',
    [Tag.InkluderingArbeidstid]: 'Tilrettelegging av arbeidstid',
    [Tag.InkluderingFysisk]: 'Fysisk tilrettelegging på arbeidsplassen',
    [Tag.InkluderingArbeidsmiljø]: 'Tilpasninger i arbeidshverdagen',
    [Tag.InkluderingGrunnleggende]: 'Utfordringer med norsk',
    [Tag.StatligInkluderingsdugnad]: 'Statlig inkluderingsdugnad',
};

type Oversettelse = {
    tag: Tag;
    navn: string;
};

export type KategoriMedTags = Oversettelse &
    (
        | {
              harUnderkategorier: false;
          }
        | {
              harUnderkategorier: true;
              tittelTilUnderkategorier: string;
              underkategorier: Oversettelse[];
          }
    );

const medOversettelse = (tag: Tag) => ({
    tag: tag,
    navn: oversettelserAvTags[tag],
});

export const kategorierMedTagsForDirektemeldteStillinger: KategoriMedTags[] = [
    {
        ...medOversettelse(Tag.Inkludering),
        harUnderkategorier: true,
        tittelTilUnderkategorier: 'Muligheter for tilrettelegging',
        underkategorier: [
            medOversettelse(Tag.InkluderingArbeidstid),
            medOversettelse(Tag.InkluderingArbeidsmiljø),
            medOversettelse(Tag.InkluderingFysisk),
            medOversettelse(Tag.InkluderingGrunnleggende),
        ],
    },
];

export const kategorierMedTagsForEksterneStillinger: KategoriMedTags[] = [
    ...kategorierMedTagsForDirektemeldteStillinger,
    {
        ...medOversettelse(Tag.StatligInkluderingsdugnad),
        harUnderkategorier: false,
    },
];

export const hentHierarkiAvTags = (direktemeldt: boolean = false): KategoriMedTags[] =>
    direktemeldt
        ? kategorierMedTagsForDirektemeldteStillinger
        : kategorierMedTagsForEksterneStillinger;

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
