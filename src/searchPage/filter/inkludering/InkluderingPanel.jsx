import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { CHECK_TAG_SOK, UNCHECK_TAG_SOK } from '../../searchReducer';
import GruppeMedTags from './GruppeMedTags';
import { hentKategorierMedNavn } from '../../../ad/tagHelpers';

const InkluderingPanel = ({ tags, checkTag, uncheckTag }) => {
    const onTagChange = (e) => {
        e.target.checked ? checkTag(e.target.value) : uncheckTag(e.target.value);
    };

    const kategorierMedNavn = hentKategorierMedNavn();
    const underkategorierAvInkludering = kategorierMedNavn.filter(
        (kategori) => kategori.harUnderkategorier && tags.includes(kategori.tag)
    );

    return (
        <Fragment>
            <GruppeMedTags
                tittel="Inkludering"
                gruppeMedTags={kategorierMedNavn}
                tags={tags}
                className="FilterLocation__blokk"
                onTagChange={onTagChange}
            />
            {underkategorierAvInkludering.length > 0 &&
                underkategorierAvInkludering.map(
                    ({ tag, tittelTilUnderkategorier, underkategorier }) => (
                        <GruppeMedTags
                            key={tag}
                            tittel={tittelTilUnderkategorier}
                            gruppeMedTags={underkategorier}
                            tags={tags}
                            onTagChange={onTagChange}
                        />
                    )
                )}
        </Fragment>
    );
};

InkluderingPanel.propTypes = {
    checkTag: PropTypes.func.isRequired,
    uncheckTag: PropTypes.func.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string),
};

InkluderingPanel.defaultProps = {
    tags: [],
};

const mapStateToProps = (state) => {
    return {
        tags: state.search.tags,
    };
};

const mapDispatchToProps = (dispatch) => ({
    checkTag: (value) => dispatch({ type: CHECK_TAG_SOK, value }),
    uncheckTag: (value) => dispatch({ type: UNCHECK_TAG_SOK, value }),
});

export default connect(mapStateToProps, mapDispatchToProps)(InkluderingPanel);
