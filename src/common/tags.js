export const inkluderingstags = {
    INKLUDERING: 'Arbeidsgiver ønsker å tilrettelegge',
    INKLUDERING__ARBEIDSTID: 'Tilrettelegging av arbeidstid',
    INKLUDERING__FYSISK: 'Fysisk tilrettelegging på arbeidsplassen',
    INKLUDERING__ARBEIDSMILJØ: 'Tilpasninger i arbeidshverdagen',
    INKLUDERING__GRUNNLEGGENDE: 'Utfordringer med norsk',
    STATLIG_INKLUDERINGSDUGNAD: 'Statlig inkluderingsdugnad',
};

export const kategorisering = [
    {
        tag: 'INKLUDERING',
        harUnderkategorier: true,
        tittelTilUnderkategorier: 'Muligheter for tilrettelegging',
        underkategorier: [
            'INKLUDERING__ARBEIDSTID',
            'INKLUDERING__FYSISK',
            'INKLUDERING__ARBEIDSMILJØ',
            'INKLUDERING__GRUNNLEGGENDE',
        ],
    },
    {
        tag: 'STATLIG_INKLUDERINGSDUGNAD',
        harUnderkategorier: false,
    },
];
