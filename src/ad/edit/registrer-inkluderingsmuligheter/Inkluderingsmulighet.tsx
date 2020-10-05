import React, { ChangeEvent, FunctionComponent } from 'react';
import { Checkbox, CheckboxGruppe } from 'nav-frontend-skjema';

import {
    Tag,
    hentSubtagsForMulighetForDirektemeldtStilling,
    hentSubtagsForMulighetForEksternStilling,
} from '../../tags/hierarkiAvTags';
import Skjemalegend from '../skjemaetikett/Skjemalegend';
import { visningsnavnForRegistrering } from '../../tags/visningsnavnForTags';

type Props = {
    tittel: string;
    eksternStilling?: boolean;
    inkluderingsmulighet: any;
    onTagChange: (event: ChangeEvent<HTMLInputElement>) => void;
    tagIsChecked: (tag: Tag) => boolean;
};

const Inkluderingsmulighet: FunctionComponent<Props> = ({
    tittel,
    eksternStilling,
    inkluderingsmulighet,
    tagIsChecked,
    onTagChange,
}) => {
    const subtags = eksternStilling
        ? hentSubtagsForMulighetForEksternStilling(inkluderingsmulighet)
        : hentSubtagsForMulighetForDirektemeldtStilling(inkluderingsmulighet);

    return (
        <CheckboxGruppe className="blokk-xs">
            <Skjemalegend>{tittel}</Skjemalegend>
            {subtags.map((subtag) => (
                <Checkbox
                    key={subtag}
                    id={`tag.${subtag}-checkbox`}
                    label={visningsnavnForRegistrering[subtag]}
                    value={subtag}
                    checked={tagIsChecked(subtag)}
                    onChange={onTagChange}
                />
            ))}
        </CheckboxGruppe>
    );
};

export default Inkluderingsmulighet;
