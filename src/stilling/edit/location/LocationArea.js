import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Typeahead from '../../../common/typeahead/Typeahead.tsx';
import Tag from '../../../common/tag/Tag';
import { FETCH_LOCATION_AREA_BEGIN, SET_LOCATION_AREA_TYPEAHEAD } from './locationAreaReducer';
import {
    ADD_LOCATION_AREA,
    REMOVE_COUNTRY,
    REMOVE_COUNTY,
    REMOVE_MUNICIPAL,
} from '../../adDataReducer';
import { VALIDATE_LOCATION_AREA } from '../../adValidationReducer';
import capitalizeLocation from './capitalizeLocation';
import './Location.less';
import Skjemalabel from '../skjemaetikett/Skjemalabel';
import { Feilmelding } from 'nav-frontend-typografi';
import { BodyShort, Detail } from '@navikt/ds-react';

class LocationArea extends React.Component {
    componentDidMount() {
        this.props.fetchLocationArea();
    }

    onLocationAreaSelect = (suggestion) => {
        const { municipalsCounties, countries, addLocationArea, validateLocationArea } = this.props;

        const country = countries.find(
            (c) => c.name.toLowerCase() === suggestion.name.toLowerCase()
        );
        const county = municipalsCounties.find(
            (c) => !c.countyCode && c.name.toLowerCase() === suggestion.name.toLowerCase()
        );
        const municipal = municipalsCounties.find(
            (m) => m.countyCode && m.name.toLowerCase() === suggestion.name.toLowerCase()
        );

        if (municipal) {
            addLocationArea({
                municipal: municipal.name,
                municipalCode: municipal.code,
            });
        } else if (county) {
            addLocationArea({
                county: county.name,
            });
        } else if (country) {
            addLocationArea({
                country: country.name,
            });
        }
        validateLocationArea();
    };

    onLocationAreaChange = (value) => {
        if (value !== undefined) {
            this.props.setTypeAheadValue(value);
        }
    };

    onBlur = (e) => {
        this.onLocationAreaSelect({ label: e });
    };

    onRemoveMunicipal = (municipal) => {
        this.props.removeMunicipal(municipal);
    };

    onRemoveCountry = (country) => {
        this.props.removeCountry(country);
    };

    onRemoveCounty = (county) => {
        this.props.removeCounty(county);
    };

    locationIsMunicipal = (location) => location && location.municipal && !location.postalCode;

    locationIsCountry = (location) =>
        location &&
        location.country &&
        !location.postalCode &&
        !location.municipal &&
        !location.county;

    locationIsCounty = (location) => location && location.county && !location.postalCode;

    render() {
        const { municipalsCounties, countries, typeaheadValue, validation, locationList } =
            this.props;

        const municipalsCountiesSuggestions = municipalsCounties.map((suggestion) => ({
            value: suggestion.code,
            name: suggestion.name,
            label: (
                <>
                    <BodyShort>{capitalizeLocation(suggestion.name)}</BodyShort>
                    <Detail>Fylke/kommune</Detail>
                </>
            ),
        }));

        const countrySuggestions = countries.map((country) => ({
            value: country.code,
            name: country.name,
            label: (
                <>
                    <BodyShort>{capitalizeLocation(country.name)}</BodyShort>
                    <Detail>Land</Detail>
                </>
            ),
        }));

        const allSuggestions = municipalsCountiesSuggestions.concat(countrySuggestions);

        return (
            <div className="LocationArea__typeahead">
                <Skjemalabel id="endre-stilling-kommune">
                    Skriv inn kommune, fylke eller land
                </Skjemalabel>
                <Typeahead
                    onChange={this.onLocationAreaChange}
                    onSelect={this.onLocationAreaSelect}
                    onBlur={this.onBlur}
                    suggestions={allSuggestions}
                    value={typeaheadValue}
                    minLength={1}
                    error={!!validation.locationArea}
                    aria-labelledby="endre-stilling-kommune"
                />
                {validation.locationArea && <Feilmelding>{validation.locationArea}</Feilmelding>}
                {locationList && locationList.length > 0 && (
                    <div className="LocationArea__tags">
                        {locationList.map((location) => {
                            if (this.locationIsMunicipal(location)) {
                                return (
                                    <Tag
                                        key={location.municipal}
                                        value={location.municipal}
                                        label={capitalizeLocation(location.municipal)}
                                        canRemove
                                        onRemove={this.onRemoveMunicipal}
                                    />
                                );
                            }
                            if (this.locationIsCounty(location)) {
                                return (
                                    <Tag
                                        key={location.county}
                                        value={location.county}
                                        label={capitalizeLocation(location.county)}
                                        canRemove
                                        onRemove={this.onRemoveCounty}
                                    />
                                );
                            }
                            if (this.locationIsCountry(location)) {
                                return (
                                    <Tag
                                        key={location.country}
                                        value={location.country}
                                        label={capitalizeLocation(location.country)}
                                        canRemove
                                        onRemove={this.onRemoveCountry}
                                    />
                                );
                            }
                            return null;
                        })}
                    </div>
                )}
            </div>
        );
    }
}

LocationArea.defaultProps = {
    validation: undefined,
    locationList: [],
};

LocationArea.propTypes = {
    typeaheadValue: PropTypes.string.isRequired,
    municipalsCounties: PropTypes.arrayOf(
        PropTypes.shape({
            code: PropTypes.string,
            name: PropTypes.string,
        })
    ).isRequired,
    countries: PropTypes.arrayOf(
        PropTypes.shape({
            code: PropTypes.string,
            name: PropTypes.string,
        })
    ).isRequired,
    fetchLocationArea: PropTypes.func.isRequired,
    addLocationArea: PropTypes.func.isRequired,
    removeMunicipal: PropTypes.func.isRequired,
    removeCountry: PropTypes.func.isRequired,
    removeCounty: PropTypes.func.isRequired,
    setTypeAheadValue: PropTypes.func.isRequired,
    locationList: PropTypes.arrayOf(PropTypes.object),
    validation: PropTypes.shape({
        locationArea: PropTypes.string,
    }),
    validateLocationArea: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    municipalsCounties: state.locationArea.municipalsCounties,
    countries: state.locationArea.countries,
    typeaheadValue: state.locationArea.typeaheadValue,
    locationList: state.adData?.locationList,
    validation: state.adValidation.errors,
});

const mapDispatchToProps = (dispatch) => ({
    fetchLocationArea: () => dispatch({ type: FETCH_LOCATION_AREA_BEGIN }),
    setTypeAheadValue: (value) => dispatch({ type: SET_LOCATION_AREA_TYPEAHEAD, value }),
    addLocationArea: (location) => dispatch({ type: ADD_LOCATION_AREA, location }),
    removeMunicipal: (value) => dispatch({ type: REMOVE_MUNICIPAL, value }),
    removeCountry: (value) => dispatch({ type: REMOVE_COUNTRY, value }),
    removeCounty: (value) => dispatch({ type: REMOVE_COUNTY, value }),
    validateLocationArea: () => dispatch({ type: VALIDATE_LOCATION_AREA }),
});

export default connect(mapStateToProps, mapDispatchToProps)(LocationArea);
