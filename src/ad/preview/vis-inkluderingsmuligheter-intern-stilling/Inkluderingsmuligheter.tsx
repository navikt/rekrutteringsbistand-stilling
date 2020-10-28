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

const Inkluderingsmuligheter: FunctionComponent<Props> = ({ registrerteTags }) => (
    <>
        <Tags
            tittel="Arbeidsgiver kan tilrettelegge for"
            alleTags={registrerteTags}
            inkluderingsmulighet={InkluderingsmulighetForDirektemeldtStilling.Tilrettelegging}
        />
        <Tags
            tittel="Arbeidsgiveren er åpen for kandidater som"
            alleTags={registrerteTags}
            inkluderingsmulighet={InkluderingsmulighetForDirektemeldtStilling.PrioriterteMålgrupper}
        />
        <Tags
            tittel="Arbeidsgiver er åpen for de som trenger"
            alleTags={registrerteTags}
            inkluderingsmulighet={
                InkluderingsmulighetForDirektemeldtStilling.TiltakEllerVirkemiddel
            }
        />
        <Tags
            tittel="Arbeidsgiver er del av"
            alleTags={registrerteTags}
            inkluderingsmulighet={
                InkluderingsmulighetForDirektemeldtStilling.StatligInkluderingsdugnad
            }
        />
    </>
);

const Tags = ({
    alleTags,
    tittel,
    inkluderingsmulighet,
}: {
    alleTags: Tag[];
    tittel: string;
    inkluderingsmulighet: InkluderingsmulighetForDirektemeldtStilling;
}) => {
    const tagsInnenMulighet = hentSubtagsForMulighetForDirektemeldtStilling(
        inkluderingsmulighet
    ).filter((tag) => alleTags.includes(tag));

    if (tagsInnenMulighet.length === 0) {
        return null;
    }

    return (
        <div className="vis-inkluderingsmuligheter-intern-stilling__inkluderingsmulighet">
            <Element>{tittel}</Element>
            <ul className="vis-inkluderingsmuligheter-intern-stilling__tagliste">
                {tagsInnenMulighet.map((tag) => (
                    <Normaltekst tag="li" key={tag}>
                        {visningsnavnForRegistrering[tag]}
                    </Normaltekst>
                ))}
            </ul>
        </div>
    );
};

export default Inkluderingsmuligheter;
