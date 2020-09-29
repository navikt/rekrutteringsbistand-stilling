import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Input, Checkbox, CheckboxGruppe } from 'nav-frontend-skjema';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import Typeahead from '../../../common/typeahead/Typeahead';
import { FETCH_LOCATIONS, SET_POSTAL_CODE_TYPEAHEAD_VALUE } from './locationCodeReducer';
import {
    ADD_POSTAL_CODE_BEGIN,
    REMOVE_POSTAL_CODE,
    ADD_POSTAL_CODE_ADDRESS_BEGIN,
    REMOVE_POSTAL_CODE_ADDRESS,
    REMOVE_LOCATION_AREAS,
} from '../../adDataReducer';
import capitalizeLocation from './capitalizeLocation';
import LocationArea from './LocationArea';
import './Location.less';
import { Feilmelding, Normaltekst, Undertittel } from 'nav-frontend-typografi';
import Skjemalabel from '../skjemaetikett/Skjemalabel';

class Location extends React.Component {
    constructor(props) {
        super(props);
        const { locationList } = props;
        this.state = {
            postCode: true,
            locationArea: this.locationListContainsArea(locationList),
        };
    }

    componentDidMount() {
        this.props.fetchLocations();
    }

    onAddressChange = (e) => {
        const { value } = e.target;
        if (value === '') {
            this.props.removePostalCodeAddress();
        } else {
            this.props.addPostalCodeAddress(value);
        }
    };

    onTypeAheadValueChange = (value) => {
        this.props.setPostalCodeTypeAheadValue(value);
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

    onBlur = (code) => {
        if (code !== '') {
            this.onTypeAheadSuggestionSelected({ value: code });
        }
    };

    onPostCodeChecked = (e) => {
        if (!e.target.checked) {
            this.props.removePostalCode();
            this.props.removePostalCodeAddress();
        }

        this.setState({
            ...this.state,
            postCode: e.target.checked,
        });
    };

    onLocationAreaChecked = (e) => {
        if (!e.target.checked) {
            this.props.removeLocationAreas();
        }

        this.setState({
            ...this.state,
            locationArea: e.target.checked,
        });
    };

    locationListContainsArea = (locationList) =>
        locationList &&
        locationList.some(
            (location) =>
                (location.country || location.municipal || location.county) && !location.postalCode
        );

    render() {
        const { suggestions, typeAheadValue, validation, locationList } = this.props;
        const locationListHasAddress =
            locationList && locationList.length && locationList[0] && locationList[0].address;

        return (
            <Ekspanderbartpanel
                className="Edit__panel"
                tittel={
                    <Undertittel>
                        <Undertittel tag="span">Arbeidssted</Undertittel>
                        <Normaltekst tag="span"> (må fylles ut)</Normaltekst>
                    </Undertittel>
                }
                border
                apen
            >
                <CheckboxGruppe>
                    <Checkbox
                        label="Adresse"
                        checked={this.state.postCode === true}
                        onChange={this.onPostCodeChecked}
                    />
                    {this.state.postCode && (
                        <div className="blokk-m">
                            <Input
                                label="Gateadresse"
                                value={locationListHasAddress ? locationList[0].address : ''}
                                onChange={this.onAddressChange}
                            />
                            <div className="blokk-xs">
                                <Skjemalabel inputId="endre-stilling-postnummer">
                                    Postnummer
                                </Skjemalabel>
                                <Typeahead
                                    id="endre-stilling-postnummer"
                                    className="PostalCode__typeahead"
                                    onSelect={this.onTypeAheadSuggestionSelected}
                                    onChange={this.onTypeAheadValueChange}
                                    onBlur={this.onBlur}
                                    suggestions={suggestions.map((loc) => ({
                                        value: loc.postalCode,
                                        label: `${loc.postalCode} ${capitalizeLocation(loc.city)}`,
                                    }))}
                                    value={typeAheadValue}
                                    error={validation.postalCode !== undefined}
                                />
                                {validation.postalCode && (
                                    <Feilmelding>{validation.postalCode}</Feilmelding>
                                )}
                            </div>
                            <Input
                                label="Poststed"
                                value={
                                    locationList &&
                                    locationList.length &&
                                    locationList[0] &&
                                    locationList[0].city
                                        ? locationList[0].city
                                        : ''
                                }
                                disabled
                            />
                        </div>
                    )}
                    <Checkbox
                        label="Kommuner, fylker eller land"
                        checked={this.state.locationArea === true}
                        onChange={this.onLocationAreaChecked}
                    />
                    {this.state.locationArea && <LocationArea />}
                    {validation.location && <Feilmelding>{validation.location}</Feilmelding>}
                </CheckboxGruppe>
            </Ekspanderbartpanel>
        );
    }
}

Location.defaultProps = {
    validation: undefined,
    locationList: [],
    typeAheadValue: '',
};

Location.propTypes = {
    suggestions: PropTypes.arrayOf(
        PropTypes.shape({
            kode: PropTypes.string,
            navn: PropTypes.string,
        })
    ).isRequired,
    setPostalCodeTypeAheadValue: PropTypes.func.isRequired,
    fetchLocations: PropTypes.func.isRequired,
    addPostalCode: PropTypes.func.isRequired,
    validation: PropTypes.shape({
        location: PropTypes.string,
        postalCode: PropTypes.string,
    }),
    addPostalCodeAddress: PropTypes.func.isRequired,
    removePostalCode: PropTypes.func.isRequired,
    removePostalCodeAddress: PropTypes.func.isRequired,
    locationList: PropTypes.arrayOf(PropTypes.object),
    typeAheadValue: PropTypes.string,
};

const mapStateToProps = (state) => ({
    typeAheadValue: state.locationCode.typeAheadValue,
    suggestions: state.locationCode.suggestions,
    locationList: state.adData.locationList,
    validation: state.adValidation.errors,
});

const mapDispatchToProps = (dispatch) => ({
    addPostalCodeAddress: (address) => dispatch({ type: ADD_POSTAL_CODE_ADDRESS_BEGIN, address }),
    fetchLocations: () => dispatch({ type: FETCH_LOCATIONS }),
    setPostalCodeTypeAheadValue: (value) =>
        dispatch({ type: SET_POSTAL_CODE_TYPEAHEAD_VALUE, value }),
    addPostalCode: (postalCode) => dispatch({ type: ADD_POSTAL_CODE_BEGIN, postalCode }),
    removePostalCode: () => dispatch({ type: REMOVE_POSTAL_CODE }),
    removePostalCodeAddress: () => dispatch({ type: REMOVE_POSTAL_CODE_ADDRESS }),
    removeLocationAreas: () => dispatch({ type: REMOVE_LOCATION_AREAS }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Location);
