import React, { Fragment, useCallback } from 'react';
import { connect } from 'react-redux';
import isJson from '../../../edit/practicalInformation/IsJson';
import { GruppeMedTags, hentGrupperMedTags } from '../../../tags';
import Etiketter from './Etiketter';
import './inkludering.less';

const Inkludering = ({ tags }) => {
    const harNoenTagsFraGruppe = useCallback(
        ({ harSubtags, subtags }) =>
            harSubtags && subtags.some((subtag) => tags.includes(subtag.tag)),
        [tags]
    );

    const fjernUbrukteTagsFraGruppe = useCallback(
        (gruppe: GruppeMedTags) => ({
            ...gruppe,
            subtags: gruppe.harSubtags
                ? gruppe.subtags.filter((subtag) => tags.includes(subtag.tag))
                : [],
        }),
        [tags]
    );

    const grupperMedTags = hentGrupperMedTags().filter((kategori) => tags.includes(kategori.tag));
    const grupperMedTagsPåStillingen = grupperMedTags
        .filter(harNoenTagsFraGruppe)
        .map(fjernUbrukteTagsFraGruppe);

    if (!tags || !tags.length) {
        return null;
    }

    return (
        <Fragment>
            <Etiketter tittel="Inkludering" tags={grupperMedTags} />
            {grupperMedTagsPåStillingen.map((gruppeMedTags) => (
                <Etiketter
                    key={gruppeMedTags.tag}
                    tittel={gruppeMedTags.navn}
                    tags={gruppeMedTags.subtags}
                />
            ))}
        </Fragment>
    );
};

const mapStateToProps = (state: any) => {
    const tagsString = state.adData.properties.tags;
    const tags = tagsString != undefined && isJson(tagsString) ? JSON.parse(tagsString) : [];

    return {
        tags,
    };
};

const mapDispatchToProps = (dispatch: any) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Inkludering);
