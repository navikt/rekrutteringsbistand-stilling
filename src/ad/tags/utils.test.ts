import { Tag } from './hierarkiAvTags';
import { leggTilTagUnderRegistrering, fjernTagUnderRegistrering } from './utils';

const utenTilretteleggingFysisk = [
    Tag.Målgruppe,
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

    test('Å legge til en subtag skal også legge til dens hovedtag', () => {
        expect(leggTilTagUnderRegistrering([], Tag.TilretteleggingFysisk)).toEqual(
            expect.arrayContaining([Tag.Tilrettelegging, Tag.TilretteleggingFysisk])
        );
    });

    test('Å legge til en subtag skal ikke legge til dens hovedtag hvis den er registrert fra før', () => {
        expect(leggTilTagUnderRegistrering([Tag.Målgruppe], Tag.MålgruppeHullICVen)).toEqual(
            expect.arrayContaining([Tag.Målgruppe, Tag.MålgruppeHullICVen])
        );
    });

    test('Fjerning av en subtag', () => {
        expect(
            fjernTagUnderRegistrering(medTilretteleggingFysisk, Tag.TilretteleggingFysisk)
        ).toEqual(expect.arrayContaining(utenTilretteleggingFysisk));
    });

    test('Fjerning av siste subtag innen en inkluderingsmulighet skal også fjerne dens hovedtag', () => {
        expect(
            fjernTagUnderRegistrering(
                [Tag.Målgruppe, Tag.MålgruppeErUngeUnder30],
                Tag.MålgruppeErUngeUnder30
            )
        ).toEqual(expect.arrayContaining([]));
    });

    test('Eksempel på feilende test', () => {
        expect(1).toBe(2);
    });
});
