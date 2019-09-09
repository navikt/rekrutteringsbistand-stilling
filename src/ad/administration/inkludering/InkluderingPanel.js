import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'; 
import { Fieldset, Checkbox } from 'nav-frontend-skjema';
import { Tags } from '../../../common/tags';
import { CHECK_TAG, UNCHECK_TAG} from '../../adDataReducer';
import IsJson from '../../edit/practicalInformation/IsJson';

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
        const { tags } = this.props;
        return (
            <div className="Inkludering typo-normal">
                {this.availableTags.map((availableTag) => (
                        <Checkbox
                            className="checkbox--tag skjemaelement--pink"
                            id={`tag-${availableTag.key.toLowerCase()}-checkbox`}
                            label={availableTag.label}
                            key={availableTag.key}
                            value={availableTag.key}
                            checked={tags ? (IsJson(tags) ? JSON.parse(tags).includes(availableTag.key) : false) : false}
                            onChange={this.onTagChange}
                        />
                    ))}
            </div>
        );
    }
}

InkluderingPanel.propTypes = {
    checkTag: PropTypes.func.isRequired,
    uncheckTag: PropTypes.func.isRequired,
    tags: PropTypes.string
};

const mapStateToProps = (state) => {
    return {
    tags: state.adData.properties.tags || "[]",
}};

const mapDispatchToProps = (dispatch) => ({
    checkTag: (value) => dispatch({ type: CHECK_TAG, value }),
    uncheckTag: (value) => dispatch({ type: UNCHECK_TAG, value }),
});

export default connect(mapStateToProps, mapDispatchToProps)(InkluderingPanel);
