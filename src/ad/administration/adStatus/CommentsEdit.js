import React from 'react';
import PropTypes from 'prop-types';
import { Textarea } from 'nav-frontend-skjema';
import { Normaltekst } from 'nav-frontend-typografi';
import { connect } from 'react-redux';
import { SET_COMMENT } from '../../adDataReducer';
import { registerShortcuts } from '../../../common/shortcuts/Shortcuts';

class CommentsEdit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasChanged: false,
            comments: props.comments
        };
    }

    componentDidMount() {
        registerShortcuts('administrationEdit', {
            '/': (e) => {
                e.preventDefault();
                this.commentArea.focus();
            }
        });
    }

    onChange = (e) => {
        this.setState({
            hasChanged: true,
            comments: e.target.value
        });
    };

    onBlur = (e) => {
        if (this.state.hasChanged) {
            this.setState({
                hasChanged: false
            });
            this.props.setComment(this.state.comments);
        }
    };

    render() {
        return (
            <div className="CommentsEdit">
                <Normaltekst>{this.props.label}</Normaltekst>
                <Textarea
                    label=""
                    maxLength={255}
                    onChange={this.onChange}
                    onBlur={this.onBlur}
                    value={this.state.comments || ''}
                    textareaRef={(ref) => { this.commentArea = ref; }}
                    textareaClass="typo-normal"
                    feil={this.props.error ? { feilmelding: this.props.error } : undefined}
                    placeholder={this.props.placeholder}
                />
            </div>
        );
    }
}

CommentsEdit.defaultProps = {
    comments: '',
    error: undefined,
    placeholder: ''
};

CommentsEdit.propTypes = {
    setComment: PropTypes.func.isRequired,
    comments: PropTypes.string,
    error: PropTypes.string,
    label: PropTypes.string.isRequired,
    placeholder: PropTypes.string
};

const mapStateToProps = (state) => ({
    comments: state.adData.administration.comments
});

const mapDispatchToProps = (dispatch) => ({
    setComment: (comment) => dispatch({ type: SET_COMMENT, comment })
});


export default connect(mapStateToProps, mapDispatchToProps)(CommentsEdit);
