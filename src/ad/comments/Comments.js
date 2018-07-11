import React from 'react';
import PropTypes from 'prop-types';
import { Textarea } from 'nav-frontend-skjema';
import { Undertittel } from 'nav-frontend-typografi';
import { connect } from 'react-redux';
import { SET_COMMENT } from '../adReducer';
import AdminStatusEnum from '../administration/AdminStatusEnum';
import { registerShortcuts } from '../../common/shortcuts/Shortcuts';

class Comments extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasChanged: false,
            comments: props.comments
        };
    }

    componentDidMount() {
        registerShortcuts('annonseDetaljer', {
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
            <div>
                <Undertittel className="Categorize__head">Kommentarer</Undertittel>
                <Textarea
                    disabled={this.props.status !== AdminStatusEnum.PENDING || this.props.isSavingAd}
                    label=""
                    maxLength={255}
                    onChange={this.onChange}
                    onBlur={this.onBlur}
                    value={this.state.comments || ''}
                    textareaRef={(ref) => { this.commentArea = ref; }}
                />
            </div>
        );
    }
}

Comments.defaultProps = {
    comments: ''
};

Comments.propTypes = {
    setComment: PropTypes.func.isRequired,
    comments: PropTypes.string,
    status: PropTypes.string.isRequired,
    isSavingAd: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => ({
    comments: state.ad.data.administration.comments,
    status: state.ad.data.administration.status,
    isSavingAd: state.ad.isSavingAd
});

const mapDispatchToProps = (dispatch) => ({
    setComment: (comment) => dispatch({ type: SET_COMMENT, comment })
});


export default connect(mapStateToProps, mapDispatchToProps)(Comments);
