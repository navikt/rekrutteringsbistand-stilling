import React, { useState, useEffect, FunctionComponent } from 'react';
import { Container } from 'nav-frontend-grid';
import { History } from 'history';
import { Hovedknapp } from 'nav-frontend-knapper';
import { Sidetittel } from 'nav-frontend-typografi';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import AlertStripe from 'nav-frontend-alertstriper';

import { CLEAR_COPIED_ADS } from '../ad/adReducer';
import { State } from '../reduxStore';
import Count from './result/Count';
import DeleteAdModal from '../ad/administration/adStatus/DeleteAdModal';
import Filter from './filter/Filter';
import Loading from '../common/loading/Loading';
import NoResults from './noResults/NoResults';
import OpprettNyStilling from '../opprett-ny-stilling/OpprettNyStilling';
import Pagination from './pagination/Pagination';
import ResultHeader from './result/ResultHeader';
import ResultItem from './result/ResultItem';
import StopAdModal from '../ad/administration/adStatus/StopAdModal';
import { MineStillingerActionType } from './MineStillingerAction';
import './MineStillinger.less';
import { Nettstatus } from '../api/Nettressurs';

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
            <div className="MineStillinger__header">
                <Container className="MineStillinger__header-container">
                    <Sidetittel className="MineStillinger__header__title">
                        Mine stillinger
                    </Sidetittel>
                    <Hovedknapp
                        onClick={onOpprettNyClick}
                        className="MineStillinger__header__button"
                    >
                        Opprett ny
                    </Hovedknapp>
                </Container>
            </div>
            <div className="MineStillinger__content">
                <StopAdModal fromMyAds />
                <DeleteAdModal />
                {resultat.kind === Nettstatus.Feil && (
                    <AlertStripe className="AlertStripe__fullpage" type="advarsel">
                        Det oppsto en feil. Forsøk å laste siden på nytt
                    </AlertStripe>
                )}
                <div className="MineStillinger__status-row">
                    <Count resultat={resultat} />
                </div>
                <aside className="MineStillinger__filter">
                    <Filter />
                </aside>
                <div className="MineStillinger__table">
                    <table className="Result__table">
                        <ResultHeader />
                        <tbody>
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
