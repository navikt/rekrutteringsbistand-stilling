export const direktemeldteInkluderingstags = {
    INKLUDERING: 'Arbeidsgiver ønsker å tilrettelegge',
    INKLUDERING__ARBEIDSTID: 'Tilrettelegging av arbeidstid',
    INKLUDERING__FYSISK: 'Fysisk tilrettelegging på arbeidsplassen',
    INKLUDERING__ARBEIDSMILJØ: 'Tilpasninger i arbeidshverdagen',
    INKLUDERING__GRUNNLEGGENDE: 'Utfordringer med norsk',
};

export const direktemeldtKategorisering = [
    {
        tag: 'INKLUDERING',
        harUnderkategorier: true,
        tittelTilUnderkategorier: 'Muligheter for tilrettelegging',
        underkategorier: [
            'INKLUDERING__ARBEIDSTID',
            'INKLUDERING__ARBEIDSMILJØ',
            'INKLUDERING__FYSISK',
            'INKLUDERING__GRUNNLEGGENDE',
        ],
    },
];
