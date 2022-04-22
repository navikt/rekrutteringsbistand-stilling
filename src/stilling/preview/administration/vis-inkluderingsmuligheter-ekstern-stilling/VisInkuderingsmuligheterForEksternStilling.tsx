import React from 'react';
import { connect } from 'react-redux';

import isJson from '../../../edit/practicalInformation/IsJson';
import {
    hentSubtagsForMulighetForEksternStilling,
    InkluderingsmulighetForEksternStilling,
} from '../../../tags/hierarkiAvTags';
import Inkluderingstags from './Inkluderingstags';

const VisInkuderingsmuligheterForEksternStilling = ({ tags }) => {
    const tagsForTilretteleggingsmuligheter = hentSubtagsForMulighetForEksternStilling(
        InkluderingsmulighetForEksternStilling.Tilrettelegging
    ).filter((subtag) => tags.includes(subtag));

    const tagsForStatligInkluderingsdugnad = hentSubtagsForMulighetForEksternStilling(
        InkluderingsmulighetForEksternStilling.StatligInkluderingsdugnad
    ).filter((subtag) => tags.includes(subtag));

    return (
        <>
            {tagsForTilretteleggingsmuligheter.length > 0 && (
                <Inkluderingstags
                    tittel="Arbeidsgiver ønsker å tilrettelegge"
                    tags={tagsForTilretteleggingsmuligheter}
                />
            )}
            {tagsForStatligInkluderingsdugnad.length > 0 && (
                <Inkluderingstags
                    tittel="Arbeidsgiver er del av:"
                    tags={tagsForStatligInkluderingsdugnad}
                />
            )}
        </>
    );
};

const mapStateToProps = (state: any) => {
    const tagsString = state.adData.properties.tags;
    const tags = tagsString !== undefined && isJson(tagsString) ? JSON.parse(tagsString) : [];

    return {
        tags,
    };
};

const mapDispatchToProps = (dispatch: any) => ({});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(VisInkuderingsmuligheterForEksternStilling);
