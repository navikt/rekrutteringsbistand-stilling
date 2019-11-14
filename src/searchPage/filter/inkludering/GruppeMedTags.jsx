import React from 'react';
import { Checkbox, SkjemaGruppe } from 'nav-frontend-skjema';
import { inkluderingstags } from '../../../common/tags';

const GruppeMedTags = ({ gruppeMedTags, tittel, tags, onTagChange, className }) => {
    return (
        <SkjemaGruppe
            className={`panel--tags--sok${className ? ' ' + className : ''}`}
            title={tittel}
        >
            {gruppeMedTags.map(({ tag }) => {
                return (
                    <Checkbox
                        className="checkbox--tag--sok skjemaelement--pink"
                        id={`tag-${tag.toLowerCase()}-checkbox`}
                        label={inkluderingstags[tag]}
                        key={tag}
                        value={tag}
                        checked={tags.includes(tag)}
                        onChange={onTagChange}
                    />
                );
            })}
        </SkjemaGruppe>
    );
};

export default GruppeMedTags;
