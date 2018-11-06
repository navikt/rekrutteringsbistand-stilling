import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import NavFrontendModal from 'nav-frontend-modal';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import { HIDE_AD_PUBLISHED_MODAL } from '../../adReducer';
import './AdPublishedModal.less';

class AdPublishedModal extends React.Component {
    onClose = () => {
        this.props.closeModal();
    };

    render() {
        const { showAdPublishedModal, uuid } = this.props;
        return (
            <NavFrontendModal
                isOpen={showAdPublishedModal}
                contentLabel="Fortsett"
                onRequestClose={this.onClose}
                closeButton
                appElement={document.getElementById('app')}
                className="AdPublishedModal"
            >
                <Undertittel className="blokk-s">
                    Stillingen er publisert
                </Undertittel>
                <div>
                    <Normaltekst className="blokk-l">
                        Ønsker du å finne kandidater til stillingen du publiserte?
                    </Normaltekst>
                    <div className="AdPublishedModal__links">
                        <Link
                            to={`/kandidater?id=${uuid}`}
                            className="lenke"
                            onClick={this.onClose}
                        >
                            Finn kandidater
                        </Link>
                        <Link
                            to="/mine"
                            className="lenke"
                            onClick={this.onClose}
                        >
                            Til mine stillinger
                        </Link>
                    </div>
                </div>
            </NavFrontendModal>
        );
    }
}

AdPublishedModal.propTypes = {
    showAdPublishedModal: PropTypes.bool.isRequired,
    closeModal: PropTypes.func.isRequired,
    uuid: PropTypes.string.isRequired
};

const mapStateToProps = (state) => ({
    showAdPublishedModal: state.ad.showAdPublishedModal,
    uuid: state.adData.uuid
});

const mapDispatchToProps = (dispatch) => ({
    closeModal: () => dispatch({ type: HIDE_AD_PUBLISHED_MODAL })
});

export default connect(mapStateToProps, mapDispatchToProps)(AdPublishedModal);
