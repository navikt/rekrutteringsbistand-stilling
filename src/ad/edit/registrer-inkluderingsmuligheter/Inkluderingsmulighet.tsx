import React, { ChangeEvent, FunctionComponent, ReactNode } from 'react';
import { Checkbox, CheckboxGruppe } from 'nav-frontend-skjema';
import classnames from 'classnames';

import {
    Tag,
    hentSubtagsForMulighetForDirektemeldtStilling,
    hentSubtagsForMulighetForEksternStilling,
} from '../../tags/hierarkiAvTags';
import Skjemalegend from '../skjemaetikett/Skjemalegend';
import { visningsnavnForRegistrering } from '../../tags/visningsnavnForTags';
import { HjelpetekstForInkluderingsmulighet } from './HjelpetekstForInkluderingsmulighet';
import './Inkluderingsmulighet.less';

type Props = {
    tittel: string;
    eksternStilling?: boolean;
    inkluderingsmulighet: any;
    onTagChange: (event: ChangeEvent<HTMLInputElement>) => void;
    tagIsChecked: (tag: Tag) => boolean;
    hjelpetekst?: ReactNode;
    className?: string;
};

const Inkluderingsmulighet: FunctionComponent<Props> = ({
    tittel,
    eksternStilling,
    inkluderingsmulighet,
    tagIsChecked,
    onTagChange,
    hjelpetekst,
    className,
}) => {
    const subtags = eksternStilling
        ? hentSubtagsForMulighetForEksternStilling(inkluderingsmulighet)
        : hentSubtagsForMulighetForDirektemeldtStilling(inkluderingsmulighet);

    return (
        <CheckboxGruppe className={classnames('inkluderingsmulighet', className)}>
            <Skjemalegend hjelpetekst={hjelpetekst}>{tittel}</Skjemalegend>
            {subtags.map((subtag) => (
                <Checkbox
                    key={subtag}
                    className="inkluderingsmulighet__tag"
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
