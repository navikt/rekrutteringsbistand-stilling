import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Input } from 'nav-frontend-skjema';


class ContactPerson extends React.Component {

    render() {
        return (
            <div>
                <Input
                    label="Navn på kontaktperson"
                    value={''}
                    onChange={this.endreKontaktPerson}
                />
                <Input
                    label="Tittel på kontaktperson"
                    placeholder="For eksempel: leder"
                    value={''}
                    onChange={this.endreKontaktPersonTittel}
                />
                <Input
                    type="email"
                    label="E-post"
                    value={''}
                    onChange={this.endreKontaktPersonEpost}

                />
                <Input
                    type="tel"
                    label="Telefonnummer"
                    value={''}
                    onChange={this.endreKontaktPersonTelefon}

                />
            </div>
        );
    }
}

ContactPerson.defaultProps = {
    contactList: undefined
};

ContactPerson.propTypes = {
    contactList: PropTypes.arrayOf(PropTypes.shape({
        person: PropTypes.string,
        title: PropTypes.string,
        phone: PropTypes.string,
        email: PropTypes.string
    }))
};
const mapStateToProps = (state) => ({
    contactList: state.adData.contactList
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactPerson);
