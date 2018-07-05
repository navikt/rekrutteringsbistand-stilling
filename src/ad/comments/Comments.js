import React from 'react';
import PropTypes from 'prop-types';
import Panel from 'nav-frontend-paneler';
import { Textarea } from 'nav-frontend-skjema';
import { connect } from "react-redux";
import { SET_COMMENT } from "../adReducer";

class Comments extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasChanged: false,
            comments: props.comments
        }
    }

    onChange = (e) => {
        this.setState({
            hasChanged: true,
            comments: e.target.value
        })
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
            <Panel border>
                <Textarea
                    label="Kommentar til annonsen"
                    maxLength={255}
                    onChange={this.onChange}
                    onBlur={this.onBlur}
                    value={this.state.comments || ''}
                />
            </Panel>
        );
    }
}

Comments.defaultProps = {
    comments: ''
};

Comments.propTypes = {
    setComment: PropTypes.func.isRequired,
    comments: PropTypes.string
};

const mapStateToProps = (state) => ({
    comments: state.ad.data.administration.comments
});

const mapDispatchToProps = (dispatch) => ({
    setComment: (comment) => dispatch({ type: SET_COMMENT, comment })
});


export default connect(mapStateToProps, mapDispatchToProps)(Comments);
