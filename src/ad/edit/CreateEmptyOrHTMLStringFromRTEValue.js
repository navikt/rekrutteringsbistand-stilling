export const createEmptyOrHTMLStringFromRTEValue = (rteValue) => {
    const tomromEllerIkkeOrdRegex = /^(\s|\W)+$/g;
    const tekstMarkdown = rteValue.toString('markdown');
    let nyTekst = '';
    if (tekstMarkdown.search(tomromEllerIkkeOrdRegex) < 0) {
        nyTekst = rteValue.toString('html');
    }

    return nyTekst;
};
