import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Input } from 'nav-frontend-skjema';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import { SET_CONTACT_PERSON } from '../../adDataReducer';
import {
    VALIDATE_CONTACTPERSON_EMAIL,
    VALIDATE_CONTACTPERSON_PHONE,
} from '../../adValidationReducer';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import Skjemalabel from '../skjemaetikett/Skjemalabel';

class ContactPerson extends React.Component {
    onNameChange = (e) => {
        const { setContactPerson } = this.props;
        setContactPerson({
            name: e.target.value,
        });
    };

    onTitleChange = (e) => {
        const { setContactPerson } = this.props;
        setContactPerson({
            title: e.target.value,
        });
    };

    onPhoneChange = (e) => {
        const { setContactPerson } = this.props;
        setContactPerson({
            phone: e.target.value,
        });
    };

    onEmailChange = (e) => {
        const { setContactPerson } = this.props;
        setContactPerson({
            email: e.target.value,
        });
    };

    onEmailBlur = () => {
        this.props.validateEmail();
    };

    onPhoneBlur = () => {
        this.props.validatePhone();
    };

    render() {
        const { contactList } = this.props;
        return (
            <Ekspanderbartpanel
                className="Edit__panel"
                tittel={<Undertittel>Kontaktinformasjon</Undertittel>}
                border
                apen
            >
                <Normaltekst className="Edit__panel__undertittel">
                    Din egen eller arbeidsgivers kontaktinformasjon
                </Normaltekst>
                <Input
                    className="blokk-xs"
                    label="Navn på kontaktperson"
                    value={contactList[0] && contactList[0].name ? contactList[0].name : ''}
                    onChange={this.onNameChange}
                />
                <Skjemalabel
                    inputId="endre-stilling-tittel-kontaktperson"
                    beskrivelse="For eksempel: leder"
                >
                    Tittel på kontaktperson
                </Skjemalabel>
                <Input
                    className="blokk-xs"
                    id="endre-stilling-tittel-kontaktperson"
                    aria-describedby="endre-stilling-tittel-kontaktperson-beskrivelse"
                    value={contactList[0] && contactList[0].title ? contactList[0].title : ''}
                    onChange={this.onTitleChange}
                />
                <Input
                    className="blokk-xs"
                    type="email"
                    label="E-postadresse"
                    value={contactList[0] && contactList[0].email ? contactList[0].email : ''}
                    onChange={this.onEmailChange}
                    onBlur={this.onEmailBlur}
                    feil={
                        this.props.validation.contactpersonEmail && {
                            feilmelding: this.props.validation.contactpersonEmail,
                        }
                    }
                />
                <Input
                    className="blokk-xs"
                    type="tel"
                    label="Telefonnummer"
                    value={contactList[0] && contactList[0].phone ? contactList[0].phone : ''}
                    onBlur={this.onPhoneBlur}
                    feil={
                        this.props.validation.contactpersonPhone && {
                            feilmelding: this.props.validation.contactpersonPhone,
                        }
                    }
                    onChange={this.onPhoneChange}
                />
            </Ekspanderbartpanel>
        );
    }
}

ContactPerson.defaultProps = {
    contactList: [],
};

ContactPerson.propTypes = {
    contactList: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string,
            title: PropTypes.string,
            phone: PropTypes.string,
            email: PropTypes.string,
        })
    ),
    setContactPerson: PropTypes.func.isRequired,
    validateEmail: PropTypes.func.isRequired,
    validatePhone: PropTypes.func.isRequired,
    validation: PropTypes.shape({
        contactpersonEmail: PropTypes.string,
        contactpersonPhone: PropTypes.string,
    }).isRequired,
};
const mapStateToProps = (state) => ({
    contactList: state.adData.contactList,
    validation: state.adValidation.errors,
});

const mapDispatchToProps = (dispatch) => ({
    setContactPerson: (contactPerson) => dispatch({ type: SET_CONTACT_PERSON, contactPerson }),
    validateEmail: () => dispatch({ type: VALIDATE_CONTACTPERSON_EMAIL }),
    validatePhone: () => dispatch({ type: VALIDATE_CONTACTPERSON_PHONE }),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactPerson);
