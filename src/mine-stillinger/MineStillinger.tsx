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
import './MineStillinger.less';
import { Nettstatus } from '../api/Nettressurs';
import MineStillingerHeader from './header/MineStillingerHeader';

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
        <div className="MineStillinger">
            <MineStillingerHeader>
                <Button onClick={onOpprettNyClick}>Opprett ny</Button>
            </MineStillingerHeader>
            <div className="MineStillinger__content">
                <StopAdModal fromMyAds />
                <div className="MineStillinger__status-row">
                    <Count resultat={resultat} />
                </div>
                <Filter />
                <div className="MineStillinger__table">
                    <table className="Result__table">
                        <ResultHeader />
                        <tbody>
                            {resultat.kind === Nettstatus.Feil && (
                                <ErrorMessage className="MineStillinger__feilmelding">
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
