/* eslint-disable no-underscore-dangle */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Column, Container, Row } from 'nav-frontend-grid';
import AdText from './adText/AdText';
import Processing from "../processing/Processing";
import Location from "../processing/Location";
import Employer from "../processing/Employer";
import Styrk from "../processing/Styrk";
import NotFound from './notFound/NotFound';
import {FETCH_STILLING_BEGIN} from './adReducer';

class Ad extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        this.props.getStilling(this.props.match.params.uuid);
    }

    render() {
        const {
            stilling, isFetchingStilling, error
        } = this.props;
        return (
            <Container>
                {error && error.statusCode === 404 ? (
                    <Container>
                        <NotFound/>
                    </Container>
                ) : error && (
                    <Container>
                        <NotFound/>
                    </Container>
                )}

                {!isFetchingStilling && stilling && (
                <Row>
                    <Column xs="12" md="6">
                        <AdText title={stilling.title} adText={stilling.properties.adtext}/>
                    </Column>
                    <Column xs="12" md="3">
                        <Location />
                        <Employer />
                        <Styrk />
                    </Column>
                    <Column xs="12" md="3">
                        <Processing />
                    </Column>
                </Row>
                )}
            </Container>
        )
    }
}



Ad.defaultProps = {
    stilling: undefined,
    isFetchingStilling: false
};

Ad.propTypes = {
    stilling: PropTypes.shape({
        title: PropTypes.string.isRequired,
        properties: PropTypes.shape({
            adtext: PropTypes.string
        }).isRequired
    }),
    getStilling: PropTypes.func.isRequired,
    isFetchingStilling: PropTypes.bool
};

const mapStateToProps = (state) => ({
    isFetchingStilling: state.stilling.isFetchingStilling,
    stilling: state.stilling.stilling,
    error: state.stilling.error
});

const mapDispatchToProps = (dispatch) => ({
    getStilling: (uuid) => dispatch({ type: FETCH_STILLING_BEGIN, uuid })
});


export default connect(mapStateToProps, mapDispatchToProps)(Ad);
