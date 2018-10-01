import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Input, SkjemaGruppe } from 'nav-frontend-skjema';
import { Undertekst } from 'nav-frontend-typografi';
import Typeahead from '../../../common/typeahead/Typeahead';
import { FETCH_LOCATIONS, SET_LOCATION_TYPE_AHEAD_VALUE } from './locationCodeReducer';
import { SET_LOCATION_POSTAL_CODE } from '../../adDataReducer';
import {
    registerShortcuts,
    removeShortcuts
} from '../../../common/shortcuts/Shortcuts';
import './Location.less';
import capitalizeLocation from './capitalizeLocation';

const getLocationAsString = (location, separator) => (
    [
        location.city && `Sted: ${capitalizeLocation(location.city)}`,
        location.municipal && `Kommune: ${capitalizeLocation(location.municipal)}`,
        location.county && `Fylke: ${capitalizeLocation(location.county)}`
    ].filter((l) => l).join(separator)
);

class Location extends React.Component {
    componentDidMount() {
        this.props.fetchLocations();
        registerShortcuts('locationEdit', {
            's s': (e) => {
                e.preventDefault();
                this.inputRef.input.focus();
            }
        });
    }

    componentWillUnmount() {
        removeShortcuts('locationEdit');
    }

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

    locationIsCountry = (location) => {
        // Returnerer true for annonser fra Adreg som ikke har postnummer, men land istedet
        return this.props.medium === 'Stillingsregistrering' && location && location.country && !location.postalCode
            && !location.municipal;
    };

    locationIsMunicipal = (location) => {
        // Returnerer true for annonser fra Adreg som ikke har postnummer, men kommune istedet
        return this.props.medium === 'Stillingsregistrering' && location && location.municipal && !location.postalCode;
    };


    render() {
        const locationIsCountry = this.locationIsCountry(this.props.location);
        const locationIsMunicipal = this.locationIsMunicipal(this.props.location);
        return (
            <div className="Location">
                <div className="blokk-xxs">
                    <Typeahead
                        id="PostalCode__input"
                        className="PostalCode__typeahead"
                        label="Arbeidssted (postnummer)*"
                        placeholder="Skriv inn postnummer eller poststed"
                        onSelect={this.onTypeAheadSuggestionSelected}
                        onChange={this.onTypeAheadValueChange}
                        suggestions={this.props.suggestions.map((location) => ({
                            value: location.postalCode,
                            label: `${location.postalCode} ${capitalizeLocation(location.city)}`
                        }))}
                        value={this.props.location && this.props.location.postalCode ?
                            this.props.location.postalCode : ''}
                        ref={(instance) => {
                            this.inputRef = instance;
                        }}
                        error={this.props.validation.location !== undefined}
                        disabled={locationIsCountry || locationIsMunicipal}
                    />
                </div>
                {this.props.location && !locationIsMunicipal &&
                    <div>
                        <Undertekst>
                            {getLocationAsString(this.props.location, ' | ')}
                        </Undertekst>
                    </div>
                }
                {locationIsCountry &&
                    <Undertekst>
                        Angitt som utland: {capitalizeLocation(this.props.location.country)}{'. Stillingen må ' +
                    'registreres i Arena.'}
                    </Undertekst>
                }
                {locationIsMunicipal &&
                    <Undertekst>
                        Angitt som kommune: {capitalizeLocation(this.props.location.municipal)}
                    </Undertekst>
                }
                {this.props.validation.location && (
                    <div className="Administration__error">{this.props.validation.location}</div>
                )}
            </div>
        );
    }
}

Location.propTypes = {
    suggestions: PropTypes.arrayOf(PropTypes.shape({
        kode: PropTypes.string,
        navn: PropTypes.string
    })).isRequired,
    setLocationTypeAheadValue: PropTypes.func.isRequired,
    fetchLocations: PropTypes.func.isRequired,
    setLocationPostalCode: PropTypes.func.isRequired,
    medium: PropTypes.string.isRequired
};

const mapStateToProps = (state) => ({
    suggestions: state.location.suggestions,
    location: state.adData.location,
    validation: state.adValidation.errors,
    medium: state.adData.medium
});

const mapDispatchToProps = (dispatch) => ({
    setLocationTypeAheadValue: (value) => dispatch({ type: SET_LOCATION_TYPE_AHEAD_VALUE, value }),
    setLocationPostalCode: (postalCode) => dispatch({ type: SET_LOCATION_POSTAL_CODE, postalCode }),
    fetchLocations: () => dispatch({ type: FETCH_LOCATIONS })
});

export default connect(mapStateToProps, mapDispatchToProps)(Location);
