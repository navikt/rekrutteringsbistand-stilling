import React from 'react';
import PropTypes from 'prop-types';
import NavFrontendModal from 'nav-frontend-modal';
import { Hovedknapp } from 'nav-frontend-knapper';
import '../ConfirmationPopup.less';
import PublishError from './PublishError';
import RejectError from './RejectError';
import AdStatusEnum from '../adStatus/AdStatusEnum';


export const adContainsError = (adStatus, validation) => {
    if (adStatus === AdStatusEnum.ACTIVE) {
        return validation.styrk !== undefined ||
            validation.location !== undefined ||
            validation.employer !== undefined;
    }
    if (adStatus === AdStatusEnum.REJECTED) {
        return validation.remark !== undefined || validation.comment !== undefined;
    }
    return false;
};

const AdContainsErrorPopup = ({ isOpen, onClose, validation, adStatus }) => (
    <NavFrontendModal
        isOpen={isOpen}
        contentLabel="Fortsett"
        onRequestClose={onClose}
        className="blokk-m"
        closeButton
        appElement={document.getElementById('app')}
    >
        {adStatus === AdStatusEnum.ACTIVE && (
            <PublishError validation={validation} />
        )}
        {adStatus === AdStatusEnum.REJECTED && (
            <RejectError validation={validation} />
        )}
        <Hovedknapp
            onClick={onClose}
            className="ConfirmationPopup__button"
        >
            Lukk
        </Hovedknapp>
    </NavFrontendModal>
);

AdContainsErrorPopup.propTypes = {
    onClose: PropTypes.func.isRequired,
    isOpen: PropTypes.bool.isRequired,
    validation: PropTypes.shape({
        styrk: PropTypes.string,
        location: PropTypes.string,
        employer: PropTypes.string
    }).isRequired,
    adStatus: PropTypes.string.isRequired
};

export default AdContainsErrorPopup;
