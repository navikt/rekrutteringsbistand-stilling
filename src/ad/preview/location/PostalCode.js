import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Typeahead from '../../../common/typeahead/Typeahead';
import { FETCH_LOCATION_SUGGESTIONS, SET_LOCATION_VALUE } from './postalCodeReducer';
import AdminStatusEnum from '../../administration/AdminStatusEnum';
import { registerShortcuts } from '../../../common/shortcuts/Shortcuts';
import { SET_LOCATION_POSTAL_CODE } from "../../adReducer";

class PostalCode extends React.Component {
    componentDidMount() {
        registerShortcuts('annonseDetaljer', {
            'l g': (e) => {
                e.preventDefault();
                this.inputRef.setFocus();
            }
        });
        this.props.fetchLocationSuggestions();
    }

    onTypeAheadValueChange = (value) => {
        this.props.setValue(value);
    };

    onTypeAheadSuggestionSelected = (location) => {
        if (location) {
            this.props.setValue(location.label);
            this.props.setLocationPostalCode(location.value);
        }
    };

    render() {
        let value = "";
        if(this.props.value !== undefined) {
            value = this.props.value;
        } else if (this.props.location && this.props.location.postalCode && this.props.location.city) {
            value = `${this.props.location.postalCode} ${this.props.location.city}`
        }

        return (
            <div className="Location">
                <Typeahead
                    disabled={this.props.status !== AdminStatusEnum.PENDING || this.props.isSavingAd}
                    id="Location__typeahead"
                    label="Poststed"
                    onSelect={this.onTypeAheadSuggestionSelected}
                    onChange={this.onTypeAheadValueChange}
                    suggestions={this.props.suggestions.map((location) => ({
                        value: location.postalCode,
                        label: `${location.postalCode} ${location.city}`
                    }))}
                    value={value}
                    ref={(instance) => { this.inputRef = instance; }}
                />
            </div>
        );
    }
}

PostalCode.defaultProps = {
    value: undefined
};

PostalCode.propTypes = {
    value: PropTypes.string,
    suggestions: PropTypes.arrayOf(PropTypes.shape({
        kode: PropTypes.string,
        navn: PropTypes.string
    })).isRequired,
    status: PropTypes.string.isRequired,
    setValue: PropTypes.func.isRequired,
    fetchLocationSuggestions: PropTypes.func.isRequired,
    setLocationPostalCode: PropTypes.func.isRequired,
    isSavingAd: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => ({
    value: state.postalCode.value,
    suggestions: state.postalCode.suggestions,
    status: state.ad.data.administration.status,
    location: state.ad.data.location,
    isSavingAd: state.ad.isSavingAd
});

const mapDispatchToProps = (dispatch) => ({
    setValue: (value) => dispatch({ type: SET_LOCATION_VALUE, value }),
    setLocationPostalCode: (postalCode) => dispatch({ type: SET_LOCATION_POSTAL_CODE, postalCode }),
    fetchLocationSuggestions: (value) => dispatch({ type: FETCH_LOCATION_SUGGESTIONS, value })
});

export default connect(mapStateToProps, mapDispatchToProps)(PostalCode);
