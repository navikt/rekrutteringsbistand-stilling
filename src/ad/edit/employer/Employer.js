import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Typeahead from '../../../common/typeahead/Typeahead';
import { FETCH_EMPLOYER_SUGGESTIONS } from './employerReducer';
import { SET_EMPLOYER } from '../../adReducer';
import './Employer.less';


class Employer extends React.Component {
    componentDidMount() {
        this.props.fetchEmployerSuggestions();
    }

    onTypeAheadValueChange = (value) => {
        const found = this.lookUpEmployer(value);
        this.props.setEmployer(value, found);
        this.props.fetchEmployerSuggestions();
    };

    onTypeAheadSuggestionSelected = (employer) => {
        if (employer) {
            const found = this.lookUpEmployer(employer.value);
            this.props.setEmployer(employer.value, found);
        }
    };

    lookUpEmployer = (value) => {
        return this.props.suggestions.find((employer) => (employer.name === value || employer.orgnr === value));
    };

    render() {
        return (
            <div className="Employer">
                <div className="">
                    <Typeahead
                        id="Employer__typeahead"
                        className="Employer__typeahead"
                        label="Arbeidsgiver"
                        onSelect={this.onTypeAheadSuggestionSelected}
                        onChange={this.onTypeAheadValueChange}
                        suggestions={this.props.suggestions.map((employer) => ({
                            value: employer.orgnr,
                            label: `${employer.name} (${employer.orgnr})`
                        }))}
                        value={this.props.employer && this.props.employer.name ?
                            this.props.employer.name : ''}
                        ref={(instance) => {
                            this.inputRef = instance;
                        }}
                        error={this.props.validation.employer !== undefined}
                    />
                </div>
                {this.props.validation.employer && (
                    <div className="Employer__error">{this.props.validation.employer}</div>
                )}
            </div>
        );
    }
}

Employer.defaultProps = {
    employer: {}
};

Employer.propTypes = {
    suggestions: PropTypes.arrayOf(PropTypes.shape({
        orgnr: PropTypes.string,
        navn: PropTypes.string
    })).isRequired,
    fetchEmployerSuggestions: PropTypes.func.isRequired,
    setEmployer: PropTypes.func.isRequired,
    validation: PropTypes.shape({
        employer: PropTypes.string
    }).isRequired,
    employer: PropTypes.shape({
        orgnr: PropTypes.string,
        name: PropTypes.string
    })
};

const mapStateToProps = (state) => ({
    suggestions: state.employer.suggestions,
    employer: state.ad.data.employer,
    validation: state.ad.validation
});

const mapDispatchToProps = (dispatch) => ({
    setEmployer: (value, foundEmployer) => dispatch({ type: SET_EMPLOYER, value, foundEmployer }),
    fetchEmployerSuggestions: () => dispatch({ type: FETCH_EMPLOYER_SUGGESTIONS })
});

export default connect(mapStateToProps, mapDispatchToProps)(Employer);
