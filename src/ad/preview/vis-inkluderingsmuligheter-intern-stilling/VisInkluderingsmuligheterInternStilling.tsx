import React, { FunctionComponent } from 'react';
import { Feilmelding, Undertittel } from 'nav-frontend-typografi';
import Inkluderingsmuligheter from './Inkluderingsmuligheter';
import isJson from '../../edit/practicalInformation/IsJson';
import { tagsInneholderInkluderingsmuligheter } from '../../tags/utils';
import './VisInkluderingsmuligheterInternStilling.less';

interface Props {
    tags?: string;
}

const VisInkluderingsmuligheterInternStilling: FunctionComponent<Props> = ({ tags }) => {
    if (tags === undefined) {
        return null;
    }

    const tagsErGyldige = isJson(tags);

    if (!tagsErGyldige) {
        return (
            <div className="vis-inkluderingsmuligheter-intern-stilling">
                <Feilmelding>Noe galt skjedde ved uthenting av inkluderingsmuligheter.</Feilmelding>
            </div>
        );
    }

    if (!tagsInneholderInkluderingsmuligheter(tags)) {
        return null;
    }

    const registrerteTags = JSON.parse(tags);

    return (
        <div className="vis-inkluderingsmuligheter-intern-stilling">
            <Undertittel className="vis-inkluderingsmuligheter-intern-stilling__tittel">
                Mulighet for å inkludere
            </Undertittel>
            <Inkluderingsmuligheter registrerteTags={registrerteTags} />
        </div>
    );
};

export default VisInkluderingsmuligheterInternStilling;
