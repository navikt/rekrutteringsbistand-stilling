import React from 'react';
import { Checkbox } from 'nav-frontend-skjema';
import { Undertittel } from 'nav-frontend-typografi';
import isJson from '../../edit/practicalInformation/IsJson';
import './Inkluderingsmuligheter.less';

const Inkluderingsmuligheter = (props) => {
    const { tags, tittel, inkluderingstags, onTagChange } = props;

    return (
        <section className="Inkluderingsmuligheter">
            <Undertittel className="Inkluderingsmuligheter__tittel">{tittel}</Undertittel>
            {inkluderingstags.map((tag) => {
                const isChecked = tags && isJson(tags) && JSON.parse(tags).includes(tag.key);

                return (
                    <Checkbox
                        className="checkbox--tag skjemaelement--pink"
                        id={`tag.${tag.key.toLowerCase()}-checkbox`}
                        label={tag.label}
                        value={tag.key}
                        key={tag.key}
                        checked={isChecked}
                        onChange={onTagChange}
                    />
                );
            })}
        </section>
    );
};

export default Inkluderingsmuligheter;
