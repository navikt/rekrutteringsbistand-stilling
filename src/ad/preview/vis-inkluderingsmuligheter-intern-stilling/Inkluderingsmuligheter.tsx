import React, { FunctionComponent } from 'react';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import {
    hentSubtagsForMulighetForDirektemeldtStilling,
    InkluderingsmulighetForDirektemeldtStilling,
    Tag,
} from '../../tags/hierarkiAvTags';
import { visningsnavnForRegistrering } from '../../tags/visningsnavnForTags';

interface Props {
    registrerteTags: Tag[];
}

const Inkluderingsmuligheter: FunctionComponent<Props> = ({ registrerteTags }) => {
    const tagsInnenTilrettelegging = hentSubtagsForMulighetForDirektemeldtStilling(
        InkluderingsmulighetForDirektemeldtStilling.Tilrettelegging
    ).filter((tag) => registrerteTags.includes(tag));

    const tagsInnenPrioriterteMålgrupper = hentSubtagsForMulighetForDirektemeldtStilling(
        InkluderingsmulighetForDirektemeldtStilling.PrioriterteMålgrupper
    ).filter((tag) => registrerteTags.includes(tag));

    const tagsInnenTiltakEllerVirkemidler = hentSubtagsForMulighetForDirektemeldtStilling(
        InkluderingsmulighetForDirektemeldtStilling.TiltakEllerVirkemiddel
    ).filter((tag) => registrerteTags.includes(tag));

    return (
        <>
            {tagsInnenTilrettelegging.length > 0 && (
                <div className="blokk-s">
                    <Element>Arbeidsgiver kan tilrettelegge for</Element>
                    <ul className="vis-inkluderingsmuligheter-intern-stilling__tagliste">
                        {tagsInnenTilrettelegging.map((tag) => (
                            <Normaltekst tag="li" key={tag}>
                                {visningsnavnForRegistrering[tag]}
                            </Normaltekst>
                        ))}
                    </ul>
                </div>
            )}
            {tagsInnenPrioriterteMålgrupper.length > 0 && (
                <div className="blokk-s">
                    <Element>Arbeidsgiveren er åpen for kandidater som </Element>
                    <ul className="vis-inkluderingsmuligheter-intern-stilling__tagliste">
                        {tagsInnenPrioriterteMålgrupper.map((tag) => (
                            <Normaltekst tag="li" key={tag}>
                                {visningsnavnForRegistrering[tag]}
                            </Normaltekst>
                        ))}
                    </ul>
                </div>
            )}
            {tagsInnenTiltakEllerVirkemidler.length > 0 && (
                <div className="blokk-s">
                    <Element>Arbeidsgiveren er åpen for kandidater som </Element>
                    <ul className="vis-inkluderingsmuligheter-intern-stilling__tagliste">
                        {tagsInnenTiltakEllerVirkemidler.map((tag) => (
                            <Normaltekst tag="li" key={tag}>
                                {visningsnavnForRegistrering[tag]}
                            </Normaltekst>
                        ))}
                    </ul>
                </div>
            )}
        </>
    );
};

export default Inkluderingsmuligheter;
