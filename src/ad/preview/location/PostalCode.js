import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Input } from 'nav-frontend-skjema';
import Typeahead from '../../../common/typeahead/Typeahead';
import { FETCH_LOCATION_SUGGESTIONS, SET_LOCATION_VALUE } from './postalCodeReducer';
import AdminStatusEnum from '../../administration/AdminStatusEnum';
import { registerShortcuts } from '../../../common/shortcuts/Shortcuts';
import { SET_LOCATION_POSTAL_CODE } from "../../adReducer";
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
    };

    onTypeAheadBlur = (value) => {
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
                        disabled={this.props.status !== AdminStatusEnum.PENDING || this.props.isSavingAd}
                        id="PostalCode__input"
                        className="PostalCode__code"
                        label="Postnr."
                        onSelect={this.onTypeAheadSuggestionSelected}
                        onChange={this.onTypeAheadValueChange}
                        onBlur={this.onTypeAheadBlur}
                        suggestions={this.props.suggestions.map((location) => ({
                            value: location.postalCode,
                            label: `${location.postalCode} ${location.city}`
                        }))}
                        value={this.props.value}
                        ref={(instance) => {
                            this.inputRef = instance;
                        }}
                        error={!this.props.isValid}
                    />
                    <Input
                        disabled
                        label="Poststed"
                        className="PostalCode__city"
                        value={this.props.location && this.props.location.city ? this.props.location.city : ''}
                    />
                </div>
                {!this.props.isValid && (
                    <div className="PostalCode__error">Ugyldig postnummer</div>
                )}
            </div>
        );
    }
}

PostalCode.defaultProps = {
    value: undefined,
    isValid: undefined
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
    isValid: PropTypes.bool,
    isSavingAd: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => ({
    value: state.postalCode.value,
    isValid: state.postalCode.isValid,
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
