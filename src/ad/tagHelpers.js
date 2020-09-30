import {
    direktemeldteInkluderingstags,
    direktemeldtKategorisering,
} from './edit/registrer-inkluderingsmuligheter-intern-stilling/direktemeldtTags';
import { inkluderingstags, kategorisering } from '../common/tags';

export const TAG_HIERARCHY_SPACER = '__';

export const checkInkluderingstag = (currentTags, newTag) => {
    if (newTag.includes(TAG_HIERARCHY_SPACER)) {
        const baseTag = newTag.split(TAG_HIERARCHY_SPACER)[0];

        if (!currentTags.includes(baseTag)) {
            currentTags.push(baseTag);
        }
    }

    return [...currentTags, newTag];
};

export const uncheckInkluderingstag = (currentTags, tagToRemove) => {
    const newTags = currentTags.filter((tag) => tag !== tagToRemove);
    const otherSubtags = `${tagToRemove}${TAG_HIERARCHY_SPACER}`;

    return newTags.filter((tag) => !tag.startsWith(otherSubtags));
};

export const hentKategorierMedNavn = (direktemeldt = false) => {
    const kategorier = direktemeldt ? direktemeldtKategorisering : kategorisering;

    return kategorier.map((kategori) => {
        const navn = direktemeldt
            ? direktemeldteInkluderingstags[kategori.tag]
            : inkluderingstags[kategori.tag];

        return {
            navn,
            ...kategori,
            underkategorier:
                kategori.underkategorier &&
                kategori.underkategorier.map((underkategori) => ({
                    tag: underkategori,
                    navn: direktemeldt
                        ? direktemeldteInkluderingstags[underkategori]
                        : inkluderingstags[underkategori],
                })),
        };
    });
};
