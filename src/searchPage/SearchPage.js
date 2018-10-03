import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AlertStripe from 'nav-frontend-alertstriper';
import { Container } from 'nav-frontend-grid';
import { Knapp } from 'nav-frontend-knapper';
import SearchBox from './searchBox/SearchBox';
import SearchResultHeaders from './searchResult/SearchResultHeaders';
import SearchResultItem from './searchResult/SearchResultItem';
import SearchResultCount from './searchResult/SearchResultCount';
import NoResults from './noResults/NoResults';
import Loading from '../common/loading/Loading';
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
            source: this.props.adSource,
            status: this.props.adStatus,
            sort: `${this.props.sortField},${this.props.sortDir}`
        };
        query[this.props.searchField] = this.props.searchValue;
        this.props.setWorkPriority(query);
        this.props.history.push(`/ads`);
    };

    render() {
        const { ads, isSearching, error } = this.props;
        const adsFound = !isSearching && ads && ads.length > 0;
        return (
            <Container className="SearchPage">
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
                            <div className="SearchBox__wrapper">
                                <SearchBox />
                            </div>
                            <div className="SearchPage__button__right">
                                <Knapp onClick={this.onStartWorkClick}>
                                    Behandle nye annonser
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

SearchPage.defaultProps = {
    error: undefined
};

SearchPage.propTypes = {
    ads: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    isSearching: PropTypes.bool.isRequired,
    getAds: PropTypes.func.isRequired,
    setWorkPriority: PropTypes.func.isRequired,
    history: PropTypes.shape().isRequired,
    adSource: PropTypes.string,
    adStatus: PropTypes.string,
    sortField: PropTypes.string.isRequired,
    sortDir: PropTypes.string.isRequired,
    searchField: PropTypes.string,
    searchValue: PropTypes.string,
    error: PropTypes.shape({
        statusCode: PropTypes.number
    })
};

SearchPage.defaultProps = {
    adSource: undefined,
    adStatus: undefined,
    searchField: undefined,
    searchValue: ''
};

const mapStateToProps = (state) => ({
    ads: state.search.items,
    isSearching: state.search.isSearching,
    adSource: state.search.source,
    adStatus: state.search.status,
    sortField: state.search.sortField,
    sortDir: state.search.sortDir,
    searchField: state.search.field,
    searchValue: state.search.value,
    error: state.search.error
});

const mapDispatchToProps = (dispatch) => ({
    getAds: () => dispatch({ type: FETCH_ADS }),
    setWorkPriority: (workPriority) => dispatch({ type: SET_WORK_PRIORITY, workPriority })
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);
