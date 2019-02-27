import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Input, Checkbox } from 'nav-frontend-skjema';
import { Undertekst, Element } from 'nav-frontend-typografi';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import Typeahead from '../../../common/typeahead/Typeahead';
import { FETCH_LOCATIONS, SET_POSTAL_CODE_TYPEAHEAD_VALUE } from './locationCodeReducer';
import { ADD_POSTAL_CODE_BEGIN, REMOVE_POSTAL_CODE, ADD_POSTAL_CODE_ADDRESS_BEGIN } from '../../adDataReducer';
import capitalizeLocation from './capitalizeLocation';
import LocationArea from './LocationArea';
import './Location.less';

class Location extends React.Component {
    constructor(props) {
        super(props);
        const { locationList } = props;
        this.state = {
            postCode: true,
            locationArea: this.locationListContainsArea(locationList)
        };
    }

    componentDidMount() {
        this.props.fetchLocations();
    }


    onAddressChange = (e) => {
        this.props.addPostalCodeAddress(e.target.value);
    };

    onTypeAheadValueChange = (value) => {
        this.props.setPostalCodeTypeAheadValue(value);
        this.props.addPostalCode(value);
        if (value === '') {
            this.props.removePostalCode();
        }
    };

    onTypeAheadSuggestionSelected = (location) => {
        if (location) {
            this.props.setPostalCodeTypeAheadValue(location.value);
            this.props.addPostalCode(location.value);
        }
    };


    onPostCodeChecked = (e) => {
        this.setState({
            ...this.state,
            postCode: e.target.checked
        });
    };

    onLocationAreaChecked = (e) => {
        this.setState({
            ...this.state,
            locationArea: e.target.checked
        });
    };

    getLocationPostalCode = (locationList) => {
        return locationList.find((loc) => (!!loc.postalCode));
    };

    getLocationAsString = (locationList, separator) => {
        const location = this.getLocationPostalCode(locationList);
        if (!location) {
            return '';
        }
        return (
            [
                location.city && `Sted: ${capitalizeLocation(location.city)}`,
                location.municipal && `Kommune: ${capitalizeLocation(location.municipal)}`,
                location.county && `Fylke: ${capitalizeLocation(location.county)}`
            ].filter((l) => l).join(separator)
        );
    };

    locationListContainsArea = (locationList) => locationList.some(
        (location) => ((location.country || location.municipal || location.county) && !location.postalCode)
    );


    render() {
        const { suggestions, typeAheadValue, validation, locationList } = this.props;
        return (
            <Ekspanderbartpanel
                className="Edit__panel"
                tittel="Arbeidsstedets adresse*"
                tittelProps="undertittel"
                border
                apen
            >
                <Checkbox
                    label="Postnummer eller poststed"
                    checked={this.state.postCode === true}
                    onChange={this.onPostCodeChecked}
                />
                {this.state.postCode && (
                    <div className="blokk-s">
                        <Input
                            label="Gateadresse"
                            value={locationList && locationList.length && locationList[0] && locationList[0].address
                                ? locationList[0].address : ''}
                            onChange={this.onAddressChange}
                        />
                        <div className="blokk-xs">
                            <Typeahead
                                id="typeahead-postal-code"
                                className="PostalCode__typeahead"
                                onSelect={this.onTypeAheadSuggestionSelected}
                                onChange={this.onTypeAheadValueChange}
                                label="Sted/postnummer*"
                                suggestions={suggestions.map((loc) => ({
                                    value: loc.postalCode,
                                    label: `${loc.postalCode} ${capitalizeLocation(loc.city)}`
                                }))}
                                value={typeAheadValue}
                                error={validation.postalCode !== undefined}
                            />
                            {validation.postalCode && (
                                <div className="Administration__error">{validation.postalCode}</div>
                            )}
                        </div>
                        <Input
                            label="Sted*"
                            value={locationList && locationList.length && locationList[0] && locationList[0].city
                                ? locationList[0].city : ''}
                            disabled
                        />
                    </div>
                )}
                <Checkbox
                    label="Kommuner, fylker eller land"
                    checked={this.state.locationArea === true}
                    onChange={this.onLocationAreaChecked}
                />
                {this.state.locationArea && (
                    <LocationArea />
                )}
                {validation.location && (
                    <div className="Administration__error blokk-xs">{validation.location}</div>
                )}
            </Ekspanderbartpanel>
        );
    }
}

Location.defaultProps = {
    validation: undefined,
    locationList: [],
    typeAheadValue: ''
};

Location.propTypes = {
    suggestions: PropTypes.arrayOf(PropTypes.shape({
        kode: PropTypes.string,
        navn: PropTypes.string
    })).isRequired,
    setPostalCodeTypeAheadValue: PropTypes.func.isRequired,
    fetchLocations: PropTypes.func.isRequired,
    addPostalCode: PropTypes.func.isRequired,
    validation: PropTypes.shape({
        location: PropTypes.string,
        postalCode: PropTypes.string
    }),
    addPostalCodeAddress: PropTypes.func.isRequired,
    removePostalCode: PropTypes.func.isRequired,
    locationList: PropTypes.arrayOf(PropTypes.object),
    typeAheadValue: PropTypes.string
};

const mapStateToProps = (state) => ({
    typeAheadValue: state.locationCode.typeAheadValue,
    suggestions: state.locationCode.suggestions,
    locationList: state.adData.locationList,
    validation: state.adValidation.errors
});

const mapDispatchToProps = (dispatch) => ({
    addPostalCodeAddress: (address) => dispatch({ type: ADD_POSTAL_CODE_ADDRESS_BEGIN, address }),
    fetchLocations: () => dispatch({ type: FETCH_LOCATIONS }),
    setPostalCodeTypeAheadValue: (value) => dispatch({ type: SET_POSTAL_CODE_TYPEAHEAD_VALUE, value }),
    addPostalCode: (postalCode) => dispatch({ type: ADD_POSTAL_CODE_BEGIN, postalCode }),
    removePostalCode: () => dispatch({ type: REMOVE_POSTAL_CODE })
});

export default connect(mapStateToProps, mapDispatchToProps)(Location);
