import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Typeahead from '../../../common/typeahead/Typeahead';
import { SET_ENGAGEMENTTYPE_TYPEAHEAD_VALUE } from './engagementTypeReducer';
import { SET_EMPLOYMENT_ENGAGEMENTTYPE } from '../../adReducer';
import './EngagementType.less';

class EngagementType extends React.Component {
    onTypeAheadValueChange = (engagementType) => {
        this.props.setEngagementTypeAheadValue(engagementType);
        this.props.setEngagementType(engagementType);
    };

    onTypeAheadSuggestionSelected = (engagementType) => {
        this.props.setEngagementTypeAheadValue(engagementType.value);
        this.props.setEngagementType(engagementType.value);
    };

    render() {
        return (
            <div className="EngagementType">
                <Typeahead
                    id="EngagementType__input"
                    label="Ansettelsesform"
                    onSelect={this.onTypeAheadSuggestionSelected}
                    onChange={this.onTypeAheadValueChange}
                    suggestions={this.props.suggestions.map((s) => ({
                        value: s,
                        label: s
                    }))}
                    value={this.props.engagementType ? this.props.engagementType : ''}
                />
            </div>
        );
    }
}

EngagementType.defaultProps = {
    engagementType: undefined
};

EngagementType.propTypes = {
    suggestions: PropTypes.arrayOf(PropTypes.string).isRequired,
    setEngagementTypeAheadValue: PropTypes.func.isRequired,
    setEngagementType: PropTypes.func.isRequired,
    engagementType: PropTypes.string
};

const mapStateToProps = (state) => ({
    suggestions: state.engagementType.suggestions,
    engagementType: state.ad.data.properties.engagementtype
});

const mapDispatchToProps = (dispatch) => ({
    setEngagementTypeAheadValue: (value) => dispatch({ type: SET_ENGAGEMENTTYPE_TYPEAHEAD_VALUE, value }),
    setEngagementType: (engagementType) => dispatch({ type: SET_EMPLOYMENT_ENGAGEMENTTYPE, engagementType })
});

export default connect(mapStateToProps, mapDispatchToProps)(EngagementType);
