import React from 'react';
import PropTypes from 'prop-types';
import NavFrontendModal from 'nav-frontend-modal';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import { Hovedknapp } from 'nav-frontend-knapper';
import './ConfirmationPopup.less';

const AdContainsErrorPopup = ({ isOpen, onClose, validation }) => (
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
            Annonsen kan ikke publiseres før følgende feil er rettet:
        </Normaltekst>
        <ul>
            {validation.styrk && (
                <li className="ConfirmationPopup__message skjemaelement__feilmelding">
                    {validation.styrk}
                </li>
            )}
            {validation.location && (
                <li className="ConfirmationPopup__message skjemaelement__feilmelding">
                    {validation.location}
                </li>
            )}
            {validation.employer && (
                <li className="ConfirmationPopup__message skjemaelement__feilmelding">
                    {validation.employer}
                </li>
            )}
        </ul>
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
    }).isRequired
};

export default AdContainsErrorPopup;
