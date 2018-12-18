import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Knapp } from 'nav-frontend-knapper';
import Typeahead from '../../../common/typeahead/Typeahead';
import { FETCH_FILTER_LOCATIONS_BEGIN, SET_FILTER_LOCATION_TYPE_AHEAD } from './filterLocationReducer';
import capitalizeLocation from '../../../ad/edit/location/capitalizeLocation';
import { CHANGE_LOCATION_FILTER } from '../../searchReducer';
import './FilterLocation.less';

class FilterLocation extends React.Component {
    componentDidMount() {
        this.props.fetchLocations();
        const { locationFilter } = this.props;
        if (locationFilter) {
            this.props.setTypeAheadValue(locationFilter);
        }
    }

    onLocationSelect = (value) => {
        const county = this.props.counties.find((c) => c.name.toLowerCase() === value.label.toLowerCase());
        const municipal = this.props.municipals.find((m) => m.name.toLowerCase() === value.label.toLowerCase());
        if (county) {
            this.props.setTypeAheadValue(capitalizeLocation(county.name));
            this.props.changeLocationFilter(county.name);
        } else if (municipal) {
            this.props.setTypeAheadValue(capitalizeLocation(municipal.name));
            this.props.changeLocationFilter(municipal.name);
        } else {
            this.props.changeLocationFilter(undefined);
        }
    };

    onLocationChange = (value) => {
        if (value !== undefined) {
            this.props.setTypeAheadValue(value);
        }
    };

    onSubmit = (e) => {
        e.preventDefault();
        this.props.changeLocationFilter(this.props.locationFilter);
    };

    render() {
        return (
            <div className="FilterLocation">
                <Typeahead
                    id="typeahead-location"
                    className="FilterLocation__typeahead"
                    onChange={this.onLocationChange}
                    onSelect={this.onLocationSelect}
                    label="Kommune eller fylke"
                    suggestions={this.props.municipals.map((m) => ({
                        value: m.code,
                        label: capitalizeLocation(m.name)
                    }))}
                    optionalSuggestions={this.props.counties.map((c) => ({
                        value: c.code,
                        label: capitalizeLocation(c.name)
                    }))}
                    optionalSuggestionsLabel="Fylke"
                    value={this.props.locationFilter}
                    minLength={1}
                    inputRef={(input) => {
                        this.refInputError = input;
                    }}
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
        );
    }
}


FilterLocation.propTypes = {
    locationFilter: PropTypes.string.isRequired,
    municipals: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string
    })).isRequired,
    counties: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string
    })).isRequired,
    fetchLocations: PropTypes.func.isRequired,
    setTypeAheadValue: PropTypes.func.isRequired,
    changeLocationFilter: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    municipals: state.filterLocation.municipals,
    counties: state.filterLocation.counties,
    locationFilter: state.filterLocation.location
});

const mapDispatchToProps = (dispatch) => ({
    fetchLocations: () => dispatch({ type: FETCH_FILTER_LOCATIONS_BEGIN }),
    setTypeAheadValue: (value) => dispatch({ type: SET_FILTER_LOCATION_TYPE_AHEAD, value }),
    changeLocationFilter: (location) => dispatch({ type: CHANGE_LOCATION_FILTER, location })
});

export default connect(mapStateToProps, mapDispatchToProps)(FilterLocation);
