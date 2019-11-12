import React, { Fragment } from 'react';
import { Checkbox } from 'nav-frontend-skjema';
import { Normaltekst } from 'nav-frontend-typografi';

import isJson from '../../edit/practicalInformation/IsJson';
import { TAG_HIERARCHY_SPACER } from '../../tagHelpers';

const Inkluderingsmuligheter = ({ allTags, muligheter, onTagChange }) => {
    const { label, tags } = muligheter;

    return (
        <Fragment>
            <Normaltekst>{label}</Normaltekst>
            {Object.keys(tags).map((subTag) => {
                const { key, label } = tags[subTag];
                const actualKey = `INKLUDERING${TAG_HIERARCHY_SPACER}${key}`;

                return (
                    <Checkbox
                        className="checkbox--tag skjemaelement--pink"
                        id={`tag-${key.toLowerCase()}-checkbox`}
                        label={label}
                        key={key}
                        value={actualKey}
                        checked={
                            allTags
                                ? isJson(allTags)
                                    ? JSON.parse(allTags).includes(actualKey)
                                    : false
                                : false
                        }
                        onChange={(e) => onTagChange(e)}
                    />
                );
            })}
        </Fragment>
    );
};

export default Inkluderingsmuligheter;
