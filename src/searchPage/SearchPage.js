import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AlertStripe from 'nav-frontend-alertstriper';
import { Container } from 'nav-frontend-grid';
import { Flatknapp } from 'nav-frontend-knapper';
import SearchBox from './searchBox/SearchBox';
import SearchResultHeaders from './searchResult/SearchResultHeaders';
import SearchResultItem from './searchResult/SearchResultItem';
import SearchResultCount from './searchResult/SearchResultCount';
import NoResults from './noResults/NoResults';
import Loading from '../common/loading/Loading';
import Filter from './filter/Filter';
import Pagination from './pagination/Pagination';
import { FETCH_ADS, RESET_SEARCH } from './searchReducer';
import './SearchPage.less';

class SearchPage extends React.Component {
    componentDidMount() {
        this.props.getAds();
    }

    render() {
        const {
            ads, isSearching, error, resetSearch
        } = this.props;
        const adsFound = !isSearching && ads && ads.length > 0;
        return (
            <div className="SearchPage">
                <div className="SearchPage__SearchBox__wrapper">
                    <div className="SearchPage__SearchBox">
                        <SearchBox />
                    </div>
                    <div className="SearchPage__SearchBox__resetButton">
                        <Flatknapp
                            mini
                            onClick={resetSearch}
                        >
                            Nullstill søket
                        </Flatknapp>
                    </div>
                </div>
                <Container className="SearchPage2">
                    {(error && error.statusCode === 412) && (
                        <AlertStripe className="SearchPage__alertStripe" type="advarsel" solid>
                        Noen andre har gjort endringer annonsen i mellomtiden. Forsøk å laste søket på nytt
                        </AlertStripe>
                    )}
                    {(error && error.statusCode !== 412) && (
                        <AlertStripe className="SearchPage__alertStripe" type="advarsel" solid>
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
                                <SearchResultHeaders />
                                {isSearching && (
                                    <Loading />
                                )}
                                {!isSearching && ads && ads.length === 0 && (
                                    <NoResults />
                                )}
                                {adsFound && ads.map((ad) => (
                                    <SearchResultItem key={ad.uuid} ad={ad} />
                                ))}
                                {adsFound && (
                                    <Pagination />
                                )}
                            </div>
                        </div>
                    </div>
                </Container>
            </div>
        );
    }
}

SearchPage.defaultProps = {
    error: undefined
};

SearchPage.propTypes = {
    ads: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    isSearching: PropTypes.bool.isRequired,
    getAds: PropTypes.func.isRequired,
    resetSearch: PropTypes.func.isRequired,
    error: PropTypes.shape({
        statusCode: PropTypes.number
    })
};

const mapStateToProps = (state) => ({
    ads: state.search.items,
    isSearching: state.search.isSearching,
    error: state.search.error
});

const mapDispatchToProps = (dispatch) => ({
    getAds: () => dispatch({ type: FETCH_ADS }),
    resetSearch: () => dispatch({ type: RESET_SEARCH })
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);
