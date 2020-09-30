import React, { Fragment, useCallback } from 'react';
import { connect } from 'react-redux';
import isJson from '../../../edit/practicalInformation/IsJson';
import { hentHierarkiAvTags } from '../../../tags';
import Etiketter from './Etiketter';
import './inkludering.less';

const Inkludering = ({ tags }) => {
    const harNoenTagsFraKategori = useCallback(
        ({ harUnderkategorier, underkategorier }) =>
            harUnderkategorier &&
            underkategorier.some((underkategori) => tags.includes(underkategori.tag)),
        [tags]
    );

    const fjernUbrukteTagsFraKategori = useCallback(
        (kategori) => ({
            ...kategori,
            underkategorier: kategori.underkategorier.filter((underkategori) =>
                tags.includes(underkategori.tag)
            ),
        }),
        [tags]
    );

    const kategorierMedNavn = hentHierarkiAvTags();
    const overordnedeTags = kategorierMedNavn.filter((kategori) => tags.includes(kategori.tag));
    const underordnedeTags = overordnedeTags
        .filter(harNoenTagsFraKategori)
        .map(fjernUbrukteTagsFraKategori);

    if (!tags || !tags.length) {
        return null;
    }

    return (
        <Fragment>
            <Etiketter tittel="Inkludering" tags={overordnedeTags} />
            {underordnedeTags.map(({ tag, underkategorier, tittelTilUnderkategorier }) => (
                <Etiketter key={tag} tittel={tittelTilUnderkategorier} tags={underkategorier} />
            ))}
        </Fragment>
    );
};

const mapStateToProps = (state) => {
    const tagsString = state.adData.properties.tags;
    const tags = tagsString != undefined && isJson(tagsString) ? JSON.parse(tagsString) : [];

    return {
        tags,
    };
};

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Inkludering);
