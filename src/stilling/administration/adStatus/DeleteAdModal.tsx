import React, { FunctionComponent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Flatknapp, Hovedknapp } from 'nav-frontend-knapper';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import { DELETE_AD, HIDE_DELETE_AD_MODAL } from '../../adReducer';
import ModalMedStillingScope from '../../../common/ModalMedStillingScope';
import { State } from '../../../redux/store';
import { VarslingAction, VarslingActionType } from '../../../common/varsling/varslingReducer';
import './DeleteAdModal.less';

const DeleteAdModal: FunctionComponent = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { showDeleteAdModal, hasDeletedAd } = useSelector((state: State) => state.ad);
    const title = useSelector((state: State) => state.adData.title);

    useEffect(() => {
        if (hasDeletedAd) {
            navigate(
                {
                    pathname: `/stillinger/minestillinger`,
                },
                {
                    replace: true,
                }
            );

            dispatch<VarslingAction>({
                type: VarslingActionType.VisVarsling,
                innhold: `Slettet stilling ${title}`,
            });
        }
    }, [hasDeletedAd, title, dispatch, navigate]);

    const onClose = () => {
        dispatch({ type: HIDE_DELETE_AD_MODAL });
    };

    const onDeleteAdClick = () => {
        dispatch({ type: DELETE_AD });
    };

    return (
        <ModalMedStillingScope
            isOpen={showDeleteAdModal}
            contentLabel="Fortsett"
            onRequestClose={onClose}
            closeButton
            className="DeleteAdModal"
        >
            <Undertittel className="blokk-s">
                Slett feilregistrert stilling og kandidatliste
            </Undertittel>
            <Normaltekst className="blokk-s">
                Denne funksjonen skal brukes når det er valgt feil bedrift. Stillinger og
                kandidatlister som er slettet vises ikke i løsningen, og stillingen og kandidatene
                vil ikke telles i statistikken.
            </Normaltekst>
            <Normaltekst className="blokk-l">
                Er du sikker på at du ønsker å slette {title} og tilhørende kandidatliste?
                Stillinger og kandidatlister som er slettet vises ikke i løsningen.
            </Normaltekst>
            <div className="DeleteAdModal__buttons">
                <Hovedknapp onClick={onDeleteAdClick}>Slett</Hovedknapp>
                <Flatknapp onClick={onClose}>Avbryt</Flatknapp>
            </div>
        </ModalMedStillingScope>
    );
};

export default DeleteAdModal;
