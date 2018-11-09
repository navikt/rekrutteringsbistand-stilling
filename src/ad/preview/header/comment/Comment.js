import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import Chevron from 'nav-frontend-chevron';
import './Comment.less';

class Comment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isCommentExpanded: false
        };
    }

    onExpandClick = () => {
        this.setState({
            isCommentExpanded: !this.state.isCommentExpanded
        });
    };

    render() {
        const { comments } = this.props;

        if (!comments) {
            return null;
        }

        let shortComments;
        if (comments && comments.length > 55) {
            shortComments = comments.substring(0, 52);
            shortComments += '...';
        }

        return (
            <div className="Preview__Comment">
                <div>
                    <i className="Comment__icon" />
                </div>
                <div>
                    <Element>Kommentar til stillingen</Element>
                    {!shortComments &&
                        <Normaltekst>{comments}</Normaltekst>
                    }
                    {shortComments &&
                        <div className="Comment__wrapper">
                            <div className="Comment__text__wrapper">
                                <Normaltekst className={`${!this.state.isCommentExpanded ? 'Comment__text' : 'Comment__text__short'} TopSection__text`}>
                                    {comments}
                                </Normaltekst>
                            </div>
                            <div>
                                <button
                                    type="button"
                                    className="Expand__comment__button"
                                    onClick={this.onExpandClick}
                                    aria-expanded={this.state.isCommentExpanded}
                                >
                                    {this.state.isCommentExpanded ? 'Se mindre' : 'Se mer'}
                                    <Chevron
                                        className="Expand__comment__chevron"
                                        type={this.state.isCommentExpanded ? 'opp' : 'ned'}
                                    />
                                </button>
                            </div>
                        </div>
                    }
                </div>
            </div>
        );
    }
}

Comment.defaultProps = {
    comments: undefined
};

Comment.propTypes = {
    comments: PropTypes.string
};

const mapStateToProps = (state) => ({
    comments: state.adData.administration.comments
});

export default connect(mapStateToProps)(Comment);
