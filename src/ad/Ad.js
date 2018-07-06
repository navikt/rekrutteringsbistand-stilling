import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Column, Container, Row } from 'nav-frontend-grid';
import Preview from './preview/Preview';
import Administration from './administration/Administration';
import Categorize from './categorize/Categorize';
import Comments from './comments/Comments';
import { FETCH_AD } from './adReducer';
import Error from './error/Error';
import DelayedSpinner from '../common/DelayedSpinner';
import './Ad.less';
import Faded from '../common/faded/Faded';

class Ad extends React.Component {
    componentDidMount() {
        window.scrollTo(0, 0);
        this.props.getStilling(this.props.match.params.uuid);
    }

    render() {
        const { stilling, isFetchingStilling } = this.props;
        return (
            <div className="Ad">
                {!isFetchingStilling && stilling ? (
                    <Faded>
                        <div className="Ad__flex">
                            <div className="Ad__flex__center">
                                <div className="Ad__flex__center__inner">
                                    <Preview stilling={stilling} />
                                </div>
                            </div>
                            <div className="Ad__flex__right">
                                <div className="Ad__flex__right__inner">
                                    <Administration />
                                    <Categorize />
                                    <Comments />
                                </div>
                            </div>
                        </div>
                    </Faded>
                ) : (
                    <div className="Ad__spinner">
                        <DelayedSpinner />
                    </div>
                )}
                <Error />
            </div>
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
