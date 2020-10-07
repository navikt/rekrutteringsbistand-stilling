import React, { FunctionComponent } from 'react';
import { Feilmelding, Undertittel } from 'nav-frontend-typografi';
import Inkluderingsmuligheter from './Inkluderingsmuligheter';
import isJson from '../../edit/practicalInformation/IsJson';
import './VisInkluderingsmuligheterInternStilling.less';
import { Tag } from '../../tags/hierarkiAvTags';

interface Props {
    tags: string;
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

    const registrerteTags: Tag[] = JSON.parse(tags);
    if (registrerteTags.length === 0) {
        return null;
    }

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
