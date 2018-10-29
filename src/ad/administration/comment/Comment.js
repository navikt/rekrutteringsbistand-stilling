import React from 'react';
import PropTypes from 'prop-types';
import { Textarea } from 'nav-frontend-skjema';
import { connect } from 'react-redux';
import { SET_COMMENT } from '../../adDataReducer';
import { MAX_LENGTH_COMMENT } from '../../adValidationReducer';
import './Comment.less';

class Comment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasChanged: false,
            comments: props.comments
        };
    }

    onChange = (e) => {
        this.setState({
            hasChanged: true,
            comments: e.target.value
        });
    };

    onBlur = () => {
        if (this.state.hasChanged) {
            this.setState({
                hasChanged: false
            });
            this.props.setComment(this.state.comments);
        }
    };

    static getDerivedStateFromProps(nextProps, prevState) {
        if (prevState.comments !== nextProps.comments && prevState.hasChanged === false) {
            return {
                comments: nextProps.comments
            };
        }
        return null;
    }


    render() {
        const error = this.props.validation.comment;

        return (
            <Textarea
                label="Kommentar"
                maxLength={MAX_LENGTH_COMMENT}
                onChange={this.onChange}
                onBlur={this.onBlur}
                value={this.state.comments || ''}
                textareaClass="typo-normal Comment__textarea"
                feil={error ? { feilmelding: error } : undefined}
                placeholder={this.props.placeholder}
            />
        );
    }
}

Comment.defaultProps = {
    comments: '',
    placeholder: ''
};

Comment.propTypes = {
    setComment: PropTypes.func.isRequired,
    comments: PropTypes.string,
    placeholder: PropTypes.string,
    validation: PropTypes.shape({
        comment: PropTypes.string
    }).isRequired
};

const mapStateToProps = (state) => ({
    comments: state.adData.administration.comments,
    validation: state.adValidation.errors
});

const mapDispatchToProps = (dispatch) => ({
    setComment: (comment) => dispatch({ type: SET_COMMENT, comment })
});

export default connect(mapStateToProps, mapDispatchToProps)(Comment);
