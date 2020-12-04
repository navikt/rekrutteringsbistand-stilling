import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AlertStripe from 'nav-frontend-alertstriper';
import { Container } from 'nav-frontend-grid';
import SearchResultHeaders from './searchResult/SearchResultHeaders';
import SearchResultItem from './searchResult/SearchResultItem';
import SearchResultCount from './searchResult/SearchResultCount';
import NoResults from './noResults/NoResults';
import Loading from '../common/loading/Loading';
import Filter from './filter/Filter';
import Pagination from './pagination/Pagination';
import { FETCH_ADS, RESTORE_SEARCH } from './searchReducer';
import './SearchPage.less';
import StillingSøkeboks from './stillingsøk/StillingSøkeboks';

class SearchPage extends React.Component {
    componentDidMount() {
        const { getAds, restoreSearch } = this.props;
        restoreSearch();
        getAds();
    }

    render() {
        const { ads, isSearching, error } = this.props;
        const adsFound = !isSearching && ads && ads.length > 0;
        return (
            <div className="SearchPage">
                <h1 className="visually-hidden">Søk etter stilling</h1>
                <div className="SearchPage__søkeboks-wrapper">
                    <StillingSøkeboks />
                    <button
                        onClick={() => {
                            throw new Error('Fremprovosert feil!');
                        }}
                    >
                        Trykk meg
                    </button>
                </div>
                <Container className="SearchPage__container">
                    {error && error.statusCode === 412 && (
                        <AlertStripe className="AlertStripe__fullpage" type="advarsel" solid="true">
                            Noen andre har gjort endringer annonsen i mellomtiden. Forsøk å laste
                            søket på nytt
                        </AlertStripe>
                    )}
                    {error && error.statusCode !== 412 && (
                        <AlertStripe className="AlertStripe__fullpage" type="advarsel" solid="true">
                            Det oppsto en feil. Forsøk å laste siden på nytt
                        </AlertStripe>
                    )}
                    <div className="SearchPage__flex">
                        <div className="SearchPage__flex__left">
                            <div className="SearchPage__flex__left__inner">
                                <Filter />
                            </div>
                        </div>
                        <div className="SearchPage__flex__right">
                            <div className="SearchPage__flex__right__inner">
                                <div className="SearchPage__ResultCount blokk-s">
                                    <SearchResultCount />
                                </div>
                                <table className="SearchResult__table">
                                    <SearchResultHeaders />
                                    <tbody>
                                        {adsFound &&
                                            ads.map((ad) => (
                                                <SearchResultItem key={ad.uuid} ad={ad} />
                                            ))}
                                    </tbody>
                                </table>
                                {isSearching && <Loading />}
                                {!isSearching && ads && ads.length === 0 && <NoResults />}
                                {adsFound && <Pagination />}
                            </div>
                        </div>
                    </div>
                </Container>
            </div>
        );
    }
}

SearchPage.defaultProps = {
    error: undefined,
};

SearchPage.propTypes = {
    ads: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    isSearching: PropTypes.bool.isRequired,
    getAds: PropTypes.func.isRequired,
    restoreSearch: PropTypes.func.isRequired,
    error: PropTypes.shape({
        statusCode: PropTypes.number,
    }),
    location: PropTypes.shape({
        state: PropTypes.shape({
            searchFromStartPage: PropTypes.bool,
        }),
    }).isRequired,
};

const mapStateToProps = (state) => ({
    ads: state.search.items,
    isSearching: state.search.isSearching,
    error: state.search.error,
});

const mapDispatchToProps = (dispatch) => ({
    getAds: () => dispatch({ type: FETCH_ADS }),
    restoreSearch: () => dispatch({ type: RESTORE_SEARCH }),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);
