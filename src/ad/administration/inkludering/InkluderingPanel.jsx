import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Checkbox, Fieldset } from 'nav-frontend-skjema';

import { CHECK_TAG, UNCHECK_TAG } from '../../adDataReducer';
import isJson from '../../edit/practicalInformation/IsJson';
import { hentKategorierMedNavn } from '../../tagHelpers';

const InkluderingPanel = (props) => {
    const { tags, checkTag, uncheckTag, direktemeldt } = props;

    const onTagChange = (e) => {
        e.target.checked ? checkTag(e.target.value) : uncheckTag(e.target.value);
    };

    const tagIsChecked = (tag) => tags && isJson(tags) && JSON.parse(tags).includes(tag);
    const kategorierMedNavn = hentKategorierMedNavn(direktemeldt);

    return (
        <Fieldset legend="Inkludering" className="Inkludering typo-normal">
            {kategorierMedNavn.map(({ tag, navn, harUnderkategorier, underkategorier }) => (
                <Fragment key={tag}>
                    <Checkbox
                        className="checkbox--tag skjemaelement--pink"
                        id={`tag-${tag.toLowerCase()}-checkbox`}
                        label={navn}
                        value={tag}
                        checked={tagIsChecked(tag)}
                        onChange={onTagChange}
                    />
                    {harUnderkategorier && (
                        <Fieldset legend={navn} className="Inkludering__subtags">
                            {underkategorier.map(({ tag, navn }) => (
                                <Checkbox
                                    className="checkbox--tag skjemaelement--pink"
                                    id={`tag.${tag}-checkbox`}
                                    label={navn}
                                    value={tag}
                                    key={tag}
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
