import React from 'react';
import { Checkbox } from 'nav-frontend-skjema';
import { Normaltekst } from 'nav-frontend-typografi';
import './Inkluderingsmuligheter.less';

import isJson from '../../edit/practicalInformation/IsJson';
import { TAG_HIERARCHY_SPACER } from '../../tagHelpers';

const Inkluderingsmuligheter = ({ inkluderingIsChecked, allTags, muligheter, onTagChange }) => {
    const { label, tags } = muligheter;

    return (
        <section className="Inkluderingsmuligheter">
            <Normaltekst className="Inkluderingsmuligheter__tittel">{label}</Normaltekst>
            {Object.keys(tags).map((subTag) => {
                const { key, label } = tags[subTag];
                const keyInHierarchy = `INKLUDERING${TAG_HIERARCHY_SPACER}${key}`;
                const isChecked = allTags
                    ? isJson(allTags) && JSON.parse(allTags).includes(keyInHierarchy)
                    : false;

                return (
                    <Checkbox
                        disabled={!inkluderingIsChecked}
                        className="checkbox--tag skjemaelement--pink"
                        id={`tag-${keyInHierarchy.toLowerCase()}-checkbox`}
                        label={label}
                        key={keyInHierarchy}
                        value={keyInHierarchy}
                        checked={isChecked}
                        onChange={(e) => onTagChange(e)}
                    />
                );
            })}
        </section>
    );
};

export default Inkluderingsmuligheter;
