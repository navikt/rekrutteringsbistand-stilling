import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Container } from 'nav-frontend-grid';
import SearchBox from './searchBox/SearchBox';
import SearchResultHeaders from './searchResult/SearchResultHeaders';
import SearchResultItem from './searchResult/SearchResultItem';
import SearchResultCount from './searchResult/SearchResultCount';
import NoResults from './noResults/NoResults';
import Loading from './loading/Loading';
import Filter from './filter/Filter';
import Pagination from './pagination/Pagination';
import { FETCH_ADS } from './searchReducer';
import './SearchPage.less';
import {Link} from "react-router-dom";

class SearchPage extends React.Component {
    componentDidMount() {
        if (this.props.ads.length === 0) {
            this.props.getAds();
        }
    }

    render() {
        const { ads, isSearching } = this.props;
        const adsFound = !isSearching && ads && ads.length > 0;
        return (
            <Container className="SearchPage">
                <div className="SearchPage__flex">
                    <div className="SearchPage__flex__left">
                        <div className="SearchPage__flex__left__inner">
                            <Filter />
                        </div>
                    </div>
                    <div className="SearchPage__flex__right">
                        <div className="SearchPage__flex__right__inner">
                            <div className="SearchBox__wrapper blokk-xs">
                                <SearchBox />
                            </div>
                            <div className="SearchPage__button__right">
                                <Link
                                    className="knapp"
                                    to={`/ads/${adsFound ? ads[0].uuid : ''}`}
                                >
                                    Start behandling
                                </Link>
                            </div>

                            <SearchResultCount />
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
        );
    }
}

SearchPage.defaultProps = {};

SearchPage.propTypes = {
    ads: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    isSearching: PropTypes.bool.isRequired,
    getAds: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    ads: state.search.items,
    isSearching: state.search.isSearching
});

const mapDispatchToProps = (dispatch) => ({
    getAds: () => dispatch({ type: FETCH_ADS })
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);
