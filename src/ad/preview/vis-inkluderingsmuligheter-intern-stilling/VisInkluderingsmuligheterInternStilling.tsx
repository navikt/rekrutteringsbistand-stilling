import React, { FunctionComponent } from 'react';
import { Feilmelding, Undertittel } from 'nav-frontend-typografi';
import Inkluderingsmuligheter from './Inkluderingsmuligheter';
import './VisInkluderingsmuligheterInternStilling.less';
import { hentGrupperMedTags, Tag } from '../../tags';
import isJson from '../../edit/practicalInformation/IsJson';

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
    const alleRelevanteGrupperMedTags = hentGrupperMedTags(true);
    const harRegistrertRelevanteGrupperMedTags = alleRelevanteGrupperMedTags.some(
        (inkluderingstag) => registrerteTags.includes(inkluderingstag.tag)
    );

    if (!harRegistrertRelevanteGrupperMedTags) {
        return null;
    }

    return (
        <div className="vis-inkluderingsmuligheter-intern-stilling">
            <Undertittel className="vis-inkluderingsmuligheter-intern-stilling__tittel">
                Mulighet for å inkludere
            </Undertittel>
            <Inkluderingsmuligheter
                registrerteTags={registrerteTags}
                alleRelevanteGrupperMedTags={alleRelevanteGrupperMedTags}
            />
        </div>
    );
};

export default VisInkluderingsmuligheterInternStilling;
