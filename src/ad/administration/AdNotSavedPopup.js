import React from 'react';
import PropTypes from 'prop-types';
import NavFrontendModal from 'nav-frontend-modal';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import { Hovedknapp, Knapp } from 'nav-frontend-knapper';
import './ConfirmationPopup.less';

const AdNotSavedPopup = ({ isOpen, onClose, onSave, onDiscard }) => (
    <NavFrontendModal
        isOpen={isOpen}
        contentLabel="Fortsett"
        onRequestClose={onClose}
        className="blokk-m"
        closeButton
        appElement={document.getElementById('app')}
    >
        <Undertittel className="ConfirmationPopup__title">
            Annonsen er ikke lagret
        </Undertittel>
        <Normaltekst className="ConfirmationPopup__message">
            Er du sikker på at du vil fortsette uten å lagre?
        </Normaltekst>
        <Hovedknapp
            onClick={onSave}
            className="ConfirmationPopup__button"
        >
            Lagre
        </Hovedknapp>
        <Knapp
            onClick={onDiscard}
            className="ConfirmationPopup__button"
        >
            Ikke lagre
        </Knapp>
    </NavFrontendModal>
);

AdNotSavedPopup.propTypes = {
    onClose: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    onDiscard: PropTypes.func.isRequired,
    isOpen: PropTypes.bool.isRequired
};

export default AdNotSavedPopup;
