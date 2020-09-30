import React, { FunctionComponent } from 'react';
import './VisInkluderingsmuligheterInternStilling.less';
import { Element, Undertittel } from 'nav-frontend-typografi';
import isJson from '../../edit/practicalInformation/IsJson';

interface Props {
    tags?: string;
}

const VisInkluderingsmuligheterInternStilling: FunctionComponent<Props> = ({ tags }) => {
    const gyldigJsonString = tags && isJson(tags);
    const parsedeTags: string[] = gyldigJson ? JSON.parse(tags!) : [];

    return (
        <div className="vis-inkluderingsmuligheter-intern-stilling">
            <Undertittel>Mulighet for å inkludere</Undertittel>
            <Element>Arbeidsgiver kan tilrettelegge for:</Element>
        </div>
    );
};

export default VisInkluderingsmuligheterInternStilling;
