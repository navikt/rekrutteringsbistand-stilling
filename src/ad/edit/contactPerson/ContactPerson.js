import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Input } from 'nav-frontend-skjema';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import { SET_CONTACT_PERSON } from '../../adDataReducer';
import { VALIDATE_CONTACTPERSON_EMAIL } from '../../adValidationReducer';


class ContactPerson extends React.Component {
    onNameChange = (e) => {
        const { setContactPerson } = this.props;
        setContactPerson({
            name: e.target.value
        });
    };

    onTitleChange = (e) => {
        const { setContactPerson } = this.props;
        setContactPerson({
            title: e.target.value
        });
    };

    onPhoneChange = (e) => {
        const { setContactPerson } = this.props;
        setContactPerson({
            phone: e.target.value
        });
    };

    onEmailChange = (e) => {
        const { setContactPerson } = this.props;
        setContactPerson({
            email: e.target.value
        });
    };

    onEmailBlur = () => {
        this.props.validateEmail();
    };

    render() {
        const { contactList } = this.props;
        return (
            <Ekspanderbartpanel
                className="Edit__panel"
                tittel="Kontaktinformasjon"
                tittelProps="undertittel"
                border
                apen
            >
                <Input
                    label="Navn på kontaktperson"
                    value={contactList[0] && contactList[0].name ? contactList[0].name : ''}
                    onChange={this.onNameChange}
                />
                <Input
                    label="Tittel på kontaktperson"
                    placeholder="For eksempel: leder"
                    value={contactList[0] && contactList[0].title ? contactList[0].title : ''}
                    onChange={this.onTitleChange}
                />
                <Input
                    type="email"
                    label="E-postadresse"
                    value={contactList[0] && contactList[0].email ? contactList[0].email : ''}
                    onChange={this.onEmailChange}
                    onBlur={this.onEmailBlur}
                    feil={this.props.validation.contactpersonEmail
                    && { feilmelding: this.props.validation.contactpersonEmail }}
                    placeholder="For eksempel: ola.normann@firma.no"
                />
                <Input
                    type="tel"
                    label="Telefonnummer"
                    value={contactList[0] && contactList[0].phone ? contactList[0].phone : ''}
                    onChange={this.onPhoneChange}

                />
            </Ekspanderbartpanel>
        );
    }
}

ContactPerson.defaultProps = {
    contactList: []
};

ContactPerson.propTypes = {
    contactList: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string,
        title: PropTypes.string,
        phone: PropTypes.string,
        email: PropTypes.string
    })),
    setContactPerson: PropTypes.func.isRequired,
    validateEmail: PropTypes.func.isRequired,
    validation: PropTypes.shape({
        contactpersonEmail: PropTypes.string
    }).isRequired
};
const mapStateToProps = (state) => ({
    contactList: state.adData.contactList,
    validation: state.adValidation.errors
});

const mapDispatchToProps = (dispatch) => ({
    setContactPerson: (contactPerson) => dispatch({ type: SET_CONTACT_PERSON, contactPerson }),
    validateEmail: () => dispatch({ type: VALIDATE_CONTACTPERSON_EMAIL })
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactPerson);
