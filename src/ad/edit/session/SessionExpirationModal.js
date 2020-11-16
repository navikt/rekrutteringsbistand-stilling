import React from 'react';
import KnappBase from 'nav-frontend-knapper';
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import './SessionExpirationModal.less';
import ModalMedStillingScope from '../../../ModalMedStillingScope';

export default function SessionExpirationModal(props) {
    const {
        title,
        bodyText,
        mainButtonText,
        mainOnClick,
        secondaryButtonText,
        secondaryOnClick,
        onClose,
        isOpen,
    } = props;

    return (
        <ModalMedStillingScope
            className="SessionExpirationModal"
            closeButton={onClose !== undefined}
            contentLabel={title}
            shouldCloseOnOverlayClick={onClose !== undefined}
            isOpen={isOpen}
            shouldFocusAfterRender
            onRequestClose={onClose}
        >
            <Systemtittel>{title}</Systemtittel>
            <div className="innhold">
                <Normaltekst>{bodyText}</Normaltekst>
            </div>
            <div className="knapperad">
                <KnappBase onClick={mainOnClick} type="hoved">
                    {mainButtonText}
                </KnappBase>
                {secondaryButtonText && (
                    <KnappBase onClick={secondaryOnClick} type="flat">
                        {secondaryButtonText}
                    </KnappBase>
                )}
            </div>
        </ModalMedStillingScope>
    );
}
