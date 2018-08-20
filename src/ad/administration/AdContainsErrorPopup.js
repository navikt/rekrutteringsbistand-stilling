import React from 'react';
import PropTypes from 'prop-types';
import NavFrontendModal from 'nav-frontend-modal';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import { Hovedknapp } from 'nav-frontend-knapper';
import './ConfirmationPopup.less';

const AdContainsErrorPopup = ({ isOpen, onClose }) => (
    <NavFrontendModal
        isOpen={isOpen}
        contentLabel="Fortsett"
        onRequestClose={onClose}
        className="blokk-m"
        closeButton
        appElement={document.getElementById('app')}
    >
        <Undertittel className="ConfirmationPopup__title">
            Kan ikke publisere annonsen
        </Undertittel>
        <Normaltekst className="ConfirmationPopup__message">
            Annonser uten arbeidsgivertilknytning kan ikke publiseres
        </Normaltekst>
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
    isOpen: PropTypes.bool.isRequired
};

export default AdContainsErrorPopup;
