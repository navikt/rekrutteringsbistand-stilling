import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Normaltekst } from 'nav-frontend-typografi';
import { Hovedknapp } from 'nav-frontend-knapper';
import Modal from '../../common/modal/Modal';
import { FJERN_NETTVERKSERROR_FRA_STATE } from '../adReducer';
import './Error.less';

class Error extends React.Component {
    render() {
        const error = this.props.error;
        const showError = error && error.statusCode !== 401;
        const showDefaultError = error && error.statusCode !== 404 && error.statusCode !== 412;

        return error && showError ? (
            <Modal
                open
                closeButton={false}
                onClose={() => this.props.closeModal()}
                aria-label="Feilmelding"
            >
                <div className="Error">
                    {error.statusCode === 404 && <Normaltekst>Fant ikke annonsen</Normaltekst>}
                    {error.statusCode === 412 && (
                        <div>
                            <Normaltekst>Annonsen har blitt redigert av noen andre</Normaltekst>
                            <LastInnPåNytt />
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
            </Modal>
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
