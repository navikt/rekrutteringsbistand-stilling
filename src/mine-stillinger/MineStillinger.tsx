import React, { useState, useEffect, FunctionComponent } from 'react';
import { History } from 'history';
import { Button, ErrorMessage } from '@navikt/ds-react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router';

import { CLEAR_COPIED_ADS } from '../stilling/adReducer';
import { State } from '../redux/store';
import Count from './result/Count';
import Filter from './filter/Filter';
import Loading from '../common/loading/Loading';
import NoResults from './noResults/NoResults';
import OpprettNyStilling from '../opprett-ny-stilling/OpprettNyStilling';
import Pagination from './pagination/Pagination';
import ResultHeader from './result/ResultHeader';
import ResultItem from './result/ResultItem';
import StopAdModal from '../stilling/administration/adStatus/StopAdModal';
import { MineStillingerActionType } from './MineStillingerAction';
import './MineStillinger.module.css';
import { Nettstatus } from '../api/Nettressurs';
import MineStillingerHeader from './header/MineStillingerHeader';
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
                <div className={css.tabell}>
                    <table className="Result__table">
                        <ResultHeader />
                        <tbody>
                            {resultat.kind === Nettstatus.Feil && (
                                <ErrorMessage className={css.feilmelding}>
                                    Klarte ikke hente mine stillinger
                                </ErrorMessage>
                            )}
                            {resultat.kind === Nettstatus.Suksess &&
                                resultat.data.content.map((rekrutteringsbistandstilling) => (
                                    <ResultItem
                                        key={rekrutteringsbistandstilling.stilling.uuid}
                                        rekrutteringsbistandstilling={rekrutteringsbistandstilling}
                                    />
                                ))}
                        </tbody>
                    </table>

                    {resultat.kind === Nettstatus.LasterInn && <Loading />}

                    {resultat.kind === Nettstatus.Suksess && (
                        <>
                            {resultat.data.content.length > 0 ? (
                                <Pagination resultat={resultat.data} page={page} />
                            ) : (
                                <NoResults />
                            )}
                        </>
                    )}
                </div>
            </div>
            {visOpprettStillingModal && <OpprettNyStilling onClose={onOpprettNyStillingClose} />}
        </div>
    );
};

export default MineStillinger;
