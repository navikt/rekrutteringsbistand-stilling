import React, { useState, useEffect, FunctionComponent } from 'react';
import { Container } from 'nav-frontend-grid';
import { History } from 'history';
import { Hovedknapp } from 'nav-frontend-knapper';
import { Sidetittel } from 'nav-frontend-typografi';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import AlertStripe from 'nav-frontend-alertstriper';

import { CLEAR_COPIED_ADS } from '../ad/adReducer';
import { FETCH_MY_ADS, RESET_MY_ADS_PAGE } from './mineStillingerReducer';
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
import './MineStillinger.less';

type Props = {
    history: History;
};

const MineStillinger: FunctionComponent<Props> = ({ history }) => {
    const dispatch = useDispatch();
    const { search } = useLocation();
    const { items: ads, isSearching, error } = useSelector((state: State) => state.mineStillinger);

    const skalViseOpprettStillingModal = () => {
        const queryParams = new URLSearchParams(search);
        return queryParams.has('visOpprettStillingModal');
    };

    const [visOpprettStillingModal, setVisOpprettStillingModal] = useState(
        skalViseOpprettStillingModal()
    );

    const adsFound = !isSearching && ads && ads.length > 0;

    useEffect(() => {
        if (history.action === 'PUSH') {
            dispatch({ type: RESET_MY_ADS_PAGE });
        }

        dispatch({ type: FETCH_MY_ADS });

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
                {error && (
                    <AlertStripe className="AlertStripe__fullpage" type="advarsel">
                        Det oppsto en feil. Forsøk å laste siden på nytt
                    </AlertStripe>
                )}
                <div className="MineStillinger__status-row">
                    <Count />
                </div>
                <aside className="MineStillinger__filter">
                    <Filter />
                </aside>
                <div className="MineStillinger__table">
                    <table className="Result__table">
                        <ResultHeader />
                        <tbody>
                            {adsFound &&
                                ads.map((ad) => (
                                    <ResultItem
                                        key={ad.stilling.uuid}
                                        rekrutteringsbistandstilling={ad}
                                    />
                                ))}
                        </tbody>
                    </table>

                    {isSearching && <Loading />}
                    {!isSearching && ads && ads.length === 0 && <NoResults />}
                    {adsFound && <Pagination />}
                </div>
            </div>
            {visOpprettStillingModal && <OpprettNyStilling onClose={onOpprettNyStillingClose} />}
        </div>
    );
};

export default MineStillinger;
