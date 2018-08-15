import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Modal from 'nav-frontend-modal';
import { Normaltekst } from 'nav-frontend-typografi';
import './Error.less';

function Error({ error }) {
    if (error) {
        return (
            <div>
                <Modal
                    isOpen
                    closeButton={false}
                    onRequestClose={() => {
                    }}
                    contentLabel="Heisann."
                    appElement={document.getElementById('app')}
                >
                    <div className="Error">
                        {error.statusCode === 404 ? (
                            <Normaltekst>Fant ikke annonsen</Normaltekst>
                        ) : (
                            <Normaltekst>
                                Det oppsto en feil, forsøk å laste siden på nytt
                                <br />{error.statusCode}: {error.message}
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
    error: undefined
};

Error.propTypes = {
    error: PropTypes.shape({
        statusCode: PropTypes.number,
        message: PropTypes.string
    })
};

const mapStateToProps = (state) => ({
    error: state.ad.error
});

export default connect(mapStateToProps)(Error);
