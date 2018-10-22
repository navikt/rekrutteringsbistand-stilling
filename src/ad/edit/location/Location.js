import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Input, Radio, SkjemaGruppe } from 'nav-frontend-skjema';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import { SET_LOCATION_ADDRESS, SET_LOCATION_POSTAL_CODE } from '../../adDataReducer';
import MunicipalOrCountry from './MunicipalOrCountry';

class Location extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            radioChecked: this.locationIsMunicipalOrCountry(props.location) ? 'municipalOrCountry' : 'address'
        };
    }

    onRadioButtonChange = (e) => {
        this.setState({
            radioChecked: e.target.value
        });
    };

    onAddressChange = (e) => {
        this.props.setAddress(e.target.value);
    };

    onPostalCodeChange = (e) => {
        this.props.setPostalCode(e.target.value);
    };

    locationIsMunicipalOrCountry = (location) => location
        && (location.country || location.municipal)
        && !location.postalCode;


    render() {
        const { location } = this.props;
        return (
            <Ekspanderbartpanel
                className="Edit__panel"
                tittel="Arbeidsstedets adresse*"
                tittelProps="undertittel"
                border
                apen
            >
                <SkjemaGruppe>
                    <Radio
                        label="Enten: Eksakt adresse"
                        name="address"
                        value="address"
                        checked={this.state.radioChecked === 'address'}
                        onChange={this.onRadioButtonChange}
                    />
                    <Radio
                        label="Eller: En kommune, Svalbard eller et land"
                        name="municipalOrCountry"
                        value="municipalOrCountry"
                        checked={this.state.radioChecked === 'municipalOrCountry'}
                        onChange={this.onRadioButtonChange}
                    />
                </SkjemaGruppe>
                {this.state.radioChecked === 'address' && (
                    <div className="Arbeidsstedsadresse">
                        <Input
                            id="arbeidssted-adresse"
                            label="Gateadresse"
                            value={location && location.address
                                ? location.address : ''}
                            onChange={this.onAddressChange}
                        />
                        <Input
                            id="arbeidssted-postnummer"
                            label="Postnummer*"
                            value={location && location.postalCode
                                ? location.postalCode : ''}
                            onChange={this.onPostalCodeChange}
                            feil={this.props.validation.postalCode || this.props.validation.location
                                ? { feilmelding: this.props.validation.postalCode || '' } : undefined}
                        />
                        <Input
                            id="arbeidssted-sted"
                            label="Sted*"
                            value={location && location.city
                                ? location.city : ''}
                            disabled
                        />
                    </div>
                )}
                {this.state.radioChecked === 'municipalOrCountry' && (
                    <div className="Arbeidsstedsadresse">
                        <MunicipalOrCountry />
                    </div>
                )}
                {this.props.validation.location && (
                    <div className="Administration__error">{this.props.validation.location}</div>
                )}
            </Ekspanderbartpanel>
        );
    }
}

Location.propTypes = {
    location: PropTypes.shape({
        address: PropTypes.string,
        postalCode: PropTypes.string
    }),
    setAddress: PropTypes.func.isRequired,
    setPostalCode: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    location: state.adData.location,
    validation: state.adValidation.errors
});

const mapDispatchToProps = (dispatch) => ({
    setAddress: (address) => dispatch({ type: SET_LOCATION_ADDRESS, address }),
    setPostalCode: (postalCode) => dispatch({ type: SET_LOCATION_POSTAL_CODE, postalCode })
});

export default connect(mapStateToProps, mapDispatchToProps)(Location);
