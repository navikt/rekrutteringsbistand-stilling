export const TAG_HIERARCHY_SPACER = '__';

export const leggTilTagUnderRegistrering = (tags: string[], nyTag: string): string[] => {
    const nyTagErSubtag = nyTag.includes(TAG_HIERARCHY_SPACER);

    if (nyTagErSubtag) {
        const inkluderingsmulighet = nyTag.split(TAG_HIERARCHY_SPACER)[0];

        if (!tags.includes(inkluderingsmulighet)) {
            tags.push(inkluderingsmulighet);
        }
    }

    return [...tags, nyTag];
};

export const fjernTagUnderRegistrering = (tags: string[], tagSomSkalFjernes: string): string[] => {
    const inkluderingsmulighet = tagSomSkalFjernes.split(TAG_HIERARCHY_SPACER)[0];
    const erEnesteSubtagForInkluderingsmulighet =
        tags.filter((tag) => tag.startsWith(`${inkluderingsmulighet}${TAG_HIERARCHY_SPACER}`))
            .length === 1;

    if (erEnesteSubtagForInkluderingsmulighet) {
        const tagsUtenomInkluderingsmulighet = tags.filter((tag) => tag !== inkluderingsmulighet);
        const tagsUtenomTagSomSkalFjernes = tagsUtenomInkluderingsmulighet.filter(
            (tag) => tag !== tagSomSkalFjernes
        );

        return tagsUtenomTagSomSkalFjernes;
    }

    const tagsUtenomTagSomSkalFjernes = tags.filter((tag) => tag !== tagSomSkalFjernes);
    return tagsUtenomTagSomSkalFjernes;
};
