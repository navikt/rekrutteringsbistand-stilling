export const TAG_HIERARCHY_SPACER = '__';

export const checkTagWithHierarchy = (currentTags, newTag) => {
    if (newTag.includes(TAG_HIERARCHY_SPACER)) {
        const baseTag = newTag.split(TAG_HIERARCHY_SPACER)[0];

        if (!currentTags.includes(baseTag)) {
            currentTags.push(baseTag);
        }
    }

    return [...currentTags, newTag];
};

export const uncheckTagWithHierarchy = (currentTags, tagToRemove) => {
    const newTags = currentTags.filter((tag) => tag !== tagToRemove);
    const otherSubtags = `${tagToRemove}${TAG_HIERARCHY_SPACER}`;

    return newTags.filter((tag) => !tag.startsWith(otherSubtags));
};
