import React from 'react';
import PropTypes from 'prop-types';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';

export default function RejectError({ validation }) {
    return (
        <div>
            <Undertittel className="ConfirmationPopup__title">
                Kan ikke avvise annonsen
            </Undertittel>
            <Normaltekst className="ConfirmationPopup__message">
                Annonsen kan ikke avvises før følgende feil er rettet:
            </Normaltekst>
            <ul>
                {validation.remark && (
                    <li className="ConfirmationPopup__message skjemaelement__feilmelding">
                        {validation.remark}
                    </li>
                )}
                {validation.comment && (
                    <li className="ConfirmationPopup__message skjemaelement__feilmelding">
                        {validation.comment}
                    </li>
                )}
            </ul>
        </div>
    );
}

RejectError.propTypes = {
    validation: PropTypes.shape({
        remark: PropTypes.string,
        comment: PropTypes.string,
    }).isRequired
};
