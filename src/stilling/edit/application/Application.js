import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Input, Checkbox, CheckboxGruppe } from 'nav-frontend-skjema';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import { SET_APPLICATIONURL, SET_APPLICATIONEMAIL } from '../../adDataReducer';
import { VALIDATE_APPLICATION_EMAIL } from '../../adValidationReducer';
import { adjustUrl } from '../../../common/urlUtils';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import Skjemalabel from '../skjemaetikett/Skjemalabel';

class Application extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            emailChecked: false,
            linkChecked: false,
        };
    }

    onApplicationEmailChange = (e) => {
        this.props.setApplicationEmail(e.target.value);
    };

    onApplicationUrlChange = (e) => {
        this.props.setApplicationUrl(e.target.value);
    };

    onEmailChecked = (e) => {
        if (!e.target.checked) {
            this.props.setApplicationEmail('');
        }
        this.setState({
            emailChecked: e.target.checked,
        });
    };

    onLinkChecked = (e) => {
        if (!e.target.checked) {
            this.props.setApplicationUrl('');
        }
        this.setState({
            linkChecked: e.target.checked,
        });
    };

    validateEmail = () => {
        this.props.validateEmail();
    };

    completeLink = () => {
        const { applicationUrl } = this.props;
        if (applicationUrl && applicationUrl !== '') {
            this.props.setApplicationUrl(adjustUrl(applicationUrl));
        }
    };

    render() {
        const { applicationEmail, applicationUrl } = this.props;
        const showEmail = applicationEmail || this.state.emailChecked;
        const showLink = applicationUrl || this.state.linkChecked;

        return (
            <Ekspanderbartpanel
                className="Edit__panel"
                tittel={
                    <>
                        <Undertittel className="blokk-xxxs">Hvordan sende søknad?</Undertittel>
                        <Normaltekst>Gjelder kun eksternt utlyste stillinger</Normaltekst>
                    </>
                }
                border
                apen
            >
                <CheckboxGruppe>
                    <Checkbox checked={showEmail} onChange={this.onEmailChecked} label="E-post" />
                    {showEmail && (
                        <>
                            <Skjemalabel
                                inputId="endre-stilling-email"
                                beskrivelse="For eksempel: ola.normann@firma.no"
                            >
                                E-postadresse
                            </Skjemalabel>
                            <Input
                                id="endre-stilling-email"
                                aria-describedby="endre-stilling-email-beskrivelse"
                                type="email"
                                value={applicationEmail || ''}
                                onChange={this.onApplicationEmailChange}
                                onBlur={this.validateEmail}
                                feil={this.props.validation.applicationEmail}
                            />
                        </>
                    )}
                    <Checkbox
                        checked={showLink}
                        onChange={this.onLinkChecked}
                        label="Lenke til søknadsskjema"
                    />
                    {showLink && (
                        <>
                            <Skjemalabel
                                inputId="endre-stilling-lenke"
                                beskrivelse="For eksempel: www.rekruttering.no"
                            >
                                Lenke
                            </Skjemalabel>
                            <Input
                                aria-describedby="endre-stilling-lenke-beskrivelse"
                                value={applicationUrl || ''}
                                onChange={this.onApplicationUrlChange}
                                onBlur={this.completeLink}
                            />
                        </>
                    )}
                </CheckboxGruppe>
            </Ekspanderbartpanel>
        );
    }
}

Application.defaultProps = {
    applicationEmail: undefined,
    applicationUrl: undefined,
};

Application.propTypes = {
    applicationEmail: PropTypes.string,
    applicationUrl: PropTypes.string,
    setApplicationEmail: PropTypes.func.isRequired,
    setApplicationUrl: PropTypes.func.isRequired,
    validateEmail: PropTypes.func.isRequired,
    validation: PropTypes.shape({
        applicationEmail: PropTypes.string,
    }).isRequired,
};
const mapStateToProps = (state) => ({
    applicationEmail: state.adData?.properties.applicationemail,
    applicationUrl: state.adData?.properties.applicationurl,
    validation: state.adValidation.errors,
});

const mapDispatchToProps = (dispatch) => ({
    setApplicationEmail: (applicationemail) =>
        dispatch({ type: SET_APPLICATIONEMAIL, applicationemail }),
    setApplicationUrl: (applicationurl) => dispatch({ type: SET_APPLICATIONURL, applicationurl }),
    validateEmail: () => dispatch({ type: VALIDATE_APPLICATION_EMAIL }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Application);
