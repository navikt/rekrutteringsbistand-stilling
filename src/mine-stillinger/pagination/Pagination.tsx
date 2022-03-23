import React, { FunctionComponent } from 'react';
import { Flatknapp } from 'nav-frontend-knapper';
import { Normaltekst } from 'nav-frontend-typografi';
import { useDispatch } from 'react-redux';
import Chevron from 'nav-frontend-chevron';

import { MineStillingerAction, MineStillingerActionType } from '../MineStillingerAction';
import { MineStillingerResultat } from '../mineStillingerReducer';
import './Pagination.less';

type Props = {
    resultat: MineStillingerResultat;
    page: number;
};

const Pagination: FunctionComponent<Props> = ({ resultat, page }) => {
    const dispatch = useDispatch();

    const changePage = (page: number) => {
        dispatch<MineStillingerAction>({ type: MineStillingerActionType.ChangeMyAdsPage, page });
    };

    const onPreviousPage = () => {
        changePage(page - 1);
    };

    const onNextPage = () => {
        changePage(page + 1);
    };

    if (resultat.totalPages === 0) {
        return null;
    }

    return (
        <div className="Pagination">
            <Normaltekst className="blokk-xs">
                {`Viser side ${page + 1} av ${resultat.totalPages}`}
            </Normaltekst>
            <div className="Pagination__buttons">
                {page > 0 && (
                    <Flatknapp onClick={onPreviousPage}>
                        <Chevron type="venstre" className="Pagination__chevron" />
                        Forrige
                    </Flatknapp>
                )}

                {page + 1 < resultat.totalPages && (
                    <Flatknapp onClick={onNextPage}>
                        Neste
                        <Chevron type="høyre" className="Pagination__chevron" />
                    </Flatknapp>
                )}
            </div>
        </div>
    );
};

export default Pagination;
