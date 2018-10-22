import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Typeahead from '../../../common/typeahead/Typeahead';
import { FETCH_MUNICIPAL_OR_COUNTRY_BEGIN, SET_TYPE_AHEAD_VALUE } from './municipalOrCountryReducer';
import { SET_LOCATION } from '../../adDataReducer';
import './Location.less';

class MunicipalOrCountry extends React.Component {
    componentDidMount() {
        this.props.fetchMunicipalsOrCountries();
        const { location } = this.props;
        let municipalOrCountry = '';
        if (this.locationIsCountry(location)) {
            municipalOrCountry = this.capitalizeWord(location.country);
        } else if (this.locationIsMunicipal(location)) {
            municipalOrCountry = this.capitalizeWord(location.municipal);
        }
        this.props.setTypeAheadValue(municipalOrCountry);
    }

    onMunicipalOrCountrySelect = (value) => {
        const country = this.props.countries.find((c) => c.name.toLowerCase() === value.label.toLowerCase());
        const municipal = this.props.municipals.find((m) => m.name.toLowerCase() === value.label.toLowerCase());
        if (country) {
            this.props.setLocation({
                country: country.name,
                municipal: undefined,
                address: undefined,
                postalCode: undefined,
                city: undefined
            });
            this.props.setTypeAheadValue(this.capitalizeWord(country.name));
        } else if (municipal) {
            this.props.setLocation({
                municipal: municipal.name,
                country: undefined,
                address: undefined,
                postalCode: undefined,
                city: undefined
            });
            this.props.setTypeAheadValue(this.capitalizeWord(municipal.name));
        }
    };

    onMunicipalOrCountryChange = (value) => {
        if (value !== undefined) {
            this.props.setLocation({ municipal: undefined, country: undefined });
            this.props.setTypeAheadValue(value);
        }
    };

    capitalizeWord = (word) => (
        word[0].toUpperCase() + word.substr(1).toLowerCase()
    );

    locationIsCountry = (location) => location && location.country && !location.postalCode && !location.municipal

    locationIsMunicipal = (location) => location && location.municipal && !location.postalCode;

    render() {
        return (
            <div className="MunicipalOrCountry__Typeahead">
                <Typeahead
                    id="typeahead-municipal-country"
                    onChange={this.onMunicipalOrCountryChange}
                    onSelect={this.onMunicipalOrCountrySelect}
                    label="Skriv inn og velg"
                    suggestions={this.props.municipals.map((m) => ({
                        value: m.code,
                        label: this.capitalizeWord(m.name)
                    }))}
                    optionalSuggestions={this.props.countries.map((c) => ({
                        value: c.code,
                        label: this.capitalizeWord(c.name)
                    }))}
                    value={this.props.municipalOrCountry}
                    minLength={1}
                    inputRef={(input) => {
                        this.refInputError = input;
                    }}
                    error={this.props.validation.location !== undefined}
                    placeholder="For eksempel: Drammen"
                />
            </div>
        );
    }
}

MunicipalOrCountry.defaultProps = {
    validation: undefined,
    location: undefined
};

MunicipalOrCountry.propTypes = {
    municipalOrCountry: PropTypes.string.isRequired,
    municipals: PropTypes.arrayOf(PropTypes.shape({
        code: PropTypes.string,
        name: PropTypes.string
    })).isRequired,
    countries: PropTypes.arrayOf(PropTypes.shape({
        code: PropTypes.string,
        name: PropTypes.string
    })).isRequired,
    fetchMunicipalsOrCountries: PropTypes.func.isRequired,
    setLocation: PropTypes.func.isRequired,
    setTypeAheadValue: PropTypes.func.isRequired,
    validation: PropTypes.shape({
        municipalOrCountry: PropTypes.string
    }),
    location: PropTypes.shape({
        address: PropTypes.string,
        municipal: PropTypes.string,
        country: PropTypes.string
    })
};

const mapStateToProps = (state) => ({
    municipals: state.municipalOrCountry.municipals,
    countries: state.municipalOrCountry.countries,
    municipalOrCountry: state.municipalOrCountry.municipalOrCountry,
    validation: state.adValidation.errors,
    location: state.adData.location
});

const mapDispatchToProps = (dispatch) => ({
    fetchMunicipalsOrCountries: () => dispatch({ type: FETCH_MUNICIPAL_OR_COUNTRY_BEGIN }),
    setTypeAheadValue: (value) => dispatch({ type: SET_TYPE_AHEAD_VALUE, value }),
    setLocation: (location) => dispatch({ type: SET_LOCATION, location })
});

export default connect(mapStateToProps, mapDispatchToProps)(MunicipalOrCountry);
