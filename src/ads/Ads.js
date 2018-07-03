/* eslint-disable no-underscore-dangle */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Column, Container, Row } from 'nav-frontend-grid';
import { FETCH_ADS } from "./adsReducer";
import Ad from "./Ad";

class Ads extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        this.props.getAds();
    }

    render() {
        return (
            <Container>
                <Row>
                    <Column xs="12">
                        {this.props.ads.map((ad) => (
                            <Ad key={ad.uuid} ad={ad} />
                        ))}
                    </Column>
                </Row>
            </Container>
        )
    }
}

Ads.defaultProps = {};

Ads.propTypes = {};

const mapStateToProps = (state) => ({
    ads: state.ads.items
});

const mapDispatchToProps = (dispatch) => ({
    getAds: () => dispatch({ type: FETCH_ADS })
});

export default connect(mapStateToProps, mapDispatchToProps)(Ads);
