import React, { FunctionComponent } from 'react';
import { Element } from 'nav-frontend-typografi';
import { EtikettInfo } from 'nav-frontend-etiketter';
import { visningsnavnForRegistrering } from '../../../tags/visningsnavnForTags';

type Props = {
    tittel: string;
    tags: string[];
};

const Etiketter: FunctionComponent<Props> = ({ tittel, tags }) => (
    <div className="Administration__preview-panel Inkludering__preview">
        <Element>{tittel}</Element>
        {tags.map((tag: string) => (
            <EtikettInfo key={tag} className="preview__tagname">
                {visningsnavnForRegistrering[tag]}
            </EtikettInfo>
        ))}
    </div>
);

export default Etiketter;
