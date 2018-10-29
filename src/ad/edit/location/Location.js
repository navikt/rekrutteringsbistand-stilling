import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Input, Radio, SkjemaGruppe } from 'nav-frontend-skjema';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import { SET_LOCATION_ADDRESS, SET_LOCATION_POSTAL_CODE } from '../../adDataReducer';
import MunicipalOrCountry from './MunicipalOrCountry';
import Typeahead from '../../../common/typeahead/Typeahead';
import { FETCH_LOCATIONS, SET_LOCATION_TYPE_AHEAD_VALUE } from './locationCodeReducer';
import capitalizeLocation from './capitalizeLocation';

class Location extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            radioChecked: this.locationIsMunicipalOrCountry(props.location) ? 'municipalOrCountry' : 'address'
        };
    }

    componentDidMount() {
        this.props.fetchLocations();
    }

    onRadioButtonChange = (e) => {
        this.setState({
            radioChecked: e.target.value
        });
    };

    onAddressChange = (e) => {
        this.props.setAddress(e.target.value);
    };

    onTypeAheadValueChange = (value) => {
        this.props.setLocationTypeAheadValue(value);
        this.props.setLocationPostalCode(value);
    };

    onTypeAheadSuggestionSelected = (location) => {
        if (location) {
            this.props.setLocationTypeAheadValue(location.value);
            this.props.setLocationPostalCode(location.value);
        }
    };

    locationIsMunicipalOrCountry = (location) => location
        && (location.country || location.municipal)
        && !location.postalCode;


    render() {
        const { location } = this.props;
        return (
            <Ekspanderbartpanel
                className="Edit__panel"
                tittel="Arbeidsstedets adresse*"
                tittelProps="undertittel"
                border
                apen
            >
                <SkjemaGruppe>
                    <Radio
                        label="Enten: Eksakt adresse"
                        name="address"
                        value="address"
                        checked={this.state.radioChecked === 'address'}
                        onChange={this.onRadioButtonChange}
                    />
                    <Radio
                        label="Eller: En kommune, Svalbard eller et land"
                        name="municipalOrCountry"
                        value="municipalOrCountry"
                        checked={this.state.radioChecked === 'municipalOrCountry'}
                        onChange={this.onRadioButtonChange}
                    />
                </SkjemaGruppe>
                {this.state.radioChecked === 'address' && (
                    <div className="Arbeidsstedsadresse">
                        <Input
                            id="arbeidssted-adresse"
                            label="Gateadresse"
                            value={location && location.address
                                ? location.address : ''}
                            onChange={this.onAddressChange}
                        />
                        <div className="blokk-xs">
                            <Typeahead
                                id="arbeidssted-postnummer"
                                className="PostalCode__typeahead"
                                onSelect={this.onTypeAheadSuggestionSelected}
                                onChange={this.onTypeAheadValueChange}
                                label="Sted/postnummer*"
                                suggestions={this.props.suggestions.map((loc) => ({
                                    value: loc.postalCode,
                                    label: `${loc.postalCode} ${capitalizeLocation(loc.city)}`
                                }))}
                                value={this.props.location && this.props.location.postalCode ?
                                    this.props.location.postalCode : ''}
                                error={(this.props.validation.postalCode !== undefined
                                    || this.props.validation.location !== undefined)}
                            />
                            {this.props.validation.postalCode && (
                                <div className="Administration__error">{this.props.validation.postalCode}</div>
                            )}
                        </div>
                        <Input
                            id="arbeidssted-sted"
                            label="Sted*"
                            value={location && location.city
                                ? location.city : ''}
                            disabled
                        />
                        {this.props.validation.location && (
                            <div className="Administration__error">{this.props.validation.location}</div>
                        )}
                    </div>
                )}
                {this.state.radioChecked === 'municipalOrCountry' && (
                    <div className="Arbeidsstedsadresse">
                        <MunicipalOrCountry />
                    </div>
                )}
            </Ekspanderbartpanel>
        );
    }
}

Location.propTypes = {
    suggestions: PropTypes.arrayOf(PropTypes.shape({
        kode: PropTypes.string,
        navn: PropTypes.string
    })).isRequired,
    location: PropTypes.shape({
        address: PropTypes.string,
        postalCode: PropTypes.string
    }),
    setAddress: PropTypes.func.isRequired,
    setLocationTypeAheadValue: PropTypes.func.isRequired,
    fetchLocations: PropTypes.func.isRequired,
    setLocationPostalCode: PropTypes.func.isRequired,
    validation: PropTypes.shape({
        location: PropTypes.string,
        postalCode: PropTypes.string
    })
};

const mapStateToProps = (state) => ({
    location: state.adData.location,
    suggestions: state.location.suggestions,
    validation: state.adValidation.errors
});

const mapDispatchToProps = (dispatch) => ({
    setAddress: (address) => dispatch({ type: SET_LOCATION_ADDRESS, address }),
    setLocationTypeAheadValue: (value) => dispatch({ type: SET_LOCATION_TYPE_AHEAD_VALUE, value }),
    setLocationPostalCode: (postalCode) => dispatch({ type: SET_LOCATION_POSTAL_CODE, postalCode }),
    fetchLocations: () => dispatch({ type: FETCH_LOCATIONS })
});

export default connect(mapStateToProps, mapDispatchToProps)(Location);
