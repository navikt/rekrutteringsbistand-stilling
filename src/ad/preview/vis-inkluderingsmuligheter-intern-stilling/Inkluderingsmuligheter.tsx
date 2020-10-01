import React, { FunctionComponent } from 'react';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import { GruppeMedTags, Tag } from '../../tags';

interface Props {
    registrerteTags: Tag[];
    alleRelevanteGrupperMedTags: GruppeMedTags[];
}

const Inkluderingsmuligheter: FunctionComponent<Props> = ({
    registrerteTags,
    alleRelevanteGrupperMedTags,
}) => {
    const registrerteInkuderingstags: GruppeMedTags[] = alleRelevanteGrupperMedTags
        .filter(gruppeMedTagsErRegistrertOgHarSubtags(registrerteTags))
        .map(fjernSubtagsSomIkkeErRegistrert(registrerteTags));

    return (
        <>
            {registrerteInkuderingstags.map((gruppeMedTags) => (
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

const gruppeMedTagsErRegistrertOgHarSubtags = (registrerteTags: Tag[]) => (
    gruppeMedTags: GruppeMedTags
) => registrerteTags.includes(gruppeMedTags.tag) && gruppeMedTags.harSubtags;

const fjernSubtagsSomIkkeErRegistrert = (registrerteTags: Tag[]) => (
    gruppeMedTags: GruppeMedTags
): GruppeMedTags => {
    if (gruppeMedTags.harSubtags) {
        const subtagsRegistrertPåStillingen = gruppeMedTags.subtags.filter((subtag) =>
            registrerteTags.includes(subtag.tag)
        );

        const inkluderingsmulighetTittel = inkluderingsmulighetTilVisningsnavn(
            gruppeMedTags.tag,
            subtagsRegistrertPåStillingen.length > 0
        );

        return {
            ...gruppeMedTags,
            navn: inkluderingsmulighetTittel,
            subtags: subtagsRegistrertPåStillingen,
        };
    } else {
        return gruppeMedTags;
    }
};

const visningsnavnForSubtags: Partial<Record<Tag, string>> = {
    [Tag.InkluderingArbeidstid]: 'arbeidstid',
    [Tag.InkluderingFysisk]: 'fysisk tilrettelegging',
    [Tag.InkluderingArbeidshverdagen]: 'arbeidshverdagen',
    [Tag.InkluderingGrunnleggende]: 'utfordringer med norsk',
};

const inkluderingsmulighetTilVisningsnavn = (inkluderingsmulighet: Tag, harSubtags: boolean) => {
    switch (inkluderingsmulighet) {
        case Tag.Inkludering:
            return harSubtags
                ? 'Arbeidsgiveren kan gjøre tilpasninger rundt:'
                : 'Arbeidsgiveren kan tilrettelegge';
        default:
            return 'Ukjent inkluderingsmulighet';
    }
};

export default Inkluderingsmuligheter;
