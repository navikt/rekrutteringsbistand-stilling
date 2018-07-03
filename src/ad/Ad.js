/* eslint-disable no-underscore-dangle */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Column, Container, Row } from 'nav-frontend-grid';
import AdText from './adText/AdText';
import Processing from "../processing/Processing";
import Categorize from "../processing/Categorize";

class Ad extends React.Component {
    render() {
        return (
            <Container>
                <Row>
                    <Column xs="12" md="8">
                        <AdText />
                    </Column>
                    <Column xs="12" md="4">
                        <Processing />
                        <Categorize />
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
