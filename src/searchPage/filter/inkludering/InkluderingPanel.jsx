import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { CHECK_TAG_SOK, UNCHECK_TAG_SOK } from '../../searchReducer';
import { hentKategorierMedNavn } from '../../../ad/tagHelpers';
import { Fieldset, Checkbox } from 'nav-frontend-skjema';

const InkluderingPanel = ({ tags, checkTag, uncheckTag }) => {
    const onTagChange = e => {
        e.target.checked ? checkTag(e.target.value) : uncheckTag(e.target.value);
    };

    const tagIsChecked = tag => tags.includes(tag);
    const kategorierMedNavn = hentKategorierMedNavn();

    return (
        <Fieldset legend="Inkludering">
            {kategorierMedNavn.map(({ tag, navn, harUnderkategorier, underkategorier }) => (
                <Fragment key={tag}>
                    <Checkbox
                        className="checkbox--tag--sok skjemaelement--pink"
                        id={`tag-${tag.toLowerCase()}-checkbox`}
                        label={navn}
                        key={tag}
                        value={tag}
                        checked={tagIsChecked(tag)}
                        onChange={onTagChange}
                    />
                    {harUnderkategorier && tagIsChecked(tag) && (
                        <Fieldset legend={navn} className="SearchPage__subtags">
                            {underkategorier.map(({ tag, navn }) => (
                                <Checkbox
                                    className="checkbox--tag--sok skjemaelement--pink"
                                    id={`tag-${tag.toLowerCase()}-checkbox`}
                                    label={navn}
                                    key={tag}
                                    value={tag}
                                    checked={tagIsChecked(tag)}
                                    onChange={onTagChange}
                                />
                            ))}
                        </Fieldset>
                    )}
                </Fragment>
            ))}
        </Fieldset>
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

const mapStateToProps = state => {
    return {
        tags: state.search.tags,
    };
};

const mapDispatchToProps = dispatch => ({
    checkTag: value => dispatch({ type: CHECK_TAG_SOK, value }),
    uncheckTag: value => dispatch({ type: UNCHECK_TAG_SOK, value }),
});

export default connect(mapStateToProps, mapDispatchToProps)(InkluderingPanel);
