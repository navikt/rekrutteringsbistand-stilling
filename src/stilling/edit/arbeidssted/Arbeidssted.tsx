import React, { ChangeEvent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Input, Checkbox, CheckboxGruppe } from 'nav-frontend-skjema';
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
import Skjemalabel from '../skjemaetikett/Skjemalabel';
import { ValidertFelt } from '../../adValidationReducer';
import { Geografi } from '../../../Stilling';
import css from './Arbeidssted.module.css';
import { ErrorMessage, TextField } from '@navikt/ds-react';
import { State } from '../../../redux/store';

type Props = {
    suggestions: Array<{
        kode: string;
        navn: string;
    }>;
    setPostalCodeTypeAheadValue: (value: string) => void;
    addPostalCode: (value: string) => void;
    validation: Record<ValidertFelt, string | undefined>;
    addPostalCodeAddress: (value: string) => void;
    locationList: Array<Geografi>;
    typeAheadValue: string;
    fetchLocations: () => void;
    removeLocationAreas: () => void;
    removePostalCode: () => void;
    removePostalCodeAddress: () => void;
};

class Location extends React.Component<Props> {
    state: {
        postCode: boolean;
        locationArea: boolean;
    };

    constructor(props: Props) {
        super(props);

        const { locationList = [] } = props;
        this.state = {
            postCode: true,
            locationArea: this.locationListContainsArea(locationList),
        };
    }

    componentDidMount() {
        this.props.fetchLocations();
    }

    onAddressChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;

        if (value === '') {
            this.props.removePostalCodeAddress();
        } else {
            this.props.addPostalCodeAddress(value);
        }
    };

    onTypeAheadValueChange = (value: string) => {
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

    onBlur = (code: string) => {
        if (code !== '') {
            this.onTypeAheadSuggestionSelected({ value: code });
        }
    };

    onPostCodeChecked = (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.target.checked) {
            this.props.removePostalCode();
            this.props.removePostalCodeAddress();
        }

        this.setState({
            ...this.state,
            postCode: e.target.checked,
        });
    };

    onLocationAreaChecked = (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.target.checked) {
            this.props.removeLocationAreas();
        }

        this.setState({
            ...this.state,
            locationArea: e.target.checked,
        });
    };

    locationListContainsArea = (locationList: Array<Geografi>) =>
        locationList &&
        locationList.some(
            (location) =>
                (location.country || location.municipal || location.county) && !location.postalCode
        );

    render() {
        const { suggestions, typeAheadValue, validation, locationList } = this.props;
        const locationListHasAddress: boolean =
            locationList?.length > 0 && locationList[0] !== undefined && locationList[0].address;

        return (
            <>
                <CheckboxGruppe>
                    <Checkbox
                        label="Adresse"
                        checked={this.state.postCode}
                        onChange={this.onPostCodeChecked}
                    />
                    {this.state.postCode && (
                        <>
                            <TextField
                                label="Gateadresse"
                                value={locationListHasAddress ? locationList[0].address : ''}
                                onChange={this.onAddressChange}
                            />
                            <div className="blokk-xs">
                                <Typeahead
                                    label="Postnummer"
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
                                    aria-labelledby="endre-stilling-postnummer"
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
                        </>
                    )}
                    <Checkbox
                        label="Kommuner, fylker eller land"
                        checked={this.state.locationArea === true}
                        onChange={this.onLocationAreaChecked}
                    />
                    {this.state.locationArea && <LocationArea />}
                    {validation.location && <ErrorMessage>{validation.location}</ErrorMessage>}
                </CheckboxGruppe>
            </>
        );
    }
}

const mapStateToProps = (state: State) => ({
    typeAheadValue: state.locationCode.typeAheadValue,
    suggestions: state.locationCode.suggestions,
    locationList: state.adData?.locationList,
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
