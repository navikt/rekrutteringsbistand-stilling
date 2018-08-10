import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Column, Row } from 'nav-frontend-grid';
import { Systemtittel } from 'nav-frontend-typografi';
import MenuBox from './MenuBox';
import MenuStatistics from './MenuStatistics';
import './Menu.less';
import { registerShortcuts } from '../../common/shortcuts/Shortcuts';
import { FETCH_NEXT_AD } from '../../ad/adReducer';
import SearchBox from '../../searchPage/searchBox/SearchBox';


class Menu extends React.Component {
    componentDidUpdate() {
        if (this.props.adUuid) {
            this.props.history.push(`/ads/${this.props.adUuid}`);
        }
    }

    componentDidMount() {
        registerShortcuts('forside', {
            'n s': () => {
                this.onNextClick();
            },
            'l n': () => {
                this.props.history.push('/');
            }
        });
    }

    onSearchClick = () => {
        this.props.history.push('/search');
    };

    onNextClick = () => {
        this.props.getNextAd();
    };

    render() {
        return (
            <div className="Menu">
                <Row className="blokk-s">
                    <Column xs="12" md="4">
                        <MenuBox
                            icon="📤"
                            text="Start med neste stillingsannonse"
                            href=""
                            onClick={this.onNextClick}
                        />
                        <MenuBox
                            icon="📝"
                            text="Lag ny stillingsannonse"
                            href="www.nav.no"
                        />
                    </Column>
                    <Column xs="12" md="6">
                        <div className="Menu__search">
                            <Row>
                                <Systemtittel className="blokk-xs">Søk</Systemtittel>
                            </Row>
                            <Row>
                                <SearchBox onSearch={this.onSearchClick} />
                            </Row>
                        </div>
                        <MenuStatistics className="text-center" />
                    </Column>
                </Row>
            </div>
        );
    }
}

Menu.propTypes = {
    history: PropTypes.shape().isRequired,
    getNextAd: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    adUuid: state.ad.data ? state.ad.data.uuid : undefined
});

const mapDispatchToProps = (dispatch) => ({
    getNextAd: () => dispatch({ type: FETCH_NEXT_AD })
});

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
