import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import { HIDE_AD_PUBLISHED_MODAL } from '../../adReducer';
import { formatISOString } from '../../../utils/datoUtils.ts';
import { Search, FileContent } from '@navikt/ds-icons';
import AdStatusEnum from '../../../common/enums/AdStatusEnum';
import ModalMedStillingScope from '../../../common/ModalMedStillingScope';
import './AdPublishedModal.less';

class AdPublishedModal extends React.Component {
    onClose = () => {
        this.props.closeModal();
    };

    render() {
        const {
            showAdPublishedModal,
            uuid,
            adStatus,
            activationOnPublishingDate,
            published,
            isSavingAd,
        } = this.props;

        return isSavingAd ? null : (
            <ModalMedStillingScope
                isOpen={showAdPublishedModal}
                contentLabel="Fortsett"
                onRequestClose={this.onClose}
                closeButton
                className="AdPublishedModal"
            >
                {adStatus === AdStatusEnum.INACTIVE && activationOnPublishingDate && published ? (
                    <Undertittel className="blokk-s">
                        Stillingen blir publisert {formatISOString(published)}
                    </Undertittel>
                ) : (
                    <Undertittel className="blokk-s">Stillingen er publisert</Undertittel>
                )}
                <div>
                    <Normaltekst className="blokk-l">
                        Ønsker du å finne kandidater til stillingen du publiserte?
                    </Normaltekst>
                    <div className="AdPublishedModal__links typo-normal">
                        <Link
                            to={`/kandidater/stilling/${uuid}`}
                            className="navds-link"
                            onClick={this.onClose}
                        >
                            <Search />
                            Finn kandidater
                        </Link>
                        <Link
                            to="/stillinger/minestillinger"
                            className="navds-link"
                            onClick={this.onClose}
                        >
                            <FileContent />
                            Til mine stillinger
                        </Link>
                    </div>
                </div>
            </ModalMedStillingScope>
        );
    }
}

AdPublishedModal.defaultProps = {
    uuid: undefined,
    activationOnPublishingDate: undefined,
};

AdPublishedModal.propTypes = {
    showAdPublishedModal: PropTypes.bool.isRequired,
    isSavingAd: PropTypes.bool.isRequired,
    closeModal: PropTypes.func.isRequired,
    uuid: PropTypes.string,
    adStatus: PropTypes.string.isRequired,
    activationOnPublishingDate: PropTypes.bool,
    published: PropTypes.string,
};

const mapStateToProps = (state) => ({
    showAdPublishedModal: state.ad.showAdPublishedModal,
    uuid: state.adData.uuid,
    adStatus: state.adData.status,
    activationOnPublishingDate: state.adData.activationOnPublishingDate,
    published: state.adData.published,
    isSavingAd: state.ad.isSavingAd,
});

const mapDispatchToProps = (dispatch) => ({
    closeModal: () => dispatch({ type: HIDE_AD_PUBLISHED_MODAL }),
});

export default connect(mapStateToProps, mapDispatchToProps)(AdPublishedModal);
