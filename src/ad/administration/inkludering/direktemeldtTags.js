export const direktemeldteInkluderingstags = {
    INKLUDERING: 'Inkludering',
    INKLUDERING__ARBEIDSTID: 'Tilrettelagt arbeidstid',
    INKLUDERING__FYSISK: 'Fysisk tilrettelegging av arbeidsplassen',
    INKLUDERING__ARBEIDSMILJØ: 'Tilrettelegging av arbeidsmiljøet',
    INKLUDERING__GRUNNLEGGENDE:
        'Få krav til grunnleggende ferdigheter som språk, regning eller tallforståelse',
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
