import React, { FunctionComponent } from 'react';
import { visningsnavnForRegistrering } from '../../../tags/visningsnavnForTags';
import css from './Inkluderingstags.module.css';
import previewcss from '../AdministrationPreview.module.css';
import { BodyShort, Label, Tag } from '@navikt/ds-react';

type Props = {
    tittel: string;
    tags: string[];
};

const Inkluderingstags: FunctionComponent<Props> = ({ tittel, tags }) => {
    const formatterTittel = (tekst: string) => {
        const start = tekst.indexOf('(');
        if (start !== -1) {
            return (
                <>
                    {tekst.substring(0, start)} <br></br>
                    {tekst.substring(start)}
                </>
            );
        } else {
            return tekst;
        }
    };

    return (
        <div className={previewcss.previewPanel}>
            <BodyShort size="small" spacing>
                <Label size="small">{tittel}</Label>
            </BodyShort>
            {tags.map((tag: string) => (
                <Tag size="small" variant="info" className={css.inkluderingstag}>
                    {formatterTittel(visningsnavnForRegistrering[tag])}
                </Tag>
            ))}
        </div>
    );
};

export default Inkluderingstags;
