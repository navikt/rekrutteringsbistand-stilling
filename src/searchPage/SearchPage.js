import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Container } from 'nav-frontend-grid';
import { Knapp } from 'nav-frontend-knapper';
import SearchBox from './searchBox/SearchBox';
import SearchResultHeaders from './searchResult/SearchResultHeaders';
import SearchResultItem from './searchResult/SearchResultItem';
import SearchResultCount from './searchResult/SearchResultCount';
import NoResults from './noResults/NoResults';
import Loading from './loading/Loading';
import Filter from './filter/Filter';
import Pagination from './pagination/Pagination';
import { FETCH_ADS } from './searchReducer';
import { SET_WORK_PRIORITY } from '../ad/adReducer';
import './SearchPage.less';

class SearchPage extends React.Component {
    componentDidMount() {
        this.props.getAds();
    }

    onStartWorkClick = () => {
        const query = {
            source: this.props.search.source,
            status: this.props.search.status
        };
        query[this.props.search.field] = this.props.search.value;
        this.props.setWorkPriority(query);
        this.props.history.push(`/ads`);
    };

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
                            <div className="SearchBox__wrapper">
                                <SearchBox />
                            </div>
                            <div className="SearchPage__button__right">
                                <Knapp onClick={this.onStartWorkClick}>
                                    Start behandling
                                </Knapp>
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

SearchPage.propTypes = {
    ads: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    isSearching: PropTypes.bool.isRequired,
    getAds: PropTypes.func.isRequired,
    setWorkPriority: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    ads: state.search.items,
    isSearching: state.search.isSearching,
    search: state.search
});

const mapDispatchToProps = (dispatch) => ({
    getAds: () => dispatch({ type: FETCH_ADS }),
    setWorkPriority: (workPriority) => dispatch({ type: SET_WORK_PRIORITY, workPriority })
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);
