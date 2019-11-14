import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Checkbox } from 'nav-frontend-skjema';
import { Undertittel } from 'nav-frontend-typografi';

const GruppeMedTags = ({ gruppeMedTags, tittel, tagIsChecked, onTagChange }) => (
    <Fragment>
        <Undertittel>{tittel}</Undertittel>
        {gruppeMedTags.map(({ tag, navn }) => (
            <Checkbox
                className="checkbox--tag skjemaelement--pink"
                id={`tag.${tag}-checkbox`}
                label={navn}
                value={tag}
                key={tag}
                checked={tagIsChecked(tag)}
                onChange={onTagChange}
            />
        ))}
    </Fragment>
);

GruppeMedTags.propTypes = {
    tittel: PropTypes.string.isRequired,
    gruppeMedTags: PropTypes.array.isRequired,
    tagIsChecked: PropTypes.func.isRequired,
    onTagChange: PropTypes.func.isRequired,
};

export default GruppeMedTags;
