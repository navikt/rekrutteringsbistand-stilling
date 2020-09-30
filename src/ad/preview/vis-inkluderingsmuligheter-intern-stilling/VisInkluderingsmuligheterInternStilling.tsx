import React, { FunctionComponent } from 'react';
import { Element, Feilmelding, Normaltekst, Undertittel } from 'nav-frontend-typografi';
import isJson from '../../edit/practicalInformation/IsJson';
import { hentHierarkiAvTags, Tag } from '../../tags';
import './VisInkluderingsmuligheterInternStilling.less';

interface Props {
    tags?: string;
}

const oversettTagKategori = (tag: Tag, harUnderkategorier: boolean) => {
    switch (tag) {
        case Tag.Inkludering:
            return harUnderkategorier
                ? 'Arbeidsgiver kan tilrettelegge for:'
                : 'Arbeidsgiveren kan tilrettelegge';
        default:
            return 'Ukjent kategori';
    }
};

const Inkluderingsmuligheter: FunctionComponent<Props> = ({ tags }) => {
    const inkluderingsmuligheterErRegistrert = tags !== undefined;
    const tagsErGyldige = tags === undefined || isJson(tags);

    if (!tagsErGyldige) {
        return <Feilmelding>Noe galt skjedde ved uthenting av inkluderingsmuligheter.</Feilmelding>;
    }

    if (!inkluderingsmuligheterErRegistrert) {
        return <Normaltekst>Ingen inkluderingsmuligheter er registrert.</Normaltekst>;
    }

    const parsedeTags: Tag[] = JSON.parse(tags!);
    const hierarkiAvTags = hentHierarkiAvTags(true);
    const kategorierRegistrertPåStillingen = hierarkiAvTags.filter((kategori) =>
        parsedeTags.includes(kategori.tag)
    );

    console.log({ parsedeTags, hierarkiAvTags, kategorierRegistrertPåStillingen });

    return (
        <>
            {kategorierRegistrertPåStillingen.map((kategori) => {
                const underkategorierRegistrertPåStillingen = kategori.harUnderkategorier
                    ? kategori.underkategorier.filter((underkategori) =>
                          parsedeTags.includes(underkategori.tag)
                      )
                    : [];

                const tittelForKategori = oversettTagKategori(
                    kategori.tag,
                    underkategorierRegistrertPåStillingen.length > 0
                );

                return (
                    <div key={kategori.tag} className="blokk-s">
                        <Element>{tittelForKategori}</Element>
                        {kategori.harUnderkategorier && (
                            <ul className="vis-inkluderingsmuligheter-intern-stilling__tagliste">
                                {underkategorierRegistrertPåStillingen.map((underkategori) => {
                                    return (
                                        <Normaltekst tag="li" key={underkategori.tag}>
                                            {underkategori.navn}
                                        </Normaltekst>
                                    );
                                })}
                            </ul>
                        )}
                    </div>
                );
            })}
        </>
    );
};

const VisInkluderingsmuligheterInternStilling: FunctionComponent<Props> = ({ tags }) => {
    return (
        <div className="vis-inkluderingsmuligheter-intern-stilling">
            <Undertittel className="vis-inkluderingsmuligheter-intern-stilling__tittel">
                Mulighet for å inkludere
            </Undertittel>
            <Inkluderingsmuligheter tags={tags} />
        </div>
    );
};

export default VisInkluderingsmuligheterInternStilling;
