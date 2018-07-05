import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Column, Container, Row } from 'nav-frontend-grid';
import Preview from './preview/Preview';
import Administration from './administration/Administration';
import Categorize from './categorize/Categorize';
import Comments from './comments/Comments';
import { FETCH_AD } from './adReducer';
import Error from "./error/Error";

class Ad extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        this.props.getStilling(this.props.match.params.uuid);
    }

    render() {
        const { stilling, isFetchingStilling } = this.props;
        return (
            <Container>
                {!isFetchingStilling && stilling && (
                    <Row>
                        <Column xs="12" md="8">
                            <Preview stilling={stilling} />
                        </Column>
                        <Column xs="12" md="4">
                            <div className="Processing-and-categorize">
                                <Administration />
                                <Categorize />
                                <Comments />
                            </div>
                        </Column>
                    </Row>
                )}
                <Error />
            </Container>
        );
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
    isFetchingStilling: state.ad.isFetchingStilling,
    stilling: state.ad.data
});

const mapDispatchToProps = (dispatch) => ({
    getStilling: (uuid) => dispatch({ type: FETCH_AD, uuid })
});


export default connect(mapStateToProps, mapDispatchToProps)(Ad);
