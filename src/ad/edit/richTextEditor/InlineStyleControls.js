import React from 'react';
import PropTypes from 'prop-types';
import StyleButton from './StyleButton';
import './RichTextEditor.less';

const InlineStyleControls = ({ editorState, onToggle }) => {
    const INLINE_STYLES = [
        { label: 'icon-bold', style: 'BOLD' },
        { label: 'icon-italic', style: 'ITALIC' },
        { label: 'icon-underline', style: 'UNDERLINE' },
        { label: 'icon-code', style: 'CODE' },
    ];
    const currentStyle = editorState.getCurrentInlineStyle();
    return (
        <div className="RichTextEditor__controls">
            {INLINE_STYLES.map(type => (
                <StyleButton
                    key={type.label}
                    active={currentStyle.has(type.style)}
                    label={type.label}
                    onToggle={onToggle}
                    style={type.style}
                />
            ))}
        </div>
    );
};

InlineStyleControls.propTypes = {
    editorState: PropTypes.shape({
        getCurrentInlineStyle: PropTypes.func,
    }).isRequired,
    onToggle: PropTypes.func.isRequired,
};

export default InlineStyleControls;
