import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Input } from 'nav-frontend-skjema';
import Typeahead from '../../../common/typeahead/Typeahead';
import { FETCH_POSTAL_CODES_SUGGESTIONS, SET_POSTAL_CODE_VALUE } from './postalCodeReducer';
import { registerShortcuts } from '../../../common/shortcuts/Shortcuts';
import { SET_LOCATION_POSTAL_CODE } from '../../adReducer';
import './PostalCode.less';

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
        this.props.setLocationPostalCode(value);
    };

    onTypeAheadSuggestionSelected = (location) => {
        if (location) {
            this.props.setValue(location.value);
            this.props.setLocationPostalCode(location.value);
        }
    };

    render() {
        return (
            <div className="PostalCode">
                <div className="PostalCode__flex">
                    <Typeahead
                        id="PostalCode__input"
                        className="PostalCode__code"
                        label="Postnummer"
                        onSelect={this.onTypeAheadSuggestionSelected}
                        onChange={this.onTypeAheadValueChange}
                        suggestions={this.props.suggestions.map((location) => ({
                            value: location.postalCode,
                            label: `${location.postalCode} ${location.city}`
                        }))}
                        value={this.props.location && this.props.location.postalCode ?
                            this.props.location.postalCode : ''}
                        ref={(instance) => {
                            this.inputRef = instance;
                        }}
                        error={this.props.validation.location !== undefined}
                    />
                    <Input
                        disabled
                        label="Poststed"
                        className="PostalCode__city"
                        value={this.props.location && this.props.location.city ? this.props.location.city : ''}
                    />
                </div>
                {this.props.validation.location && (
                    <div className="PostalCode__error">{this.props.validation.location}</div>
                )}
            </div>
        );
    }
}

PostalCode.defaultProps = {
    isValid: undefined
};

PostalCode.propTypes = {
    suggestions: PropTypes.arrayOf(PropTypes.shape({
        kode: PropTypes.string,
        navn: PropTypes.string
    })).isRequired,
    setValue: PropTypes.func.isRequired,
    fetchLocationSuggestions: PropTypes.func.isRequired,
    setLocationPostalCode: PropTypes.func.isRequired,
    isValid: PropTypes.bool
};

const mapStateToProps = (state) => ({
    isValid: state.postalCode.isValid,
    suggestions: state.postalCode.suggestions,
    location: state.ad.data.location,
    validation: state.ad.validation
});

const mapDispatchToProps = (dispatch) => ({
    setValue: (value) => dispatch({ type: SET_POSTAL_CODE_VALUE, value }),
    setLocationPostalCode: (postalCode) => dispatch({ type: SET_LOCATION_POSTAL_CODE, postalCode }),
    fetchLocationSuggestions: (value) => dispatch({ type: FETCH_POSTAL_CODES_SUGGESTIONS, value })
});

export default connect(mapStateToProps, mapDispatchToProps)(PostalCode);
