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

class Ad extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        window.scrollTo(0, 0);
    }

    render() {
        return (
            <Container>
                <Row>
                    <Column xs="12" md="6">
                        <AdText />
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
            </Container>
        )
    }
}

Ad.defaultProps = {};

Ad.propTypes = {};

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = (dispatch) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(Ad);
