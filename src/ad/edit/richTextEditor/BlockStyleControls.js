import React from 'react';
import PropTypes from 'prop-types';
import StyleButton from './StyleButton';
import './RichTextEditor.less';

const BlockStyleControls = ({ editorState, onToggle }) => {
    const BLOCK_TYPES = [
        { label: 'icon-quote', style: 'blockquote' },
        { label: 'icon-unorderedlist', style: 'unordered-list-item' },
        { label: 'icon-orderedlist', style: 'ordered-list-item' },
    ];
    const selection = editorState.getSelection();
    const blockType = editorState
        .getCurrentContent()
        .getBlockForKey(selection.getStartKey())
        .getType();

    return (
        <div className="RichTextEditor__controls">
            {BLOCK_TYPES.map((type) => (
                <StyleButton
                    key={type.label}
                    active={type.style === blockType}
                    label={type.label}
                    onToggle={onToggle}
                    style={type.style}
                />
            ))}
        </div>
    );
};

BlockStyleControls.propTypes = {
    editorState: PropTypes.shape({
        getSelection: PropTypes.func,
        getCurrentContent: PropTypes.func,
    }).isRequired,
    onToggle: PropTypes.func.isRequired,
};

export default BlockStyleControls;
