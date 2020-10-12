import { Tag } from './hierarkiAvTags';
import {
    tagsInneholderInkluderingsmuligheter,
    leggTilTagUnderRegistrering,
    fjernTagUnderRegistrering,
    fjernTagFraFilteret,
} from './utils';

const utenTilretteleggingFysisk = [
    Tag.PrioritertMålgruppe,
    Tag.MålgruppeErUngeUnder30,
    Tag.Tilrettelegging,
    Tag.TilretteleggingArbeidshverdagen,
];

const medTilretteleggingFysisk = [...utenTilretteleggingFysisk, Tag.TilretteleggingFysisk];

describe('Registrere inkluderingsmuligheter på en stilling', () => {
    test('Å legge til en subtag', () => {
        expect(
            leggTilTagUnderRegistrering(utenTilretteleggingFysisk, Tag.TilretteleggingFysisk)
        ).toEqual(expect.arrayContaining(medTilretteleggingFysisk));
    });

    test('Å legge til en subtag legger til dens hovedtag', () => {
        expect(leggTilTagUnderRegistrering([], Tag.TilretteleggingFysisk)).toEqual(
            expect.arrayContaining([Tag.Tilrettelegging, Tag.TilretteleggingFysisk])
        );
    });

    test('Å legge til en subtag legger ikke til dens hovedtag hvis den er registrert fra før', () => {
        expect(
            leggTilTagUnderRegistrering([Tag.PrioritertMålgruppe], Tag.MålgruppeHullICVen)
        ).toEqual(expect.arrayContaining([Tag.PrioritertMålgruppe, Tag.MålgruppeHullICVen]));
    });

    test('Fjerning av en subtag', () => {
        expect(
            fjernTagUnderRegistrering(medTilretteleggingFysisk, Tag.TilretteleggingFysisk)
        ).toEqual(expect.arrayContaining(utenTilretteleggingFysisk));
    });

    test('Fjerning av siste subtag innen en inkluderingsmulighet fjerner også dens hovedtag', () => {
        expect(
            fjernTagUnderRegistrering(
                [Tag.PrioritertMålgruppe, Tag.MålgruppeErUngeUnder30],
                Tag.MålgruppeErUngeUnder30
            )
        ).toEqual(expect.arrayContaining([]));
    });
});

describe('Filtrering på inkluderingsmuligheter', () => {
    test('Fjerning av en hovedtag fjerner også subtags', () => {
        expect(
            fjernTagFraFilteret(
                [
                    Tag.Tilrettelegging,
                    Tag.TilretteleggingArbeidshverdagen,
                    Tag.TilretteleggingFysisk,
                ],
                Tag.Tilrettelegging
            )
        ).toEqual(expect.arrayContaining([]));
    });
});

describe('Parsing av tags og inkluderingsmuligheter', () => {
    test('En liste med én inkluderingsmulighet inneholder inkluderingsmuligheter', () => {
        expect(tagsInneholderInkluderingsmuligheter(JSON.stringify([Tag.Tilrettelegging]))).toBe(
            true
        );
    });

    test('Ugyldig JSON inneholder ikke inkluderingsmuligheter', () => {
        expect(tagsInneholderInkluderingsmuligheter('dsa')).toBe(false);
    });

    test('En udefinert variabel inneholder ikke inkluderingsmuligheter', () => {
        expect(tagsInneholderInkluderingsmuligheter(undefined)).toBe(false);
    });

    test('En tom liste inneholder ikke inkluderingsmuligheter', () => {
        expect(tagsInneholderInkluderingsmuligheter('[]')).toBe(false);
    });

    test('En liste med en udefinert tag inneholder ikke inkluderingsmuligheter', () => {
        expect(tagsInneholderInkluderingsmuligheter(JSON.stringify(['IKKE_GYLDIG_TAG']))).toBe(
            false
        );
    });
});
