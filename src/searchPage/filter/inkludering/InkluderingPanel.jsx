import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Checkbox, SkjemaGruppe } from 'nav-frontend-skjema';
import { Tags, hierarki } from '../../../common/tags';
import { CHECK_TAG_SOK, UNCHECK_TAG_SOK } from '../../searchReducer';

const InkluderingPanel = ({ tags, checkTag, uncheckTag }) => {
    const onTagChange = (e) => {
        e.target.checked ? checkTag(e.target.value) : uncheckTag(e.target.value);
    };

    let allTheThings = [];
    Object.entries(hierarki).forEach(([tagKey, tagValue]) => {
        allTheThings.push(tagKey);

        if (tagValue.harSubtags && tags.includes(tagKey)) {
            tagValue.subtags.forEach((subtag) => {
                allTheThings.push(subtag);
            });
        }
    });

    return (
        <SkjemaGruppe className="panel--tags--sok" title="Inkludering">
            <div>
                {allTheThings.map((availableTag) => {
                    return (
                        <Checkbox
                            className="checkbox--tag--sok skjemaelement--pink"
                            id={`tag-${availableTag.toLowerCase()}-checkbox`}
                            label={Tags[availableTag]}
                            key={availableTag}
                            value={availableTag}
                            checked={tags.includes(availableTag)}
                            onChange={onTagChange}
                        />
                    );
                })}
            </div>
        </SkjemaGruppe>
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
