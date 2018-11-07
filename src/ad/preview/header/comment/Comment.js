import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import ExpandComment from './ExpandComment';
import './Comment.less';

class Comment extends React.Component {
    render() {
        const {comments} = this.props;

        if(!comments){
            return null;
        }

        let shortComments;
        if(comments && comments.length > 60){
            shortComments = comments.substring(0, 57);
            shortComments += '...';
        }

        return (
            <div className="Preview__Comment">
                <div>
                    <i className="Comment__icon" />
                </div>
                <div >
                    <Element >Kommentar til stillingen</Element>
                    {!shortComments && <Normaltekst>{comments}</Normaltekst>}
                    {shortComments &&
                    <Normaltekst className="Comment__text TopSection__text">{this.props.isCommentExpanded ? comments : shortComments}
                        <ExpandComment/>
                    </Normaltekst>  }

                </div>
            </div>
        );
    }
}

Comment.defaultProps = {
    comments: undefined,
};

Comment.propTypes = {
    isCommentExpanded: PropTypes.bool.isRequired,
    comments: PropTypes.string
};

const mapStateToProps = (state) => ({
    comments: state.adData.administration.comments,
    isCommentExpanded: state.expandComment.isCommentExpanded
});

export default connect(mapStateToProps)(Comment);
