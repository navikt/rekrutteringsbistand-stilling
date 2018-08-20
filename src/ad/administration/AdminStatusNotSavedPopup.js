import React from 'react';
import PropTypes from 'prop-types';
import NavFrontendModal from 'nav-frontend-modal';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import { Hovedknapp, Knapp } from 'nav-frontend-knapper';
import './ConfirmationPopup.less';

const AdminStatusNotSavedPopup = ({ isOpen, onClose, onNextAndFinishClick, onNextWithoutFinishClick }) => (
    <NavFrontendModal
        isOpen={isOpen}
        contentLabel="Fortsett"
        onRequestClose={onClose}
        className="blokk-m"
        closeButton
        appElement={document.getElementById('app')}
    >
        <Undertittel className="ConfirmationPopup__title">
            Saksbehandling er ikke avsluttet
        </Undertittel>
        <Normaltekst className="ConfirmationPopup__message">
            Er du sikker på at du vil fortsette uten å avslutte?
        </Normaltekst>
        <Hovedknapp
            onClick={onNextAndFinishClick}
            className="ConfirmationPopup__button"
        >
            Avslutt og gå til neste
        </Hovedknapp>
        <Knapp
            onClick={onNextWithoutFinishClick}
            className="ConfirmationPopup__button"
        >
            Fortsett uten å avslutte
        </Knapp>
    </NavFrontendModal>
);

AdminStatusNotSavedPopup.propTypes = {
    onNextAndFinishClick: PropTypes.func.isRequired,
    onNextWithoutFinishClick: PropTypes.func.isRequired
};

export default AdminStatusNotSavedPopup;
