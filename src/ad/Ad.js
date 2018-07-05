/* eslint-disable no-underscore-dangle */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Column, Container, Row } from 'nav-frontend-grid';
import AdText from './adText/AdText';
import Processing from '../processing/Processing';
import Categorize from '../processing/Categorize';
import Comments from '../comments/Comments';
import NotFound from './notFound/NotFound';
import { FETCH_STILLING_BEGIN, SET_COMMENT } from './adReducer';

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
            stilling, isFetchingStilling, error, setComment
        } = this.props;
        return (
            <Container>
                {error && error.statusCode === 404 ? (
                    <Container>
                        <NotFound />
                    </Container>
                ) : error && (
                    <Container>
                        <NotFound />
                    </Container>
                )}

                {!isFetchingStilling && stilling && (
                    <Row>
                        <Column xs="12" md="8">
                            <AdText stilling={stilling} />
                        </Column>
                        <Column xs="12" md="4">
                            <div className="Processing-and-categorize">
                                <Processing />
                                <Categorize />
                                <Comments comment={stilling.comment} setComment={setComment} />
                            </div>
                        </Column>
                    </Row>
                )}
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
    setComment: PropTypes.func.isRequired,
    isFetchingStilling: PropTypes.bool
};

const mapStateToProps = (state) => ({
    isFetchingStilling: state.ad.isFetchingStilling,
    stilling: state.ad.stilling,
    error: state.ad.error
});

const mapDispatchToProps = (dispatch) => ({
    getStilling: (uuid) => dispatch({ type: FETCH_STILLING_BEGIN, uuid }),
    setComment: (comment) => dispatch({ type: SET_COMMENT, comment })
});


export default connect(mapStateToProps, mapDispatchToProps)(Ad);
