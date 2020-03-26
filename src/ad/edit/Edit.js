import React from 'react';
import PropTypes from 'prop-types';
import { Input } from 'nav-frontend-skjema';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import { Column, Row } from 'nav-frontend-grid';
import { connect } from 'react-redux';
import { SAVE_AD } from '../adReducer';
import { RESET_VALIDATION_ERROR } from '../adValidationReducer';
import './Edit.less';
import PracticalInformation from './practicalInformation/PracticalInformation';
import Employer from './employer/Employer';
import JobDetails from './jobDetails/JobDetails';
import ContactPerson from './contactPerson/ContactPerson';
import Application from './application/Application';
import Location from './location/Location';
import { formatISOString } from '../../utils';
import { loginWithRedirectToCurrentLocation } from '../../login';
import TokenExpirationChecker, {
    TOKEN_EXPIRES_SOON,
    TOKEN_HAS_EXPIRED,
} from './session/TokenExpirationChecker';
import SessionExpirationModal from './session/SessionExpirationModal';

class Edit extends React.Component {
    constructor(props) {
        super(props);
        this.tokenExpirationChecker = new TokenExpirationChecker();
        this.tokenExpirationChecker.on(TOKEN_EXPIRES_SOON, this.showWillTimeoutModal);
        this.tokenExpirationChecker.on(TOKEN_HAS_EXPIRED, this.showDidTimeoutModal);
        this.state = {
            willTimeout: false,
            didTimeout: false,
        };
    }

    componentDidMount() {
        this.tokenExpirationChecker.start();
    }

    componentWillUnmount() {
        this.props.resetValidation();
        this.tokenExpirationChecker.destroy();
    }

    showWillTimeoutModal = () => {
        this.setState({ willTimeout: true });
    };

    showDidTimeoutModal = () => {
        this.setState({
            willTimeout: false,
            didTimeout: true,
        });
        this.tokenExpirationChecker.pause();
    };

    saveAndLogin = () => {
        this.props.saveAndLogin();
    };

    loginAndRedirect = () => {
        loginWithRedirectToCurrentLocation();
    };

    render() {
        const { ad, isNew } = this.props;
        const { didTimeout, willTimeout } = this.state;
        const eksternStillingslenke = `https://www.nav.no/arbeid/stilling/${ad.uuid}`;

        return (
            <div className="Edit">
                {willTimeout && (
                    <SessionExpirationModal
                        title={'Du blir snart logget ut'}
                        bodyText={'Lagre nå for å unngå å miste endringene dine.'}
                        mainButtonText={'Lagre'}
                        mainOnClick={this.saveAndLogin}
                        secondaryButtonText={'Avbryt'}
                        secondaryOnClick={this.loginAndRedirect}
                        isOpen={willTimeout}
                    />
                )}
                {didTimeout && (
                    <SessionExpirationModal
                        title={'Du har blitt logget ut'}
                        bodyText={'Denne sesjonen har utløpt.'}
                        mainButtonText={'Logg inn'}
                        mainOnClick={this.loginAndRedirect}
                        isOpen={didTimeout}
                    />
                )}
                <Row className="Edit__inner">
                    <Column xs="12" md="8">
                        <div className="Edit__left">
                            <Employer />
                            <JobDetails isNew={isNew} />
                        </div>
                    </Column>
                    <Column xs="12" md="4">
                        <PracticalInformation />
                        <ContactPerson />
                        <Application />
                        <Location />
                        <Ekspanderbartpanel
                            className="Edit__panel"
                            tittel="Om annonsen"
                            tittelProps="undertittel"
                            border
                            apen
                        >
                            <Input
                                label="Sist endret"
                                value={
                                    ad.updated !== ad.created
                                        ? formatISOString(ad.updated, 'DD.MM.YYYY')
                                        : ''
                                }
                                disabled
                            />
                            <Input label="Hentet fra/kilde" value={ad.medium || ''} disabled />
                            <Input label="Annonsenummer" value={ad.id || ''} disabled />
                            <div>
                                <Input
                                    label="Lenke til annonse"
                                    value={eksternStillingslenke}
                                    disabled
                                />
                                📋
                            </div>
                        </Ekspanderbartpanel>
                    </Column>
                </Row>
            </div>
        );
    }
}

Edit.defaultProps = {
    isNew: false,
};

Edit.propTypes = {
    ad: PropTypes.shape({
        title: PropTypes.string,
        updated: PropTypes.string,
        created: PropTypes.string,
        medium: PropTypes.string,
        uuid: PropTypes.string,
        id: PropTypes.number,
    }).isRequired,
    resetValidation: PropTypes.func.isRequired,
    isNew: PropTypes.bool,
    saveAndLogin: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    ad: state.adData,
});

const mapDispatchToProps = dispatch => ({
    saveAndLogin: () => dispatch({ type: SAVE_AD, login: true }),
    resetValidation: () => dispatch({ type: RESET_VALIDATION_ERROR }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Edit);
