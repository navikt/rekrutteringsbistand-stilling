import React, { useState, useEffect, FunctionComponent } from 'react';
import { History } from 'history';
import { Button, Pagination } from '@navikt/ds-react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router';

import { CLEAR_COPIED_ADS } from '../stilling/adReducer';
import { State } from '../redux/store';
import Count from './result/Count';
import Filter from './filter/Filter';
import OpprettNyStilling from '../opprett-ny-stilling/OpprettNyStilling';
import StopAdModal from '../stilling/administration/adStatus/StopAdModal';
import { MineStillingerAction, MineStillingerActionType } from './MineStillingerAction';
import './MineStillinger.module.css';
import MineStillingerHeader from './header/MineStillingerHeader';
import css from './MineStillinger.module.css';
import ResultTable from './result/ResultTable';
import { Nettstatus } from '../api/Nettressurs';
import Loading from '../common/loading/Loading';
import NoResults from './noResults/NoResults';
import classNames from 'classnames';

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
        <div className={css.mineStillinger}>
            <MineStillingerHeader>
                <Button onClick={onOpprettNyClick}>Opprett ny</Button>
            </MineStillingerHeader>
            <div className={css.innhold}>
                <StopAdModal fromMyAds />
                <div className={css.statusRad}>
                    <Count resultat={resultat} />
                </div>
                <Filter />
                <ResultTable resultat={resultat} page={page} />
                {resultat.kind === Nettstatus.LasterInn && <Loading />}
                {resultat.kind === Nettstatus.Suksess && (
                    <>
                        {resultat.data.content.length > 0 ? (
                            <Pagination
                                page={page + 1}
                                count={resultat.data.totalPages}
                                onPageChange={onPageChange}
                                className={classNames(css.underTabell, css.paginering)}
                            />
                        ) : (
                            <NoResults />
                        )}
                    </>
                )}
            </div>
            {visOpprettStillingModal && <OpprettNyStilling onClose={onOpprettNyStillingClose} />}
        </div>
    );
};

export default MineStillinger;
