import { Checkbox, CheckboxGruppe } from 'nav-frontend-skjema';
import React, { ChangeEvent, FunctionComponent } from 'react';
import classnames from 'classnames';

import Skjemalegend from '../../../ad/edit/skjemaetikett/Skjemalegend';
import {
    Inkluderingsmulighet,
    hentSubtagsForMulighetForFilter,
    hierarkiAvTagsForFilter,
    Tag,
} from '../../../ad/tags/hierarkiAvTags';
import { visningsnavnForFilter } from '../../../ad/tags/visningsnavnForTags';

type Props = {
    tittel: string;
    visHovedtag?: boolean;
    inkluderingsmulighet: Inkluderingsmulighet;
    onTagChange: (event: ChangeEvent<HTMLInputElement>) => void;
    tagIsChecked: (tag: Tag) => boolean;
};

const FilterForMulighet: FunctionComponent<Props> = ({
    tittel,
    inkluderingsmulighet,
    visHovedtag,
    onTagChange,
    tagIsChecked,
}) => {
    let hovedtag: Tag | undefined;
    if (visHovedtag) {
        hovedtag = hierarkiAvTagsForFilter[inkluderingsmulighet].hovedtag;
    }

    const subtags = hentSubtagsForMulighetForFilter(inkluderingsmulighet);

    return (
        <CheckboxGruppe>
            <Skjemalegend>{tittel}</Skjemalegend>
            {hovedtag && (
                <Checkbox
                    id={`tag-${hovedtag.toLowerCase()}-checkbox`}
                    label={visningsnavnForFilter[hovedtag]}
                    value={hovedtag}
                    checked={tagIsChecked(hovedtag)}
                    onChange={onTagChange}
                />
            )}
            {subtags.map((tag) => (
                <Checkbox
                    className={classnames({
                        inkluderingsfilter__subtag: visHovedtag,
                    })}
                    id={`tag-${tag}-checkbox`}
                    key={tag}
                    label={visningsnavnForFilter[tag]}
                    value={tag}
                    checked={tagIsChecked(tag)}
                    onChange={onTagChange}
                />
            ))}
        </CheckboxGruppe>
    );
};

export default FilterForMulighet;
