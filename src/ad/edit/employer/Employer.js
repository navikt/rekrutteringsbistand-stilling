import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Normaltekst } from 'nav-frontend-typografi';
import Typeahead from '../../../common/typeahead/Typeahead';
import { FETCH_EMPLOYER_SUGGESTIONS } from './employerReducer';
import { SET_EMPLOYER } from '../../adDataReducer';
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

    lookUpEmployer = (value) => this.props.suggestions.find((employer) => (employer.name === value || employer.orgnr === value));

    render() {
        const { employer, properties } = this.props;
        const location = employer ? employer.location : undefined;
        return (
            <div className="Employer">
                {properties.employer && (
                    <dl className="dl-flex typo-normal blokk-s">
                        <dt key="dt">Oppgitt arb.giver:</dt>
                        <dd key="dd">{properties.employer}</dd>
                    </dl>
                )}

                <div className="blokk-xxs">
                    <Typeahead
                        id="Employer__typeahead"
                        className="Employer__typeahead"
                        label="Koble arbeidsgiver med Enhetsregisteret"
                        placeholder="Søk etter arbeidsgiver"
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
                {employer && location &&
                <dl className="dl-flex typo-normal">
                    {employer.name && [
                        <dt key="dt">Arbeidsgiver</dt>,
                        <dd key="dd">{employer.name}</dd>]
                    }
                    {location.address && [
                        <dt key="dt">Gateadresse:</dt>,
                        <dd key="dd">{location.address}</dd>]
                    }
                    {location && location.postalCode && [
                        <dt key="dt">Poststed:</dt>,
                        <dd key="dd">{location.postalCode} {location.city}</dd>]
                    }
                </dl>
                }
                {this.props.validation.employer && (
                    <div className="Employer__error">{this.props.validation.employer}</div>
                )}
            </div>
        );
    }
}

Employer.defaultProps = {
    employer: {},
    properties: {
        employer: ' - '
    }
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
    properties: PropTypes.shape({
        employer: PropTypes.string
    }).isRequired,
    employer: PropTypes.shape({
        orgnr: PropTypes.string,
        name: PropTypes.string
    })
};

const mapStateToProps = (state) => ({
    suggestions: state.employer.suggestions,
    employer: state.adData.employer,
    properties: state.adData.properties,
    validation: state.adValidation.errors
});

const mapDispatchToProps = (dispatch) => ({
    setEmployer: (value, foundEmployer) => dispatch({ type: SET_EMPLOYER, value, foundEmployer }),
    fetchEmployerSuggestions: () => dispatch({ type: FETCH_EMPLOYER_SUGGESTIONS })
});

export default connect(mapStateToProps, mapDispatchToProps)(Employer);
