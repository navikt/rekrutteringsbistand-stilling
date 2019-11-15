import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Checkbox } from 'nav-frontend-skjema';

import { CHECK_TAG, UNCHECK_TAG } from '../../adDataReducer';
import isJson from '../../edit/practicalInformation/IsJson';
import { hentKategorierMedNavn } from '../../tagHelpers';
import GruppeMedTags from './GruppeMedTags';

const InkluderingPanel = (props) => {
    const { tags, checkTag, uncheckTag, direktemeldt } = props;

    const kategorierMedNavn = hentKategorierMedNavn(direktemeldt);
    const underkategorierAvInkludering = kategorierMedNavn.filter(
        (kategori) => kategori.harUnderkategorier
    );

    const onTagChange = (e) => {
        e.target.checked ? checkTag(e.target.value) : uncheckTag(e.target.value);
    };

    const tagIsChecked = (tag) => tags && isJson(tags) && JSON.parse(tags).includes(tag);

    return (
        <div className="Inkludering typo-normal">
            {kategorierMedNavn.map(({ tag, navn }) => (
                <Checkbox
                    key={tag}
                    className="checkbox--tag skjemaelement--pink"
                    id={`tag-${tag.toLowerCase()}-checkbox`}
                    label={navn}
                    value={tag}
                    checked={tagIsChecked(tag)}
                    onChange={onTagChange}
                />
            ))}
            {underkategorierAvInkludering.length > 0 &&
                underkategorierAvInkludering.map(
                    ({ tag, tittelTilUnderkategorier, underkategorier }) => (
                        <GruppeMedTags
                            key={tag}
                            tittel={tittelTilUnderkategorier}
                            gruppeMedTags={underkategorier}
                            tagIsChecked={tagIsChecked}
                            onTagChange={onTagChange}
                        />
                    )
                )}
        </div>
    );
};

InkluderingPanel.propTypes = {
    checkTag: PropTypes.func.isRequired,
    uncheckTag: PropTypes.func.isRequired,
    tags: PropTypes.string,
};

const mapStateToProps = (state) => ({
    tags: state.adData.properties.tags || '[]',
    direktemeldt: state.adData.source === 'DIR',
});

const mapDispatchToProps = (dispatch) => ({
    checkTag: (value) => dispatch({ type: CHECK_TAG, value }),
    uncheckTag: (value) => dispatch({ type: UNCHECK_TAG, value }),
});

export default connect(mapStateToProps, mapDispatchToProps)(InkluderingPanel);
