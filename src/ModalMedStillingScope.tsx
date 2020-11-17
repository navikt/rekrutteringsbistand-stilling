import React, { FunctionComponent } from 'react';
import NavFrontendModal, { ModalProps } from 'nav-frontend-modal';

const ModalMedStillingScope: FunctionComponent<ModalProps> = (props) => (
    <NavFrontendModal {...props} portalClassName="rek-stilling"></NavFrontendModal>
);

export default ModalMedStillingScope;
