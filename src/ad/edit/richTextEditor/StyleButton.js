import React from 'react';
import PropTypes from 'prop-types';
import './RichTextEditor.less';

export default class StyleButton extends React.Component {
    onToggle = (e) => {
        e.preventDefault();
        this.props.onToggle(this.props.style);
    };

    render() {
        let className = 'RichTextEditor__styleButton';
        if (this.props.active) {
            className += ' RichTextEditor__activeButton';
        }
        return (
            <button className={className} onClick={this.onToggle}>
                <div className={this.props.label} />
            </button>
        );
    }
}

StyleButton.propTypes = {
    onToggle: PropTypes.func.isRequired,
    active: PropTypes.bool.isRequired,
    label: PropTypes.string.isRequired,
    style: PropTypes.string.isRequired
};
