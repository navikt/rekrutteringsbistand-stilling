import React, { Fragment, useCallback } from 'react';
import { connect } from 'react-redux';
import { hentKategorierMedNavn } from '../../../tagHelpers';
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

    const kategorierMedNavn = hentKategorierMedNavn();
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
            {underordnedeTags.map((kategori) => (
                <Etiketter
                    key={kategori.tag}
                    tittel={kategori.navn}
                    tags={kategori.underkategorier}
                />
            ))}
        </Fragment>
    );
};

const mapStateToProps = (state) => {
    const tagsString = state.adData.properties.tags;
    const tags = tagsString != undefined ? JSON.parse(tagsString) : [];

    return {
        tags,
    };
};

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Inkludering);
