import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Undertekst } from 'nav-frontend-typografi';
import Typeahead from '../../../common/typeahead/Typeahead';
import { FETCH_EMPLOYER_SUGGESTIONS, SET_EMPLOYER_TYPEAHEAD_VALUE } from './employerReducer';
import { SET_EMPLOYER } from '../../adDataReducer';
import './Employer.less';
import {
    registerShortcuts,
    removeShortcuts
} from '../../../common/shortcuts/Shortcuts';


class Employer extends React.Component {
    componentDidMount() {
        this.props.fetchEmployerSuggestions();
        registerShortcuts('employerEdit', {
            'a a': (e) => {
                e.preventDefault();
                this.inputRef.input.focus();
            }
        });
    }

    componentWillUnmount() {
        removeShortcuts('employerEdit');
    }

    onTypeAheadValueChange = (value) => {
        const found = this.lookUpEmployer(value);
        if (found) {
            this.props.setEmployerTypeaheadValue(found.name);
            this.props.setEmployer(found);
        } else {
            this.props.setEmployerTypeaheadValue(value);
            this.props.setEmployer();
        }
        this.props.fetchEmployerSuggestions();
    };

    onTypeAheadSuggestionSelected = (employer) => {
        if (employer) {
            const found = this.lookUpEmployer(employer.value);
            this.props.setEmployer(found);
            this.props.setEmployerTypeaheadValue(found.name);
        }
    };

    lookUpEmployer = (value) => this.props.suggestions.find((employer) => (
        employer.name.toLowerCase() === value.toLowerCase() ||
        employer.orgnr === value.replace(/\s/g, ''))
    );

    capitalize = (text) => {
        const separators = [' ', '-', '('];

        const ignore = [
            'i', 'og', 'for', 'på', 'avd', 'av'
        ];

        const keep = [
            'as', 'ab', 'asa'
        ];

        if (text) {
            let capitalized = text.toLowerCase();

            for (let i = 0, len = separators.length; i < len; i += 1) {
                const fragments = capitalized.split(separators[i]);
                for (let j = 0, x = fragments.length; j < x; j += 1) {
                    if (keep.includes(fragments[j])) {
                        fragments[j] = fragments[j].toUpperCase();
                    } else if (!ignore.includes(fragments[j])) {
                        fragments[j] = fragments[j][0].toUpperCase() + fragments[j].substr(1);
                    }
                }
                capitalized = fragments.join(separators[i]);
            }

            return capitalized;
        }
        return text;
    };

    render() {
        const { employer } = this.props;
        const location = employer ? employer.location : undefined;
        return (
            <div className="Employer">
                <div className="blokk-xxs">
                    <Typeahead
                        id="Employer__typeahead"
                        className="Employer__typeahead"
                        label="Arbeidsgiver fra Enhetsregisteret*"
                        placeholder="Skriv inn arb.givernavn eller org.nr"
                        onSelect={this.onTypeAheadSuggestionSelected}
                        onChange={this.onTypeAheadValueChange}
                        suggestions={this.props.suggestions.map((suggestion) => ({
                            value: suggestion.orgnr,
                            label: `${this.capitalize(suggestion.name)} (${suggestion.orgnr})`
                        }))}
                        value={this.props.employer && this.props.employer.name ?
                            this.capitalize(this.props.employer.name) : this.props.typeAheadValue}
                        ref={(instance) => {
                            this.inputRef = instance;
                        }}
                        error={this.props.validation.employer !== undefined}
                    />
                </div>
                {employer && location &&
                    <Undertekst>{this.capitalize(employer.name)}, {location.address}, {location.postalCode} {this.capitalize(location.city)}</Undertekst>
                }
                {this.props.validation.employer && (
                    <div className="Administration__error">{this.props.validation.employer}</div>
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
    setEmployerTypeaheadValue: PropTypes.func.isRequired,
    validation: PropTypes.shape({
        employer: PropTypes.string
    }).isRequired,
    employer: PropTypes.shape({
        orgnr: PropTypes.string,
        name: PropTypes.string
    }),
    typeAheadValue: PropTypes.string.isRequired
};

const mapStateToProps = (state) => ({
    suggestions: state.employer.suggestions,
    employer: state.adData.employer,
    typeAheadValue: state.employer.typeAheadValue,
    properties: state.adData.properties,
    validation: state.adValidation.errors
});

const mapDispatchToProps = (dispatch) => ({
    setEmployer: (employer) => dispatch({ type: SET_EMPLOYER, employer }),
    setEmployerTypeaheadValue: (value) => dispatch({ type: SET_EMPLOYER_TYPEAHEAD_VALUE, value }),
    fetchEmployerSuggestions: () => dispatch({ type: FETCH_EMPLOYER_SUGGESTIONS })
});

export default connect(mapStateToProps, mapDispatchToProps)(Employer);
