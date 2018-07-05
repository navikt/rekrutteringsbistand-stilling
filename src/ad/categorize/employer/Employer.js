import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Typeahead from '../../../common/typeahead/Typeahead';
import { FETCH_EMPLOYER_SUGGESTIONS, SET_EMPLOYER } from './employerReducer';
import './Employer.less';

class Employer extends React.Component {
    onTypeAheadValueChange = (value) => {
        this.props.setEmployer(value);
        this.props.fetchEmployerSuggestions(value);
    };

    onTypeAheadSuggestionSelected = (item) => {
        this.props.setEmployer(item.value);
    };

    render() {
        return (
            <div className="Employer">
                <Typeahead
                    id="Employer__typeahead"
                    label="Arbeidsgiver"
                    placeholder="Bedriftsnavn / org.nummer"
                    onSelect={this.onTypeAheadSuggestionSelected}
                    onChange={this.onTypeAheadValueChange}
                    suggestions={this.props.suggestions.map((s) => ({
                        value: s,
                        label: s
                    }))}
                    value={this.props.value ? this.props.value : ''}
                />
            </div>
        );
    }
}


Employer.propTypes = {
    value: PropTypes.string.isRequired,
    suggestions: PropTypes.arrayOf(PropTypes.string).isRequired,
    setEmployer: PropTypes.func.isRequired,
    fetchEmployerSuggestions: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    value: state.employer.value,
    suggestions: state.employer.suggestions
});

const mapDispatchToProps = (dispatch) => ({
    setEmployer: (value) => dispatch({ type: SET_EMPLOYER, value }),
    fetchEmployerSuggestions: (value) => dispatch({ type: FETCH_EMPLOYER_SUGGESTIONS, value })
});

export default connect(mapStateToProps, mapDispatchToProps)(Employer);
