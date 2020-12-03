import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Knapp } from 'nav-frontend-knapper';
import Typeahead from '../../../common/typeahead/Typeahead';
import Tag from '../../../common/tag/Tag';
import {
    FETCH_FILTER_LOCATIONS_BEGIN,
    SET_FILTER_LOCATION_TYPE_AHEAD,
} from './filterLocationReducer';
import capitalizeLocation from '../../../ad/edit/location/capitalizeLocation';
import { CHANGE_LOCATION_FILTER } from '../../searchReducer';
import './FilterLocation.less';
import Filterpanel from '../Filterpanel';

class FilterLocation extends React.Component {
    componentDidMount() {
        this.props.fetchLocations();
    }

    onLocationSelect = (value) => {
        const county = this.props.counties.find(
            (c) => c.name.toLowerCase() === value.label.toLowerCase()
        );
        const municipal = this.props.municipals.find(
            (m) => m.name.toLowerCase() === value.label.toLowerCase()
        );

        const locationArray = this.getLocationAsArray(this.props.locationName);

        if (county && !this.valueAlreadyInList(county.name, locationArray)) {
            locationArray.push(county.name);
        } else if (municipal && !this.valueAlreadyInList(municipal.name, locationArray)) {
            locationArray.push(municipal.name);
        }

        this.props.setTypeAheadValue('');
        this.props.changeLocationFilter(locationArray.join(', '));
    };

    onLocationChange = (value) => {
        if (value !== undefined) {
            this.props.setTypeAheadValue(value);
        }
    };

    onSubmit = (e) => {
        e.preventDefault();
        const locationArray = this.getLocationAsArray(this.props.locationName);
        this.props.changeLocationFilter(locationArray.join(', '));
    };

    onRemoveLocation = (location) => {
        const locationArray = this.getLocationAsArray(this.props.locationName);
        const newLocationArray = locationArray.filter(
            (item) => item.toLowerCase() !== location.toLowerCase()
        );
        this.props.changeLocationFilter(newLocationArray.join(', '));
    };

    getLocationAsArray = (locationName) => {
        return locationName ? locationName.split(', ') : [];
    };

    valueAlreadyInList = (value, list) =>
        list && list.find((a) => a.toLowerCase() === value.toLowerCase()) !== undefined;

    render() {
        const locationArray = this.getLocationAsArray(this.props.locationName);

        return (
            <Filterpanel label="Kommune eller fylke" htmlFor="typeahead-location">
                <div className="FilterLocation">
                    <Typeahead
                        id="typeahead-location"
                        className="FilterLocation__typeahead"
                        onChange={this.onLocationChange}
                        onSelect={this.onLocationSelect}
                        suggestions={this.props.municipals.map((m) => ({
                            value: m.code,
                            label: capitalizeLocation(m.name),
                        }))}
                        optionalSuggestions={this.props.counties.map((c) => ({
                            value: c.code,
                            label: capitalizeLocation(c.name),
                        }))}
                        optionalSuggestionsLabel="Fylke"
                        value={this.props.typeaheadValue}
                        minLength={1}
                        placeholder="F.eks: Drammen"
                    />
                    <Knapp
                        aria-label="søk"
                        className="FilterLocation__SearchButton"
                        onClick={this.onSubmit}
                    >
                        <i className="FilterLocation__SearchButton__icon" />
                    </Knapp>
                </div>
                {locationArray.length > 0 && (
                    <div className="FilterLocation__tags">
                        {locationArray.map((location) => {
                            if (location) {
                                return (
                                    <Tag
                                        key={location}
                                        value={location}
                                        label={capitalizeLocation(location)}
                                        canRemove
                                        onRemove={this.onRemoveLocation}
                                    />
                                );
                            }
                            return null;
                        })}
                    </div>
                )}
            </Filterpanel>
        );
    }
}

FilterLocation.defaultProps = {
    locationName: undefined,
};

FilterLocation.propTypes = {
    typeaheadValue: PropTypes.string.isRequired,
    locationName: PropTypes.string,
    municipals: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string,
        })
    ).isRequired,
    counties: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string,
        })
    ).isRequired,
    fetchLocations: PropTypes.func.isRequired,
    setTypeAheadValue: PropTypes.func.isRequired,
    changeLocationFilter: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    municipals: state.filterLocation.municipals,
    counties: state.filterLocation.counties,
    typeaheadValue: state.filterLocation.typeaheadValue,
    locationName: state.search.locationName,
});

const mapDispatchToProps = (dispatch) => ({
    fetchLocations: () => dispatch({ type: FETCH_FILTER_LOCATIONS_BEGIN }),
    setTypeAheadValue: (value) => dispatch({ type: SET_FILTER_LOCATION_TYPE_AHEAD, value }),
    changeLocationFilter: (location) => dispatch({ type: CHANGE_LOCATION_FILTER, location }),
});

export default connect(mapStateToProps, mapDispatchToProps)(FilterLocation);
