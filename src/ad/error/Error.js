import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import './Error.less';
import { Hovedknapp } from 'nav-frontend-knapper';
import ModalMedStillingScope from '../../common/ModalMedStillingScope';
import { FJERN_NETTVERKSERROR_FRA_STATE } from '../adReducer';

class Error extends React.Component {
    render() {
        const error = this.props.error;
        const showDefaultError =
            error &&
            error.statusCode !== 404 &&
            error.statusCode !== 412 &&
            error.statusCode !== 401;
        const muligÅLukkeModal = error && error.statusCode === 401;

        return error ? (
            <ModalMedStillingScope
                isOpen
                closeButton={muligÅLukkeModal}
                onRequestClose={() => this.props.closeModal()}
                contentLabel="Feilmelding"
                appElement={document.getElementById('app')}
            >
                <div className="Error">
                    {error.statusCode === 404 && <Normaltekst>Fant ikke annonsen</Normaltekst>}
                    {error.statusCode === 412 && (
                        <div>
                            <Normaltekst>Annonsen har blitt redigert av noen andre</Normaltekst>
                            <LastInnPåNytt />
                        </div>
                    )}
                    {error.statusCode === 401 && (
                        <div className="Error__utlogget">
                            <Undertittel className="blokk-s">Du er ikke logget inn</Undertittel>
                            <Normaltekst className="blokk-s">
                                Stillingen ble ikke lagret.
                                <br />
                                Dersom det er arbeid du ikke ønsker å miste kan du:
                            </Normaltekst>
                            <Normaltekst tag="ul" className="blokk-l">
                                <li>
                                    Åpne Rekrutteringsbistand i ny fane for å bli logget inn på nytt
                                </li>
                                <li>Komme tilbake til denne fanen</li>
                                <li>Lukke dette modalvinduet</li>
                            </Normaltekst>
                        </div>
                    )}
                    {showDefaultError && (
                        <Normaltekst>
                            Det oppsto en feil, forsøk å laste siden på nytt
                            <br />
                            {error.statusCode}: {error.message}
                        </Normaltekst>
                    )}
                </div>
            </ModalMedStillingScope>
        ) : null;
    }
}

const LastInnPåNytt = () => (
    <Hovedknapp className="Error__button" onClick={() => window.location.reload()}>
        Last siden på nytt
    </Hovedknapp>
);

Error.defaultProps = {
    error: undefined,
    closeModal: () => {},
};

Error.propTypes = {
    error: PropTypes.shape({
        statusCode: PropTypes.number,
        message: PropTypes.string,
    }),
    closeModal: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    error: state.ad.error,
});

const mapDispatchToProps = (dispatch) => ({
    closeModal: () => {
        dispatch({ type: FJERN_NETTVERKSERROR_FRA_STATE });
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(Error);
