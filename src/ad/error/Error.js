import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Modal from 'nav-frontend-modal';
import { Normaltekst } from 'nav-frontend-typografi';
import './Error.less';
import { Hovedknapp } from 'nav-frontend-knapper';

function Error({ error }) {
    if (error) {
        const showDefaultError = error.statusCode !== 404 && error.statusCode !== 412;
        return (
            <div>
                <Modal
                    isOpen
                    closeButton={false}
                    onRequestClose={() => {}}
                    contentLabel="Feilmelding"
                    appElement={document.getElementById('app')}
                >
                    <div className="Error">
                        {error.statusCode === 404 && <Normaltekst>Fant ikke annonsen</Normaltekst>}
                        {error.statusCode === 412 && (
                            <div>
                                <Normaltekst>Annonsen har blitt redigert av noen andre</Normaltekst>
                                <Hovedknapp
                                    className="Error__button"
                                    onClick={() => window.location.reload()}
                                >
                                    Last siden på nytt
                                </Hovedknapp>
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
            </div>
        );
    }
    return null;
}

Error.defaultProps = {
    error: undefined,
};

Error.propTypes = {
    error: PropTypes.shape({
        statusCode: PropTypes.number,
        message: PropTypes.string,
    }),
};

const mapStateToProps = (state) => ({
    error: state.ad.error,
});

export default connect(mapStateToProps)(Error);
