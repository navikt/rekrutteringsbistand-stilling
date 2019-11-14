import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox, SkjemaGruppe } from 'nav-frontend-skjema';

const GruppeMedTags = ({ gruppeMedTags, tittel, tagIsChecked, onTagChange, className }) => {
    return (
        <SkjemaGruppe
            className={`panel--tags--sok${className ? ' ' + className : ''}`}
            title={tittel}
        >
            {gruppeMedTags.map(({ tag, navn }) => {
                return (
                    <Checkbox
                        className="checkbox--tag--sok skjemaelement--pink"
                        id={`tag-${tag.toLowerCase()}-checkbox`}
                        label={navn}
                        key={tag}
                        value={tag}
                        checked={tagIsChecked(tag)}
                        onChange={onTagChange}
                    />
                );
            })}
        </SkjemaGruppe>
    );
};

GruppeMedTags.propTypes = {
    tittel: PropTypes.string.isRequired,
    gruppeMedTags: PropTypes.array.isRequired,
    tagIsChecked: PropTypes.func.isRequired,
    onTagChange: PropTypes.func.isRequired,
    className: PropTypes.string,
};

export default GruppeMedTags;
