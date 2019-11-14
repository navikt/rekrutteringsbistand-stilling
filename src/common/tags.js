export const inkluderingstags = {
    INKLUDERING: 'Inkludering',
    INKLUDERING__ARBEIDSTID: 'Tilrettelagt arbeidstid',
    INKLUDERING__FYSISK: 'Fysisk tilrettelegging av arbeidsplassen',
    INKLUDERING__ARBEIDSMILJØ: 'Tilrettelegging av arbeidsmiljøet',
    INKLUDERING__GRUNNLEGGENDE:
        'Få krav til grunnleggende ferdigheter som språk, regning eller tallforståelse',
    STATLIG_INKLUDERINGSDUGNAD: 'Statlig inkluderingsdugnad',
};

export const kategorisering = [
    {
        tag: 'INKLUDERING',
        harUnderkategorier: true,
        tittelTilUnderkategorier: 'Hvilke inkluderingsmuligheter har arbeidsgiver?',
        underkategorier: [
            'INKLUDERING__ARBEIDSTID',
            'INKLUDERING__ARBEIDSMILJØ',
            'INKLUDERING__FYSISK',
            'INKLUDERING__GRUNNLEGGENDE',
        ],
    },
    {
        tag: 'STATLIG_INKLUDERINGSDUGNAD',
        harUnderkategorier: false,
    },
];
