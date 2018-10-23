import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Textarea } from 'nav-frontend-skjema';
import { SET_COMMENT } from '../../adDataReducer';
import './Comment.less';

class Comment extends React.Component {
    onChange = (e) => {
        this.props.setComment(e.target.value);
    };

    render() {
        return (
            <div className="Comment">
                <Textarea
                    label="Notatfelt"
                    maxLength={512}
                    onChange={this.onChange}
                    value={this.props.comments || ''}
                    textareaClass="typo-normal Comment__textarea"
                    placeholder="Legg inn notat"
                    tellerTekst={() => {}}
                />
            </div>
        );
    }
}

Comment.defaultProps = {
    comments: ''
};

Comment.propTypes = {
    setComment: PropTypes.func.isRequired,
    comments: PropTypes.string
};

const mapStateToProps = (state) => ({
    comments: state.adData.administration.comments
});

const mapDispatchToProps = (dispatch) => ({
    setComment: (comment) => dispatch({ type: SET_COMMENT, comment }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Comment);
