import React, { useState, useEffect, FunctionComponent } from 'react';
import { History } from 'history';
import { Pagination } from '@navikt/ds-react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router';

import { CLEAR_COPIED_ADS } from '../stilling/adReducer';
import { State } from '../redux/store';
import AntallStillinger from './AntallStillinger';
import Filter from './filter/Filter';
import OpprettNyStilling from '../opprett-ny-stilling/OpprettNyStilling';
import StopAdModal from '../stilling/administration/adStatus/StopAdModal';
import { MineStillingerAction, MineStillingerActionType } from './MineStillingerAction';
import MineStillingerHeader from './header/MineStillingerHeader';
import { Nettstatus } from '../api/Nettressurs';
import classNames from 'classnames';
import MineStillingerTabell from './tabell/MineStillingerTabell';
import css from './MineStillinger.module.css';

type Props = {
    history: History;
};

const MineStillinger: FunctionComponent<Props> = ({ history }) => {
    const dispatch = useDispatch();
    const { search } = useLocation();
    const { resultat, page } = useSelector((state: State) => state.mineStillinger);
    const reportee = useSelector((state: State) => state.reportee.data);

    const skalViseOpprettStillingModal = () => {
        const queryParams = new URLSearchParams(search);
        return queryParams.has('visOpprettStillingModal');
    };

    const [visOpprettStillingModal, setVisOpprettStillingModal] = useState(
        skalViseOpprettStillingModal()
    );

    useEffect(() => {
        if (reportee) {
            dispatch({ type: MineStillingerActionType.FetchMyAds });
        }
    }, [reportee, dispatch]);

    useEffect(() => {
        if (history.action === 'PUSH') {
            dispatch({ type: MineStillingerActionType.ResetMyAdsPage });
        }

        return () => {
            dispatch({ type: CLEAR_COPIED_ADS });
        };
    }, [dispatch, history.action]);

    const onOpprettNyClick = () => {
        setVisOpprettStillingModal(true);
    };

    const onOpprettNyStillingClose = () => {
        setVisOpprettStillingModal(false);
    };

    const onPageChange = (page: number) => {
        page = page - 1;
        dispatch<MineStillingerAction>({ type: MineStillingerActionType.ChangeMyAdsPage, page });
    };

    return (
        <main className={css.mineStillinger}>
            <MineStillingerHeader opprettStilling={onOpprettNyClick} />
            <div className={css.wrapper}>
                <StopAdModal fromMyAds />
                <Filter className={css.filter} />
                <div className={css.antallStillinger}>
                    <AntallStillinger resultat={resultat} />
                </div>
                <MineStillingerTabell resultat={resultat} className={css.tabell} />
                {resultat.kind === Nettstatus.Suksess && (
                    <>
                        {resultat.data.content.length > 0 ? (
                            <Pagination
                                page={page + 1}
                                count={resultat.data.totalPages}
                                onPageChange={onPageChange}
                                className={classNames(css.underTabell, css.paginering)}
                            />
                        ) : null}
                    </>
                )}
            </div>
            {visOpprettStillingModal && <OpprettNyStilling onClose={onOpprettNyStillingClose} />}
        </main>
    );
};

export default MineStillinger;
