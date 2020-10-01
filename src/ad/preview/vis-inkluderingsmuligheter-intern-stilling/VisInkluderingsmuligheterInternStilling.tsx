import React, { FunctionComponent } from 'react';
import { Undertittel } from 'nav-frontend-typografi';
import Inkluderingsmuligheter from './Inkluderingsmuligheter';
import './VisInkluderingsmuligheterInternStilling.less';

interface Props {
    tags: string;
}

const VisInkluderingsmuligheterInternStilling: FunctionComponent<Props> = ({ tags }) => (
    <div className="vis-inkluderingsmuligheter-intern-stilling">
        <Undertittel className="vis-inkluderingsmuligheter-intern-stilling__tittel">
            Mulighet for å inkludere
        </Undertittel>
        <Inkluderingsmuligheter tags={tags} />
    </div>
);

export default VisInkluderingsmuligheterInternStilling;
