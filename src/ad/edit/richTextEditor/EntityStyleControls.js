import React from 'react';
import PropTypes from 'prop-types';
import StyleButton from './StyleButton';
import './RichTextEditor.less';

const EntityStyleControls = ({ editorState, onToggle }) => {
    const ENTITY_TYPES = [{ label: 'icon-link', style: 'LINK' }];

    const contentState = editorState.getCurrentContent();
    const selection = editorState.getSelection();
    const currentBlock = contentState.getBlockForKey(selection.getStartKey());
    const startOffset = editorState.getSelection().getStartOffset();
    const entityKey = currentBlock.getEntityAt(startOffset);
    var erLink = false;
    if (entityKey != null) {
        const entity = contentState.getEntity(entityKey);
        const type = entity.type;
        erLink = type == 'LINK';
    }

    return (
        <div className="RichTextEditor__controls">
            {ENTITY_TYPES.map((type) => (
                <StyleButton
                    key={type.label}
                    active={erLink}
                    label={type.label}
                    onToggle={onToggle}
                    style={type.style}
                />
            ))}
        </div>
    );
};

EntityStyleControls.propTypes = {
    editorState: PropTypes.shape({
        getSelection: PropTypes.func,
        getCurrentContent: PropTypes.func,
    }).isRequired,
    onToggle: PropTypes.func.isRequired,
};

export default EntityStyleControls;
