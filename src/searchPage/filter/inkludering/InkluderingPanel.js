import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Checkbox, SkjemaGruppe } from 'nav-frontend-skjema';
import { Tags } from '../../../common/tags';
import PrivacyStatusEnum from '../../../common/enums/PrivacyStatusEnum';
import { CHECK_TAG_SOK, UNCHECK_TAG_SOK} from '../../searchReducer';

class InkluderingPanel extends React.Component {
    constructor(props) {
        super(props);
        this.availableTags = Object.keys(Tags).map((key) => Tags[key]);
    }

    onTagChange = (e) => {
        if (e.target.checked) {
            this.props.checkTag(e.target.value);
        } else {
            this.props.uncheckTag(e.target.value);
        }
    };

    render() {
        const {tags} = this.props;
        return (
            <SkjemaGruppe
                className="panel--tags--sok"
                title="Inkludering"
            >
                <div>
                    {this.availableTags.map((availableTag) => (
                        <Checkbox
                            className="checkbox--tag--sok skjemaelement--pink"
                            id={`tag-${availableTag.key.toLowerCase()}-checkbox`}
                            label={availableTag.label}
                            key={availableTag.key}
                            value={availableTag.key}
                            checked={tags.includes(availableTag.key)}
                            onChange={this.onTagChange}
                        />
                    ))}
                </div>
            </SkjemaGruppe>
        );
    }
}

InkluderingPanel.propTypes = {
    checkTag: PropTypes.func.isRequired,
    uncheckTag: PropTypes.func.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string)
};

InkluderingPanel.defaultProps = {
    tags: []
};

const mapStateToProps = (state) => {
    return {
    tags: state.search.tags
}};

const mapDispatchToProps = (dispatch) => ({
    checkTag: (value) => dispatch({ type: CHECK_TAG_SOK, value }),
    uncheckTag: (value) => dispatch({ type: UNCHECK_TAG_SOK, value })
});

export default connect(mapStateToProps, mapDispatchToProps)(InkluderingPanel);
