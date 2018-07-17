import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Container } from 'nav-frontend-grid';
import { Innholdstittel } from 'nav-frontend-typografi';
import SearchBox from '../common/searchBox/SearchBox';
import ListHeaders from './ListHeaders';
import ListItem from './ListItem';
import Filter from './filter/Filter';
import { FETCH_ADS } from './searchReducer';
import './SearchPage.less';

class SearchPage extends React.Component {
    componentDidMount() {
        this.props.getAds();
    }

    onSearchClick = (value) => {

        this.searchEmployer(value);
        this.searchAdTitle(value);
    };


    searchEmployer = (value) => {
    };

    searchAdTitle = (value) => {
    };


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
                                    label="Finn stillingsannonse som inneholder:"
                                    onSearchClick={this.onSearchClick}
                                    placeholder="Skriv inn søk..."
                                />
                            </div>

                            <ListHeaders />
                            {!isSearching && ads && ads.map((ad) => (
                                <ListItem key={ad.uuid} ad={ad} />
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
