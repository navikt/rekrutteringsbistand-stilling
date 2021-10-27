import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useLocation } from 'react-router';
import PropTypes from 'prop-types';
import AlertStripe from 'nav-frontend-alertstriper';
import { Container } from 'nav-frontend-grid';
import { Hovedknapp } from 'nav-frontend-knapper';
import { Sidetittel } from 'nav-frontend-typografi';
import Loading from '../common/loading/Loading';
import ResultHeader from './result/ResultHeader';
import ResultItem from './result/ResultItem';
import NoResults from './noResults/NoResults';
import Pagination from './pagination/Pagination';
import StopAdModal from '../ad/administration/adStatus/StopAdModal';
import Count from './result/Count';
import { FETCH_MY_ADS, RESET_MY_ADS_PAGE } from './myAdsReducer';
import { CLEAR_COPIED_ADS, CREATE_AD } from '../ad/adReducer';
import DeleteAdModal from '../ad/administration/adStatus/DeleteAdModal';
import Filter from './filter/Filter';
import OpprettNyStilling from '../opprett-ny-stilling/OpprettNyStilling';
import './MyAds.less';

const MyAds = (props) => {
    const {
        ads,
        getAds,
        clearCopiedAds,
        resetMyAdsPage,
        isSearching,
        error,
        reportee,
        history,
    } = props;

    const { search } = useLocation();

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
            resetMyAdsPage();
        }

        getAds();

        return () => {
            clearCopiedAds();
        };
        // eslint-disable-next-line
    }, []);

    const onOpprettNyClick = () => {
        setVisOpprettStillingModal(true);
    };

    const onOpprettNyStillingClose = () => {
        setVisOpprettStillingModal(false);
    };

    return (
        <div className="MyAds">
            <div className="MyAds__header">
                <Container className="MyAds__header-container">
                    <Sidetittel className="MyAds__header__title">Mine stillinger</Sidetittel>
                    <Hovedknapp onClick={onOpprettNyClick} className="MyAds__header__button">
                        Opprett ny
                    </Hovedknapp>
                </Container>
            </div>
            <div className="MyAds__content">
                <StopAdModal fromMyAds />
                <DeleteAdModal />
                {error && (
                    <AlertStripe className="AlertStripe__fullpage" type="advarsel" solid="true">
                        Det oppsto en feil. Forsøk å laste siden på nytt
                    </AlertStripe>
                )}
                <div className="MyAds__status-row">
                    <Count />
                </div>
                <aside className="MyAds__filter">
                    <Filter />
                </aside>
                <div className="MyAds__table">
                    <table className="Result__table">
                        <ResultHeader />
                        <tbody>
                            {adsFound &&
                                ads.map((ad) => (
                                    <ResultItem
                                        key={ad.uuid}
                                        rekrutteringsbistandstilling={ad}
                                        reportee={reportee}
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

MyAds.defaultProps = {
    error: undefined,
};

MyAds.propTypes = {
    ads: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    isSearching: PropTypes.bool.isRequired,
    getAds: PropTypes.func.isRequired,
    resetMyAdsPage: PropTypes.func.isRequired,
    error: PropTypes.shape({
        statusCode: PropTypes.number,
    }),
    clearCopiedAds: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    ads: state.myAds.items,
    reportee: state.reportee.data,
    isSearching: state.myAds.isSearching,
    error: state.myAds.error,
});

const mapDispatchToProps = (dispatch) => ({
    getAds: () => dispatch({ type: FETCH_MY_ADS }),
    resetMyAdsPage: () => dispatch({ type: RESET_MY_ADS_PAGE }),
    createAd: () => dispatch({ type: CREATE_AD }),
    clearCopiedAds: () => dispatch({ type: CLEAR_COPIED_ADS }),
});

export default connect(mapStateToProps, mapDispatchToProps)(MyAds);
