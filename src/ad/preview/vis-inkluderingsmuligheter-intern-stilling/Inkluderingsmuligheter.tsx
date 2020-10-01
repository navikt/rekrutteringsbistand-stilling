import { Element, Feilmelding, Normaltekst } from 'nav-frontend-typografi';
import React, { FunctionComponent } from 'react';
import isJson from '../../edit/practicalInformation/IsJson';
import { GruppeMedTags, hentGrupperMedTags, Tag } from '../../tags';

interface Props {
    tags?: string;
}

const Inkluderingsmuligheter: FunctionComponent<Props> = ({ tags }) => {
    const inkluderingsmuligheterErRegistrert = tags !== undefined;
    const tagsErGyldige = !inkluderingsmuligheterErRegistrert || isJson(tags);

    if (!tagsErGyldige) {
        return <Feilmelding>Noe galt skjedde ved uthenting av inkluderingsmuligheter.</Feilmelding>;
    }

    if (!inkluderingsmuligheterErRegistrert) {
        return <Normaltekst>Ingen inkluderingsmuligheter er registrert.</Normaltekst>;
    }

    const parsedeTags: Tag[] = JSON.parse(tags!);
    const grupperMedTags = hentGrupperMedTags(true);
    const grupperRegistrertPåStillingen: GruppeMedTags[] = grupperMedTags
        .filter((kategori) => parsedeTags.includes(kategori.tag))
        .map((gruppeMedTags) => {
            const subtagsRegistrertPåStillingen = gruppeMedTags.harSubtags
                ? gruppeMedTags.subtags.filter((underkategori) =>
                      parsedeTags.includes(underkategori.tag)
                  )
                : [];

            const inkluderingsmulighetTittel = inkluderingsmulighetTilVisningsnavn(
                gruppeMedTags.tag,
                subtagsRegistrertPåStillingen.length > 0
            );

            return {
                ...gruppeMedTags,
                navn: inkluderingsmulighetTittel,
                subtags: subtagsRegistrertPåStillingen,
            };
        });

    return (
        <>
            {grupperRegistrertPåStillingen.map((gruppeMedTags) => (
                <div key={gruppeMedTags.tag} className="blokk-s">
                    <Element>{gruppeMedTags.navn}</Element>
                    {gruppeMedTags.harSubtags && (
                        <ul className="vis-inkluderingsmuligheter-intern-stilling__tagliste">
                            {gruppeMedTags.subtags.map((subtag) => (
                                <Normaltekst tag="li" key={subtag.tag}>
                                    {visningsnavnForSubtags[subtag.tag]}
                                </Normaltekst>
                            ))}
                        </ul>
                    )}
                </div>
            ))}
        </>
    );
};

const visningsnavnForSubtags: Partial<Record<Tag, string>> = {
    [Tag.InkluderingArbeidstid]: 'arbeidstid',
    [Tag.InkluderingFysisk]: 'fysiske omstendigheter',
    [Tag.InkluderingArbeidshverdagen]: 'arbeidshverdagen',
    [Tag.InkluderingGrunnleggende]: 'utfordringer med norsk',
};

const inkluderingsmulighetTilVisningsnavn = (inkluderingsmulighet: Tag, harSubtags: boolean) => {
    switch (inkluderingsmulighet) {
        case Tag.Inkludering:
            return harSubtags
                ? 'Arbeidsgiver kan tilrettelegge for:'
                : 'Arbeidsgiveren kan tilrettelegge';
        default:
            return 'Ukjent inkluderingsmulighet';
    }
};

export default Inkluderingsmuligheter;
