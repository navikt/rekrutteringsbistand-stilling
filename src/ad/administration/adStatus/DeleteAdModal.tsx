import React, { FunctionComponent, useEffect } from 'react';
import { useHistory } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { Flatknapp, Hovedknapp } from 'nav-frontend-knapper';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import './DeleteAdModal.less';
import { DELETE_AD, HIDE_DELETE_AD_MODAL } from '../../adReducer';
import ModalMedStillingScope from '../../../common/ModalMedStillingScope';
import { State } from '../../../reduxStore';
import { VarslingAction, VarslingActionType } from '../../../common/varsling/varslingReducer';

const DeleteAdModal: FunctionComponent = () => {
    const history = useHistory();
    const dispatch = useDispatch();

    const { showDeleteAdModal, hasDeletedAd } = useSelector((state: State) => state.ad);
    const title = useSelector((state: State) => state.adData.title);

    useEffect(() => {
        if (hasDeletedAd) {
            history.replace({
                pathname: `/stillinger/minestillinger`,
            });
            dispatch<VarslingAction>({
                type: VarslingActionType.VisVarsling,
                innhold: `Slettet stilling ${title}`,
            });
        }
    }, [hasDeletedAd, title, dispatch, history]);

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
            <Undertittel className="blokk-s">Slett stilling og kandidatliste</Undertittel>
            <Normaltekst className="blokk-l">
                {`Er du sikker på at du ønsker å slette "${title}" og tilhørende kandidatliste?
                Stillinger og kandidatlister som er slettet vises ikke i løsningen.`}
            </Normaltekst>
            <div className="DeleteAdModal__buttons">
                <Hovedknapp onClick={onDeleteAdClick}>Slett</Hovedknapp>
                <Flatknapp onClick={onClose}>Avbryt</Flatknapp>
            </div>
        </ModalMedStillingScope>
    );
};

export default DeleteAdModal;
