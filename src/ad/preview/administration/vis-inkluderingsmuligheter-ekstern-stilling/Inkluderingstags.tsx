import React, { FunctionComponent } from 'react';
import { Element } from 'nav-frontend-typografi';
import { EtikettInfo } from 'nav-frontend-etiketter';
import { visningsnavnForRegistrering } from '../../../tags/visningsnavnForTags';
import './Inkluderingstags.less';

type Props = {
    tittel: string;
    tags: string[];
};

const Inkluderingstags: FunctionComponent<Props> = ({ tittel, tags }) => (
    <div className="Administration__preview-panel inkluderingstags">
        <Element className="blokk-xxs">{tittel}</Element>
        {tags.map((tag: string) => (
            <EtikettInfo key={tag} className="inkluderingstags__tag">
                {visningsnavnForRegistrering[tag]}
            </EtikettInfo>
        ))}
    </div>
);

export default Inkluderingstags;
