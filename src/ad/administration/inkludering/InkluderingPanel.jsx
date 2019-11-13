import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Checkbox } from 'nav-frontend-skjema';

import { Tags, hierarki } from '../../../common/tags';
import { DirektemeldtTags } from './direktemeldtTags';
import { CHECK_TAG, UNCHECK_TAG } from '../../adDataReducer';
import IsJson from '../../edit/practicalInformation/IsJson';
import Inkluderingsmuligheter from './Inkluderingsmuligheter';

const InkluderingPanel = (props) => {
    const { tags, checkTag, uncheckTag, direktemeldt } = props;

    const tagsToShow = direktemeldt ? DirektemeldtTags : Tags;
    const tagsToRender = Object.keys(hierarki).map((key) => {
        const overordnetTag = hierarki[key];
        const { harSubtags, subtittel, subtags } = overordnetTag;

        return {
            key,
            label: tagsToShow[key],
            harSubtags,
            ...(harSubtags && {
                subtittel,
                subtags: subtags.map((subtag) => ({
                    key: subtag,
                    label: tagsToShow[subtag],
                })),
            }),
        };
    });

    const onTagChange = (e) => {
        e.target.checked ? checkTag(e.target.value) : uncheckTag(e.target.value);
    };

    return (
        <div className="Inkludering typo-normal">
            {tagsToRender.map((tagToRender) => {
                const isChecked =
                    tags && IsJson(tags) && JSON.parse(tags).includes(tagToRender.key);

                return (
                    <Fragment key={tagToRender.key}>
                        <Checkbox
                            className="checkbox--tag skjemaelement--pink"
                            id={`tag-${tagToRender.key.toLowerCase()}-checkbox`}
                            label={tagToRender.label}
                            value={tagToRender.key}
                            checked={isChecked}
                            onChange={onTagChange}
                        />
                        {tagToRender.harSubtags && (
                            <Inkluderingsmuligheter
                                tags={tags}
                                tittel={tagToRender.subtittel}
                                inkluderingstags={tagToRender.subtags}
                                onTagChange={onTagChange}
                            />
                        )}
                    </Fragment>
                );
            })}
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
