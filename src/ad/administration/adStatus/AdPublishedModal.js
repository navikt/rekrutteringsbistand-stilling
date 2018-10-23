import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import NavFrontendModal from 'nav-frontend-modal';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import { HIDE_AD_PUBLISHED_MODAL } from '../../adReducer';
import './AdPublishedModal.less';

class AdPublishedModal extends React.Component {
    onClose = () => {
        this.props.closeModal();
    };

    render() {
        const { showAdPublishedModal } = this.props;
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
                    <a href="/kandidatsok" className="lenke">Finn kandidater</a>
                </div>
            </NavFrontendModal>
        );
    }
}

AdPublishedModal.propTypes = {
    showAdPublishedModal: PropTypes.bool.isRequired,
    closeModal: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    showAdPublishedModal: state.ad.showAdPublishedModal
});

const mapDispatchToProps = (dispatch) => ({
    closeModal: () => dispatch({ type: HIDE_AD_PUBLISHED_MODAL })
});

export default connect(mapStateToProps, mapDispatchToProps)(AdPublishedModal);
