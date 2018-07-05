import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Typeahead from '../../common/typeahead/Typeahead';
import Tag from '../../common/tag/Tag';
import { ADD_LOCATION, FETCH_LOCATION_SUGGESTIONS, REMOVE_LOCATION, SET_LOCATION_VALUE } from './locationReducer';
import './Location.less';

class Location extends React.Component {
    onTypeAheadValueChange = (value) => {
        this.props.setValue(value);
        this.props.fetchLocationSuggestions(value);
    };

    onTypeAheadSuggestionSelected = (location) => {
        this.props.setValue('');
        this.props.addLocation(location);
    };

    onLocationRemove = (value) => {
        this.props.removeLocation(value);
    };

    render() {
        return (
            <div className="Location">
                <Typeahead
                    id="Location__typeahead"
                    label="Geografi"
                    placeholder="Kommunenavn / nummer"
                    onSelect={this.onTypeAheadSuggestionSelected}
                    onChange={this.onTypeAheadValueChange}
                    suggestions={this.props.suggestions.map((s) => ({
                        value: s.kode,
                        label: `${s.navn} (${s.kode})`
                    }))}
                    value={this.props.value ? this.props.value : ''}
                />
                {this.props.locations.length > 0 && (
                    <div className="Location__tags">
                        {this.props.locations.map((location) => (
                            <Tag
                                key={location.value}
                                value={location.value}
                                label={`${location.label}`}
                                onRemove={this.onLocationRemove}
                            />
                        ))}
                    </div>
                )}
            </div>
        );
    }
}

Location.propTypes = {
    value: PropTypes.string.isRequired,
    locations: PropTypes.arrayOf(PropTypes.shape({
        value: PropTypes.string,
        label: PropTypes.string
    })).isRequired,
    suggestions: PropTypes.arrayOf(PropTypes.shape({
        kode: PropTypes.string,
        navn: PropTypes.string
    })).isRequired,
    setValue: PropTypes.func.isRequired,
    fetchLocationSuggestions: PropTypes.func.isRequired,
    addLocation: PropTypes.func.isRequired,
    removeLocation: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    value: state.location.value,
    suggestions: state.location.suggestions,
    locations: state.location.locations
});

const mapDispatchToProps = (dispatch) => ({
    setValue: (value) => dispatch({ type: SET_LOCATION_VALUE, value }),
    addLocation: (value) => dispatch({ type: ADD_LOCATION, value }),
    removeLocation: (value) => dispatch({ type: REMOVE_LOCATION, value }),
    fetchLocationSuggestions: (value) => dispatch({ type: FETCH_LOCATION_SUGGESTIONS, value })
});

export default connect(mapStateToProps, mapDispatchToProps)(Location);
