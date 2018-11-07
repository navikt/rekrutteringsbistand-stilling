import Chevron from 'nav-frontend-chevron';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import { EXPAND_COMMENT, COLLAPSE_COMMENT } from './expandCommentReducer';

class ExpandComment extends React.Component {

    componentWillUnmount() {
        this.props.collapseComment();
    }

    onClick = () => {
        if (this.props.isCommentExpanded) {
            this.props.collapseComment();
        } else {
            this.props.expandComment();
        }
    };

    render() {
        return (
            <button
                className="Expand__comment__button"
                onClick={this.onClick}
                aria-expanded={this.props.isCommentExpanded}
            >
                {this.props.isCommentExpanded ? 'Se mindre' : 'Se mer'}
                <Chevron
                    className="Expand__comment__chevron"
                    type={this.props.isCommentExpanded ? 'opp' : 'ned'}
                />
            </button>
        );
    }
}

ExpandComment.propTypes = {
    isCommentExpanded: PropTypes.bool.isRequired,
    collapseComment: PropTypes.func.isRequired,
    expandComment: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    isCommentExpanded: state.expandComment.isCommentExpanded
});

const mapDispatchToProps = (dispatch) => ({
    expandComment: () => dispatch({ type: EXPAND_COMMENT }),
    collapseComment: () => dispatch({ type: COLLAPSE_COMMENT })
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpandComment);
