import { Knapp } from 'nav-frontend-knapper';
import React, { FunctionComponent } from 'react';
import { useSelector } from 'react-redux';
import { State } from '../../../reduxStore';

type Props = {
    onDeleteClick: () => void;
    isDeleting: boolean;
};

const Sletteknapp: FunctionComponent<Props> = ({ onDeleteClick, isDeleting }) => {
    const innloggetBrukerident = useSelector((state: State) => state.reportee.data)?.navIdent;
    const stillingensNavIdent = useSelector((state: State) => state.adData.administration.navIdent);
    const erEier = innloggetBrukerident === stillingensNavIdent;

    if (!erEier) return null;

    return (
        <Knapp
            mini
            className="AdStatusEdit__buttons__button AdStatusEdit__DeleteAd__button"
            onClick={onDeleteClick}
            spinner={isDeleting}
        >
            Slett stilling
        </Knapp>
    );
};

export default Sletteknapp;
