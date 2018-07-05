import React from 'react';
import PropTypes from 'prop-types';
import Panel from 'nav-frontend-paneler';
import { Textarea } from 'nav-frontend-skjema';

export default class Comments extends React.Component {
    onEditComment = (e) => {
        this.props.setComment(e.target.value);
    };

    render() {
        const { comment } = this.props;
        return (
            <Panel border>
                <Textarea
                    label="Kommentar til annonsen"
                    maxLength={255}
                    onChange={this.onEditComment}
                    value={comment || ''}
                />
            </Panel>
        );
    }
}

Comments.defaultProps = {
    comment: ''
};

Comments.propTypes = {
    comment: PropTypes.string,
    setComment: PropTypes.func.isRequired
};
