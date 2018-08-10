import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Typeahead from '../../../common/typeahead/Typeahead';
import { SET_ENGAGEMENTTYPE_VALUE } from './engagementTypeReducer';
import { SET_EMPLOYMENT_ENGAGEMENTTYPE } from '../../adReducer';
import { registerShortcuts } from '../../../common/shortcuts/Shortcuts';
import './EngagementType.less';

class EngagementType extends React.Component {
    componentDidMount() {
        registerShortcuts('annonseDetaljer', {
            'l g': (e) => {
                e.preventDefault();
                this.inputRef.setFocus();
            }
        });
    }

    onTypeAheadValueChange = (engagementType) => {
        this.props.setEngagementTypeReducer(engagementType);
        this.props.setEngagementTypeAd(engagementType);
    };

    onTypeAheadSuggestionSelected = (engagementType) => {
        this.props.setEngagementTypeReducer(engagementType.value);
        this.props.setEngagementTypeAd(engagementType.value);
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
                    ref={(instance) => { this.inputRef = instance; }}
                />
            </div>
        );
    }
}

EngagementType.propTypes = {
    suggestions: PropTypes.arrayOf(PropTypes.string).isRequired,
    setEngagementTypeReducer: PropTypes.func.isRequired,
    setEngagementTypeAd: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    suggestions: state.engagementType.suggestions,
    engagementType: state.ad.data.properties.engagementtype
});

const mapDispatchToProps = (dispatch) => ({
    setEngagementTypeReducer: (value) => dispatch({ type: SET_ENGAGEMENTTYPE_VALUE, value }),
    setEngagementTypeAd: (engagementtype) => dispatch({ type: SET_EMPLOYMENT_ENGAGEMENTTYPE, engagementtype })
});

export default connect(mapStateToProps, mapDispatchToProps)(EngagementType);
