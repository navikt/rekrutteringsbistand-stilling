import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Typeahead from '../../../common/typeahead/Typeahead';
import { FETCH_MUNICIPAL_OR_COUNTRY_BEGIN, SET_TYPE_AHEAD_VALUE } from './municipalOrCountryReducer';
import { SET_LOCATION } from '../../adDataReducer';

class MunicipalOrCountry extends React.Component {
    componentDidMount() {
        this.props.fetchMunicipalsOrCountries();
        const { location } = this.props.location;
        let municipalOrCountry = '';
        if (location && location.country) {
            municipalOrCountry = this.capitalizeWord(location.country);
        } else if (location && location.municipal) {
            municipalOrCountry = this.capitalizeWord(location.municipal);
        }
        this.props.setTypeAheadValue(municipalOrCountry);
    }

    componentWillReceiveProps(nextProps) {
        if ((nextProps.location.address !== this.props.location.address)
            && nextProps.location.address !== undefined) {
            this.props.setTypeAheadValue('');
        }
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

    render() {
        /* const shouldShowError = (this.props.land.length === 0 && this.props.kommuner.length === 0)
            && this.props.kommuneLand.length > 1
            && this.props.stilling.property.arbeidsstedKommune === undefined
            && this.props.stilling.property.arbeidsstedLand === undefined; */
        return (
            <div>
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
                    // feil={shouldShowError ? { feilmelding: 'Må være en kommune eller land utenfor Norge' } : undefined}
                    placeholder="For eksempel: Oslo, Sandefjord, Danmark"
                />
            </div>
        );
    }
}

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
};

const mapStateToProps = (state) => ({
    municipals: state.municipalOrCountry.municipals,
    countries: state.municipalOrCountry.countries,
    municipalOrCountry: state.municipalOrCountry.municipalOrCountry,
    location: state.adData.location
});

const mapDispatchToProps = (dispatch) => ({
    fetchMunicipalsOrCountries: () => dispatch({ type: FETCH_MUNICIPAL_OR_COUNTRY_BEGIN }),
    setTypeAheadValue: (value) => dispatch({ type: SET_TYPE_AHEAD_VALUE, value }),
    setLocation: (location) => dispatch({ type: SET_LOCATION, location })
});

export default connect(mapStateToProps, mapDispatchToProps)(MunicipalOrCountry);
