/* eslint-disable no-underscore-dangle */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Column, Container, Row } from 'nav-frontend-grid';
import Preview from './preview/Preview';
import Processing from './administration/Processing';
import Categorize from './categorize/Categorize';
import Comments from './comments/Comments';
import { FETCH_AD, SET_COMMENT } from './adReducer';

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
                        Fant ikke annonsen
                    </Container>
                ) : error && (
                    <Container>
                        <NotFound />
                    </Container>
                )}

                {!isFetchingStilling && stilling && (
                    <Row>
                        <Column xs="12" md="8">
                            <Preview stilling={stilling} />
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
    stilling: state.ad.data,
    error: state.ad.error
});

const mapDispatchToProps = (dispatch) => ({
    getStilling: (uuid) => dispatch({ type: FETCH_AD, uuid }),
    setComment: (comment) => dispatch({ type: SET_COMMENT, comment })
});


export default connect(mapStateToProps, mapDispatchToProps)(Ad);
