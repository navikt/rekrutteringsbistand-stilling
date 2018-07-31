import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Container } from 'nav-frontend-grid';
import { Innholdstittel } from 'nav-frontend-typografi';
import SearchBox from '../common/searchBox/SearchBox';
import SearchResultHeaders from './searchResult/SearchResultHeaders';
import SearchResultItem from './searchResult/SearchResultItem';
import NoResults from './noResults/NoResults';
import Loading from './loading/Loading';
import Filter from './filter/Filter';
import { FETCH_ADS } from './searchReducer';
import './SearchPage.less';

class SearchPage extends React.Component {
    componentDidMount() {
        if (this.props.ads.length === 0) {
            this.props.getAds();
        }
    }

    render() {
        const { ads, isSearching } = this.props;
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
                            <Innholdstittel className="blokk-m">Søkeresultat</Innholdstittel>
                            <div className="SearchBox__wrapper blokk-m">
                                <SearchBox
                                    label=""
                                    placeholder="Skriv inn søk..."
                                />
                            </div>
                            <SearchResultHeaders />
                            {isSearching && (
                                <Loading />
                            )}
                            {!isSearching && ads && ads.length === 0 && (
                                <NoResults />
                            )}
                            {!isSearching && ads && ads.map((ad) => (
                                <SearchResultItem key={ad.uuid} ad={ad} />
                            ))}
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
    ads: state.ads.items,
    isSearching: state.ads.isSearching
});

const mapDispatchToProps = (dispatch) => ({
    getAds: () => dispatch({ type: FETCH_ADS })
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);
