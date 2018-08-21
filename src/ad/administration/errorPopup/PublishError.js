import React from 'react';
import PropTypes from 'prop-types';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';

export default function PublishError({ validation }) {
    return (
        <div>
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
        </div>
    );
}

PublishError.propTypes = {
    validation: PropTypes.shape({
        styrk: PropTypes.string,
        location: PropTypes.string,
        employer: PropTypes.string
    }).isRequired
};
