import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Input, Checkbox } from 'nav-frontend-skjema';
import EkspanderbartpanelBase from 'nav-frontend-ekspanderbartpanel';
import {
    SET_APPLICATIONURL,
    SET_APPLICATIONEMAIL
} from '../../adDataReducer';
import { VALIDATE_APPLICATION_EMAIL } from '../../adValidationReducer';
import { adjustUrl } from '../../../common/utils';


class Application extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            emailChecked: false,
            linkChecked: false
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
            emailChecked: e.target.checked
        });
    };

    onLinkChecked = (e) => {
        if (!e.target.checked) {
            this.props.setApplicationUrl('');
        }
        this.setState({
            linkChecked: e.target.checked
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
            <EkspanderbartpanelBase
                className="Edit__panel"
                heading={<p>Hvordan sende søknad</p>}
                ariaTittel="undertittel"
                border
                apen
            >
                <Checkbox
                    checked={showEmail}
                    onChange={this.onEmailChecked}
                    label="Via e-post"
                />
                {showEmail && (
                    <Input
                        type="email"
                        label="E-postadresse"
                        value={applicationEmail || ''}
                        onChange={this.onApplicationEmailChange}
                        onBlur={this.validateEmail}
                        feil={this.props.validation.applicationEmail
                            && { feilmelding: this.props.validation.applicationEmail }}
                        placeholder="For eksempel: ola.normann@firma.no"
                    />
                )}
                <Checkbox
                    checked={showLink}
                    onChange={this.onLinkChecked}
                    label="Via søknadsskjema"
                />
                {showLink && (
                    <Input
                        label="Lenke"
                        value={applicationUrl || ''}
                        onChange={this.onApplicationUrlChange}
                        onBlur={this.completeLink}
                        placeholder="For eksempel: www.rekruttering.no"
                    />
                )}
            </EkspanderbartpanelBase>
        );
    }
}

Application.defaultProps = {
    applicationEmail: undefined,
    applicationUrl: undefined
};

Application.propTypes = {
    applicationEmail: PropTypes.string,
    applicationUrl: PropTypes.string,
    setApplicationEmail: PropTypes.func.isRequired,
    setApplicationUrl: PropTypes.func.isRequired,
    validateEmail: PropTypes.func.isRequired,
    validation: PropTypes.shape({
        applicationEmail: PropTypes.string
    }).isRequired
};
const mapStateToProps = (state) => ({
    applicationEmail: state.adData.properties.applicationemail,
    applicationUrl: state.adData.properties.applicationurl,
    validation: state.adValidation.errors
});

const mapDispatchToProps = (dispatch) => ({
    setApplicationEmail: (applicationemail) => dispatch({ type: SET_APPLICATIONEMAIL, applicationemail }),
    setApplicationUrl: (applicationurl) => dispatch({ type: SET_APPLICATIONURL, applicationurl }),
    validateEmail: () => dispatch({ type: VALIDATE_APPLICATION_EMAIL })
});

export default connect(mapStateToProps, mapDispatchToProps)(Application);
