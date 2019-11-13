export const Tags = {
    INKLUDERING: 'Inkludering',
    INKLUDERING__ARBEIDSTID: 'Tilrettelagt arbeidstid',
    INKLUDERING__FYSISK: 'Fysisk tilrettelegging av arbeidsplassen',
    INKLUDERING__ARBEIDSMILJØ: 'Tilrettelegging av arbeidsmiljøet',
    INKLUDERING__GRUNNLEGGENDE:
        'Få krav til grunnleggende ferdigheter som språk, regning eller tallforståelse',
    STATLIG_INKLUDERINGSDUGNAD: 'Statlig inkluderingsdugnad',
};

export const hierarki = {
    STATLIG_INKLUDERINGSDUGNAD: {
        harSubtags: false,
    },
    INKLUDERING: {
        harSubtags: true,
        subtittel: 'Hvilke inkluderingsmuligheter har arbeidsgiver?',
        subtags: [
            'INKLUDERING__ARBEIDSTID',
            'INKLUDERING__ARBEIDSMILJØ',
            'INKLUDERING__FYSISK',
            'INKLUDERING__GRUNNLEGGENDE',
        ],
    },
};
