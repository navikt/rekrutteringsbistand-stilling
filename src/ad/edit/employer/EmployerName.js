import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Normaltekst, Undertekst } from 'nav-frontend-typografi';
import Typeahead from '../../../common/typeahead/Typeahead';
import { FETCH_EMPLOYER_SUGGESTIONS, SET_EMPLOYER_TYPEAHEAD_VALUE } from './employerReducer';
import { SET_EMPLOYER } from '../../adDataReducer';
import './EmployerName.less';
import capitalizeEmployerName from './capitalizeEmployerName';
import capitalizeLocation from '../location/capitalizeLocation';

class EmployerName extends React.Component {
    onTypeAheadValueChange = (value) => {
        this.props.setEmployerTypeaheadValue(value);
        this.props.fetchEmployerSuggestions();
    };

    onTypeAheadValueBlur = (value) => {
        if (value.length === 0) {
            this.props.setEmployer();
        }
    };

    onTypeAheadSuggestionSelected = (employer) => {
        if (employer) {
            const found = this.lookUpEmployer(employer.value);
            this.props.setEmployer(found);
            this.props.setEmployerTypeaheadValue(capitalizeEmployerName(found.name));
        } else {
            this.props.setEmployer();
        }
    };

    getEmployerSuggestionLabel = (suggestion) => {
        let commaSeparate = [];
        if (suggestion.location) {
            if (suggestion.location.address) {
                commaSeparate = [...commaSeparate, suggestion.location.address];
            }
            if (suggestion.location.postalCode) {
                commaSeparate = [...commaSeparate, suggestion.location.postalCode];
            }
            if (suggestion.location.city) {
                commaSeparate = [...commaSeparate, capitalizeLocation(suggestion.location.city)];
            }
        }
        if (suggestion.orgnr) {
            const groupedOrgNumber = suggestion.orgnr.match(/.{1,3}/g).join(' ');
            commaSeparate = [...commaSeparate, `Virksomhetsnummer: ${groupedOrgNumber}`];
        }
        return (
            <div className="Employer__typeahead__item">
                <Normaltekst>{capitalizeEmployerName(suggestion.name)}</Normaltekst>
                <Undertekst>{commaSeparate.join(', ')}</Undertekst>
            </div>
        );
    };

    lookUpEmployer = (value) =>
        this.props.suggestions.find(
            (employer) =>
                employer.name.toLowerCase() === value.toLowerCase() ||
                employer.orgnr === value.replace(/\s/g, '')
        );

    render() {
        const { employer } = this.props;
        const location = employer ? employer.location : undefined;
        return (
            <div className="EmployerName">
                <Normaltekst className="blokk-s">
                    <b>Obs!</b> For at arbeidsgiver skal få CV-er du sender må virksomhetsnummeret
                    du registrerer stillingen på samsvare med arbeidsgivers virksomhetsnummer.
                </Normaltekst>
                <div className="blokk-xxs">
                    <Typeahead
                        id="EmployerName__typeahead"
                        className="EmployerName__typeahead"
                        label="Bedriftens navn hentet fra Enhetsregisteret*"
                        placeholder="Skriv inn arbeidsgivernavn eller virksomhetsnummer"
                        onBlur={this.onTypeAheadValueBlur}
                        onSelect={this.onTypeAheadSuggestionSelected}
                        onChange={this.onTypeAheadValueChange}
                        suggestions={this.props.suggestions.map((suggestion) => ({
                            value: suggestion.orgnr,
                            label: this.getEmployerSuggestionLabel(suggestion),
                        }))}
                        value={this.props.typeAheadValue}
                        ref={(instance) => {
                            this.inputRef = instance;
                        }}
                        error={this.props.validation.employer !== undefined}
                    />
                </div>
                {employer && location && (
                    <Undertekst>
                        {capitalizeEmployerName(employer.name)}, {location.address},{' '}
                        {location.postalCode} {capitalizeLocation(location.city)},
                        Virksomhetsnummer: {employer.orgnr.match(/.{1,3}/g).join(' ')}
                    </Undertekst>
                )}
                {this.props.validation.employer && (
                    <div className="Administration__error">{this.props.validation.employer}</div>
                )}
            </div>
        );
    }
}

EmployerName.defaultProps = {
    employer: {},
};

EmployerName.propTypes = {
    suggestions: PropTypes.arrayOf(
        PropTypes.shape({
            orgnr: PropTypes.string,
            navn: PropTypes.string,
        })
    ).isRequired,
    fetchEmployerSuggestions: PropTypes.func.isRequired,
    setEmployer: PropTypes.func.isRequired,
    setEmployerTypeaheadValue: PropTypes.func.isRequired,
    validation: PropTypes.shape({
        employer: PropTypes.string,
    }).isRequired,
    employer: PropTypes.shape({
        orgnr: PropTypes.string,
        name: PropTypes.string,
    }),
    typeAheadValue: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
    suggestions: state.employer.suggestions,
    employer: state.adData.employer,
    typeAheadValue: state.employer.typeAheadValue,
    properties: state.adData.properties,
    validation: state.adValidation.errors,
});

const mapDispatchToProps = (dispatch) => ({
    setEmployer: (employer) => dispatch({ type: SET_EMPLOYER, employer }),
    setEmployerTypeaheadValue: (value) => dispatch({ type: SET_EMPLOYER_TYPEAHEAD_VALUE, value }),
    fetchEmployerSuggestions: () => dispatch({ type: FETCH_EMPLOYER_SUGGESTIONS }),
});

export default connect(mapStateToProps, mapDispatchToProps)(EmployerName);
