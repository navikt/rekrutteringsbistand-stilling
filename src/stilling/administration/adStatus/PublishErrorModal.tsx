import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { HIDE_PUBLISH_ERROR_MODAL } from '../../adReducer';
import ModalMedStillingScope from '../../../common/ModalMedStillingScope';
import css from './PublishErrorModal.module.css';
import { BodyLong, Button, Heading } from '@navikt/ds-react';

const PublishErrorModal = () => {
    const dispatch = useDispatch();

    const validation = useSelector((state: any) => state.adValidation.errors);
    const showPublishErrorModal = useSelector((state: any) => state.ad.showPublishErrorModal);

    const onClose = () => {
        dispatch({ type: HIDE_PUBLISH_ERROR_MODAL });
    };

    return (
        showPublishErrorModal && (
            <ModalMedStillingScope
                isOpen={showPublishErrorModal}
                contentLabel="Fortsett"
                onRequestClose={onClose}
                closeButton
                className={css.publishErrorModal}
            >
                <Heading level="2" size="small" spacing>
                    Kan ikke publisere stillingen
                </Heading>
                <BodyLong spacing>
                    Stillingen kan ikke publiseres før følgende feil er rettet:
                </BodyLong>
                <BodyLong as="ul" spacing>
                    {Object.keys(validation).map(
                        (key) => validation[key] && <li key={key}>{validation[key]}</li>
                    )}
                </BodyLong>
                <Button onClick={onClose}>Lukk</Button>
            </ModalMedStillingScope>
        )
    );
};

export default PublishErrorModal;
